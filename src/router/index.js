import Vue from  'vue';
import VueRouter from 'vue-router';
/*0、显式调用 ：vue扩展 vueRouter*/
Vue.use(VueRouter);

/*1、定义路由*/
//vue路由懒加载：引入 babel-plugin-syntax-dynamic-import模块，
// 通过 const Join = () => import('../view/join.vue') 实现 .vue 组件按需加载。

const  About = () => import("../view/about.vue");

/*
* 2、定义路由
* 每个路由应该映射一个组件。其中"component" 可以使：
*   1:通过 Vue.extend()创建的组件构造器
*   2:或者只是一个组件配置对象
*
* */
const routes =[
    {
        name:"about",
        path:"/about",
        component:About
    }
];


/*
* 3、创建router实例
* 4、配置 导航守卫(全局)
* 5、输出配置
* */
const router = new VueRouter({
    routes //（缩写）相当于 routes:routes
});

//全局前置守卫
//  router = new VueRouter后
//  可以使用 router.beforeEach 注册一个全局前置守卫：
//  当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
router.beforeEach((to,from,next)=>{
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    // next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
    // next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
    // next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
    // next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
    console.log('路由(全局前置守卫) beforeEach >即将进入:',to);
    console.log('路由(全局前置守卫) beforeEach >正要离开:',from);
    console.log('路由(全局前置守卫) beforeEach >next:',next);
    next();
});

//全局解析守卫
//在 2.5.0+ 你可以用 router.beforeResolve 注册一个全局守卫。
// 这和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
router.beforeResolve((to,from,next)=>{
    console.log('路由(全局解析守卫) beforeResolve >即将进入:',to);
    console.log('路由(全局解析守卫) beforeResolve >正要离开:',from);
    console.log('路由(全局解析守卫) beforeResolve >next:',next);
    next();
});

//全局后置钩子
//你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：
router.afterEach((to, from) => {
    console.log('路由(全局后置钩子) afterEach > 即将离开:',to);
    console.log('路由(全局后置钩子) afterEach > 正要离开:',from);
});

//输出
export default router;

