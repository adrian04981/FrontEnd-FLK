<template>
  <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Registrar Inspección</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="registrarInspeccion">
            <div class="mb-3">
              <label for="fechaInspeccion" class="form-label">Fecha de Inspección</label>
              <input type="date" class="form-control" v-model="fechaInspeccion" required>
            </div>
            <div class="mb-3">
              <label for="ubicacion" class="form-label">Ubicación</label>
              <input type="text" class="form-control" v-model="ubicacion" required>
            </div>
            <div class="mb-3">
              <label for="tipoInspeccion" class="form-label">Tipo de Inspección</label>
              <select class="form-select" v-model="fkTipoInspeccion" required>
                <option v-for="tipo in tiposInspeccion" :key="tipo.pkTipoInspeccion" :value="tipo.pkTipoInspeccion">
                  {{ tipo.titulo }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['pkServicio', 'pkEmpresas'],
  data() {
    return {
      fechaInspeccion: '',
      ubicacion: '',
      fkTipoInspeccion: null,
      tiposInspeccion: []
    };
  },
  created() {
    this.fetchTiposInspeccion();
  },
  methods: {
    async fetchTiposInspeccion() {
      try {
        const response = await axios.get('https://localhost:7006/api/TipoInspeccions');
        this.tiposInspeccion = response.data;
      } catch (error) {
        console.error('Error fetching tipos de inspeccion:', error);
      }
    },
    async registrarInspeccion() {
      try {
        await axios.post('https://localhost:7006/api/Inspecciones', {
          pkInspeccion: 0,
          fkServicio: this.pkServicio,
          fkEmpresas: this.pkEmpresas,
          fkCertificadorAsignado: null,
          fkTipoInspeccion: this.fkTipoInspeccion,
          fkInspectoresAsignados: null,
          fechaInspeccion: this.fechaInspeccion,
          ubicacion: this.ubicacion,
          documentacion: null,
          estado: 'Pendiente',
          fkVehiculo: null,
          observacionesYRecomendaciones: null
        });
        this.$emit('inspeccion-registrada', this.fkTipoInspeccion);
        this.$emit('close');
      } catch (error) {
        console.error('Error registrando inspección:', error);
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
