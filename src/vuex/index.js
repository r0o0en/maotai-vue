import Vue from "vue";
import Vuex from "vuex";

/*0、显式调用：vue扩展vuex*/
Vue.use(Vuex);

//1、
const store = new Vuex.Store({
    state:{
        //定义管理状态时使用的状态值
        count:0,
        projectName:"吉粮茅台"
    },
    mutations:{
        //定义改变state的方法
        add(state){
            state.count ++ ;
        },
        remove(state){
            state.count -- ;
        }
    }
});
export default store;