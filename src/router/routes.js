// routes.js
// 该文件用来书写并导出路由结构

export default [
    {
        path: "/index",
        name: "index",
        redirect: "/",
    },
    {
        path: "/file",
        name: "file",
        component: () => import("../views/FileContent.vue"),
    },
    {
        path: "/",
        name: "welcome",
        component: () => import("../views/Welcome.vue"),
    },
    {
        path: "/file-content",
        name: "file-content",
        component: () => import("../views/FileContent.vue"),
    }
];