<script setup>
import "@mdi/font/css/materialdesignicons.min.css";
import { ref } from "vue";
import router from "@/router";

const ListOfOptions = ref([{ text: "Sair", value: "logout" }]);

const NavigateTo = (route) => {
  if (route === "logout") {
    router.push("login");
  }
};

const navigateHome = () => {
  router.push({ name: "ambiente" }); // Redireciona para a rota 'home'
};
</script>
<template>
  <v-app-bar color="#24BDFE" prominent>
    <v-col cols="4">
      <v-app-bar-nav-icon
        variant="text"
        @click="$emit('changeShowDrawer')"
      ></v-app-bar-nav-icon>
    </v-col>
    <v-col cols="4" class="d-flex justify-center align-center h-100">
      <img src="/src/assets/imgs/Logo_corrida.png" class="img-logo" @click="navigateHome" />
    </v-col>
    <v-col cols="4" class="d-flex justify-end align-center">
      <v-menu offset="1">
        <template v-slot:activator="{ props }">
          <v-avatar
            style="background-color: #f1f3f9; color: #000000"
            shape="circle"
          >
            <v-btn
              class="btn-example"
              icon="mdi-account"
              v-bind="props"
            ></v-btn>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in ListOfOptions"
            @click="NavigateTo(item.value)"
            :key="index"
            :value="index"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-app-bar>
</template>
<style>
.img-logo {
  height: 65px;
  width: 270px;
    cursor: pointer;

}
.h-100 {
  height: 100%;
}
</style>
