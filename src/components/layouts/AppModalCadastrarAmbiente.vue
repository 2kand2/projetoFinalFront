<template>
  <v-dialog v-model="internalVisible" max-width="600px">
    <v-card>
      <v-card-title class="headline">
        <v-icon large color="blue" class="mr-2">mdi-home-plus</v-icon>
        Cadastrar Ambiente
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="modalData.name"
          label="Nome do Ambiente"
          variant="underlined"
          required
        ></v-text-field>
        <v-text-field
          v-model="modalData.local"
          label="Local"
          variant="underlined"
          required
        ></v-text-field>
        <v-select
          :items="environmentTypes"
          item-title="name"
          itemid="id"
          return-object
          label="Tipo do Ambiente"
          v-model="modalData.typeAmbiente"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="btn-modal" dark @click="saveEnvironment">Salvar</v-btn>
        <v-btn class="btn-modal" dark @click="closeModal">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import getAllLocations from '@/services/LocationTypeService'
import LocationService from '@/services/LocationService'
import { ref } from 'vue';

const showToast = ref(false);
const showToastM = ref("");
const environmentTypes = ref([])

const getLocations = async () => {
  try {
    environmentTypes.value = await getAllLocations();
  } catch{
    showToastMessage("ocorreu um erro ao ler os dados.")
    
  }
}
const showToastMessage = (message)=>{
  showToastM.value = message;
  showToast.value = true;

}
export default {
  mounted(){
  getLocations();
  },
  name: 'AppModalCadastrarAmbiente',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      internalVisible: this.isVisible,
      modalData: {
        name: '',
        local: '',
        typeAmbiente: ''
      },
      environmentTypes
    };
  },
  watch: {
    isVisible(newVal) {
      this.internalVisible = newVal;
    },
    internalVisible(newVal) {
      this.$emit('update:isVisible', newVal);
    }
  },
  methods: {

    async saveEnvironment() {
      const locationData = {
          name: this.modalData.name,
          place: this.modalData.local,
          typeOfEnviroment: this.modalData.typeAmbiente.id 
        };
      try {
        const createdLocation = await LocationService.createLocations(locationData);
        this.internalVisible = false;
        this.resetModalData();
        console.log('Localização criada:', createdLocation);
      } catch (error) {
        console.error('Erro ao salvar ambiente:', error);
      }
      this.$emit("save");
    },
    closeModal() {
      this.internalVisible = false;
      this.resetModalData();
    },
    resetModalData() {
      this.modalData = {
        name: '',
        local: '',
        typeAmbiente: ''
      };
    }
  }
}
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
