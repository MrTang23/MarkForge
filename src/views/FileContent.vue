<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {HtmlRenderer, Parser} from 'commonmark';
import {useStore} from 'vuex';
import router from "../router/index.js";

const store = useStore();
const itemContent = computed(() => store.getters.getItemContent);
const htmlOutput = ref('');  // 存储HTML 输出
const editorScrollTop = ref(0); // 记录编辑区的滚动位置
const renderScrollTop = ref(0); // 记录渲染区的滚动位置

watch(itemContent, (newItemContent) => {
    itemContent.value = newItemContent;
    try {
        htmlOutput.value = markdownToHTML("# 123");
    } catch (error) {
        alert(error.message);
        router.back();
    }
}, {immediate: true});

// 将编辑区的滚动位置同步到渲染区
watch(editorScrollTop, (newScrollTop) => {
    const renderArea = document.querySelector('.render');
    if (renderArea) {
        renderArea.scrollTop = newScrollTop;
    }
});

// 将渲染区的滚动位置同步到编辑区
watch(renderScrollTop, (newScrollTop) => {
    const editorArea = document.querySelector('.editor');
    if (editorArea) {
        editorArea.scrollTop = newScrollTop;
    }
});

onMounted(async () => {
    await store.dispatch('updateShowOutline', true);
});

// 处理内容变化
const onInputChange = (event) => {
    itemContent.value.markdownContent = event.target.innerText;
    htmlOutput.value = markdownToHTML(event.target.innerText);
};

const markdownToHTML = (markdown) => {
    const parser = new Parser();
    const renderer = new HtmlRenderer();
    const parsed = parser.parse(markdown);
    return renderer.render(parsed);
};

// 监听编辑区的滚动事件，更新滚动位置
const syncScroll = (event) => {
    const editorArea = document.querySelector('.editor');
    const renderArea = document.querySelector('.render');

    // 避免循环同步
    if (event.target === editorArea) {
        editorScrollTop.value = event.target.scrollTop;
    }
    if (event.target === renderArea) {
        renderScrollTop.value = event.target.scrollTop;
    }
};
</script>

<template>
    <div class="main">
        <div class="editor" @scroll="syncScroll">
            <div class="editor-text" contenteditable="true" @input="onInputChange" ref="editorElement">
                {{ itemContent.markdownContent }}
            </div>
        </div>
        <div class="render" @scroll="syncScroll">
            <div class="render-text" v-html="htmlOutput"></div>
        </div>
    </div>
</template>

<style scoped>
.main {
    display: flex;
    flex: 1;
    flex-direction: row;
    box-sizing: border-box;
    overflow: hidden;
}

.editor {
    display: flex;
    box-sizing: border-box;
    padding: 0 20px 0 30px;
    flex-direction: column;
    width: 50%;
    overflow-y: auto;
    overflow-x: hidden;
    border-right: 1px solid var(--code-background);
}

.render {
    box-sizing: border-box;
    padding: 0 20px 0 30px;
    display: flex;
    flex-direction: column;
    width: 50%;
    overflow-x: hidden;
}

.editor-text {
    border: none;
    outline: none;
    margin-top: 50px;
    margin-bottom: 50px;
    white-space: pre-wrap;
    line-height: 2;
}

.render-text {
    margin-top: 50px;
    margin-bottom: 50px;
    line-height: 2;
}
</style>