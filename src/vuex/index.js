import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let u = navigator.userAgent,
    app = navigator.appVersion;
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

const store = new Vuex.Store({
    state:{
        projectName:'吉粮茅台',//项目名称
        footerShow:true,//是否显示底部菜单
        isIOS:isIOS,
        isAndroid:isAndroid,
        path:{

        }
    },
    mutations:{

    }
});

export default store;