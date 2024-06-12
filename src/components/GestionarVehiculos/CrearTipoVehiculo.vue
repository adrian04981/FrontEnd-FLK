<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Agregar Tipo de Vehículo</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="agregarTipoVehiculo">
              <div class="mb-3">
                <label for="tipoDeVehiculo" class="form-label">Tipo de Vehículo</label>
                <input type="text" class="form-control" id="tipoDeVehiculo" v-model="tipoDeVehiculo.tipoDeVehiculo1" required>
              </div>
              <div class="mb-3">
                <label for="capacidadCarga" class="form-label">Capacidad de Carga (kg)</label>
                <input type="number" class="form-control" id="capacidadCarga" v-model="tipoDeVehiculo.capacidadCarga" required>
              </div>
              <div class="mb-3">
                <label for="descripcion" class="form-label">Especificaciones Técnicas</label>
                <textarea class="form-control" id="descripcion" v-model="tipoDeVehiculo.descripcion" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Agregar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        tipoDeVehiculo: {
          pkTipoDeVehiculos: 0,
          tipoDeVehiculo1: '',
          capacidadCarga: 0,
          descripcion: '',
        }
      };
    },
    methods: {
      async agregarTipoVehiculo() {
        try {
          await axios.post('https://localhost:7006/api/TipoDeVehiculoes', this.tipoDeVehiculo);
          this.$emit('tipo-vehiculo-agregado');
          this.$emit('close');
        } catch (error) {
          console.error('Error agregando tipo de vehículo:', error);
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
  