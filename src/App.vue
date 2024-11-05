<script setup>
import Outline from "./components/Outline.vue";
import {onMounted} from "vue";
import router from "./router/index.js";
onMounted(()=>{

})
</script>

<template>
    <main class="main">
        <Outline></Outline>
        <router-view></router-view>
    </main>
</template>

<style scoped>
.main {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
}
</style>
