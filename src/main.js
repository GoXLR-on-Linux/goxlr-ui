import {createApp} from 'vue'
import App from './App.vue'
import {store} from "@/store";

export const url_base = "http://localhost:14564/api";

fetch( `${url_base}/get-devices`)
    .then(result => result.text())
    .then(data => store.replaceData(data));

let app = createApp(App);
app.mount('#app')
