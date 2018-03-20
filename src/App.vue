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
        <img src="../static/logo.png" alt=""/>
    </div>

</template>

<script>
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
        background: url("../static/logo.png") no-repeat center /auto;
        border-bottom: 1px solid #3f59ff;
    }
</style>