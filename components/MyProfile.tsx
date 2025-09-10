import Typography from "@mui/material/Typography";
import { Button, Grid, Skeleton } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { FC, ReactElement } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

const MyProfile: FC = (): ReactElement => {
  const session = useSession();
  const { t } = useTranslation("common");

  if (session.status === "unauthenticated") {
    return (
      <>
        <Typography>{t("common.notSignedIn")}</Typography>
        <Button variant="text" onClick={() => signIn()} data-testid="testid.button">
          {t("common.signIn")}
        </Button>
      </>
    );
  }

  if (session.status === "loading") {
    return <Skeleton variant="rectangular" width={210} height={60} data-testid="testid.loading" />;
  }

  return (
    <Grid data-testid="testid.grid" mb={2}>
      <Image src={session.data?.user?.image as string} alt="profile" width={64} height={64} />
      <Typography ml={1} fontWeight={400}>
        {t("common.signedInAs", { name: session.data?.user?.name })}
      </Typography>
    </Grid>
  );
};

export default MyProfile;
