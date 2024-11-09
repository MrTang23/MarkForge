<script setup>
// TODO: 新建文件
// TODO: 直接打开最近文件
// TODO: 选择文件夹后的处理
import router from "../router/index.js";
import {onMounted, ref} from "vue";
import store from "../store.js";

const recentOpenList = ref([])

onMounted(() => {
    let address = localStorage.getItem('address');
    try {
        address = JSON.parse(address);
        if (Array.isArray(address)) {
            recentOpenList.value = address
        } else {
            recentOpenList.value = [];
        }
    } catch (e) {
        recentOpenList.value = [];
    }
})

const selectFileOrFolder = async () => {
    const result = await window.electronAPI.openFileOrFolder();
    if (result) {
        recentOpenList.value.unshift(result)
        if (recentOpenList.value.length > 8) {
            recentOpenList.value.splice(8); // 删除超过 8 条数据后的所有内容
        }
        localStorage.setItem('address', JSON.stringify(recentOpenList.value));
        await store.dispatch('updateShowOutline', true);
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
                <div class="content-bar">
                    <div class="content-title">开始</div>
                    <div class="content-list-left" @click="newFile" title="new markdown file">
                        <font-awesome-icon :icon="['fas', 'file-circle-plus']" class="content-list-icon"/>
                        新建文件
                    </div>
                    <div class="content-list-left" @click="selectFileOrFolder" title="open file or folder">
                        <font-awesome-icon :icon="['far', 'folder-open']" class="content-list-icon"/>
                        打开文件或文件夹
                    </div>
                </div>
                <div class="content-bar">
                    <div class="content-title">最近</div>
                    <div v-for="(item,index) in recentOpenList" :key="item.name+index">
                        <div class="content-row-right" :title="item.path">
                            <div @click="openItem" class="content-list-left"> {{ item.name }}</div>
                            <div class="recent-path">{{ item.path }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer>Copyright © 2024 Amos Tang. All rights reserved.</footer>
    </div>
</template>

<style scoped>
footer {
    height: 30px;
    font-size: 12px;
    font-weight: 200;
    text-align: center;
}

.recent-path {
    color: var(--theme-font-color);
    width: 100%;
    font-size: 12px;
    margin-left: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.content-list-icon {
    margin-right: 10px;
    font-size: 16px;
}

.content-row-right {
    height: 35px;
    line-height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.content-list-left {
    height: 35px;
    line-height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    margin-right: auto;
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
    width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
    flex-direction: column;
    box-sizing: border-box;
    flex: 1;
    align-items: center;
    user-select: none;
}

.welcome {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    flex: 1;
    padding-top: 100px;
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


@media (max-width: 480px) {
    .welcome {
        width: 80%;
        padding-top: 70px;
    }

    .recent-path {
        display: none;
    }
}

@media (min-width: 481px) and (max-width: 600px) {
    .welcome {
        width: 80%;
        padding-top: 85px;
    }

    .recent-path {
        display: none;
    }
}

@media (min-width: 601px) and (max-width: 768px) {
    .welcome {
        width: 80%;
        padding-top: 100px;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .welcome {
        width: 80%;
        padding-top: 100px;
    }

    footer {
        font-size: 16px;
    }
}

@media (min-width: 1025px) and (max-width: 1366px) {
    .welcome {
        width: 75%;
        padding-top: 90px;
    }
}

@media (min-width: 1367px) {
    .welcome {
        width: 60%;
        padding-top: 100px;
    }
}
</style>