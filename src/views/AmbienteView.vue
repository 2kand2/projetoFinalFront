<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center w-100">
          <h1 class="text">Ambientes</h1>
          <v-btn color="#24BDFE" class="register" dark @click="showModal = true">+Cadastrar Ambiente</v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row class="row-table">
      <v-card class="pa-4" elevation="2">
        <v-data-table
          :headers="headers"
          :items="filteredItems"
          :search="search"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              class="pa-2"
              label="Pesquise!"
            ></v-text-field>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon small @click="viewItem(item)" class="icon-action">mdi-eye</v-icon>
            <v-icon small @click="editItem(item)" class="icon-action">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)" class="icon-action">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <AppModalCadastrarAmbiente
      :isVisible="showModal"
      @update:isVisible="showModal = $event"
      @save="addNewEnvironment"
    />
    <AppModalAmbienteView
      :isVisible="showModalView"
      @update:isVisible="showModalView = $event"
      :name="selectedItem.name"
      :place="selectedItem.place"
      :locationType="selectedItem.locationType"
    />
    <AppModalAmbienteEdit
      :isVisible="showEditModal"
      :initialData="selectedItem"
      :environmentTypes="environmentTypes"
      @update:isVisible="showEditModal = $event"
      @save="updateEnvironment"
    />
  </v-container>
</template>

<script setup>
// Import your modal components
import AppModalCadastrarAmbiente from '@/components/layouts/AppModalCadastrarAmbiente.vue';
import AppModalAmbienteView from '@/components/layouts/AppModalAmbienteView.vue';
import AppModalAmbienteEdit from '@/components/layouts/AppModalAmbienteEdit.vue';
import { computed, onMounted, ref } from 'vue';
import LocationService from '@/services/LocationService';

// Reactive state management
const search = ref('');
const showModal = ref(false);
const showModalView = ref(false);
const showEditModal = ref(false);
const headers = ref([
  { title: 'Nome', align: 'start', key: 'name' },
  { title: 'Local', align: 'center', key: 'place' },
  { title: 'Tipo do Ambiente', align: 'center', key: 'locationType' },
  { title: 'Qtd de Patrimonios', align: 'center', key: 'assetCount' },
  { title: 'Ação', align: 'center', key: 'action', sortable: false },
]);
const items = ref([]);
const selectedItem = ref({});

// Fetch data on mounted
onMounted(async () => {
  try {
    items.value = await LocationService.getAllLocations();
  } catch (error) {
    console.error('Erro ao obter dados:', error);
  }
});

// Computed property for filtered items
const filteredItems = computed(() => {
  if (!search.value) return items.value;
  const query = search.value.toUpperCase();
  return items.value.filter(item =>
    Object.values(item).some(
      value => typeof value === 'string' && value.toUpperCase().includes(query)
    )
  );
});

// Methods for handling modal interactions and data manipulation
const viewItem = async (item) => {
  try {
    selectedItem.value = item;
    showModalView.value = true;
  } catch (error) {
    console.error('Erro ao obter detalhes do ambiente:', error);
  }
};

const editItem = (item) => {
  selectedItem.value = { ...item }; // Clone to avoid mutation
  showEditModal.value = true;
};

const deleteItem = (item) => {
  if (confirm(`Tem certeza que deseja excluir o item: ${item.name}?`)) {
    items.value = items.value.filter(i => i !== item);
    alert(`Item ${item.name} excluído`);
  }
};

const addNewEnvironment = async (newEnvironment) => {
  items.value.push({ ...newEnvironment, qtdPatrimonio: 0 });
  showModal.value = false;
  debugger;
  items.value = await LocationService.getAllLocations();
};

const updateEnvironment = async () =>{
  items.value = await LocationService.getAllLocations();
};
</script>

<style scoped>
.pa-4 {
  width: 100%;
}
.w-100 {
  width: 100%;
}
.icon-action {
  cursor: pointer;
  margin-right: 10px;
}
.register {
  font-weight: bold;
  color: white !important; 
}
</style>
