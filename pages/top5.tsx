import { signIn, useSession } from "next-auth/react";
import { Box, Button, Grid, Typography } from "@mui/material";
import useSWRMutation from "swr/mutation";
import { useEffect } from "react";

const Home = () => {
  const session = useSession();

  const fetcherTop5 = (url: string) => fetch(url).then((res) => res.json());

  const { data: dataTop5, isMutating: isMutatingTop5, trigger: triggerTop5 } = useSWRMutation("/api/me", fetcherTop5);

  useEffect(() => {
    if (session.status === "authenticated") {
      triggerTop5();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.status]);

  return (
    <div>
      <main>
        {session.status === "unauthenticated" && (
          <>
            <Typography>You are not signed in</Typography>
            <Button variant="text" onClick={() => signIn()}>
              Sign in
            </Button>
          </>
        )}

        <Box padding={2}>
          <Grid container flexDirection={"column"} spacing={2}>
            {session.status === "authenticated" && (
              <Grid item>
                <ul>
                  {!isMutatingTop5 &&
                    dataTop5?.items.map((el, index) => {
                      const key = `track-${index}`;
                      return (
                        <li key={key}>
                          {el.name} par {el.artists[0].name}
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
