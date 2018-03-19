import Vue from 'vue';
import router from './router/';
import store from './vuex/';
import App from './App.vue';

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

Vue.use(Mint);

const app = new Vue({
    router,
    store,
    render:h => h(App)
}).$mount('#app');
