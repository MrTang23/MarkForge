<script setup>
import router from "../router/index.js";
import {onMounted} from "vue";

onMounted(()=>{
    //router.push('/file-content')
})

const selectFileOrFolder = async () => {
    const result = await window.electronAPI.openFileOrFolder();
    if (!result.canceled) {
        localStorage.setItem('address', result);
        await router.push('/file-content')
    }
};
</script>

<template>
    <div class="main">
        <div class="welcome">
            <div>
                <div class="title">MarkForge</div>
                <div class="title-second">Welcome</div>
            </div>
            <div class="content">
                <div class="tool content-bar">
                    <div class="content-title">开始</div>
                    <div class="content-list-left" @click="newFile">
                        <font-awesome-icon :icon="['fas', 'file-circle-plus']" class="content-list-icon"/>
                        新建文件
                    </div>
                    <div class="content-list-left" @click="selectFileOrFolder">
                        <font-awesome-icon :icon="['far', 'folder-open']" class="content-list-icon"/>
                        打开文件夹
                    </div>
                </div>
                <div class="recent content-bar">
                    <div class="content-title">最近</div>
                    <div class="content-list-right">新建文件</div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped>
.content-list-icon {
    margin-right: 10px;
    font-size: 16px;
}

.content-list-left {
    margin-right: auto;
    height: 35px;
    line-height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    color: var(--theme-color);
    transition: color 0.4s;
}

.content-list-left:hover {
    color: var(--theme-color-hover);
}

.content-title {
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    font-weight: 500;
    margin-bottom: 10px;
}

.content-bar {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.content {
    display: flex;
    flex-direction: row;
}

hr {
    width: 100%;
}

.main {
    display: flex;
    box-sizing: border-box;
    flex: 1;
    justify-content: center;
}

.welcome {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    flex: 1;
    padding: 100px;
    max-width: 1000px;
}

.title {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 10px;
}

.title-second {
    font-size: 24px;
    margin-bottom: 50px;
}
</style>