<template>
  <div>
    <pre v-if="false">
    {{ JSON.stringify(board, null, 2) }}
    </pre>
    <div class="chess-board">
      <div v-for="rank in board" :key="rank.row">
        <button
          v-for="box in rank.boxes"
          :key="box.file + rank.row"
          :class="'square ' + box.color"
          :data-box="box.file.toUpperCase() + rank.row"
          :style="{
            color: box.color === 'light' ? '#222' : '#eee'
          }"
        >
          <img :src="box.piece ? require(`../assets/pieces/${box.piece}.svg`) : ''" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { startFEN } from '@/lib/constants'
import { initBoard } from '@/lib/lib'
const jsChessEngine = require('js-chess-engine')

const game = new jsChessEngine.Game()
game.moves()

const board = ref([])

initBoard(board, jsChessEngine.status(startFEN))

onMounted(() => {
  console.log(board.value)
  console.log(jsChessEngine.status(startFEN))
})
</script>

<style scoped>
.chess-board {
  display: flex;
  flex-direction: column-reverse;
}

.square {
  width: 60px;
  height: 60px;
  border: 0;
  position: relative;
}

.square::before {
  content: attr(data-box);
  position: absolute;
  left: 4px;
  top: 4px;
  font-size: 0.6rem;
  font-weight: 600;
}

.light {
  background: tan;
}

.dark {
  background: saddlebrown;
}
</style>
