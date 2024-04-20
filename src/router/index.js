/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:14:45
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-04-20 18:33:28
 * @Description: 路由配置
 */
import {
  createRouter,
  createWebHashHistory,
} from "vue-router";

const routes = [
  { 
    path: "/", 
    name: "Index", 
    component: () => import("@/views/Index.vue"),
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("@/views/Main.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
