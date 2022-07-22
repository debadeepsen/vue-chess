<template>
  <div class="f-row">
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
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { startFEN } from '@/lib/constants'
import { /*hasPiece,*/ initBoard, getFormattedMove, getLastMove } from '@/lib/lib'
import { useStore } from 'vuex'
const jsChessEngine = require('js-chess-engine')

export default {
  setup() {
    const store = useStore()
    const game = new jsChessEngine.Game()
    game.moves()

    // state
    const board = ref([])
    const allowedMoves = ref([])
    const error = ref('')
    const mode = computed(() => store.state.playerMode)

    // private
    let previousSquare = null

    // initialization
    initBoard(board, jsChessEngine.status(startFEN))

    // methods
    const isInAllowedMoves = (square) => allowedMoves.value.includes(square)

    const updateHistoryAndBoard = () => {
      const history = game.getHistory()
      const gameJSON = game.exportJson()
      const lastMove = getLastMove(history, gameJSON)
      store.state.gameHistory.push(lastMove)

      initBoard(board, game.exportJson())
      previousSquare = null
      allowedMoves.value = []
    }

    const showOrMove = (selectedSquare) => {
      if (previousSquare === null) {
        allowedMoves.value = game.moves(selectedSquare)
        previousSquare = selectedSquare
      } else {
        try {
          game.move(previousSquare, selectedSquare)
          updateHistoryAndBoard()

          if (mode.value === 'AI') {
            game.aiMove()
            updateHistoryAndBoard()
          }
        } catch (e) {
          store.commit('setError', e.toString().substr(7))
          allowedMoves.value = []
          previousSquare = null
        }
      }
    }

    return {
      store,
      error,
      board,
      allowedMoves,
      history,
      showOrMove,
      isInAllowedMoves,
      getFormattedMove
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

.square:hover {
  transition: all 0.15s;
  cursor: pointer;
  transform: scale(1.1);
  z-index: 3;
  box-shadow: 0px 0px 5px #1115;
}

.square::before {
  content: attr(data-box);
  position: absolute;
  left: 2px;
  top: 2px;
  font-size: 0.5rem;
  font-weight: 600;
}

.square img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
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

.game-history {
  width: 240px;
  display: grid;
  grid-template-columns: auto auto;
  height: fit-content;
}

.game-history > div {
  padding: 10px;
  border: 1px solid #888;
}
</style>
