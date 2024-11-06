// lexer.js
// 词法分析器
const lexer = (markdown) => {
    const tokens = [];
    const lines = markdown.split('\n');
    let isCodeBlock = false;
    let codeBlockContent = [];
    let codeBlockLanguage = 'bash'; // 默认语言

    lines.forEach(line => {
        if (isCodeBlock) {
            if (line.trim() === '```') {
                tokens.push({
                    type: 'codeBlock',
                    language: codeBlockLanguage || 'bash',
                    content: codeBlockContent.join('\n'),
                });
                codeBlockContent = [];
                codeBlockLanguage = 'bash';
                isCodeBlock = false;
            } else {
                codeBlockContent.push(line);
            }
            return;
        }

        const codeBlockStartMatch = line.trim().match(/^```(\w*)?/);
        if (codeBlockStartMatch) {
            isCodeBlock = true;
            codeBlockLanguage = codeBlockStartMatch[1] || 'bash';
            return;
        }

        const headingRegex = /^(#{1,6})\s+(.*)$/;
        const headingMatch = line.match(headingRegex);
        if (headingMatch) {
            tokens.push({
                type: 'heading',
                level: headingMatch[1].length,
                text: headingMatch[2],
            });
            return;
        }

        const unorderedListRegex = /^\s*[-*+]\s+(.*)$/;
        const unorderedListMatch = line.match(unorderedListRegex);
        if (unorderedListMatch) {
            tokens.push({type: 'unorderedListItem', text: unorderedListMatch[1]});
            return;
        }

        const orderedListRegex = /^\s*\d+\.\s+(.*)$/;
        const orderedListMatch = line.match(orderedListRegex);
        if (orderedListMatch) {
            tokens.push({type: 'orderedListItem', text: orderedListMatch[1]});
            return;
        }

        const linkRegex = /\[([^\]]+)]\(([^)]+)\)/g;
        const imageRegex = /!\[([^\]]*)]\(([^)]+)\)/g;
        if (line.match(imageRegex)) {
            tokens.push({type: 'image', alt: line.match(imageRegex)[1], src: line.match(imageRegex)[2]});
            return;
        } else if (line.match(linkRegex)) {
            tokens.push({type: 'link', text: line.match(linkRegex)[1], href: line.match(linkRegex)[2]});
            return;
        }

        if (line.trim() !== '') {
            tokens.push({type: 'paragraph', text: line});
        }
    });

    return tokens;
};

export default lexer;