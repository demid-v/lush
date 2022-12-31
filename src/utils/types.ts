type ActiveTrack = { id: number; youtube_video_id: string } | null;

type Table = { name: string };

type TablePreview = Table & {
  where?: Record<string, number>[];
};

export type { ActiveTrack, Table, TablePreview };
