<template>
<main>
  <chess-board></chess-board>
</main>
</template>

<script>
import ChessBoard from './components/ChessBoard'
export default {
  name: 'App',

  components: {
    ChessBoard
  }
}
</script>

<style>
@import url('./assets/app.css');
</style>
