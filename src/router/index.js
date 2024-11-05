import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHashHistory(), // 使用 hash 模式，URL 中带有 #
  routes,
});

export default router;