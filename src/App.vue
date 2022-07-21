<template>
  <div>
    <div class="error" v-show="storedError">{{ storedError }}</div>
    <main>
      <player-switcher></player-switcher>
      <chess-board></chess-board>
    </main>
  </div>
</template>

<script>
import { computed, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import ChessBoard from './components/ChessBoard'
import PlayerSwitcher from './components/PlayerSwitcher.vue'
export default {
  name: 'App',

  components: {
    ChessBoard,
    PlayerSwitcher
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
