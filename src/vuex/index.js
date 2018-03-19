import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        count:0,
        projectName:'吉粮茅台'
    },
    mutations:{
        add(state){
            state.count ++;
        }
        ,remove(state){
            state.count --;
        }
    }
});

export default store;