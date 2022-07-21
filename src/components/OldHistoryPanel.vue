<template>
  <!-- <p style="max-width:400px;overflow-y:auto">{{ ist() }}</p> -->
  <div class="panel">
    <div v-for="(h, i) in hh" :key="i">
      {{ h.configuration.turn }}: {{ getFormattedMove(h) }}
    </div>
  </div>
</template>

<script>
import { getFormattedMove } from '@/lib/lib'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
// import { computed, watch } from '@vue/runtime-core'
export default {
  methods: {
    forceUpdate() {
      this.$forceUpdate()
    },
    ist() {
      return this.$store.state
    }
  },

  setup() {
    const store = useStore()
    const hh = ref([])
    // const history = computed(() => store.state.history)
    // watch(history, (value) => {
    //   console.log({ newHistory: value })
    // })

    onMounted(() => {
      setInterval(() => {
        hh.value = store.state.gameHistory
      }, 450)
    })
    return {
      hh,
      getFormattedMove,
      store
    }
  }
}
</script>

<style scoped>
.panel {
  padding: 20px;
}
</style>
