import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getServerSession
} from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

interface IImage {
  height: number;
  width: number;
  url: string;
}

interface IArtist {
  externalUrls: { spotify: string; };
  followers: { href: string; total: number; };
  href: string;
  id: string;
  images: IImage[];
  name: string;
  popularity: number;
  type: string;
  url: string;
}

interface ISearchArtists {
  href: string;
  items: IArtist[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

interface ISearch {
  artists: ISearchArtists;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISearch>
) {

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
// const token = process.env.SPOTIFY_API_TOKEN;

const { accessToken } = await getServerSession(req, res, authOptions);

async function fetchWebApi(endpoint: string, method: string) {
  const res = await fetch(`https://api.spotify.com/${endpoint}?q=${req.query.artists}&type=artist`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method,
    // body:JSON.stringify(body)
  });
  return await res.json();
}

  const getArtists = async () => {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi('v1/search', 'GET'));
  }

  const artists = await getArtists();
  res.status(200).json(artists)
}