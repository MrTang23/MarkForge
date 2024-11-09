// src/store.js
import {createStore} from 'vuex';

const store = createStore({
    state() {
        return {
            outline: [],  // 存储 Markdown 大纲
            showOutline: false
        };
    },
    mutations: {
        setOutline(state, outline) {
            state.outline = outline;
        },
        setShowOutline(state, showOutline) {
            state.showOutline = showOutline;
        }
    },
    actions: {
        updateOutline({commit}, outline) {
            commit('setOutline', outline);  // 通过 commit mutation 来更新大纲
        },
        updateShowOutline({commit}, showOutline) {
            commit('setShowOutline', showOutline);
        }
    },
    getters: {
        getOutline(state) {
            return state.outline;  // 获取大纲
        },
        getShowOutline(state) {
            return state.showOutline;
        }
    }
});

export default store;