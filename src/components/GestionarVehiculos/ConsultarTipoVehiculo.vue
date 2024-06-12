<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detalles del Tipo de Vehículo</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <p><strong>ID:</strong> {{ tipoDeVehiculo.pkTipoDeVehiculos }}</p>
            <p><strong>Tipo de Vehículo:</strong> {{ tipoDeVehiculo.tipoDeVehiculo1 }}</p>
            <p><strong>Capacidad de Carga:</strong> {{ tipoDeVehiculo.capacidadCarga }} kg</p>
            <p><strong>Especificaciones Técnicas:</strong></p>
            <pre>{{ tipoDeVehiculo.descripcion }}</pre>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['tipoDeVehiculoId'],
    data() {
      return {
        tipoDeVehiculo: {}
      };
    },
    created() {
      this.fetchTipoDeVehiculo();
    },
    methods: {
      async fetchTipoDeVehiculo() {
        try {
          const response = await axios.get(`https://localhost:7006/api/TipoDeVehiculoes/${this.tipoDeVehiculoId}`);
          this.tipoDeVehiculo = response.data;
        } catch (error) {
          console.error('Error fetching tipo de vehiculo:', error);
        }
      }
    }
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
  