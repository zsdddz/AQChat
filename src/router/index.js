/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:14:45
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-06-12 15:56:26
 * @Description: 路由配置
 */
import {
  createRouter,
  createWebHistory,
} from "vue-router";

const routes = [
  { 
    path: "/", 
    name: "Index", 
    component: () => import("@/views/index/index.vue"),
  },
  { 
    path: "/im", 
    name: "IM", 
    component: () => import("@/views/im/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
