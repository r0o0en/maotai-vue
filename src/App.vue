<template>
    <div id="app" :class="{'footer-show':$store.state.footerShow}">
        <main-tabbar v-show="$store.state.footerShow"></main-tabbar>
        <router-view class="view view-app" :style="{height:viewHeight+'px'}"></router-view>
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
        methods:{

        },
    }
</script>

<style>
</style>