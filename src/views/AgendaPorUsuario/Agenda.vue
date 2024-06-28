<template>
  <div class="agenda container">
    <div class="row">
      <div class="col-md-6">
        <InspeccionPendiente />
      </div>
      <div class="col-md-6">
        <CertificacionPendiente />
      </div>
    </div>
  </div>
</template>

<script>
import InspeccionPendiente from '../../components/AgendaPorUsuario/InspeccionPendiente.vue';
import CertificacionPendiente from '../../components/AgendaPorUsuario/CertificacionPendiente.vue';

export default {
  name: 'Agenda',
  components: {
    InspeccionPendiente,
    CertificacionPendiente,
  },
};
</script>

<style scoped>
.agenda {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}
</style>
