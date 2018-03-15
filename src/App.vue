<template>
    <div id="app">
        <h1>{{this.$store.state.projectName}}</h1>
        <p>vue-router对象：this.$route.name = {{this.$route.name}}</p>
        <p>vuex管理状态 this.$store.state = {{this.$store.state}}</p>
        <p>
            <button v-on:click="$store.commit('add')">count ++</button>
            <button v-on:click="$store.commit('remove')">count --</button>
        </p>
        <router-link to="/about">about</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        }
    }
</script>

<style scoped>

</style>