import { createApp } from 'vue'
import App from './App.vue'
import {invoke} from "@tauri-apps/api";
import {store} from "@/store";

invoke('get_profiles').then(function (result) {
    store.replaceData(result)
})

let app = createApp(App);
app.mount('#app')
