import hljs from 'highlight.js';
import 'highlight.js/styles/idea.css';  // 引入你喜欢的主题样式

// 导入常见语言模块
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import ruby from 'highlight.js/lib/languages/ruby';
import java from 'highlight.js/lib/languages/java';
import go from 'highlight.js/lib/languages/go';
import bash from 'highlight.js/lib/languages/bash';
import php from 'highlight.js/lib/languages/php';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';  // XML 和 HTML 共享同一个语言模块

// 注册语言模块
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('java', java);
hljs.registerLanguage('go', go);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('php', php);
hljs.registerLanguage('c', c);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);  // 使用 xml 作为 HTML 语言的注册

/**
 * 高亮代码块
 * @param {string} code - 需要高亮的代码
 * @param {string} language - 代码语言类型
 * @returns {string} 高亮后的 HTML
 */
export const highlightCode = (code, language) => {
    try {
        // 尝试高亮指定语言
        const result = hljs.highlight(language, code);
        return result.value;  // 返回高亮后的 HTML
    } catch (error) {
        // 如果语言不支持，自动检测并高亮
        console.error(`Highlight.js error for ${language}:`, error);
        try {
            // 自动检测并高亮
            const result = hljs.highlightAuto(code);
            return result.value;
        } catch (autoError) {
            // 如果自动检测也失败，默认使用 bash 进行高亮
            console.error('Auto detection failed, using bash as default:', autoError);
            const result = hljs.highlight('bash', code); // 回退到 bash 语言
            return result.value;
        }
    }
};