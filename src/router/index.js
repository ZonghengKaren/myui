import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Dialog from "../views/Dialog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "首页",
    meta: {
      login: false
    },
    component: Home
  },
  {
    path: "/about",
    name: "关于我们",
    meta: {
      login: true
    },
    component: About
  },
  {
    path: "/dialog",
    name: "Dialog",
    meta: {
      login: false
    },
    component: Dialog
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 路由监听 - 跳转之前
router.beforeEach(function(to, from, next) {

  // 检查需要登录的页面
  var meta = to.meta;
  if (meta.login) {
    console.log("needLogin");
    // return;
  }
  next();
});

// 路由监听 - 跳转之后
router.afterEach(function(to) {
  document.title = to.name ? to.name : 'Myui';
});

export default router;
