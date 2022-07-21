<template>
  <div style="margin-bottom: 20px">
    <h4>Mode:</h4>
    <label>
      <input type="radio" v-model="player" value="2P" />
      Two-Player
    </label>
    <label>
      <input type="radio" v-model="player" value="AI" />
      Against AI
    </label>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const player = ref('2P')

    watch(player, value => {
        store.commit('setPlayerMode', value)
    })

    return {
      player,
      store
    }
  }
}
</script>

<style scoped>
h4 {
    margin-bottom: 10px;
}
</style>