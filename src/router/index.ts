import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Presentation from '../views/Presentation.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/presentation',
    name: "/Presentation",
    component: Presentation,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
