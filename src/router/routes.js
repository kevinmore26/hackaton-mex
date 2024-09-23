const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    beforeEnter: (to, from, next) => {
      // Redirige a la ruta de login
      if (to.path === "/") {
        // Redirige solo si la ruta actual es "/"
        next("/homepage");
      } else {
        // En cualquier otro caso, permite la navegación
        next();
      }
    },
    children: [
      {
        path: "homepage",
        component: () =>
          import("../modules/Analytics/views/AnalyticsHomeView.vue"),
      }, 
      
      // {
      //   path: "settings",
      //   name: "settings", // Asegúrate de tener el nombre de la ruta
      //   component: () =>
      //     import("../modules/ScrapModule/views/SettingsView.vue"),
      // },
    ],
  },
  {
    path: "/login",
    component: () => import("../modules/Analytics/views/LoginView.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
