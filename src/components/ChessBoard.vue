<template>
  <div class="chess-board">
    <div class="rank-row" v-for="rank in board" :key="rank.row">
      <button
        v-for="box in rank.boxes"
        :key="box.key"
        :class="
          'square ' +
          box.color +
          (isInAllowedMoves(box.key) ? ' allowed' : '') +
          (box.key === check.square ? ' checked' : '') +
          (box.key === check.square && check.mate ? ' checkmated' : '')
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
</template>

<script>
import { computed, ref, watch } from 'vue'
import { startFEN } from '@/lib/constants'
import {
  /*hasPiece,*/ initBoard,
  getFormattedMove,
  getLastMove,
  inverseObject
} from '@/lib/lib'
import { useStore } from 'vuex'
const jsChessEngine = require('js-chess-engine')

export default {
  setup() {
    const store = useStore()
    const game = computed(() => store.state.game)

    // state
    const board = ref([])
    const allowedMoves = ref([])
    const check = ref({
      square: null,
      mate: false
    })
    const error = ref('')
    const mode = computed(() => store.state.playerMode)

    // private
    let previousSquare = null

    // initialization
    initBoard(board, jsChessEngine.status(startFEN))

    // watchers
    watch(game, () => {
      initBoard(board, jsChessEngine.status(startFEN))
      store.state.gameHistory.length = 0
    })

    // methods
    const isInAllowedMoves = (square) => allowedMoves.value.includes(square)

    const updateHistoryAndBoard = () => {
      const history = game.value.getHistory()
      const gameJSON = game.value.exportJson()
      const lastMove = getLastMove(history, gameJSON)
      store.state.gameHistory.push(lastMove)

      console.log({ gameJSON })

      const kingPiece = gameJSON.turn === 'white' ? 'K' : 'k'
      const invertedPieceMap = inverseObject(gameJSON.pieces)
      const kingSquare = invertedPieceMap[kingPiece]
      check.value.square = gameJSON.check ? kingSquare : null
      check.value.mate = gameJSON.checkMate

      initBoard(board, game.value.exportJson())
      previousSquare = null
      allowedMoves.value = []
    }

    const makeAImoveifNeeded = () => {
      if (!mode.value.includes('_')) return

      const level = Number(mode.value.split('_')[1])
      game.value.aiMove(level)
      updateHistoryAndBoard()
    }

    const showOrMove = (selectedSquare) => {
      if (previousSquare === null) {
        allowedMoves.value = game.value.moves(selectedSquare)
        previousSquare = selectedSquare
      } else {
        try {
          game.value.move(previousSquare, selectedSquare)
          updateHistoryAndBoard()
          makeAImoveifNeeded()
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
      check,
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
  box-shadow: 0px 0px 6px #1114;
  /* border: 1px solid #444; */
  width: fit-content;
  min-width: 480px;
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

.checked {
  box-shadow: inset 0px 0px 8px 6px #ffbb00;
  /* transition: all 0.2s; */
}

.checkmated {
  box-shadow: inset 0px 0px 8px 6px #c91e00;
  /* transition: all 0.2s; */
}

.light {
  background: #c4c4c4;
}

.dark {
  background: #6d655e;
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
