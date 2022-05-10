import type {
  TAlbum,
  TGroupedAlbum,
  TGroupedAlbumWrapped,
  TGroupedTrack,
  TGroupedTrackWrapped,
  TTrack,
} from "./types";

const constructLink = (str: string) =>
  str.replace(/ /g, "+").replace(/\//g, "%2F");

function albumsGroupBy(albums: TAlbum[], key: keyof TAlbum = "album_id") {
  return albums.reduce((albumsAcc: TGroupedAlbumWrapped, album) => {
    const albumId = album["album_id"];

    if (!(albumId in albumsAcc)) {
      albumsAcc[albumId] = {
        id: album.album_id,
        title: album.album_title,
        domain_id: album.album_domain_id,
        domain_name: album.album_domain_name,
        image_id: album.album_image_id,
        r: album.r,
        g: album.g,
        b: album.b,
      };
    }

    if (album.genre_id != null) {
      let genres = albumsAcc[albumId].genres;
      if (genres === undefined) genres = albumsAcc[albumId].genres = {};
      genres[album.genre_id] = {
        id: album.genre_id,
        name: album.genre_name,
      };
    }

    return albumsAcc;
  }, {});
}

function unwrapAlbums(albumsGrouped: TGroupedAlbumWrapped) {
  return Object.values(albumsGrouped)
    .map((album) => {
      if (album.genres !== undefined) {
        album.genres = Object.values(album.genres);
      }

      return album as TGroupedAlbum;
    })
    .reverse();
}

function transformAlbums(albums: TAlbum[]) {
  const albumsGrouped = albumsGroupBy(albums, "album_id");
  const albumsUnwrapped = unwrapAlbums(albumsGrouped);

  return albumsUnwrapped;
}

const tracksGroupBy = function (
  tracks: TTrack[],
  key: keyof TTrack = "audio_id"
) {
  return tracks.reduce(function (tracksAcc: TGroupedTrackWrapped, track) {
    const trackId = track["audio_id"];

    if (!(trackId in tracksAcc)) {
      tracksAcc[trackId] = {
        id: track.audio_id,
        title: track.audio_title,
        duration: track.duration,
        youtubeVideoId: track.youtubeVideoId,
      };
    }

    if (track.genre_id != null) {
      let genres = tracksAcc[trackId].genres;
      if (genres === undefined) genres = tracksAcc[trackId].genres = {};
      genres[track.genre_id] = {
        id: track.genre_id,
        name: track.genre_name,
      };
    }

    if (track.artist_id != null) {
      let artists = tracksAcc[trackId].artists;
      if (artists === undefined) artists = tracksAcc[trackId].artists = {};
      artists[track.artist_id] = {
        id: track.artist_id,
        name: track.name,
        image_id: track.image_id,
        domain_id: track.domain_id,
        domain_name: track.domain_name,
      };
    }

    if (track.album_image_id != null) {
      let albums = tracksAcc[trackId].albums;
      if (albums === undefined) albums = tracksAcc[trackId].albums = {};
      albums[track.album_id] = {
        album_id: track.album_id,
        domain_name: track.album_domain_name,
        domain_id: track.album_domain_id,
        image_id: track.album_image_id,
      };
    }

    return tracksAcc;
  }, {});
};

function unwrapTracks(albumsGrouped: TGroupedTrackWrapped) {
  return Object.values(albumsGrouped)
    .map((track) => {
      if (track.artists !== undefined) {
        track.artists = Object.values(track.artists);
      }
      if (track.genres !== undefined) {
        track.genres = Object.values(track.genres);
      }
      if (track.albums !== undefined) {
        track.albums = Object.values(track.albums);
      }

      return track as TGroupedTrack;
    })
    .reverse();
}

function transformTracks(tracks: TTrack[]) {
  const tracksGrouped = tracksGroupBy(tracks, "audio_id");
  const tracksUnwrapped = unwrapTracks(tracksGrouped);

  return tracksUnwrapped;
}

export { constructLink, transformAlbums, transformTracks };
