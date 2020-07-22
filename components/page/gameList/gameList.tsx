import React from 'react'
import { Game } from '../../../models/profile'
import { connect } from 'react-redux'
import { Row, Column } from '../grid/grid'
import { Chip } from '../chip/chip'
import { State } from '../../../store/store'
import { ProfileState } from '../../../store/profile/reducer'
import styles from './gameList.module.scss'

const GameListComponent: React.FunctionComponent<ProfileState> = (profile) => {
  const games = profile.games

  return (
    <div>
      <h1>List of Games</h1>
      {games.map((game: Game) => (
        <div data-id={game.gameId} key={game.gameId} className={styles.game}>
          <Row>
            <Column cols="12" md="4">
              <picture className={styles.image}>
                <img src="/fantasy-2847724_1920.jpg" alt="game image" />
              </picture>
            </Column>
            <Column cols="12" md="8">
              <div className={styles['headers-section']}>
                <h3 className={styles.title}>{game.name}</h3>
                <p>Start Game</p>
              </div>
              <div className={styles['players-section']}>
                <h4 className={styles.title}>Players:</h4>
                <div className={styles.players}>
                  <Chip>Chip1</Chip>
                  <Chip>Chip2</Chip>
                  <Chip>Chip3</Chip>
                </div>
              </div>
              <div className={styles['dates-section']}>
                <p>Last Played: {game.lastGameDate ?? 'Not Played'}</p>
                <p>Next Game: {game.nextGameDate ?? 'Not Scheduled'}</p>
              </div>
            </Column>
          </Row>
        </div>
      ))}
    </div>
  )
}

export const GameList = connect((state: State) => state.profile)(GameListComponent)