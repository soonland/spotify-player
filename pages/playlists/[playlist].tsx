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
    `/api/playlists/${router.query.playlist}?fields=items%28track%28name%29%29`,
    fetcher,
  );
  return !isMutating && <ul>{data?.items.map((el, index) => <li key={index}>{el.track.name}</li>)}</ul>;
};

export default Playlist;
