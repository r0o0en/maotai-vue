<template>
    <mt-tabbar v-model="selected" :fixed="fixed" :class="{'main-footer':true}">
        <mt-tab-item id="优品区">
            <img slot="icon" src="../assets/icon/ico-home.png">
            优品区
        </mt-tab-item>
        <mt-tab-item id="积分区">
            <img slot="icon" src="../assets/icon/ico-scorecard.png">
            积分区
        </mt-tab-item>
        <mt-tab-item id="购物车">
            <img slot="icon" src="../assets/icon/ico-shoppingcart.png">
            购物车
        </mt-tab-item>
        <mt-tab-item id="我的">
            <img slot="icon" src="../assets/icon/ico-my.png">
            我的
        </mt-tab-item>
    </mt-tabbar>
</template>

<script>
    export default {
        name: "main-tabbar",
        data(){
            return{
                selected:'优品区',
                fixed:true,
            }
        },
        props:{
            // selected:{
            //     type:String,
            //     default:'优品区'
            // },
            // fixed:{
            //     type:Boolean,
            //     default:true
            // },
        },
        watch:{
            'selected':{
                handler(to,from){
                    // console.log('Tabbar selected()',to,from);
                    if(to==='优品区'){
                        this.$router.push('/home');
                    }else if(to==='积分区'){
                        this.$router.push('/scorecard');
                    }else if(to==='购物车'){
                        this.$router.push('/shoppingcart');
                    }else if(to==='我的'){
                        this.$router.push('/my');
                    }
                }
            },
        }
        ,created(){
            // console.log('MainTabbar.vue created()',this.$route);
            if( this.$route.path == "/home" ){
                this.selected = '优品区';
            }else if( this.$route.path == "/scorecard" ) {
                this.selected = '积分区';
            }else if( this.$route.path == "/shoppingcart" ) {
                this.selected = '购物车';
            }else if( this.$route.path == "/my" ) {
                this.selected = '我的';
            }
        }
    }
</script>

<style>

</style>