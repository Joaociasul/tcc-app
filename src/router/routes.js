const routes = [{
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/Login.vue")
    }],
  },
  {
    path: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/Index.vue")
    }],
  },
  {
    path: "/companies",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      path: "",
      component: () => import("src/pages/company/Company.vue")
    }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
