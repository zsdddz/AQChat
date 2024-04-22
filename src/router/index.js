/*
 * @Author: howcode 1051495009@qq.com
 * @Date: 2024-04-20 18:14:45
 * @LastEditors: howcode 1051495009@qq.com
 * @LastEditTime: 2024-04-22 20:21:10
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
    component: () => import("@/views/Index/Index.vue"),
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("@/views/Main.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/aqchat/"),
  routes,
});

export default router;
