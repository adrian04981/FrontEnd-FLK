<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Consultar Inspector</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <div v-if="inspector">
              <p><strong>Usuario ID:</strong> {{ inspector.fkUsuario }}</p>
              <p><strong>Tipo de Inspección:</strong> {{ inspector.fkTipoInspeccion }}</p>
              <p><strong>Fecha de Emisión:</strong> {{ inspector.fechaEmisionCertificado }}</p>
              <p><strong>Fecha de Vencimiento:</strong> {{ inspector.fechaVencimientoCertificado }}</p>
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
        inspector: null,
      };
    },
    created() {
      this.fetchInspector();
    },
    methods: {
      async fetchInspector() {
        try {
          const response = await axios.get(`https://localhost:7006/api/InspectoresDisponibles/${this.id}`);
          this.inspector = response.data;
        } catch (error) {
          console.error('Error fetching inspector:', error);
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
  