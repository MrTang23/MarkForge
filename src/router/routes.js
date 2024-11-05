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
        component: () => import("../components/FileContent.vue"),
    },
    {
        path: "/",
        name: "welcome",
        component: () => import("../views/Welcome.vue"),

    }
];