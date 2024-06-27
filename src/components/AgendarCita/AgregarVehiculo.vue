<template>
  <div class="modal show d-block" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Agregar Vehículo</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="registrarVehiculo">
            <div class="mb-3">
              <label for="fabricante" class="form-label">Fabricante</label>
              <input type="text" class="form-control" id="fabricante" v-model="vehiculo.fabricante">
            </div>
            <div class="mb-3">
              <label for="modelo" class="form-label">Modelo</label>
              <input type="text" class="form-control" id="modelo" v-model="vehiculo.modelo">
            </div>
            <div class="mb-3">
              <label for="numeroSerie" class="form-label">Número de Serie</label>
              <input type="text" class="form-control" id="numeroSerie" v-model="vehiculo.numeroSerie">
            </div>
            <div class="mb-3">
              <label for="marca" class="form-label">Marca</label>
              <input type="text" class="form-control" id="marca" v-model="vehiculo.marca">
            </div>
            <div class="mb-3">
              <label for="fkTipoDeVehiculos" class="form-label">Tipo de Vehículo</label>
              <select class="form-control" id="fkTipoDeVehiculos" v-model="vehiculo.fkTipoDeVehiculos">
                <option v-for="tipo in tiposDeVehiculos" :key="tipo.pkTipoDeVehiculos" :value="tipo.pkTipoDeVehiculos">
                  {{ tipo.tipoDeVehiculo1 }}
                </option>
              </select>
              <small v-if="vehiculo.fkTipoDeVehiculos" class="form-text text-muted">
                {{ getDescripcionTipoVehiculo(vehiculo.fkTipoDeVehiculos) }}
              </small>
            </div>
            <button type="submit" class="btn btn-primary">Registrar Vehículo</button>
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
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  props: ['fkEmpresas'],
  setup(props, { emit }) {
    const vehiculo = ref({
      fabricante: '',
      modelo: '',
      numeroSerie: '',
      marca: '',
      fkTipoDeVehiculos: null,
      fkEmpresas: props.fkEmpresas
    });

    const tiposDeVehiculos = ref([]);

    onMounted(async () => {
      try {
        const response = await axios.get('/TipoDeVehiculoes');
        tiposDeVehiculos.value = response.data;
      } catch (error) {
        console.error('Error al obtener los tipos de vehículos:', error);
      }
    });

    const getDescripcionTipoVehiculo = (id) => {
      const tipo = tiposDeVehiculos.value.find(tipo => tipo.pkTipoDeVehiculos === id);
      return tipo ? tipo.descripcion : '';
    };

    const registrarVehiculo = async () => {
      try {
        vehiculo.value.fkEmpresas = props.fkEmpresas;
        const response = await axios.post('/AgendarCita/RegistrarVehiculo', vehiculo.value);
        console.log('Vehículo registrado:', response.data);
        emit('vehiculoAgregado', response.data);
      } catch (error) {
        console.error('Error al registrar el vehículo:', error);
      }
    };

    return {
      vehiculo,
      tiposDeVehiculos,
      getDescripcionTipoVehiculo,
      registrarVehiculo
    };
  }
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
