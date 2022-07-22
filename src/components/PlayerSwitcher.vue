<template>
  <div style="margin-bottom: 20px">
    <h4>Mode:</h4>
    {{ modeText }}
    <button class="change-mode" @click="dialog = true">Change</button>
    <mode-drop-down
      :items="modeOptions"
      :dialog="dialog"
      @close="dialog = false"
    ></mode-drop-down>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import ModeDropDown from './ModeDropDown'
import { modeOptions } from '@/lib/constants'
export default {
  components: { ModeDropDown },
  setup() {
    const store = useStore()
    const player = computed(() => store.state.playerMode)
    const modeText = computed(
      () => modeOptions.find((m) => m.value === player.value).text
    )
    const dialog = ref(false)

    return {
      player,
      store,
      modeText,
      dialog,
      modeOptions
    }
  }
}
</script>

<style scoped>
h4 {
  display: inline-block;
  margin-bottom: 10px;
}
</style>
