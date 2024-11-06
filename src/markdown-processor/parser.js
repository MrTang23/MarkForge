// parser.js
// 语法分析器
const parser = (tokens) => {
    const ast = [];

    tokens.forEach(token => {
        switch (token.type) {
            case 'heading':
                ast.push({ type: 'heading', level: token.level, text: token.text });
                break;
            case 'unorderedListItem':
                ast.push({ type: 'unorderedListItem', text: token.text });
                break;
            case 'orderedListItem':
                ast.push({ type: 'orderedListItem', text: token.text });
                break;
            case 'codeBlock':
                ast.push({ type: 'codeBlock', language: token.language, content: token.content });
                break;
            case 'paragraph':
                ast.push({ type: 'paragraph', text: token.text });
                break;
            case 'image':
                ast.push({ type: 'image', alt: token.alt, src: token.src });
                break;
            case 'link':
                ast.push({ type: 'link', text: token.text, href: token.href });
                break;
            default:
                console.warn(`未识别的标记类型: ${token.type}`);
                break;
        }
    });

    return ast;
};

export default parser;