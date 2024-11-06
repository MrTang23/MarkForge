// index.js
import lexer from './lexer.js';
import parser from './parser.js';
import renderAST from './renderer.js';
import './styles.css';

const markdownToHTML = (markdown) => {
    const tokens = lexer(markdown);
    const ast = parser(tokens);
    return renderAST(ast);
};

export default markdownToHTML;