<template>
  <div class="certificacion-pendiente">
    <h2 class="text-center">Servicios de Certificación Pendientes</h2>
    <div v-if="loading" class="text-center">Cargando...</div>
    <div v-else>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div class="row">
        <div v-for="certificacion in sortedCertificaciones" :key="certificacion.pkInspeccion" class="col-md-12 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ certificacion.titulo ? certificacion.titulo : 'Sin título' }}</h5>
              <p class="card-text"><strong>Nombre del Servicio:</strong> {{ certificacion.nombre ? certificacion.nombre : 'No disponible' }}</p>
              <p class="card-text"><strong>Razon Social:</strong> {{ certificacion.razonSocial ? certificacion.razonSocial : 'No disponible' }}</p>
              <p class="card-text"><strong>Certificador Asignado:</strong> {{ certificacion.fkCertificadorAsignado }}</p>
              <button class="btn btn-primary" @click="openModal(certificacion)">Editar</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!certificaciones.length" class="text-center">No hay certificaciones pendientes.</div>
    </div>

    <b-modal v-model="showModal" title="Certificar Inspección" @hide="closeModal">
      <CertificarInspeccion :inspeccion="selectedCertificacion" @close="closeModal" @update="fetchCertificacionesPendientes" />
    </b-modal>
  </div>
</template>

<script>
import CertificarInspeccion from './CertificarInspeccion.vue';
import { BModal } from 'bootstrap-vue-next';

export default {
  name: 'CertificacionPendiente',
  components: {
    CertificarInspeccion,
    BModal,
  },
  data() {
    return {
      certificaciones: [],
      selectedCertificacion: null,
      showModal: false,
      loading: true,
      error: null,
    };
  },
  computed: {
    sortedCertificaciones() {
      return this.certificaciones.sort((a, b) => new Date(a.fechaHoraInicio) - new Date(b.fechaHoraInicio));
    }
  },
  created() {
    this.fetchCertificacionesPendientes();
  },
  methods: {
    async fetchCertificacionesPendientes() {
      try {
        const usuarioId = localStorage.getItem('id_usuario');
        const response = await this.$axios.get(`https://localhost:7006/api/AgendaDeUsuario/ByUserAndCertificador/${usuarioId}`);
        this.certificaciones = response.data.map(inspeccion => ({
          fkServicio: inspeccion.fkServicio,
          nombre: inspeccion.nombre,
          pkInspeccion: inspeccion.pkInspeccion,
          titulo: inspeccion.titulo,
          fkCertificadorAsignado: inspeccion.fkCertificadorAsignado,
          razonSocial: inspeccion.razonSocial,
          observacionesYRecomendaciones: inspeccion.observacionesYRecomendaciones,
          estado: inspeccion.estado,
          fechaHoraInicio: inspeccion.fechaHoraInicio,
          fechaHoraFinalizacion: inspeccion.fechaHoraFinalizacion,
          ubicacion: inspeccion.ubicacion
        }));
      } catch (error) {
        this.error = 'Error al cargar las certificaciones pendientes.';
      } finally {
        this.loading = false;
      }
    },
    openModal(certificacion) {
      this.selectedCertificacion = certificacion;
      this.showModal = true;
    },
    closeModal() {
      this.selectedCertificacion = null;
      this.showModal = false;
    }
  },
};
</script>

<style scoped>
.certificacion-pendiente {
  margin-top: 20px;
}
</style>
