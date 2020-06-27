export type Game = {
  gameId: number,
  name: string,
  description: string,
  lastGameDate: string | null,
  nextGameDate: string | null,
}

export type User = {
  id: Number,
  email: string,
  username?: string,
}