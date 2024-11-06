// src/store.js
import {createStore} from 'vuex';

const store = createStore({
    state() {
        return {
            outline: []  // 存储 Markdown 大纲
        };
    },
    mutations: {
        setOutline(state, outline) {
            state.outline = outline;
        }
    },
    actions: {
        updateOutline({commit}, outline) {
            commit('setOutline', outline);  // 通过 commit mutation 来更新大纲
        }
    },
    getters: {
        getOutline(state) {
            return state.outline;  // 获取大纲
        }
    }
});

export default store;