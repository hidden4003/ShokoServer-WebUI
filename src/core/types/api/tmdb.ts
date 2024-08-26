import type { MatchRatingType } from '@/core/types/api/episode';

export type TmdbEpisodeType = {
  ID: number;
  SeasonID: string;
  ShowID: number;
  Title: string;
  Overview: string;
  EpisodeNumber: number;
  SeasonNumber: number;
};

export type TmdbBaseItemType = {
  ID: number;
  Title: string;
  Overview: string;
};

export type TmdbMovieType = TmdbBaseItemType;

export type TmdbShowType = TmdbBaseItemType;

export type TmdbXrefType = {
  AnidbAnimeID: number;
  AnidbEpisodeID?: number;
};

export type TmdbEpisodeXRefType = {
  AnidbEpisodeID: number;
  TmdbShowID: number;
  TmdbEpisodeID?: number;
  Index: number;
  Rating: MatchRatingType;
} & TmdbXrefType;

export type TmdbMovieXRefType = {
  TmdbMovieID: number;
} & TmdbXrefType;
