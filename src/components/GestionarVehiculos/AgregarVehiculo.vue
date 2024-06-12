<template>
  <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Agregar Vehículo</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="agregarVehiculo">
            <div class="mb-3">
              <label for="fabricante" class="form-label">Fabricante</label>
              <input type="text" class="form-control" id="fabricante" v-model="vehiculo.fabricante" required>
            </div>
            <div class="mb-3">
              <label for="modelo" class="form-label">Modelo</label>
              <input type="text" class="form-control" id="modelo" v-model="vehiculo.modelo" required>
            </div>
            <div class="mb-3">
              <label for="numeroSerie" class="form-label">Número de Serie</label>
              <input type="text" class="form-control" id="numeroSerie" v-model="vehiculo.numeroSerie" required>
            </div>
            <div class="mb-3">
              <label for="marca" class="form-label">Marca</label>
              <input type="text" class="form-control" id="marca" v-model="vehiculo.marca" required>
            </div>
            <div class="mb-3">
              <label for="tipoVehiculo" class="form-label">Tipo de Vehículo</label>
              <select class="form-select" id="tipoVehiculo" v-model="vehiculo.fkTipoDeVehiculos" required>
                <option value="" disabled>Seleccione un tipo de vehículo</option>
                <option v-for="tipo in tipos" :key="tipo.pkTipoDeVehiculos" :value="tipo.pkTipoDeVehiculos">{{ tipo.tipoDeVehiculo1 }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="empresa" class="form-label">Empresa</label>
              <select class="form-select" id="empresa" v-model="vehiculo.fkEmpresas" required>
                <option value="" disabled>Seleccione una empresa</option>
                <option v-for="empresa in empresas" :key="empresa.pkEmpresas" :value="empresa.pkEmpresas">{{ empresa.nombre }}</option>
              </select>
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
  props: ['tipos', 'empresas'],
  data() {
    return {
      vehiculo: {
        pkVehiculo: 0,
        fabricante: '',
        modelo: '',
        numeroSerie: '',
        marca: '',
        fkTipoDeVehiculos: '',
        fkEmpresas: '',
      }
    };
  },
  methods: {
    async agregarVehiculo() {
      try {
        await axios.post('https://localhost:7006/api/Vehiculoes', this.vehiculo);
        this.$emit('vehiculo-agregado');
        this.$emit('close');
      } catch (error) {
        console.error('Error agregando vehículo:', error);
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
