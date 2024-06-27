<template>
    <v-dialog v-model="internalVisible" max-width="600px" persistent>
      <v-card>
        <v-card-title class="headline">
          <v-icon large color="blue" class="mr-4">mdi-home-plus</v-icon>
          Detalhes Ambiente
        </v-card-title>
        <v-card-text>
          <div>
            <strong>Nome:</strong> {{ name }} <br>
            <strong>Local:</strong> {{ place }} <br>
            <strong>Tipo do Ambiente:</strong> {{ locationType }} <br>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="btn-modal" dark @click="closeModal">Sair</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean, // Propriedade para controlar a visibilidade do modal
      name: String,       // Propriedades para receber os dados
      place: String,
      locationType: String
    },
    data() {
      return {
        internalVisible: false  // Estado interno para controlar a visibilidade do v-dialog
      };
    },
    watch: {
      isVisible(value) {
        this.internalVisible = value; // Sincroniza o estado interno com a propriedade externa
      }
    },
    methods: {
      closeModal() {
        this.$emit('update:isVisible', false); // Emite evento para fechar o modal
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
  .btn-modal {
    background-color: #24BDFE;
    color: white;
  }
  </style>
  