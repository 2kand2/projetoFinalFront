<script setup>
import AppLayout from "@/components/layouts/AppLayout.vue";
import AppNavigation from "@/components/layouts/AppNavigation.vue";
import { computed, ref } from "vue";
import router from "./router";

const ShowDrawer = ref(false);


const ListDrawer = ref([
  {
    title: "Ambientes",
    value: "ambiente",
    icon: "mdi-layers",
  },
  {
    title: "Patrimônios",
    value: "patrimony",
    icon: "mdi-currency-usd",
  },
]);

const pathRoute = ref("");

// Função para lidar com a navegação
function navigateTo(value) {
  router.push({ name: value });
}

function ToggleShowDrawer() {
  ShowDrawer.value = !ShowDrawer.value;
}

pathRoute.value = router.currentRoute.value.name;

const IsLoginPath = computed(() => {
  return router.currentRoute.value.name == "login";
});
</script>
<template>
  <app-layout>
    <template v-slot:header v-if="!IsLoginPath">
      <AppNavigation @changeShowDrawer="ToggleShowDrawer" />
    </template>

    <template v-slot:drawer>
      <v-navigation-drawer color="#24BDFE" v-model="ShowDrawer">
        <template v-slot:prepend>
          <div class="header-navigation-drawer pa-2">
            <span class="text-white">Menu</span>
          </div>
        </template>
        <v-list color="#FFFFF" base-color="white" title="Menu">
          <v-list-item
            v-for="item in ListDrawer"
            :prepend-icon="item.icon"
            :title="item.title"
            :value="item.value"
            @click="navigateTo(item.value)"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </template>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </app-layout>
</template>
<style>
html {  
  /* overflow-y: hidden !important; */
  background-color: #F1F6F9;
}
.header-navigation-drawer {
  display: flex;
  justify-content: center;
}
.text-white {
  color: white;
  font-weight: bold;
}
</style>
