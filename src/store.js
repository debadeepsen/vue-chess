export default {
  state() {
    return {
      error: null,
      playerMode: '2P',
      gameHistory: []
    }
  },
  mutations: {
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
