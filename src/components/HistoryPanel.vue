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
      const history = computed(() => store.state.gameHistory)

      const rows = []
      for (let i = 0; i < history.value.length; i += 2) {
        let whiteMove = history.value[i]
        let blackMove = history.value[i + 1]
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
  box-shadow: 0px 0px 6px #1114;
}

@media screen and (min-width: 640px) {
  .panel {
    margin-left: 20px;
    width: fit-content;
    height: 480px;
    overflow-x: hidden;
    overflow-y: auto;
  }

  table {
    border-collapse: collapse;
  }

  /* thead tr {
    position: sticky;
    top: 0;
  } */

  th,
  td {
    /* border-bottom: 1px solid #8888; */
    text-align: center;
    /* padding: 6px; */
    padding: 4px 0;
    font-size: 12px;
    min-width: 100px;
    height: 20px;
  }

  th {
    border-bottom: 1px solid #8883;
  }

  th:nth-child(1),
  td:nth-child(1) {
    min-width: 25px;
  }

  tbody tr:nth-child(2n) {
    background: #8881;
  }
}
</style>
