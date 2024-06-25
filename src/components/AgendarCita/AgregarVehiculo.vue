<template>
  <div class="modal show d-block" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Agregar Vehículo</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="agregarVehiculo">
            <div class="mb-3">
              <label for="fabricante" class="form-label">Fabricante</label>
              <input type="text" class="form-control" v-model="vehiculo.fabricante" />
            </div>
            <div class="mb-3">
              <label for="modelo" class="form-label">Modelo</label>
              <input type="text" class="form-control" v-model="vehiculo.modelo" />
            </div>
            <div class="mb-3">
              <label for="numeroSerie" class="form-label">Número de Serie</label>
              <input type="text" class="form-control" v-model="vehiculo.numeroSerie" />
            </div>
            <div class="mb-3">
              <label for="marca" class="form-label">Marca</label>
              <input type="text" class="form-control" v-model="vehiculo.marca" />
            </div>
            <div class="mb-3">
              <label for="fkTipoDeVehiculos" class="form-label">Tipo de Vehículo</label>
              <input type="number" class="form-control" v-model="vehiculo.fkTipoDeVehiculos" />
            </div>
            <button type="submit" class="btn btn-primary">Agregar</button>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  props: ['ruc'],
  setup(props, { emit }) {
    const vehiculo = ref({
      fabricante: '',
      modelo: '',
      numeroSerie: '',
      marca: '',
      fkTipoDeVehiculos: 0,
      fkEmpresas: 0,
    });

    const agregarVehiculo = async () => {
      vehiculo.value.fkEmpresas = props.ruc;
      try {
        const response = await axios.post('/AgendarCita/RegistrarVehiculo', vehiculo.value);
        console.log('Vehículo agregado:', response.data);
        emit('vehiculoAgregado', response.data);
      } catch (error) {
        console.error('Error al agregar el vehículo:', error);
      }
    };

    return {
      vehiculo,
      agregarVehiculo,
    };
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
