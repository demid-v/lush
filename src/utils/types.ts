type Player = {
  h: HTMLIFrameElement;
  loadVideoById: (youtubeVideoId: string) => void;
  getPlayerState: () => YoutubePlayerEvent["data"];
  playVideo: () => void;
  pauseVideo: () => void;
};

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: {
        new (
          nodeId: string,
          options?: {
            height?: string;
            width?: string;
            origin?: string;
            events?: {
              onReady?: () => void;
              onStateChange?: (event: YoutubePlayerEvent) => void;
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

type ActiveTrack = { id: number; youtube_video_id: string };

export type { YoutubePlayerEvent, ActiveTrack };
