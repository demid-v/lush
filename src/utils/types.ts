type TTrack = {
  album_id: number;
  album_domain_name: string;
  album_domain_id: number;
  album_image_id: string;
  artist_id: number;
  name: string;
  image_id: string;
  domain_name: string;
  domain_id: number;
  audio_id: number;
  audio_title: string;
  duration: number;
  genre_id: number;
  genre_name: string;
  youtubeVideoId: string;
};

type TGroupedTrack = {
  id: number;
  title: string;
  duration: number;
  youtubeVideoId: string;
  genres?: TGroupedGenre[];
  albums?: {
    album_id: number;
    domain_name: string;
    domain_id: number;
    image_id: string;
  }[];
  artists?: {
    id: number;
    name: string;
    image_id: string;
    domain_name: string;
    domain_id: number;
  }[];
};

type TGroupedTrackNested = {
  id: number;
  title: string;
  duration: number;
  youtubeVideoId: string;
  genres?: { [id: number]: TGroupedGenre };
  artists?: {
    [id: number]: {
      id: number;
      name: string;
      image_id: string;
      domain_name: string;
      domain_id: number;
    };
  };
  albums?: {
    [id: number]: {
      album_id: number;
      domain_name: string;
      domain_id: number;
      image_id: string;
    };
  };
};

type TGroupedTrackWrapped = {
  [id: number | string]: TGroupedTrackNested;
};

type TArtist = {
  id: number;
  name: string;
  domain_id: number;
  domain_name: string;
  image_id: string;
};

type TAlbum = {
  album_id: number;
  album_title: string;
  album_domain_id: number;
  album_domain_name: string;
  album_image_id: string;
  genre_id: number;
  genre_name: string;
  r: number;
  g: number;
  b: number;
};

type TGroupedGenre = {
  id: number;
  name: string;
};

type TGroupedAlbum = {
  id: number;
  title: string;
  domain_id: number;
  domain_name: string;
  image_id: string;
  r: number;
  g: number;
  b: number;
  genres?: TGroupedGenre[];
};

type TGroupedAlbumNested = {
  id: number;
  title: string;
  domain_id: number;
  domain_name: string;
  image_id: string;
  r: number;
  g: number;
  b: number;
  genres?: {
    [id: number]: TGroupedGenre;
  };
};

type TGroupedAlbumWrapped = {
  [id: number | string]: TGroupedAlbumNested;
};

type TPlaylist = {
  id: number;
  name: string;
  domain_id: number;
  domain_name: string;
  image_id: string;
  r: number;
  g: number;
  b: number;
  genres: TGroupedGenre[];
};

export type {
  TTrack,
  TGroupedTrack,
  TGroupedTrackWrapped,
  TArtist,
  TAlbum,
  TGroupedAlbum,
  TGroupedAlbumNested,
  TGroupedAlbumWrapped,
  TPlaylist,
};
