import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'
import store from './store'

// Create a new store instance.
const _store = createStore(store)
const app = createApp(App)
app.use(_store)
app.mount('#app')
