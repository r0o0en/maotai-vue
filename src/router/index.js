import Vue from 'vue';
import VueRouter from 'vue-router';
import store from "../vuex";

Vue.use(VueRouter);

const  Home = () => import("../view/Home.vue");

const routes = [
    {name:'app', path:'/', redirect:{name:"home"},},
    {name:'home', path:'/home', component:Home,meta:{}},
];

const  router = new VueRouter({
    routes
});

router.beforeEach((to,from,next)=>{
    console.log('路由(全局前置守卫) beforeEach >即将进入:',to);
    console.log('路由(全局前置守卫) beforeEach >正要离开:',from);
    // console.log('路由(全局前置守卫) beforeEach >next:',next);
    // if(confirm('从:'+ from.name + '跳转到:'+to.name)){
    //     next();
    // }else {
    //     next(false);
    // }
    next();

});

export default  router;