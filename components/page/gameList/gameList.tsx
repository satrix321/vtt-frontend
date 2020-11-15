import React from 'react'
import { connect } from 'react-redux'
import { Chip } from '../chip/chip'
import { State } from '../../../store/store'
import { ProfileState } from '../../../store/profile/reducer'
import styles from './gameList.module.scss'
import Link from 'next/link'
import { Cta } from '../cta/cta'
import { Column, Row } from '../grid/grid'

const GameListComponent: React.FunctionComponent<ProfileState> = (profile) => {
  const games = profile.games

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
                    <Link href="/inGame">
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

export const GameList = connect((state: State) => state.profile)(GameListComponent)
