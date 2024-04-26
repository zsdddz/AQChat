/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:14:45
 * @LastEditors: zsdddz hitd@foxmail.com
 * @LastEditTime: 2024-04-24 00:03:07
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
    component: () => import("@/views/Index/index.vue"),
  },
  { 
    path: "/", 
    name: "IM", 
    component: () => import("@/views/IM/index.vue"),
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("@/views/Main.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
