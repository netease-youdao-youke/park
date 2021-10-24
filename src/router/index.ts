import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Presentation from '../views/Presentation.vue';
import ParkingLotMap from '../views/ParkingLotMap.vue';

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
  },
  {
    path: '/parkingLot',
    name: "/parkingLot",
    component: ParkingLotMap,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
