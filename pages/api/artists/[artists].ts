import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  data: any;
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQC5aAYLeQlM3d5yonVBvdusYT800PwxXxEcqMQmIOw1bhEWdnJmgkU9Qnc6FR7jyBzjVkNPIIQaHklCkebGS6S03e6FgkuqVFDlczblRTIfEx3KXGkZ30jMjxuU8qrYDV8NCx-4EvjgM38BZwc1DdlC9GiPD6ezB8De-RhELNdu2N0jMbLQDwXGs4DHfSwPV8Uy-kqAnECzBLORnhKHbNMF0_pcoySrQrF2Cd5znkRfsTDLmCci2NNaSkwTXw';

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