import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";

const Playlist = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const router = useRouter();

  useEffect(() => {
    if (router.query.playlist) trigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const { data, isMutating, trigger } = useSWRMutation(
    `/api/playlists/${router.query.playlist}?fields=items%28track%28name,id%29%29`,
    fetcher,
  );
  if (isMutating) return <CircularProgress />;
  return (
    !isMutating && (
      <ul>
        {data?.items.map((el, index) => {
          const key = `track-${index}`;
          return (
            <li key={key}>
              <Link href={`/recommendations/track/${el.track.id}`}>{el.track.name}</Link>
            </li>
          );
        })}
      </ul>
    )
  );
};

export default Playlist;

export const getServerSideProps = async () => {
  return {
    props: {
      showProfile: true,
    },
  };
};
