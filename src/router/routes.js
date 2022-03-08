const routes = [{
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{
      path: "",
      component: () => import("pages/Login.vue")
    }],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{
      path: "home",
      component: () => import("pages/Index.vue")
    }, {
      path: "companies",
      component: () => import("src/pages/company/Company.vue")
    }, {
      path: "products",
      component: () => import("src/pages/product/Product.vue")
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
