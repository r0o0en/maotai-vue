<template>
    <div id="app" :class="{'footer-show':$store.state.footerShow}" :style="{minHeight:fullHeight+'px'}">
        <main-tabbar v-show="$store.state.footerShow"></main-tabbar>
        <transition :name="transitionName">
            <router-view class="view view-app" :style="{height:viewHeight+'px'}"></router-view>
        </transition>
    </div>
</template>

<script>
    import vue from 'vue';
    import MainTabbar from './components/MainTabbar.vue';
    vue.component('MainTabbar',MainTabbar);
    export default {
        name: "App",
        data:function(){
            return {
                // fullHeight: 'auto',//loadmore高度
                fullHeight: document.documentElement.clientHeight,//loadmore高度
                transitionName:'right',//路由过渡动画名
            }
        },
        mounted() {
            // 动态设置背景图的高度为浏览器可视区域高度

            // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
            this.fullHeight = `${document.documentElement.clientHeight}`;
            // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
            const that = this;
            window.onresize = function temp() {
                that.fullHeight = `${document.documentElement.clientHeight}`;
            };
        },
        computed:{
          viewHeight(){
              console.log(this.fullHeight);
              return ( this.$store.state.footerShow ? this.fullHeight - 55 : this.fullHeight );
          }
        },
        watch:{
            '$route' (to, from) {
                let history = this.$store.state.pathHistory;
                if( from.path == '/'){
                    //第一次加载时，第一个路由使用淡入
                    console.log('fade:firstRouter');
                    this.transitionName = 'fade';
                    history.push(to.path);
                }else{
                    console.log(to,from);
                    //判断$store.state.pathHistory[]倒数第二个值 是否匹配 to.path?后退:前进
                    let judge = history.indexOf(to.path);
                    let homes = ['home','scorecard','shoppingcard','my'];
                    if(homes.indexOf(from.name)>=0 && homes.indexOf(to.name)>=0){
                        //如果是在首页4个页面中相互切换(homes[Array])，则使用淡入淡出，但是仍然要判断前进后退以此变更pathHistory
                        this.transitionName = 'fade';
                        if( judge === history.length-2 ){
                            console.log('right home fade');
                            history.splice(history.length-1,1);
                        }else{
                            console.log('left home fade');
                            history.push(to.path);
                        }
                    }else if(history.length<=1){
                        //记录长度为1时，路由操作必为前进
                        console.log('left');
                        this.transitionName = 'left';
                        history.push(to.path);
                    }else
                    // //判断$store.state.pathHistory[]倒数第二个值 是否匹配 to.path?后退:前进
                    // let judge = history.indexOf(to.path);
                    if( judge === history.length-2 ){
                        console.log('right');
                        this.transitionName = 'right';
                        history.splice(history.length-1,1);
                    }else{
                        console.log('left');
                        this.transitionName = 'left';
                        history.push(to.path);
                    }
                }
                history = null;
            }
        },
    }
</script>

<style>
</style>