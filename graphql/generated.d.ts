/* eslint-disable */
import { FileUpload } from '@/graphql/types'
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: Promise<FileUpload>;
};


export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  currentUser: User;
  game?: Maybe<Game>;
  games?: Maybe<Array<Game>>;
  roll: Roll;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryGameArgs = {
  id: Scalars['ID'];
};


export type QueryGamesArgs = {
  userId: Scalars['ID'];
};


export type QueryRollArgs = {
  equation: Scalars['String'];
  verbose?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  login: LoginResponse;
  autoLogin?: Maybe<User>;
  createGame: Game;
  updateGame: Game;
  deleteGame: Game;
  addPlayerToGame: Game;
  removePlayerFromGame: Game;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationAutoLoginArgs = {
  token: Scalars['String'];
};


export type MutationCreateGameArgs = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  backgroundImage: Scalars['Upload'];
};


export type MutationUpdateGameArgs = {
  game: GameInput;
};


export type MutationDeleteGameArgs = {
  id: Scalars['ID'];
};


export type MutationAddPlayerToGameArgs = {
  gameId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationRemovePlayerFromGameArgs = {
  gameId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type Result = {
  __typename?: 'Result';
  result: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  ownedGames?: Maybe<Array<Game>>;
  games?: Maybe<Array<Game>>;
};

export type Game = {
  __typename?: 'Game';
  id: Scalars['ID'];
  owner: User;
  ownerId: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  lastGameDate?: Maybe<Scalars['String']>;
  nextGameDate?: Maybe<Scalars['String']>;
  backgroundUrl?: Maybe<Scalars['String']>;
  players?: Maybe<Array<User>>;
};

export type GameInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  lastGameDate?: Maybe<Scalars['String']>;
  nextGameDate?: Maybe<Scalars['String']>;
  backgroundImageFile?: Maybe<Scalars['Upload']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Roll = {
  __typename?: 'Roll';
  equation: Scalars['String'];
  result: Scalars['String'];
  tokens?: Maybe<Array<Token>>;
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
  isRoll: Scalars['Boolean'];
  rollResults?: Maybe<Array<Scalars['String']>>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

