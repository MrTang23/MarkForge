// escapeHTML.js
const escapeHTML = (str) => {
    if (typeof str !== 'string') return ''; // 如果 str 不是字符串，返回空字符串
    return str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

export default escapeHTML;