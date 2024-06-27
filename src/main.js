import { createApp } from 'vue'
import App from './App.vue'
// import mdiVue from 'mdi-vue/v3'
// import * as mdijs from '@mdi/js'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import "@mdi/font/css/materialdesignicons.min.css";


// Vue-router
import router from "@/router/index.js";

// Pinia
import { createPinia } from 'pinia';

const pinia = createPinia();

const vuetify = createVuetify({
    components,
    directives,
    icons:{
        defaultSet: 'mdi'
    }
});



const app = createApp(App);

app.use(pinia);
app.use(vuetify);
app.use(router);

app.mount('#app');
