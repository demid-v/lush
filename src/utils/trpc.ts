import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";

import type { AppRouter } from "../server/trpc/router/_app";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      abortOnUnmount: true,
    };
  },
  ssr: false,
});

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;

type TracksData = RouterOutputs["tracks"]["getTracks"];
type TrackData = TracksData[0];

type ArtistsData = RouterOutputs["artists"]["getArtists"];
type ArtistData = ArtistsData[0];

type AlbumsData = RouterOutputs["albums"]["getAlbums"];
type AlbumData = AlbumsData[0];

type PlaylistsData = RouterOutputs["playlists"]["getPlaylists"];
type PlaylistData = PlaylistsData[0];

type AttachedImage =
  RouterOutputs["artists"]["getArtists"][0]["artist_image_rel"][0]["artist_image"];

type ArtistsGetter = typeof trpc.artists.getArtists;
type TracksGetter = typeof trpc.tracks.getTracks;
type AlbumsGetter = typeof trpc.albums.getAlbums;
type PlaylistsGetter = typeof trpc.playlists.getPlaylists;

type ContentGetter =
  | TracksGetter
  | ArtistsGetter
  | AlbumsGetter
  | PlaylistsGetter;

export type {
  TracksData,
  TrackData,
  ArtistsData,
  ArtistData,
  PlaylistsData,
  PlaylistData,
  AlbumsData,
  AlbumData,
  AttachedImage,
  ContentGetter,
};
