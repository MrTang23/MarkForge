<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {useStore} from 'vuex';
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import router from "../router/index.js";

const store = useStore();
const outline = computed(() => store.getters.getOutline);
const outlineLine = ref([]); //树状数组的线性表示

onMounted(() => {
    flattenTree(outline.value)
})

const flattenTree = (tree) => {
    outlineLine.value = [];
    const result = [];

    function traverse(nodes, level = 1, parentId = null) {
        nodes.forEach((node, index) => {
            const id = `${parentId ? parentId + '-' : ''}${level}-${index}`; // 生成唯一的 id
            result.push({
                ...node,
                level,
                id,
                isExpanded: false // 默认每个节点的展开状态为 false
            });

            // 如果当前节点有子节点，递归遍历子节点，level + 1
            if (node.children && node.children.length > 0) {
                traverse(node.children, level + 1, id); // 传递当前节点的 id 作为子节点的 parentId
            }
        });
    }

    traverse(tree);
    outlineLine.value = result;
}

const renderOpenLevel = () => {
    for (let i = 0; i < outlineLine.value.length; i++) {
        if (outlineLine.value[i].level <= 2) {
            outlineLine.value[i].isExpanded = true;
        }
    }
}

const backWelcome = () => {
    router.back()
}

watch(outline, (newOutline) => {
    if (newOutline && newOutline.length > 0) {
        flattenTree(newOutline);
        renderOpenLevel()
    }
}, {immediate: true});

</script>

<template>
    <div class="outline-main">
        <header class="header">
            <FontAwesomeIcon :icon="['fas', 'circle-chevron-left']" @click="backWelcome" class="back"/>
            大纲
        </header>
        <div class="outline">
            <template v-for="item in outlineLine" :key="item.title">
                <div class="outline-row" :class="{'outline-first': item.level === 1,'outline-second': item.level === 2}"
                     :style="{ paddingLeft: `${(item.level - 1) * 20}px` }" v-if="item.isExpanded">
                    <FontAwesomeIcon :icon="['fas', 'chevron-down']" class="outline-title-icon"
                                     :style="{ color: item.children.length > 0 ? 'inherit' : 'transparent' }"/>
                    <div class="outline-text">{{ item.title }}</div>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
.back {
    position: absolute;
    cursor: pointer;
    left: 10px;
}

.outline-main {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 250px;
    min-width: 250px;
    max-width: 250px;
    background: var(--left-background);
    border-right: 1px solid var(--theme-divider);
}

.header {
    height: 40px;
    display: flex;
    font-size: 14px;
    line-height: 40px;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    letter-spacing: 2px;
}

.outline {
    font-size: 14px;
    box-sizing: border-box;
    padding: 0 15px 20px 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
}

.outline-text {
    height: 16px;
    line-height: 16px;
    white-space: nowrap; /* 禁止文本换行 */
    overflow: hidden; /* 超出部分隐藏 */
    text-overflow: ellipsis;
}

.outline-text:hover {
    border-bottom: 1px solid;
}

.outline-first {
    font-weight: 700;
    font-size: 16px;
}

.outline-second {
    font-weight: 500;
}

.outline-title-icon {
    font-size: 10px;
    color: var(--theme-font-color);
    margin: 0 7px 0 5px;
}

.outline-row {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;
    cursor: pointer;
    border-radius: 7px;
    min-height: 30px;
}

.outline-row:hover {
    background: var(--left-background-hover);
}

@media (prefers-color-scheme: dark) {
    .outline-main {
        border-right: 1px solid #000;
    }
}
</style>