import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { FC, ReactElement } from "react";
import Image from "next/image";

const MyProfile: FC = (): ReactElement => {
  const session = useSession();

  if (session.status === "unauthenticated") {
    return (
      <>
        <Typography>You are not signed in</Typography>
        <Button variant="text" onClick={() => signIn()} data-testid="testid.button">
          Sign in
        </Button>
      </>
    );
  }

  return (
    <Grid item container flexDirection={"row"} alignItems={"center"} data-testid="testid.grid">
      <Image src={session.data?.user?.image as string} alt="profile" width={64} height={64} />
      <div>Signed in as {session.data?.user?.name}</div>
    </Grid>
  );
};

export default MyProfile;
