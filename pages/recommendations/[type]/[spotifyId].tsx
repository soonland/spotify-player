import { useSession } from "next-auth/react";
import { Box, Grid, IconButton, Link, styled } from "@mui/material";
import Image from "next/image";
import useSWRMutation from "swr/mutation";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon, Add as AddIcon } from "@mui/icons-material";
import { ParsedUrlQuery } from "querystring";
import { ITrack } from "@/models/types";
import EnhancedDataGrid from "@/components/EnhancedDataGrid";
import { useQueueTracks } from "@/hooks/useQueue";
import Queue from "@/components/Queue";
import { useCreateColumn } from "@/utils/createColumns";

const StyledDataGrid = styled(EnhancedDataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
}));

const StyledGridOverlay = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
}));

const CustomNoRowsOverlay = () => {
  const { t } = useTranslation("common");
  return (
    <StyledGridOverlay>
      <SentimentVeryDissatisfiedIcon fontSize="large" />
      <Box sx={{ mt: 1 }}>{t("common.noDataFound")}</Box>
    </StyledGridOverlay>
  );
};

const RecommendationsPage = () => {
  const session = useSession();
  const router = useRouter();
  const createColumn = useCreateColumn();
  const { queue, addToQueue: addToQueueHook, removeFromQueue } = useQueueTracks();
  const { t } = useTranslation("common");

  const fetcher = async (url: string, { arg }: { arg: { type: string; spotifyId: string } }) => {
    if (arg.type === undefined) {
      arg.type = "track";
    }

    const queryUrl = `${url}/${arg.type}/${arg.spotifyId}`;
    const res = await fetch(`${queryUrl}`);
    return await res.json();
  };

  const { data, isMutating, trigger } = useSWRMutation("/api/recommendations", fetcher);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const columns: GridColDef[] = [
    createColumn({
      field: "type",
      options: {
        width: 100,
        align: "center",
        valueGetter: (value) => {
          return t(`dataGrid.rows.type.${value}`);
        },
      },
    }),
    createColumn({
      field: "imgCover",
      options: {
        width: 90,
        renderCell: (params) => <Image src={params.value as string} alt="" width={80} height={80} />,
      },
    }),
    createColumn({
      field: "artistName",
      options: {
        width: 150,
        align: "center",
      },
    }),
    createColumn({
      field: "albumName",
      options: {
        width: 150,
        align: "center",
      },
    }),
    createColumn({
      field: "trackName",
      options: {
        width: 150,
        align: "center",
      },
    }),
    createColumn({
      field: "spotifyLink",
      options: {
        align: "center",
        renderCell: (params) => (
          <a href={params.value as string} target="_blank" rel="noopener noreferrer">
            Click Me
          </a>
        ),
      },
    }),
    createColumn({
      field: "recommandationLink",
      options: {
        align: "center",
        renderCell: (params) => <Link href={`/recommendations/${params.row.type}/${params.row.id}`}>Click Me</Link>,
      },
    }),
    createColumn({
      field: "addToPlaylist",
      options: {
        align: "center",
        renderCell: (params) => (
          <IconButton onClick={() => addToQueueHook(params.row)}>
            <AddIcon />
          </IconButton>
        ),
      },
    }),
  ];

  const handleSearch = (searchQuery: ParsedUrlQuery) => {
    const spotifyId = searchQuery.spotifyId as string;
    const type = searchQuery.type as string;
    trigger({ type, spotifyId });
  };

  useEffect(() => {
    if (router.query) {
      handleSearch(router.query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const convertResultsToDataGridRows = (data: { tracks: ITrack[] }) => {
    const rows =
      data?.tracks?.map((track) => ({
        type: track.type,
        id: track.id,
        artistName: track.artists[0].name,
        albumName: track.album.name,
        trackName: track.name,
        imgCover: track.album.images[0].url,
        spotifyLink: track.external_urls.spotify,
      })) || [];
    // concat all rows
    return rows;
  };

  return (
    <Box>
      <Grid container flexDirection={"column"} spacing={2}>
        {session.status === "authenticated" && (
          <Grid item>
            <Queue queue={queue} removeFromQueue={removeFromQueue} />
            <StyledDataGrid
              autoHeight
              rowHeight={80}
              pageSizeOptions={[5, 10, 25, 50, 100]}
              pagination
              loading={isMutating}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              columns={columns}
              rows={convertResultsToDataGridRows(data)} // Ensure data is not undefined
              slots={{ noRowsOverlay: CustomNoRowsOverlay }}
              sx={{ "--DataGrid-overlayHeight": "100px" }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default RecommendationsPage;

export const getServerSideProps = async () => {
  return {
    props: {
      showProfile: true,
    },
  };
};
