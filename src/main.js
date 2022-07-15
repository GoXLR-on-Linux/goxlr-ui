import {createApp} from 'vue'
import App from './App.vue'
import {websocket} from "@/util/sockets";

websocket.connect().then(() => {
        let app = createApp(App);
        app.mount('#app')
});