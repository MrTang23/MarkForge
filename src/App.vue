<script setup>
import Outline from "./components/Outline.vue";

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
