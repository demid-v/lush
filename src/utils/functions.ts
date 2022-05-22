import type {
  TAlbum,
  TArtist,
  TGroupedAlbum,
  TGroupedAlbumWrapped,
  TGroupedArtist,
  TGroupedArtistkWrapped,
  TGroupedTrack,
  TGroupedTrackWrapped,
  TTrack,
} from "./types";

const constructLink = (str: string) =>
  str
    .split("")
    .map((char) =>
      ["?", "#"].includes(char) ? encodeURIComponent(char) : char
    )
    .join("")
    .replaceAll(" ", "+");

const tracksGroupBy = function (tracks: TTrack[]) {
  return tracks.reduce(function (tracksAcc: TGroupedTrackWrapped, track) {
    const trackId = track["track_id"];

    if (!(trackId in tracksAcc)) {
      tracksAcc[trackId] = {
        id: track.track_id,
        title: track.track_title,
        duration: track.duration,
        youtubeVideoId: track.youtubeVideoId,
      };
    }

    if (track.genre_id != null) {
      let genres =
        tracksAcc[trackId].genres || (tracksAcc[trackId].genres = {});
      genres[track.genre_id] = {
        id: track.genre_id,
        name: track.genre_name,
      };
    }

    if (track.artist_id != null) {
      let artists =
        tracksAcc[trackId].artists || (tracksAcc[trackId].artists = {});
      artists[track.artist_id] = {
        id: track.artist_id,
        name: track.name,
        image_id: track.image_id,
        domain_id: track.domain_id,
        domain_name: track.domain_name,
      };
    }

    if (track.album_image_id != null) {
      let albums =
        tracksAcc[trackId].albums || (tracksAcc[trackId].albums = {});
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
  const tracksGrouped = tracksGroupBy(tracks);
  const tracksUnwrapped = unwrapTracks(tracksGrouped);

  return tracksUnwrapped;
}

function artistsGroupBy(artists: TArtist[]) {
  return artists.reduce((artistsAcc: TGroupedArtistkWrapped, artist) => {
    const artistId = artist["artist_id"];

    if (!(artistId in artistsAcc)) {
      artistsAcc[artistId] = {
        id: artist.artist_id,
        name: artist.artist_name,
        domain_id: artist.artist_domain_id,
        domain_name: artist.artist_domain_name,
        image_id: artist.artist_image_id,
      };
    }

    if (artist.genre_id != null) {
      let genres = artistsAcc[artistId].genres;
      if (genres === undefined) genres = artistsAcc[artistId].genres = {};
      genres[artist.genre_id] = {
        id: artist.genre_id,
        name: artist.genre_name,
      };
    }

    return artistsAcc;
  }, {});
}

function unwrapArtists(artistsGrouped: TGroupedArtistkWrapped) {
  return Object.values(artistsGrouped)
    .map((artist) => {
      if (artist.genres !== undefined) {
        artist.genres = Object.values(artist.genres);
      }

      return artist as TGroupedArtist;
    })
    .reverse();
}

function transformArtists(artists: TArtist[]) {
  const artistsGrouped = artistsGroupBy(artists);
  const artistsUnwrapped = unwrapArtists(artistsGrouped);

  return artistsUnwrapped;
}

function albumsGroupBy(albums: TAlbum[]) {
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
  const albumsGrouped = albumsGroupBy(albums);
  const albumsUnwrapped = unwrapAlbums(albumsGrouped);

  return albumsUnwrapped;
}

export { constructLink, transformTracks, transformArtists, transformAlbums };
