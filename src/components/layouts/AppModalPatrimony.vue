<!-- AppModalCadastrarAmbiente.vue -->
<template>
    <v-dialog v-model="internalVisible" max-width="600px">
      <v-card>
        <v-card-title class="headline">
          <v-icon large color="blue" class="mr-2">mdi-monitor</v-icon>
          Cadastrar Patrimonio
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="modalData.name"
            label="Nome do Patrimonio"
            variant="underlined"
            required
          ></v-text-field>
          <v-text-field
            v-model="modalData.numberSerial"
            label="Numero de Sérial"
            variant="underlined"
          ></v-text-field>
          <v-text-field
            v-model="modalData.codePatrimony"
            label="Codigo do Patrimônio"
            variant="underlined"
            required
          ></v-text-field>
          <v-select
            v-model="modalData.state"
            :items="conditionTypes"
            label="Condição"
            required
          ></v-select>
          <v-select
            v-model="modalData.typePatrimony"
            :items="patrimonioTypes"
            label="Tipo do Patrimonio"
            required
          ></v-select>
          <v-select
            v-model="modalData.environment"
            :items="environmentRegistered"
            label="Amvbiente"
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn-modal" dark @click="savePatrimony">Salvar</v-btn>
          <v-btn class="btn-modal" dark @click="closeModal">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
export default {
  name: 'AppModalPatrimony',
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
        numberSerial: '',
        codePatrimony: '',
        state: '',
        typePatrimony: '',
        environment: ''
      },
      conditionTypes: ['Novo', 'Bom estado', 'Desgastado', 'Quebrado', 'Manutenção'],
      patrimonioTypes: ['Notebook', 'Tablet', 'Projetor', 'Mesa', 'Cadeira', 'Ar-condicionado', 'Desktop', 'Cabo', 'Móveis Geral', 'Quadro', 'Carregador', 'Plataforma de Carga'],
      environmentRegistered : ['Salab12','Estoque', 'Biblioteca', 'Secretaria', 'Auditorio']
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
    savePatrimony() {
      this.$emit('save', this.modalData); // Emitindo evento para salvar o patrimônio
      this.resetModalData();
      this.closeModal();
    },
    closeModal() {
      this.internalVisible = false;
      this.resetModalData();
    },
    resetModalData() {
      this.modalData = {
        name: '',
        numberSerial: '',
        codePatrimony: '',
        state: '',
        typePatrimony: '',
        environment: ''
      }
    }
  }
};
</script>
  
  <style scoped>
  .headline {
    display: flex;
    align-items: center;
  }
  .mr-2 {
    margin-right: 16px;
  }
  .btn-modal{
  background-color: #24BDFE;
  color: white;
  }
  </style>
  