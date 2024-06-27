import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@/stores";

// components
import LoginView from "@/views/LoginView.vue"
import HomeView from "@/views/HomeView.vue"
import { DefaultConfig } from '@/services/authService/RouterService';
import AmbienteView from "@/views/AmbienteView.vue";
import AmbienteDetails from "@/views/AmbienteDetails.vue";
import PatrimonyView from "@/views/PatrimonyView.vue";


const IfIsAuthenticated = async (to, from, next)=>{
  // debugger;
  if(await DefaultConfig()){
    next();
    return;
  }

    next("/login");
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: { path: "login" },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/ambiente",
      name: "ambiente",
      component: AmbienteView,
      beforeEnter: IfIsAuthenticated

    },
    {
      path: "/ambiente/:id",
      name: "ambientedetails",
      component: AmbienteDetails,
      beforeEnter: IfIsAuthenticated
    },
    {
      path: "/patrimony",
      name: "patrimony",
      component: PatrimonyView,
      beforeEnter: IfIsAuthenticated
    },
    {
      path: "/v",
      name: "home",
      component: HomeView,
      beforeEnter: IfIsAuthenticated
    },
  ],
});

export default router;
