<template>
  <div class="modal show d-block" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Seleccionar Servicio</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="serviceType" class="form-label">Tipo de Servicio</label>
            <select class="form-select" v-model="selectedService">
              <option value="">Seleccione un servicio</option>
              <option v-for="tipo in tiposServicio" :key="tipo.pkTiposServicio" :value="tipo">
                {{ tipo.nombre }}
              </option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="selectService">Seleccionar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup(_, { emit }) {
    const tiposServicio = ref([]);
    const selectedService = ref('');

    onMounted(async () => {
      const response = await axios.get('/AgendarCita/TiposServicio');
      tiposServicio.value = response.data;
    });

    const selectService = () => {
      emit('serviceSelected', selectedService.value);
    };

    return {
      tiposServicio,
      selectedService,
      selectService,
    };
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
