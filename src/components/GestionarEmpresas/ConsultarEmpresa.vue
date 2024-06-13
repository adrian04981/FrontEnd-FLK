<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Consultar Empresa</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <div v-if="empresa">
              <p><strong>RUC:</strong> {{ empresa.ruc }}</p>
              <p><strong>Nombre:</strong> {{ empresa.nombre }}</p>
              <p><strong>Razón Social:</strong> {{ empresa.razonSocial }}</p>
              <p><strong>Email:</strong> {{ empresa.email }}</p>
              <p><strong>Dirección:</strong> {{ empresa.direccion }}</p>
              <p><strong>Teléfono:</strong> {{ empresa.telefono }}</p>
            </div>
            <div v-else>
              <p>Cargando...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['id'],
    data() {
      return {
        empresa: null,
      };
    },
    created() {
      this.fetchEmpresa();
    },
    methods: {
      async fetchEmpresa() {
        try {
          const response = await axios.get(`https://localhost:7006/api/Empresas/${this.id}`);
          this.empresa = response.data;
        } catch (error) {
          console.error('Error fetching empresa:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
  }
  </style>
  