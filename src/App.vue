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
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                this.transitionName = toDepth < fromDepth ? 'right' : 'left';
            }
        },
    }
</script>

<style>
</style>