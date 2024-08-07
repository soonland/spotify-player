import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { ISearch } from "../../../../models/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ISearch>) {
  // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
  // const token = process.env.SPOTIFY_API_TOKEN;

  const { accessToken } = await getServerSession(req, res, authOptions);

  async function fetchWebApi(endpoint: string, method: string) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method,
      // body:JSON.stringify(body)
    });
    return await res.json();
  }

  const getPlaylists = async () => {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return await fetchWebApi("v1/me/playlists", "GET");
  };

  const artists = await getPlaylists();
  res.status(200).json(artists);
}
