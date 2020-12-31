import { Chip } from '@/components/page/chip/chip'
import { Cta } from '@/components/page/cta/cta'
import { Column, Row } from '@/components/page/grid/grid'
import { State } from '@/store/store'
import { gql, useQuery } from '@apollo/client'
import { GameGetPayload } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import styles from './gameList.module.scss'

type Game = GameGetPayload<{
  include: {
    players: true
    owner: true
  }
}>

const GET_GAMES = gql`
  query GetGames($userId: ID!) {
    games(userId: $userId) {
      id
      name
      ownerId
      description
      lastGameDate
      nextGameDate
      backgroundUrl
      players {
        id
        username
      }
    }
  }
`

export const GameList: React.FunctionComponent = () => {
  const userId = useSelector((state: State) => state.profile.user?.id)
  const { loading, data } = useQuery(GET_GAMES, {
    variables: { userId: userId },
  })

  if (loading) {
    return <></>
  }

  const games = data.games as Game[]

  return (
    <div>
      <div className={styles['list-header']}>
        <h1 className={styles['title']}>List of Games</h1>
        <div className={styles['actions']}>
          <Cta small href="/createGame">
            CREATE NEW GAME
          </Cta>
          <Cta small href="#">
            JOIN GAME
          </Cta>
        </div>
      </div>
      <Row>
        {games.map((game) => (
          <Column cols="12" sm="6" md="4" key={game.id}>
            <div data-id={game.id} key={game.id} className={styles.game}>
              <picture className={styles.image}>
                <img src={game.backgroundUrl ? game.backgroundUrl : '/fantasy-2847724_1920.jpg'} alt="game image" />
              </picture>
              <div className={styles.content}>
                <div className={styles['headers-section']}>
                  <h3 className={styles.title}>
                    <Link href="/game/[id]" as={`/game/${game.id}`}>
                      <a>{game.name}</a>
                    </Link>
                  </h3>
                </div>
                <div className={styles['players-section']}>
                  <h4 className={styles.title}>
                    <strong>Players:</strong>
                  </h4>
                  <div className={styles.players}>
                    {game.players?.map((player) => (
                      <Chip data-id={player.id} key={player.id}>
                        {player.username}
                      </Chip>
                    ))}
                  </div>
                </div>
                <div className={styles['dates-section']}>
                  <p className={styles['last-game-date']}>Last Played: {game.lastGameDate ?? 'Not Played'}</p>
                  <p className={styles['next-game-date']}>Next Game: {game.nextGameDate ?? 'Not Scheduled'}</p>
                </div>
              </div>
            </div>
          </Column>
        ))}
      </Row>
    </div>
  )
}
