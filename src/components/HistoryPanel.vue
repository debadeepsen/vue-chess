<template>
  <!-- <p style="max-width:400px;overflow-y:auto">{{ ist() }}</p> -->
  <div class="panel">
    <div v-for="(h, i) in gameHistory" :key="i">
      {{ h.configuration.turn }}: {{ getFormattedMove(h) }}
    </div>
  </div>
</template>

<script>
import { getFormattedMove } from '@/lib/lib'
export default {
  props: ['gameHistory'],
  setup() {
    return {
      getFormattedMove
    }
  }
}
</script>

<style scoped>
.panel {
  padding: 20px;
}
</style>
