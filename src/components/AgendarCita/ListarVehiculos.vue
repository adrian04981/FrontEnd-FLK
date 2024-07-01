<template>
    <div class="modal show d-block" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Lista de Vehículos</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Fabricante</th>
                  <th>Modelo</th>
                  <th>Número de Serie</th>
                  <th>Marca</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="vehiculo in vehiculos" :key="vehiculo.pkVehiculo">
                  <td>{{ vehiculo.fabricante }}</td>
                  <td>{{ vehiculo.modelo }}</td>
                  <td>{{ vehiculo.numeroSerie }}</td>
                  <td>{{ vehiculo.marca }}</td>
                  <td><button class="btn btn-primary" @click="seleccionarVehiculo(vehiculo.pkVehiculo)">Seleccionar</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="$emit('agregarVehiculo')">Agregar Vehículo</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    props: ['ruc'],
    setup(props, { emit }) {
      const vehiculos = ref([]);
  
      onMounted(async () => {
        const response = await axios.get(`AgendarCita/VehiculosPorRuc/${props.ruc}`);
        vehiculos.value = response.data;
      });
  
      const seleccionarVehiculo = (vehiculo) => {
        emit('vehiculoSeleccionado', vehiculo);
      };
  
      return {
        vehiculos,
        seleccionarVehiculo,
      };
    },
  };
  </script>
  
  <style scoped>
  .modal {
    background-color: rgba(0, 0, 0, 0.5);
  }
  </style>
  