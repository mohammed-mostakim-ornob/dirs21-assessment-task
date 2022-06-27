import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import Vuelidate from 'vuelidate';
import VueAlertify from 'vue-alertify';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueAlertify);

new Vue({
    store,
    render: h => h(App),
}).$mount('#app');