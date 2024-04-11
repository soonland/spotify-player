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

export interface IAlbum {
  album_type: string;
  artists: IArtist[];
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: IImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface ITracks {
  album: IAlbum;
  artists: IArtist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
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

export interface ISearchTracks {
  href: string;
  items: ITracks[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface ISearch {
  artists: ISearchArtists;
  tracks: ISearchTracks;
}
