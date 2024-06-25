<template>
  <div class="modal show d-block" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Seleccionar Tipo de Inspección</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="inspectionType" class="form-label">Tipo de Inspección</label>
            <select class="form-select" v-model="selectedInspection">
              <option value="">Seleccione un tipo de inspección</option>
              <option v-for="tipo in tiposInspeccion" :key="tipo.pkTipoInspeccion" :value="tipo">
                {{ tipo.titulo }}
              </option>
            </select>
            <p v-if="selectedInspection">
              {{ selectedInspection.descripcion }}
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="selectInspection">Seleccionar</button>
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
    const tiposInspeccion = ref([]);
    const selectedInspection = ref(null);

    onMounted(async () => {
      const response = await axios.get('/AgendarCita/TiposInspeccion');
      tiposInspeccion.value = response.data;
    });

    const selectInspection = () => {
      emit('inspectionSelected', selectedInspection.value);
    };

    return {
      tiposInspeccion,
      selectedInspection,
      selectInspection,
    };
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
