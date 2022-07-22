<template>
  <div v-show="dialog" class="container">
    <div class="mask"></div>
    <button class="close" @click="close">&times;</button>
    <div class="dropdown">
      <button
        v-for="({ text, value }, i) in items"
        :key="i"
        :data-value="value"
        @click="onItemClicked"
      >
        {{ text }}
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    dialog: Boolean
  },

  emits: ['change', 'close'],

  setup(props, { emit }) {
    const store = useStore()
    const onItemClicked = (e) => {
      const item = {
        text: e.target.innerText,
        value: e.target.attributes['data-value'].value
      }
      store.commit('setPlayerMode', item.value)
      emit('close')
    }

    const close = () => {
      emit('close')
    }

    return {
      onItemClicked,
      close
    }
  }
}
</script>

<style>
.mask {
  z-index: 10;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #0008;
}

.close {
  z-index: 11;
  position: fixed;
  top: 4px;
  right: 4px;
  font-size: 24px;
  padding: 0 10px 4px 10px;
  color: #eee;
  background: #0000;
}

.dropdown {
  z-index: 12;
  display: flex;
  flex-direction: column;
  padding: 10px;
  background: #eee;
  width: 60vw;
  max-width: 200px;
  position: absolute;
  top: 35%;
  transform: translateY(-35%);
  left: 50%;
  transform: translateX(-50%);
}

.dropdown button {
  text-align: left;
  padding-left: 30px;
}
</style>
