<template>
  <v-dialog v-model="internalVisible" max-width="600px">
    <v-card>
      <v-card-title class="headline">
        <v-icon large color="blue" class="mr-2">mdi-pencil</v-icon>
        Editar Ambiente
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="modalData.name"
          label="Nome do Ambiente"
          variant="underlined"
          required
        ></v-text-field>
        <v-text-field
          v-model="modalData.place"
          label="Local"
          variant="underlined"
          required
        ></v-text-field>
        <v-select
          :items="Locations"
          item-title="name"
          item-value="id"
          label="Tipo do Ambiente"
          v-model="modalData.locationType"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="btn-modal" dark @click="saveChanges">Salvar</v-btn>
        <v-btn class="btn-modal" dark @click="closeModal">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import getAllLocations from '@/services/LocationTypeService';
import LocationService from '@/services/LocationService'
import { ref, reactive, watch, onMounted } from 'vue';

// Definindo props diretamente
const props = defineProps({
  isVisible: Boolean,
  initialData: Object,
  environmentTypes: Array 
});

// Emit function to send events
const emit = defineEmits(['update:isVisible', 'save']);

const internalVisible = ref(props.isVisible);
const Locations = ref([]);
const modalData = reactive({
  id: '',
  name: '',
  place: '',
  locationType: '',
  locationTypeId: '',
});

const getLocations = async () => {
  try {
    Locations.value = await getAllLocations();
  } catch {
    console.log("Deu erro!")
  }
};

const closeModal = () => {
  emit('update:isVisible', false);
};

const saveChanges = async () => {
  const locationData = {
    id: modalData.id,
    name: modalData.name,
    place: modalData.place,
    typeOfEnviroment: modalData.locationTypeId
  };

  console.log(locationData)

  try {
    await LocationService.updateLocation(locationData);
    internalVisible.value = false;
    resetModalData();
  } catch (error) {
    console.error('Erro ao salvar ambiente:', error);
  } finally {
    getLocations();

  }
  emit('save');
  closeModal();
};

const resetModalData = () => {
  modalData.id = '';
  modalData.name = '';
  modalData.place = '';
  modalData.locationType = '';
  modalData.locationTypeId = '';
};

watch(() => props.isVisible, (value) => {
  internalVisible.value = value;
  if (value) {
    Object.assign(modalData, props.initialData);
  }
});

watch(internalVisible, (value) => {
  if (!value) {
    closeModal();
  }
});

watch(modalData.locationType, (value) => {
  if (!value) {
    debugger
    modalData.locationTypeId = value.id
  }
});

onMounted(() => {
  getLocations();
});
</script>

<style scoped>
.headline {
  display: flex;
  align-items: center;
}
.mr-2 {
  margin-right: 16px;
}
.btn-modal {
  background-color: #24BDFE;
  color: white;
}
</style>
