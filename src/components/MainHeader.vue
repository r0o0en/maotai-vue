<template>
    <div class="main-header">
    <mt-header :title="title" :fixed="fixed">
        <template v-if="hasBack">
            <router-link to="/" slot="left" >
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </template>
        <template slot="right">
            <slot name="right"></slot>
        </template>
    </mt-header>
    </div>

</template>

<script>
    export default {
        name: "MainHeader",
        data(){
            return{

            }
        },
        props:{
            title:{
                type:String,
                default:'吉粮茅台'
            },
            fixed:{
                type:Boolean,
                default:true,
            },
            hasBack:{
                type:Boolean,
                default:true
            }
        }
    }
</script>

<style>

</style>