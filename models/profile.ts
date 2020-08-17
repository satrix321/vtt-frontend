export type Game = {
  id: number,
  name: string,
  description: string,
  lastGameDate: string | null,
  nextGameDate: string | null,
  owner?: User,
  ownerId: number,
  players?: User[]
}

export type User = {
  id: number,
  email: string,
  username?: string,
  ownedGames?: Game[],
  games?: Game[]
}

export type LoginResponse = {
  token: string,
  user: User,
}