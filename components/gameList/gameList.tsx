import React from 'react'
import { Game } from '../../models/game'
import { connect } from 'react-redux'
import { Row, Column } from '../../components/grid/grid'
import Chip from '../../components/chip/chip'
import './gameList.scss'

const GameList: React.FunctionComponent<any> = ({ profile }) => {
  const games = profile.games

  return (
    <div>
      <h1>List of Games</h1>
      {games.map((game: Game) => (
        <div data-id={game.gameId} key={game.gameId} className="game">
          <Row>
            <Column cols="12" md="4">
              <picture className="image">
                <img src="/fantasy-2847724_1920.jpg" alt="game image" />
              </picture>
            </Column>
            <Column cols="12" md="8">
              <div className="headers-section">
                <h3 className="title">{game.name}</h3>
                <p>Start Game</p>
              </div>
              <div className="players-section">
                <h4 className="title">Players:</h4>
                <div className="players">
                  <Chip>Chip1</Chip>
                  <Chip>Chip2</Chip>
                  <Chip>Chip3</Chip>
                </div>
              </div>
              <div className="dates-section">
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

export default connect(state => state)(GameList)