type TTrack = {
  album_id: number;
  album_domain_name: string;
  album_domain_id: number;
  album_image_id: string;
  artist_id: number;
  artist_name: string;
  image_id: string;
  domain_name: string;
  domain_id: number;
  track_id: number;
  track_title: string;
  duration: number;
  genre_id: number;
  genre_name: string;
  youtube_video_id: string;
};

type TGroupedTrack = {
  id: number;
  title: string;
  duration: number;
  youtube_video_id: string;
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
  youtube_video_id: string;
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
  artist_id: number;
  artist_name: string;
  artist_domain_id: number;
  artist_domain_name: string;
  artist_image_id: string;
  genre_id: number;
  genre_name: string;
};

type TGroupedArtist = {
  id: number;
  name: string;
  domain_id: number;
  domain_name: string;
  image_id: string;
  genres?: TGroupedGenre[];
};

type TGroupedArtistNested = {
  id: number;
  name: string;
  domain_id: number;
  domain_name: string;
  image_id: string;
  genres?: { [id: number]: TGroupedGenre };
};

type TGroupedArtistWrapped = {
  [id: number | string]: TGroupedArtistNested;
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

type TGroupedAlbumWrapped = { [id: number | string]: TGroupedAlbumNested };

type TArtistAlbum = {
  album_id: number;
  album_release_day: number;
  album_release_month: number;
  album_release_year: number;
  album_title: string;
  domain_id: number;
  domain_name: string;
  genre_id: number;
  genre_name: string;
  image_id: string;
};

type TGroupedArtistAlbum = {
  id: number;
  title: string;
  release_day: number;
  release_month: number;
  release_year: number;
  domain_id: number;
  domain_name: string;
  image_id: string;
  genres?: TGroupedGenre[];
};

type TGroupedArtistAlbumNested = {
  id: number;
  title: string;
  release_day: number;
  release_month: number;
  release_year: number;
  domain_id: number;
  domain_name: string;
  image_id: string;
  genres?: {
    [id: number]: TGroupedGenre;
  };
};

type TGroupedArtistAlbumWrapped = Map<
  number | string,
  TGroupedArtistAlbumNested
>;

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

type Player = {
  h: HTMLIFrameElement;
  loadVideoById: Function;
  playVideo: Function;
};

declare global {
  interface Window {
    onYouTubeIframeAPIReady: Function;
    YT: {
      Player: {
        new (
          nodeId: string,
          options?: {
            height?: string;
            width?: string;
            origin?: string;
            events?: {
              onReady?: Function;
              onStateChange?: Function;
            };
          }
        ): Player;
      };
      PlayerState: {
        UNSTARTED: -1;
        ENDED: 0;
        PLAYING: 1;
        PAUSED: 2;
        BUFFERING: 3;
        CUED: 5;
      };
    };
    player: Player;
  }
}

type YoutubePlayerEvent = { data: -1 | 0 | 1 | 2 | 3 | 5 };

export type {
  TTrack,
  TGroupedTrack,
  TGroupedTrackWrapped,
  TArtist,
  TGroupedArtist,
  TGroupedArtistNested,
  TGroupedArtistWrapped,
  TAlbum,
  TGroupedAlbum,
  TGroupedAlbumNested,
  TGroupedAlbumWrapped,
  TArtistAlbum,
  TGroupedArtistAlbum,
  TGroupedArtistAlbumNested,
  TGroupedArtistAlbumWrapped,
  TPlaylist,
  YoutubePlayerEvent,
};
