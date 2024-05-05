import { useSession } from "next-auth/react";
import { Box, Grid } from "@mui/material";
import useSWRMutation from "swr/mutation";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import SearchDataGrid from "@/components/Grid/SearchDataGrid";
import { ISearch } from "@/models/types";
import Queue from "@/components/Queue";

const Home = () => {
  const session = useSession();
  const router = useRouter();

  const fetcher = async (url: string, { arg }: { arg: { searchType: string; searchString: string } }) => {
    if (arg.searchType === undefined) {
      arg.searchType = "album,artist,track";
    }

    const parameterizedQuery = new URLSearchParams({
      q: arg.searchString,
      type: arg.searchType,
    }).toString();
    const res = await fetch(`${url}?${parameterizedQuery}`);
    return await res.json();
  };

  const { data, isMutating, trigger } = useSWRMutation("/api/search", fetcher);

  const handleSearch = (searchQuery: ParsedUrlQuery) => {
    const searchString = searchQuery.q as string;
    const searchType = searchQuery.type as string;
    trigger({ searchType, searchString });
  };

  useEffect(() => {
    if (router.query.q) {
      handleSearch(router.query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.q, router.query.type]);

  const convertResultsToDataGridRows = (data: ISearch) => {
    console.log("data", data);
    const rows =
      data?.artists?.items?.map((artist) => ({
        type: artist.type,
        id: artist.id,
        artistName: artist.name,
        albumName: "",
        trackName: "",
        imgCover: artist.images?.[0]?.url,
        spotifyLink: artist.external_urls.spotify,
      })) || [];

    const rows2 =
      data?.albums?.items?.map((album) => ({
        type: album.type,
        id: album.id,
        artistName: album.artists[0].name,
        albumName: album.name,
        trackName: "",
        imgCover: album.images[0].url,
        spotifyLink: album.external_urls.spotify,
      })) || [];

    const rows3 =
      data?.tracks?.items?.map((track) => ({
        type: track.type,
        id: track.id,
        artistName: track.artists[0].name,
        albumName: track.album.name,
        trackName: track.name,
        imgCover: track.album.images[0].url,
        spotifyLink: track.external_urls.spotify,
      })) || [];
    // concat all rows
    console.log("rows", rows);
    console.log("rows2", rows2);
    console.log("rows3", rows3);
    return rows.concat(rows2).concat(rows3);
  };

  return (
    <div>
      <main>
        <Box>
          <Grid container flexDirection={"column"} spacing={2}>
            {session.status === "authenticated" && (
              <Grid item>
                <Queue />
                <SearchDataGrid isMutating={isMutating} data={convertResultsToDataGridRows(data)} />
              </Grid>
            )}
          </Grid>
        </Box>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  return {
    props: {
      showProfile: true,
    },
  };
};
