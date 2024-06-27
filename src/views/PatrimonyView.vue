<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-space-between align-center w-100">
            <h1 class="text">Patrimônios</h1>
            <v-btn color="#24BDFE" class="register" @click="showModal = true">+Cadastrar Patrimônio</v-btn>
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
              <!-- <v-icon small @click="viewItem(item)" class="icon-action">mdi-eye</v-icon> -->
              <v-icon small @click="editItem(item)" class="icon-action">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)" class="icon-action">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
  
      <!-- Inclusão do componente modal -->
      <AppModalPatrimony
        :isVisible="showModal"
        @update:isVisible="showModal = $event"
        @save="addNewPatrimony"
      />
    </v-container>
  </template>
  
  <script>
  import AppModalPatrimony from '@/components/layouts/AppModalPatrimony.vue';
  
  export default {
    components: {
      AppModalPatrimony
    },
    data() {
      return {
        search: '',
        showModal: false,
        headers: [
          {
            title: 'Nome',
            align: 'start',
            key: 'name',
          },
          {
            title: 'Número serial',
            align: 'center',
            key: 'numberSerial',
          },
          {
            title: 'Código',
            align: 'center',
            key: 'codePatrimony',
          },
          {
            title: 'Tipo',
            align: 'center',
            key: 'typePatrimony',
          },
          {
            title: 'Estado',
            align: 'center',
            key: 'state',
          },
          {
            title: 'Ambiente',
            align: 'center',
            key: 'environment',
          },
          {
            title: 'Ação',
            align: 'center',
            key: 'action',
            sortable: false
          }
        ],
        items: [
        {
  id: '62a3b158-8dd1-42d7-a141-58d58c16f74e',
  name: 'Acer Nitro',
  numberSerial: 'SB12-001',
  codePatrimony: '321',
  typePatrimony: 'Notebook',
  state: 'Novo',
  environment: 'SalaB12',
},
{
  id: '67f9de5d-4e3c-43bf-bd8e-3e06f1f3e7c4',
  name: 'Dell XPS 15',
  numberSerial: 'SB12-002',
  codePatrimony: '322',
  typePatrimony: 'Notebook',
  state: 'Usado',
  environment: 'SalaB12',
},
{
  id: 'c8d5937b-15e6-42f1-987b-787d647f240e',
  name: 'HP Pavilion',
  numberSerial: 'SB12-003',
  codePatrimony: '323',
  typePatrimony: 'Notebook',
  state: 'Novo',
  environment: 'SalaB12',
},
{
  id: 'b4e8fa81-ebc7-49b3-9687-9f06723c0ec7',
  name: 'Lenovo ThinkPad',
  numberSerial: 'SB12-004',
  codePatrimony: '324',
  typePatrimony: 'Notebook',
  state: 'Usado',
  environment: 'SalaB12',
},
{
  id: '34fb8d45-0e99-459e-af55-5464c5a42d43',
  name: 'Asus ROG Strix',
  numberSerial: 'SB12-005',
  codePatrimony: '325',
  typePatrimony: 'Notebook',
  state: 'Novo',
  environment: 'SalaB12',
}

        ]
      }
    },
  
    computed: {
    filteredItems() {
      if (!this.search) {
        return this.items;
      }
      const query = this.search.toUpperCase();
      return this.items.filter(item => {
        return Object.values(item).some(
          value => typeof value === 'string' && value.toUpperCase().includes(query)
        );
      });
    }
  },
  methods: {
    viewItem(item) {
      // Lógica para visualizar item
    },
    editItem(item) {
      // Lógica para editar item
    },
    deleteItem(item) {
      // Lógica para deletar item
    },
    addNewPatrimony(newPatrimony) {
     // Aqui você adiciona o novo patrimônio à lista items
    this.items.push({
        ...newPatrimony,
      });

    this.showModal = false; // Fecha o modal após adicionar o novo patrimônio
    }
  }
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
  