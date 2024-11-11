import {createStore} from 'vuex';

const store = createStore({
    state() {
        return {
            outline: [],  // 存储 Markdown 大纲
            showOutline: false,
            itemContent: {}
        };
    },
    mutations: {
        setOutline(state, outline) {
            state.outline = outline;
        },
        setShowOutline(state, showOutline) {
            state.showOutline = showOutline;
        },
        setItemContent(state, itemContent) {
            state.itemContent = itemContent;
        }
    },
    actions: {
        updateOutline({commit}, outline) {
            commit('setOutline', outline);
        },
        updateShowOutline({commit}, showOutline) {
            commit('setShowOutline', showOutline);
        },
        updateItemContent({commit}, itemContent) {
            commit('setItemContent', itemContent);
        }
    },
    getters: {
        getOutline(state) {
            return state.outline;  // 获取大纲
        },
        getShowOutline(state) {
            return state.showOutline;
        },
        getItemContent(state) {
            return state.itemContent;
        }
    }
});

export default store;