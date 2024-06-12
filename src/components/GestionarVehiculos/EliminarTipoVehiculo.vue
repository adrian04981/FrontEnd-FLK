<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Eliminar Tipo de Vehículo</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro de que quieres eliminar este tipo de vehículo?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="eliminarTipoVehiculo">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['tipoDeVehiculoId'],
    methods: {
      async eliminarTipoVehiculo() {
        try {
          await axios.delete(`https://localhost:7006/api/TipoDeVehiculoes/${this.tipoDeVehiculoId}`);
          this.$emit('tipo-vehiculo-eliminado');
          this.$emit('close');
        } catch (error) {
          console.error('Error eliminando tipo de vehiculo:', error);
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
  