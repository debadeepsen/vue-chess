<template>
  <div>
    <pre v-if="false">
    {{ JSON.stringify(allowedMoves, null, 2) }}
    </pre>
    <div class="chess-board">
      <div v-for="rank in board" :key="rank.row">
        <button
          v-for="box in rank.boxes"
          :key="box.key"
          :class="'square ' + box.color + (isInAllowedMoves(box.key) ? ' allowed' : '')"
          :data-box="box.key"
          @click="showMoves(box.key)"
          :style="{
            color: box.color === 'light' ? '#222' : '#eee'
          }"
        >
          <img
            v-show="box.piece"
            :src="box.piece ? require(`../assets/pieces/${box.piece}.svg`) : ''"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { startFEN } from '@/lib/constants'
import { initBoard } from '@/lib/lib'
const jsChessEngine = require('js-chess-engine')

export default {
  setup() {
    const game = new jsChessEngine.Game()
    game.moves()

    // state
    const board = ref([])
    const allowedMoves = ref([])

    // initialization
    initBoard(board, jsChessEngine.status(startFEN))

    // methods
    const showMoves = (fromSquare) => {
      allowedMoves.value = game.moves(fromSquare)
      // console.log(allowedMoves)
    }

    const isInAllowedMoves = (square) => allowedMoves.value.includes(square)

    return {
      board,
      allowedMoves,
      showMoves,
      isInAllowedMoves
    }
  }
}
</script>

<style scoped>
.chess-board {
  display: flex;
  flex-direction: column-reverse;
  border: 1px solid #444;
  width: fit-content;
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

.allowed {
  box-shadow: inset 0px 0px 0px 30px #0f04;
  /* transition: all 0.2s; */
}

.light {
  background: tan;
}

.dark {
  background: saddlebrown;
}
</style>
