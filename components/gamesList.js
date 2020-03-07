import { connect } from 'react-redux';

const GamesList = ({ profile }) => {
  const games = profile.games;

  return (
    <div>
      <h1>Games</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {games.map(game => (
            <tr key={game.gameId}>
              <td>{game.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default connect(state => state)(GamesList)