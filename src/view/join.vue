<template>
    <div>
        <p>join.vue</p>
        <p>{{pageinfo}}</p>
        <p><button v-on:click="$store.commit('remove')">count - 1</button></p>
    </div>
</template>

<script>
    export default {
        name: "",
        data(){
            return {
                pageinfo:'这里是 join.uve data.pageinfo'
            }
        }
    }
</script>

<style scoped>

</style>