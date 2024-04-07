export interface IImage {
  height: number;
  width: number;
  url: string;
}

export interface IArtist {
  externalUrls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: IImage[];
  name: string;
  popularity: number;
  type: string;
  url: string;
}

export interface ISearchArtists {
  href: string;
  items: IArtist[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface ISearch {
  artists: ISearchArtists;
}
