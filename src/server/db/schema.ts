import { sql } from "drizzle-orm";
import {
  index,
  integer,
  numeric,
  primaryKey,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const albumFormat = sqliteTable(
  "album_format",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name", { length: 45 }).notNull(),
  },
  (table) => {
    return {
      name_UNIQUE: uniqueIndex("name_UNIQUE").on(table.name),
    };
  },
);

export const artistRole = sqliteTable("artist_role", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 50 }).notNull(),
});

export const domain = sqliteTable("domain", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 261 }).notNull(),
});

export const genre = sqliteTable("genre", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 200 }).notNull(),
  deleted: integer("deleted").default(0).notNull(),
});

export const language = sqliteTable("language", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 50 }).notNull(),
});

export const version = sqliteTable(
  "version",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name", { length: 100 }).notNull(),
  },
  (table) => {
    return {
      content_UNIQUE: uniqueIndex("content_UNIQUE").on(table.name),
    };
  },
);

export const albumImage = sqliteTable(
  "album_image",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    domain_id: integer("domain_id")
      .notNull()
      .references(() => domain.id),
    image_id: text("image_id", { length: 32 }).notNull(),
    r: integer("r").default(0).notNull(),
    g: integer("g").default(0).notNull(),
    b: integer("b").default(0).notNull(),
    deleted: integer("deleted").default(0).notNull(),
  },
  (table) => {
    return {
      domain_id_INDEX: index("domain_id_INDEX").on(table.domain_id),
    };
  },
);

export const artistImage = sqliteTable("artist_image", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  domain_id: integer("domain_id")
    .notNull()
    .references(() => domain.id),
  image_id: text("image_id", { length: 33 }).notNull(),
  r: integer("r").default(0).notNull(),
  g: integer("g").default(0).notNull(),
  b: integer("b").default(0).notNull(),
  deleted: integer("deleted").default(0).notNull(),
});

export const playlistImage = sqliteTable(
  "playlist_image",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    domain_id: integer("domain_id")
      .notNull()
      .references(() => domain.id),
    image_id: text("image_id", { length: 32 }).notNull(),
    r: integer("r").default(0).notNull(),
    g: integer("g").default(0).notNull(),
    b: integer("b").default(0).notNull(),
    deleted: integer("deleted").default(0).notNull(),
  },
  (table) => {
    return {
      domain_id_idx: index("domain_id_idx").on(table.domain_id),
    };
  },
);

export const album = sqliteTable(
  "album",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name", { length: 5000 }).notNull(),
    description: text("description"),
    release_day: integer("release_day"),
    release_month: integer("release_month"),
    release_year: integer("release_year"),
    last_fm_mbid: text("last_fm_mbid", { length: 32 }),
    has_last_fm_mbid: integer("has_last_fm_mbid"),
    album_format_id: integer("album_format_id")
      .default(1)
      .notNull()
      .references(() => albumFormat.id),
    deleted: integer("deleted").default(0).notNull(),
  },
  (table) => {
    return {
      id_UNIQUE: uniqueIndex("id_UNIQUE").on(table.id),
      album_format_id_INDEX: index("album_album_format_id_INDEX").on(
        table.album_format_id,
      ),
    };
  },
);

export const artist = sqliteTable("artist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 500 }).notNull(),
  description: text("description"),
  first_listen_date: numeric("first_listen_date")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  last_fm_mbid: text("last_fm_mbid", { length: 32 }),
  deleted: integer("deleted").default(0).notNull(),
});

export const playlist = sqliteTable("playlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 5000 }).notNull(),
  description: text("description"),
  deleted: integer("deleted").default(0).notNull(),
});

export const track = sqliteTable(
  "track",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name", { length: 5000 }),
    duration: real("duration"),
    lyrics: text("lyrics"),
    description: text("description"),
    last_fm_mbid: text("last_fm_mbid", { length: 32 }),
    youtube_video_id: text("youtube_video_id", { length: 11 }),
    has_youtube_video_id: integer("has_youtube_video_id"),
    upload_date: numeric("upload_date").default(sql`(CURRENT_TIMESTAMP)`),
    version_id: integer("version_id")
      .default(1)
      .notNull()
      .references(() => version.id),
    explicit: integer("explicit").default(0).notNull(),
    deleted: integer("deleted").default(0).notNull(),
  },
  (table) => {
    return {
      version_id_INDEX: index("version_id_INDEX").on(table.version_id),
    };
  },
);

