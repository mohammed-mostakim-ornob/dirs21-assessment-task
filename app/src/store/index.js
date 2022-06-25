import Vue from 'vue';
import Vuex from 'vuex';
import dishes from './modules/dishes';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        dishes
    }
});