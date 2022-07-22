<template>
  <div class="panel">
    <!-- <hr />
    <pre>
      {{ JSON.stringify(historyRows, null, 2) }}
    </pre>
    <hr /> -->
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>White</th>
          <th>Black</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ rowNum, white, black } in historyRows" :key="rowNum">
          <td>{{ rowNum }}</td>
          <td>{{ white }}</td>
          <td>{{ black }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getFormattedMove } from '@/lib/lib'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { defaultHistorySize } from '@/lib/constants'
export default {
  setup() {
    const store = useStore()
    const historyRows = computed(() => {
      const { gameHistory } = store.state

      const rows = []
      for (let i = 0; i < gameHistory.length; i += 2) {
        let whiteMove = gameHistory[i]
        let blackMove = gameHistory[i + 1]
        rows.push({
          rowNum: i / 2 + 1,
          white: getFormattedMove(whiteMove),
          black: blackMove ? getFormattedMove(blackMove) : null
        })
      }

      if (rows.length < defaultHistorySize) {
        const remaining = defaultHistorySize - rows.length
        for (let k = 0; k < remaining; k++) {
          rows.push({
            rowNum: null,
            white: null,
            black: null
          })
        }
      }

      return rows
    })
    return {
      historyRows
    }
  }
}
</script>

<style scoped>
.panel {
  padding: 0px;
  width: 100vw;
}

@media screen and (min-width: 640px) {
  .panel {
    margin-left: 30px;
    width: fit-content;
    height: 480px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  table {
    border-collapse: collapse;
  }

  thead tr {
    position: sticky;
    top: 0;
  }

  th,
  td {
    border: 1px solid #8888;
    text-align: center;
    /* padding: 6px; */
    padding: 2px 0;
    font-size: 14px;
    min-width: 100px;
    height: 20px;
  }

  th:nth-child(1),
  td:nth-child(1) {
    min-width: 25px;
  }

  tbody tr:nth-child(2n) {
    background: #eee2;
  }
}
</style>