export const albumImageRel = sqliteTable(
  "album_image_rel",
  {
    image_id: integer("image_id")
      .notNull()
      .references(() => albumImage.id),
    album_id: integer("album_id")
      .notNull()
      .references(() => album.id),
    is_cover: integer("is_cover").default(1).notNull(),
  },
  (table) => {
    return {
      album_id_INDEX: index("album_id_INDEX").on(table.album_id),
      pk0: primaryKey({
        columns: [table.album_id, table.image_id],
        name: "album_image_rel_album_id_image_id_pk",
      }),
    };
  },
);

export const artistImageRel = sqliteTable(
  "artist_image_rel",
  {
    image_id: integer("image_id")
      .notNull()
      .references(() => artistImage.id, { onUpdate: "restrict" }),
    artist_id: integer("artist_id")
      .notNull()
      .references(() => artist.id),
    is_cover: integer("is_cover").default(1).notNull(),
  },
  (table) => {
    return {
      image_id_INDEX: index("image_id_INDEX").on(table.image_id),
      artist_id_INDEX: index("artist_id_INDEX").on(table.artist_id),
      pk0: primaryKey({
        columns: [table.artist_id, table.image_id],
        name: "artist_image_rel_artist_id_image_id_pk",
      }),
    };
  },
);

export const playlistImageRel = sqliteTable(
  "playlist_image_rel",
  {
    image_id: integer("image_id")
      .notNull()
      .references(() => playlistImage.id),
    playlist_id: integer("playlist_id")
      .notNull()
      .references(() => playlist.id),
    is_cover: integer("is_cover").default(1).notNull(),
  },
  (table) => {
    return {
      playlist_id_INDEX: index("playlist_id_INDEX").on(table.playlist_id),
      pk0: primaryKey({
        columns: [table.image_id, table.playlist_id],
        name: "playlist_image_rel_image_id_playlist_id_pk",
      }),
    };
  },
);

export const trackAlbumRel = sqliteTable(
  "track_album_rel",
  {
    track_id: integer("track_id")
      .notNull()
      .references(() => track.id),
    album_id: integer("album_id")
      .notNull()
      .references(() => album.id),
    track_position: integer("track_position").default(1).notNull(),
  },
  (table) => {
    return {
      track_id_INDEX: index("track_id_INDEX").on(table.track_id),
      pk0: primaryKey({
        columns: [table.album_id, table.track_id, table.track_position],
        name: "track_album_rel_album_id_track_id_track_position_pk",
      }),
    };
  },
);

export const trackArtistRel = sqliteTable(
  "track_artist_rel",
  {
    track_id: integer("track_id")
      .notNull()
      .references(() => track.id),
    artist_id: integer("artist_id")
      .notNull()
      .references(() => artist.id),
    artist_role_id: integer("artist_role_id")
      .default(1)
      .notNull()
      .references(() => artistRole.id),
    artist_position: integer("artist_position").default(1).notNull(),
  },
  (table) => {
    return {
      id_INDEX: index("id_INDEX").on(table.artist_role_id),
      pk0: primaryKey({
        columns: [table.artist_id, table.track_id],
        name: "track_artist_rel_artist_id_track_id_pk",
      }),
    };
  },
);

export const trackGenreRel = sqliteTable(
  "track_genre_rel",
  {
    track_id: integer("track_id")
      .notNull()
      .references(() => track.id),
    genre_id: integer("genre_id")
      .notNull()
      .references(() => genre.id),
    genre_position: integer("genre_position").default(1).notNull(),
  },
  (table) => {
    return {
      genre_id_INDEX: index("genre_id_INDEX").on(table.genre_id),
      pk0: primaryKey({
        columns: [table.genre_id, table.track_id],
        name: "track_genre_rel_genre_id_track_id_pk",
      }),
    };
  },
);

export const trackLanguageRel = sqliteTable(
  "track_language_rel",
  {
    track_id: integer("track_id")
      .notNull()
      .references(() => track.id),
    language_id: integer("language_id")
      .notNull()
      .references(() => language.id),
  },
  (table) => {
    return {
      language_id_INDEX: index("language_id_INDEX").on(table.language_id),
      pk0: primaryKey({
        columns: [table.language_id, table.track_id],
        name: "track_language_rel_language_id_track_id_pk",
      }),
    };
  },
);

export const trackPlaylistRel = sqliteTable(
  "track_playlist_rel",
  {
    track_id: integer("track_id")
      .notNull()
      .references(() => track.id),
    playlist_id: integer("playlist_id")
      .notNull()
      .references(() => playlist.id),
    track_position: integer("track_position").notNull(),
  },
  (table) => {
    return {
      pk0: primaryKey({
        columns: [table.playlist_id, table.track_id],
        name: "track_playlist_rel_playlist_id_track_id_pk",
      }),
    };
  },
);
