<script setup>
import {onMounted, ref, watch} from 'vue';
import {HtmlRenderer, Parser} from 'commonmark';
import {useStore} from 'vuex';
import {highlightCode} from '../utils/highlightConfig';
import router from "../router/index.js";

const store = useStore();
const address = ref('');
const folderContents = ref(null);
const error = ref('');
const markdownContent = ref('');  // 存储原始 Markdown 内容
const htmlOutput = ref('');  // 存储HTML 输出
const editorScrollTop = ref(0); // 记录编辑区的滚动位置
const renderScrollTop = ref(0); // 记录渲染区的滚动位置

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
    let addressTemp = JSON.parse(localStorage.getItem('address'));
    address.value = Array.isArray(addressTemp) ? addressTemp[0] : null;
    if (address.value) {
        try {
            const result = await window.electronAPI.readFileOrFolder(address.value.path);
            if (result.type === 'directory') {

            } else if (result.type === 'file') {
                // 存储大纲
                const outline = extractMarkdownOutline(result.content);
                await store.dispatch('updateOutline', outline);

                // 渲染markdown
                markdownContent.value = result.content;
                htmlOutput.value = markdownToHTML(result.content);
            }
        } catch (err) {
            alert("文件或文件夹解析错误，无法打开")
            await store.dispatch('updateShowOutline', false);
            router.back()
        }
    }
});

// 处理内容变化
const onInputChange = (event) => {
    markdownContent.value = event.target.innerText;
    htmlOutput.value = markdownToHTML(event.target.innerText);
};

const markdownToHTML = (markdown) => {
    const parser = new Parser();
    const renderer = new HtmlRenderer();
    const parsed = parser.parse(markdown);  // 解析 Markdown 文本
    let html = renderer.render(parsed);     // 渲染为 HTML
    html = highlightCodeBlocks(html); // 高亮代码块
    return html;
};

const highlightCodeBlocks = (html) => {
    // 使用正则表达式查找所有代码块
    const regex = /<pre><code class="language-(\w+)">([\s\S]+?)<\/code><\/pre>/g;

    return html.replace(regex, (match, lang, code) => {
        // 对代码进行高亮处理
        const highlightedCode = highlightCode(code, lang);  // 使用 highlight.js 进行高亮
        return `<pre><code class="language-${lang}">${highlightedCode}</code></pre>`;
    });
};

// 提取 Markdown 大纲的函数
const extractMarkdownOutline = (markdownContent) => {
    const lines = markdownContent.split('\n');
    const outlineTree = [];
    const outlineStack = [];

    lines.forEach(line => {
        const match = line.match(/^(#{1,6})\s+(.*)/);  // 匹配 Markdown 标题
        if (match) {
            const level = match[1].length;  // 标题层级 (1-6)
            const title = match[2].trim();  // 标题文本

            const newNode = {
                level: level,
                title: title,
                children: []
            };

            if (outlineStack.length === 0 || level === 1) {
                outlineTree.push(newNode);
                outlineStack.length = 0; // 清空栈，准备存储新的一级标题及其子级
                outlineStack.push(newNode);
            } else {
                while (outlineStack.length > 0 && outlineStack[outlineStack.length - 1].level >= level) {
                    outlineStack.pop();
                }
                if (outlineStack.length > 0) {
                    outlineStack[outlineStack.length - 1].children.push(newNode);
                }
                outlineStack.push(newNode);
            }
        }
    });

    return outlineTree;  // 返回树状结构的大纲
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
        <p v-if="error">{{ error }}</p>
        <div class="editor" @scroll="syncScroll">
            <div class="editor-text" contenteditable="true" @input="onInputChange" ref="editorElement">
                {{ markdownContent }}
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