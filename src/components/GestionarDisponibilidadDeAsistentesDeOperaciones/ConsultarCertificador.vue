<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Consultar Certificador</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <div v-if="certificador">
              <p><strong>Usuario ID:</strong> {{ certificador.fkUsuario }}</p>
              <p><strong>Tipo de Inspección:</strong> {{ certificador.fkTipoInspeccion }}</p>
              <p><strong>Fecha de Emisión:</strong> {{ certificador.fechaEmisionCertificado }}</p>
              <p><strong>Fecha de Vencimiento:</strong> {{ certificador.fechaVencimientoCertificado }}</p>
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
        certificador: null,
      };
    },
    created() {
      this.fetchCertificador();
    },
    methods: {
      async fetchCertificador() {
        try {
          const response = await axios.get(`https://localhost:7006/api/CertificadoresDisponibles/${this.id}`);
          this.certificador = response.data;
        } catch (error) {
          console.error('Error fetching certificador:', error);
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
  