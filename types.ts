
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: string;
  genre?: string;
  fullDescription?: string;
  organizer?: {
    name: string;
    avatar: string;
    bio: string;
  };
  location?: string;
  dateTime?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  tracks: Track[];
  isFeatured?: boolean;
}

export enum ViewType {
  HOME = 'HOME',
  EXPLORE = 'EXPLORE',
  PLAYLISTS = 'PLAYLISTS',
  FAVORITES = 'FAVORITES',
  SEARCH = 'SEARCH',
  SETTINGS = 'SETTINGS',
  PLAYLIST_DETAIL = 'PLAYLIST_DETAIL',
  CREATE_EVENT = 'CREATE_EVENT'
}
