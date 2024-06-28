<template>
  <div class="inspeccion-pendiente">
    <h2 class="text-center">Servicios de Inspección Pendientes</h2>
    <div v-if="loading" class="text-center">Cargando...</div>
    <div v-else>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div class="row">
        <div v-for="servicio in sortedServicios" :key="servicio.pkInspeccion" class="col-md-12 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ servicio.titulo }}</h5>
              <p class="card-text"><strong>Nombre:</strong> {{ servicio.nombre }}</p>
              <p class="card-text"><strong>Razon Social:</strong> {{ servicio.razonSocial }}</p>
              <p class="card-text"><strong>Fecha y Hora de Inicio:</strong> {{ new Date(servicio.fechaHoraInicio).toLocaleString() }}</p>
              <p class="card-text"><strong>Fecha y Hora de Finalización:</strong> {{ new Date(servicio.fechaHoraFinalizacion).toLocaleString() }}</p>
              <p class="card-text"><strong>Ubicacion:</strong> {{ new Date(servicio.Ubicacion).toLocaleString() }}</p>
              <button class="btn btn-primary" @click="openModal(servicio)">Registrar Documentación</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!servicios.length" class="text-center">No hay servicios pendientes.</div>
    </div>

    <b-modal v-model="showModal" title="Registrar Documentación" @hide="closeModal">
      <EditarDocumentacion :inspeccion="selectedServicio" @close="closeModal" />
    </b-modal>
  </div>
</template>

<script>
import EditarDocumentacion from './RegistrarDocumentacion.vue';
import { BModal } from 'bootstrap-vue-next';

export default {
  name: 'InspeccionPendiente',
  components: {
    EditarDocumentacion,
    BModal,
  },
  data() {
    return {
      servicios: [],
      selectedServicio: null,
      showModal: false,
      loading: true,
      error: null,
    };
  },
  computed: {
    sortedServicios() {
      return this.servicios.sort((a, b) => new Date(a.fechaHoraInicio) - new Date(b.fechaHoraInicio));
    }
  },
  created() {
    this.fetchServiciosPendientes();
  },
  methods: {
    async fetchServiciosPendientes() {
      try {
        const usuarioId = localStorage.getItem('id_usuario');
        const response = await this.$axios.get(`/AgendaDeUsuario/TareasComoInspector-Fechas/${usuarioId}`);
        this.servicios = response.data;
      } catch (error) {
        this.error = 'Error al cargar los servicios pendientes.';
      } finally {
        this.loading = false;
      }
    },
    openModal(servicio) {
      this.selectedServicio = servicio;
      this.showModal = true;
    },
    closeModal() {
      this.selectedServicio = null;
      this.showModal = false;
    }
  },
};
</script>

<style scoped>
.inspeccion-pendiente {
  margin-top: 20px;
}
</style>
