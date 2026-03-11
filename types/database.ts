export interface Profile {
  id: string;
  username: string;
  avatar_url?: string;
  bio?: string;
  genre_preferences?: string[];
  online_status?: boolean;
  updated_at?: string;
}

export interface WatchParty {
  id: string;
  host_id: string;
  media_id: string;
  media_type: 'movie' | 'tv';
  media_title: string;
  media_poster?: string;
  status: 'waiting' | 'playing' | 'paused' | 'ended';
  current_time: number;
  created_at: string;
  started_at?: string;
}

export interface WatchPartyParticipant {
  id: string;
  party_id: string;
  user_id: string;
  joined_at: string;
}

export interface Message {
  id: string;
  room_id: string;
  user_id: string;
  content: string;
  parent_message_id?: string;
  created_at: string;
  profile?: Profile;
}

export interface Reaction {
  id: string;
  message_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
}

export interface WatchProgress {
  user_id: string;
  media_id: string;
  media_type: 'movie' | 'tv';
  progress_seconds: number;
  total_seconds: number;
  is_finished: boolean;
  updated_at: string;
}

export interface Watchlist {
  id: string;
  user_id: string;
  media_id: string;
  media_type: 'movie' | 'tv';
  media_title: string;
  media_poster?: string;
  added_at: string;
}

export interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  friend?: Profile;
}

export interface Reminder {
  id: string;
  user_id: string;
  media_id: string;
  media_type: 'movie' | 'tv';
  remind_at: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Media {
  id: string;
  title: string;
  type: 'movie' | 'tv';
  poster?: string;
  backdrop?: string;
  overview?: string;
  rating?: number;
  release_date?: string;
  genres?: string[];
}
