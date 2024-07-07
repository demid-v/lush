import type { RouterOutputs, trpc } from "./trpc";

type ActiveTrack = { id: number; youtube_video_id: string };

type TracksData = RouterOutputs["tracks"]["getTracks"]["tracks"];
type TrackData = TracksData[0];

type ArtistsData = RouterOutputs["artists"]["getArtists"];
type ArtistData = ArtistsData[0];

type AlbumsData = RouterOutputs["albums"]["getAlbums"];
type AlbumData = AlbumsData[0];

type PlaylistsData = RouterOutputs["playlists"]["getPlaylists"];
type PlaylistData = PlaylistsData[0];

type Data = TracksData | ArtistsData | AlbumsData | PlaylistsData;
type DataUnit = TrackData | ArtistData | AlbumData | PlaylistData;

type AttachedImage =
  RouterOutputs["artists"]["getArtists"][0]["artist_image_rel"][0]["artist_image"];

type TracksProcedure = typeof trpc.tracks.getTracks;
type ArtistsProcedure = typeof trpc.artists.getArtists;
type AlbumsProcedure = typeof trpc.albums.getAlbums;
type PlaylistsProcedure = typeof trpc.playlists.getPlaylists;

type ContentProcedure =
  | TracksProcedure
  | ArtistsProcedure
  | AlbumsProcedure
  | PlaylistsProcedure;

export type {
  ActiveTrack,
  TracksData,
  TrackData,
  ArtistsData,
  ArtistData,
  PlaylistsData,
  PlaylistData,
  AlbumsData,
  AlbumData,
  Data,
  DataUnit,
  AttachedImage,
  ContentProcedure,
};
