import {createApp} from 'vue'
import App from './App.vue'
import {websocket} from "@/util/websocket";

export const url_base = "http://localhost:14564/api";
export const ws_base = "ws://localhost:14564/api/websocket";

// fetch( `${url_base}/get-devices`)
//     .then(result => result.text())
//     .then(data => store.replaceData(data));
//websocket.connect().await;
websocket.connect().then(() => {
        let app = createApp(App);
        app.mount('#app')
});