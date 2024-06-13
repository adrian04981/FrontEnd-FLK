<template>
  <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Agendar Servicio</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="agendarServicio">
            <div class="mb-3">
              <label for="tipoServicio" class="form-label">Tipo de Servicio</label>
              <select class="form-select" v-model="fkTipoServicio" required>
                <option v-for="tipo in tiposServicios" :key="tipo.pkTiposServicio" :value="tipo.pkTiposServicio">
                  {{ tipo.nombre }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary">Agendar</button>
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
      tiposServicios: [],
      fkTipoServicio: '',
      fechaAgendada: new Date().toISOString().split('T')[0]
    };
  },
  created() {
    this.fetchTiposServicios();
  },
  methods: {
    async fetchTiposServicios() {
      try {
        const response = await axios.get('https://localhost:7006/api/TiposServicios');
        this.tiposServicios = response.data;
      } catch (error) {
        console.error('Error fetching tipos de servicios:', error);
      }
    },
    async agendarServicio() {
      try {
        const response = await axios.post('https://localhost:7006/api/Servicios', {
          pkServicio: 0,
          fkTipoServicio: this.fkTipoServicio,
          fechaAgendada: this.fechaAgendada
        });
        const pkServicio = response.data.pkServicio;
        this.$emit('servicio-agendado', pkServicio, this.fkTipoServicio);
        this.$emit('close');
      } catch (error) {
        console.error('Error agendando servicio:', error);
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
