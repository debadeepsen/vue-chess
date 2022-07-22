<template>
  <div>
    <div class="error" v-show="storedError">{{ storedError }}</div>
    <main>
      <button class="new-game" @click="startNewGame">New Game</button>
      <player-switcher />
      <div class="f-row">
        <chess-board />
        <history-panel />
      </div>
    </main>
  </div>
</template>

<script>
import { computed, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
const jsChessEngine = require('js-chess-engine')
import ChessBoard from './components/ChessBoard'
import PlayerSwitcher from './components/PlayerSwitcher'
import HistoryPanel from './components/HistoryPanel'
export default {
  name: 'App',

  components: {
    ChessBoard,
    PlayerSwitcher,
    HistoryPanel
  },

  setup() {
    document.title = 'Chess'

    const store = useStore()
    const storedError = computed(() => store.state.error)

    watch(storedError, (value) => {
      if (value) {
        setTimeout(() => {
          store.commit('setError', null)
        }, 3000)
      }
    })

    let game = new jsChessEngine.Game()
    store.commit('setGame', game)

    const startNewGame = () => {
      game = new jsChessEngine.Game()
      store.commit('setGame', game)
    }

    return {
      storedError,
      startNewGame
    }
  }
}
</script>

<style>
@import url('./assets/app.css');
</style>
