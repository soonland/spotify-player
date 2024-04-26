import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { ISearch } from "../../../../models/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ISearch>) {
  const { accessToken } = await getServerSession(req, res, authOptions);

  async function fetchWebApi(endpoint: string, method: string) {
    const searchSeed = req.query.type === "track" ? "seed_tracks" : "seed_artists";
    const url = `https://api.spotify.com/${endpoint}?${searchSeed}=${(req.query.spotifyId as string).replaceAll(",", "%2C")}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method,
      // body:JSON.stringify(body)
    });
    return await res.json();
  }

  const search = async () => {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return await fetchWebApi("v1/recommendations", "GET");
  };

  const results = await search();
  res.status(200).json(results);
}
