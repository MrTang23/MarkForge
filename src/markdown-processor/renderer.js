// renderer.js
// 渲染器
import escapeHTML from './escapeHTML.js';

const renderAST = (ast) => {
    let html = '';

    ast.forEach(node => {
        switch (node.type) {
            case 'heading':
                html += `<h${node.level}>${escapeHTML(node.text)}</h${node.level}>`;
                break;
            case 'unorderedListItem':
                html += `<ul><li>${escapeHTML(node.text)}</li></ul>`;
                break;
            case 'orderedListItem':
                html += `<ol><li>${escapeHTML(node.text)}</li></ol>`;
                break;
            case 'codeBlock':
                html += `<pre><code class="language-${node.language}">${escapeHTML(node.content)}</code></pre>`;
                break;
            case 'paragraph':
                html += `<p>${escapeHTML(node.text)}</p>`;
                break;
            case 'image':
                html += `<img src="${escapeHTML(node.src)}" alt="${escapeHTML(node.alt)}"/>`;
                break;
            case 'link':
                html += `<a href="${escapeHTML(node.href)}">${escapeHTML(node.text)}</a>`;
                break;
        }
    });

    return html;
};

export default renderAST;