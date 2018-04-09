<template>
    <div>
        <main-header :title="title" :hasBack="hasBack">
            <mt-button icon="more" slot="right">分类</mt-button>
        </main-header>
        <ul>
            <li v-for="item in 20"><p>这是一个占楼的循环-{{item}}</p></li>
        </ul>
    </div>
</template>

<script>
    import Vue from 'vue';
    import MainHeader from '../components/MainHeader.vue';
    Vue.component('MainHeader',MainHeader);
    export default {
        name: "home",
        data(){
            return {
                title:'积分区',
                hasBack:false
            }
        }
    }
</script>

<style>

</style>