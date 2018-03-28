<template>
    <div class="Main">
        <v-head></v-head>
        <div class="front-conter">
             <h1>敬请期待！程序猿正在努力中......</h1>
        </div>
        <v-footer></v-footer>
    </div>
</template>
<script>
    import vHead from './../common/Header.vue';
    import vFooter from './../common/Footer.vue';
    export default {
        components:{
            vHead,vFooter
        }
    }
</script>