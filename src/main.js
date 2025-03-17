import {createApp} from 'vue'
import App from './App.vue'
import vClickOutside from "click-outside-vue3";

/**
 * We use FontAwesome for SVG icons, before they can be used they need to be imported here, so they're correctly
 * embedded into the app at build time. If you need a new Icon, search for it at:
 *
 * https://fontawesome.com/search?m=free&s=solid
 *
 * Add it to the import and the library, then embed it into the template where needed.
 */

import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {
    faMicrophoneLines, faCircleQuestion, faFloppyDisk, faFileCirclePlus, faCopy, faTrash, faCheckCircle, faCheck,
    faFolder, faEllipsisVertical, faPlay, faStop, faXmark, faGear, faBookOpen, faCircleInfo, faChevronLeft,
    faChevronRight, faPowerOff, faLink, faLinkSlash, faVolumeXmark, faMicrophoneSlash, faMusic, faTurnUp, faHeadphones,
    faUpLong, faDownLong, faRepeat, faWaveSquare, faSquare, faSquareCheck, faDownload
} from "@fortawesome/free-solid-svg-icons";
import {createI18n} from "vue-i18n";
import {messages} from "@/lang/config.js";

library.add(
    faMicrophoneLines, faCircleQuestion, faFloppyDisk, faEllipsisVertical, faFileCirclePlus, faCopy, faTrash,
    faCheckCircle, faCheck, faFolder, faTrash, faPlay, faStop, faXmark, faGear, faBookOpen, faCircleInfo,
    faChevronLeft, faChevronRight, faPowerOff, faLink, faLinkSlash, faVolumeXmark, faMicrophoneSlash, faMusic,
    faTurnUp, faHeadphones, faUpLong, faDownLong, faRepeat, faWaveSquare, faSquare, faSquareCheck, faDownload
);


let app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(vClickOutside);
app.use(createI18n({
    locale: "en_GB",
    fallbackLocale: "en_GB",
    messages
}));
app.mount('#app');
