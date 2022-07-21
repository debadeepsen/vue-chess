<template>
  <div>
    <div class="error" v-show="storedError">{{ storedError }}</div>
    <main>
      <chess-board></chess-board>
    </main>
  </div>
</template>

<script>
import { computed, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import ChessBoard from './components/ChessBoard'
export default {
  name: 'App',

  components: {
    ChessBoard
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
