<script setup>
import Outline from "./components/Outline.vue";
import {useStore} from "vuex";
import {computed} from "vue";

const store = useStore();
const showOutline = computed(() => store.getters.getShowOutline);
</script>

<template>
    <main class="main">
        <Outline v-show="showOutline" :class="showOutline ? 'slide-in' : 'slide-out'"></Outline>
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

/* 定义滑入动画 */
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* 定义滑出动画 */
@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(-100%);
        opacity: 0;
    }
}

/* 触发滑入效果 */
.slide-in {
    animation: slideIn 0.4s ease forwards;
}

/* 触发滑出效果 */
.slide-out {
    animation: slideOut 0.4s ease forwards;
}
</style>
