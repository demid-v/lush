import { relations } from "drizzle-orm/relations";
import {
  domain,
  albumImage,
  artistImage,
  playlistImage,
  albumFormat,
  album,
  version,
  track,
  albumImageRel,
  artistImageRel,
  artist,
  playlistImageRel,
  playlist,
  trackAlbumRel,
  trackArtistRel,
  artistRole,
  trackGenreRel,
  genre,
  trackLanguageRel,
  language,
  trackPlaylistRel,
} from "./schema";

export const albumImageRelations = relations(albumImage, ({ one, many }) => ({
  domain: one(domain, {
    fields: [albumImage.domain_id],
    references: [domain.id],
  }),
  album_image_rels: many(albumImageRel),
}));

export const domainRelations = relations(domain, ({ many }) => ({
  album_images: many(albumImage),
  artist_images: many(artistImage),
  playlist_images: many(playlistImage),
}));

export const artistImageRelations = relations(artistImage, ({ one, many }) => ({
  domain: one(domain, {
    fields: [artistImage.domain_id],
    references: [domain.id],
  }),
  artist_image_rels: many(artistImageRel),
}));

export const playlistImageRelations = relations(
  playlistImage,
  ({ one, many }) => ({
    domain: one(domain, {
      fields: [playlistImage.domain_id],
      references: [domain.id],
    }),
    playlist_image_rels: many(playlistImageRel),
  })
);

export const albumRelations = relations(album, ({ one, many }) => ({
  album_format: one(albumFormat, {
    fields: [album.album_format_id],
    references: [albumFormat.id],
  }),
  album_image_rels: many(albumImageRel),
  track_album_rels: many(trackAlbumRel),
}));

export const albumFormatRelations = relations(albumFormat, ({ many }) => ({
  albums: many(album),
}));

export const trackRelations = relations(track, ({ one, many }) => ({
  version: one(version, {
    fields: [track.version_id],
    references: [version.id],
  }),
  track_album_rels: many(trackAlbumRel),
  track_artist_rels: many(trackArtistRel),
  track_genre_rels: many(trackGenreRel),
  track_language_rels: many(trackLanguageRel),
  track_playlist_rels: many(trackPlaylistRel),
}));

export const versionRelations = relations(version, ({ many }) => ({
  tracks: many(track),
}));

export const albumImageRelRelations = relations(albumImageRel, ({ one }) => ({
  album: one(album, {
    fields: [albumImageRel.album_id],
    references: [album.id],
  }),
  album_image: one(albumImage, {
    fields: [albumImageRel.image_id],
    references: [albumImage.id],
  }),
}));

export const artistImageRelRelations = relations(artistImageRel, ({ one }) => ({
  artist_image: one(artistImage, {
    fields: [artistImageRel.image_id],
    references: [artistImage.id],
  }),
  artist: one(artist, {
    fields: [artistImageRel.artist_id],
    references: [artist.id],
  }),
}));

export const artistRelations = relations(artist, ({ many }) => ({
  artist_image_rels: many(artistImageRel),
  track_artist_rels: many(trackArtistRel),
}));

export const playlistImageRelRelations = relations(
  playlistImageRel,
  ({ one }) => ({
    playlist_image: one(playlistImage, {
      fields: [playlistImageRel.image_id],
      references: [playlistImage.id],
    }),
    playlist: one(playlist, {
      fields: [playlistImageRel.playlist_id],
      references: [playlist.id],
    }),
  })
);

export const playlistRelations = relations(playlist, ({ many }) => ({
  playlist_image_rels: many(playlistImageRel),
  track_playlist_rels: many(trackPlaylistRel),
}));

export const trackAlbumRelRelations = relations(trackAlbumRel, ({ one }) => ({
  album: one(album, {
    fields: [trackAlbumRel.album_id],
    references: [album.id],
  }),
  track: one(track, {
    fields: [trackAlbumRel.track_id],
    references: [track.id],
  }),
}));

export const trackArtistRelRelations = relations(trackArtistRel, ({ one }) => ({
  track: one(track, {
    fields: [trackArtistRel.track_id],
    references: [track.id],
  }),
  artist_role: one(artistRole, {
    fields: [trackArtistRel.artist_role_id],
    references: [artistRole.id],
  }),
  artist: one(artist, {
    fields: [trackArtistRel.artist_id],
    references: [artist.id],
  }),
}));

export const artistRoleRelations = relations(artistRole, ({ many }) => ({
  track_artist_rels: many(trackArtistRel),
}));

export const trackGenreRelRelations = relations(trackGenreRel, ({ one }) => ({
  track: one(track, {
    fields: [trackGenreRel.track_id],
    references: [track.id],
  }),
  genre: one(genre, {
    fields: [trackGenreRel.genre_id],
    references: [genre.id],
  }),
}));

export const genreRelations = relations(genre, ({ many }) => ({
  track_genre_rels: many(trackGenreRel),
}));

export const trackLanguageRelRelations = relations(
  trackLanguageRel,
  ({ one }) => ({
    track: one(track, {
      fields: [trackLanguageRel.track_id],
      references: [track.id],
    }),
    language: one(language, {
      fields: [trackLanguageRel.language_id],
      references: [language.id],
    }),
  })
);

export const languageRelations = relations(language, ({ many }) => ({
  track_language_rels: many(trackLanguageRel),
}));

export const trackPlaylistRelRelations = relations(
  trackPlaylistRel,
  ({ one }) => ({
    track: one(track, {
      fields: [trackPlaylistRel.track_id],
      references: [track.id],
    }),
    playlist: one(playlist, {
      fields: [trackPlaylistRel.playlist_id],
      references: [playlist.id],
    }),
  })
);
