export default {
  state() {
    return {
      game: null,
      error: null,
      playerMode: '2P',
      gameHistory: []
    }
  },
  mutations: {
    setGame(state, game) {
      state.game = game
    },
    setError(state, message) {
      state.error = message
    },
    setPlayerMode(state, mode) {
      state.playerMode = mode
    },
    setGameHistory(state, gameHistory) {
      state.gameHistory = gameHistory
    }
  }
}
