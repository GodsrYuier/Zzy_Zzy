import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect: "welcome",
    children: [
      {
        path: "welcome",
        name: "welcome",
        component: () => import("../views/welcome.vue"),
      },
      {
        path: "board",
        name: "board",
        component: () => import("../views/board.vue"),
        meta: {
          title: ["面经后台",'面经管理'],
        },
      },
      {
        path: "manage",
        name: "manage",
        component: () => import("../views/manage.vue"),
        meta: {
          title: ["面经管理",'面经后台'],
        },
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (token && to.path == "/login") {
    next("/");
  } else {
    if (!token && to.path != "/login") {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
