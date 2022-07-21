import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      error: null
    }
  },
  mutations: {
    setError (state, message) {
      state.error = message
    }
  }
})

const app = createApp(App)

app.use(store)

app.mount('#app')
