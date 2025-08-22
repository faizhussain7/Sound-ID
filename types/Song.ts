export interface Song {
  name: string | null;
  artist: string | null;
  featuring_artists: string[] | null;
  album: string | null;
  release_date: string | null;
  genre: string | null;
  duration: string | null;
  language: string | null;
  description: string | null;
  link: {
    youtube: string | null;
    spotify: string | null;
    apple_music: string | null;
  } | null;
  is_cover: boolean;
  is_remix: boolean;
  year: number;
  albumArt: string | null;
  suggested_tracks:
    | { name: string; artist: string; youtube_link?: string }[]
    | null;
}
