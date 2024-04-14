import { useSession } from "next-auth/react";
import { Box, Grid } from "@mui/material";
import useSWRMutation from "swr/mutation";
import { useEffect } from "react";
import Link from "next/link";

const Home = () => {
  const session = useSession();

  const fetcherTop5 = (url: string) => fetch(url).then((res) => res.json());

  const {
    data: dataPlaylist,
    isMutating: isMutatingPlaylist,
    trigger: triggerPlaylist,
  } = useSWRMutation("/api/me/playlists", fetcherTop5);

  useEffect(() => {
    if (session.status === "authenticated") {
      triggerPlaylist();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.status]);

  return (
    <div>
      <main>
        <Box padding={2}>
          <Grid container flexDirection={"column"} spacing={2}>
            {session.status === "authenticated" && (
              <Grid item>
                <ul>
                  {!isMutatingPlaylist &&
                    dataPlaylist?.items.map((el, index) => {
                      const key = `playlist-${index}`;
                      return (
                        <li key={key}>
                          <Link href={`/playlists/${el.id}`}>{el.name}</Link>
                        </li>
                      );
                    })}
                </ul>
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
