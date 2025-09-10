import { useSession } from "next-auth/react";
import { Box, Grid } from "@mui/material";
import useSWRMutation from "swr/mutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Queue from "@/components/Queue";
import SearchDataGrid from "@/components/Grid/SearchDataGrid";
import { ITrack } from "@/models/types";

const RecommendationsPage = () => {
  const session = useSession();
  const router = useRouter();

  const fetcher = async (url: string, { arg }: { arg: { type: string; spotifyId: string } }) => {
    if (arg.type === undefined) {
      arg.type = "track";
    }

    const queryUrl = `${url}/${arg.type}/${arg.spotifyId}`;
    const res = await fetch(`${queryUrl}`);
    return await res.json();
  };

  const { data, isMutating, trigger } = useSWRMutation("/api/recommendations", fetcher);

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
      <Grid spacing={2}>
        {session.status === "authenticated" && (
          <Grid size={12}>
            <Queue />
            <SearchDataGrid isMutating={isMutating} data={convertResultsToDataGridRows(data)} />
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
