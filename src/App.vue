<template>
  <div>
    <div class="error" v-show="storedError">{{ storedError }}</div>
    <main>
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
import ChessBoard from './components/ChessBoard'
import PlayerSwitcher from './components/PlayerSwitcher.vue'
import HistoryPanel from './components/HistoryPanel.vue'
export default {
  name: 'App',

  components: {
    ChessBoard,
    PlayerSwitcher,
    HistoryPanel
  },

  setup() {
    const store = useStore()
    const storedError = computed(() => store.state.error)

    watch(storedError, (value) => {
      if (value) {
        setTimeout(() => {
          store.commit('setError', null)
        }, 3000)
      }
    })

    return {
      storedError
    }
  }
}
</script>

<style>
@import url('./assets/app.css');
</style>
