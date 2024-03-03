import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  data: any;
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = '';

async function fetchWebApi(endpoint: string, method: string) {
  const res = await fetch(`https://api.spotify.com/${endpoint}?q=${req.query.artists}&type=artist`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    // body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi('v1/search', 'GET'));
}

  const topTracks = await getTopTracks();
  res.status(200).json({ data: topTracks.artists.items.map(i => i.external_urls.spotify) })
}