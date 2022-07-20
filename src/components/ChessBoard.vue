<template>
  <div>
    <pre v-if="false">
    {{ JSON.stringify(allowedMoves, null, 2) }}
    </pre>
    <div class="error">{{ error }}</div>
    <div class="chess-board">
      <div class="rank-row" v-for="rank in board" :key="rank.row">
        <button
          v-for="box in rank.boxes"
          :key="box.key"
          :class="
            'square ' +
            box.color +
            (isInAllowedMoves(box.key) ? ' allowed' : '')
          "
          :data-box="box.key"
          @click="showOrMove(box.key)"
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
    <div>
      <ul>
        <li v-for="(h,i) in history" :key="i">
          {{ h.configuration.turn }}: {{ h.configuration.pieces[h.from] + h.to.toLowerCase() }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { startFEN } from '@/lib/constants'
import { /*hasPiece,*/ initBoard } from '@/lib/lib'
const jsChessEngine = require('js-chess-engine')

export default {
  setup() {
    const game = new jsChessEngine.Game()
    game.moves()

    // state
    const board = ref([])
    const allowedMoves = ref([])
    const error = ref('')
    const history = ref([])

    // private
    let previousSquare = null

    // initialization
    initBoard(board, jsChessEngine.status(startFEN))

    // methods
    const isInAllowedMoves = (square) => allowedMoves.value.includes(square)

    const showOrMove = (selectedSquare) => {
      console.log({ previousSquare, selectedSquare })

      error.value = ''

      // if (!hasPiece(game.exportJson(), selectedSquare)) {
      //   previousSquare = null
      // }

      if (previousSquare === null) {
        allowedMoves.value = game.moves(selectedSquare)
        previousSquare = selectedSquare
      } else {
        try {
          game.move(previousSquare, selectedSquare)
          history.value = game.getHistory()
          console.log(history.value)
          initBoard(board, game.exportJson())
          previousSquare = null
        } catch (e) {
          error.value = e.toString()
          previousSquare = null
        }
      }
    }

    return {
      error,
      board,
      allowedMoves,
      history,
      showOrMove,
      isInAllowedMoves
    }
  }
}
</script>

<style scoped>
.error {
  opacity: 1;
}

.fading {
  opacity: 0;
  transition: opacity 5s;
}

.chess-board {
  display: flex;
  flex-direction: column-reverse;
  border: 1px solid #444;
  width: fit-content;
}

.rank-row {
  margin: 0;
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
