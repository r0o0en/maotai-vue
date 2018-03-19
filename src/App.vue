<template>
    <div id="app">
        <h1>{{name}}</h1>
        <p>vuex $store.state.count = {{$store.state.count}}</p>
        <nav>
            <ul>
                <li><router-link to="/about">about</router-link></li>
                <li><router-link to="/join">join</router-link></li>
            </ul>
        </nav>
        <button v-on:click="say()">say</button>
        <router-view></router-view>
        <mt-button type="primary">按钮</mt-button>
    </div>

</template>

<script>
    import Mint from 'mint-ui';

    export default {
        name: "App",
        data:function(){
            return {
                name:'app.vue => data.name'
            }
        },
        methods:{
          say(){
              console.log(this,this.say);
          }
        }
    }
</script>

<style scoped>
    #app{
        border-bottom: 1px solid #3f59ff;
    }
</style>