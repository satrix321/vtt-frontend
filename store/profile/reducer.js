const initialState = {
  games: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'REQUEST_GAMES_PENDING':
      return {
        ...state,
        games: [],
      }
    case 'REQUEST_GAMES_REJECTED':
      return {
        ...state,
        games: [],
      }
    case 'REQUEST_GAMES_FULFILLED':
      return {
        ...state,
        games: action.payload,
      }
    default:
      return state
  }
}