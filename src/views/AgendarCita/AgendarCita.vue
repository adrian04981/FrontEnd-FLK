<template>
  <div class="container pt-5">
    <h1>Agendar Cita</h1>
    <button class="btn btn-primary" @click="showAgendarServicioModal = true">Agendar Servicio</button>

    <AgendarServicio
      v-if="showAgendarServicioModal"
      @close="showAgendarServicioModal = false"
      @servicio-agendado="onServicioAgendado"
    />

    <VerificarCliente
      v-if="showVerificarClienteModal"
      @close="showVerificarClienteModal = false"
      @cliente-verificado="onClienteVerificado"
      @cliente-no-encontrado="onClienteNoEncontrado"
    />

    <RegistrarEmpresa
      v-if="showRegistrarEmpresaModal"
      :ruc="ruc"
      @close="showRegistrarEmpresaModal = false"
      @empresa-registrada="onEmpresaRegistrada"
    />

    <RegistrarInspeccion
      v-if="showRegistrarInspeccionModal"
      :pkServicio="pkServicio"
      :pkEmpresas="pkEmpresas"
      @close="showRegistrarInspeccionModal = false"
      @inspeccion-registrada="onInspeccionRegistrada"
    />

    <EnProgreso v-if="showEnProgresoModal" @close="showEnProgresoModal = false" />
  </div>
</template>

<script>
import AgendarServicio from '@/components/AgendarCita/AgendarServicio.vue';
import VerificarCliente from '@/components/AgendarCita/VerificarCliente.vue';
import RegistrarEmpresa from '@/components/AgendarCita/RegistrarEmpresa.vue';
import RegistrarInspeccion from '@/components/AgendarCita/RegistrarInspeccion.vue';
import EnProgreso from '@/components/AgendarCita/EnProgreso.vue';

export default {
  components: {
    AgendarServicio,
    VerificarCliente,
    RegistrarEmpresa,
    RegistrarInspeccion,
    EnProgreso
  },
  data() {
    return {
      showAgendarServicioModal: false,
      showVerificarClienteModal: false,
      showRegistrarEmpresaModal: false,
      showRegistrarInspeccionModal: false,
      showEnProgresoModal: false,
      pkServicio: null,
      pkEmpresas: null,
      ruc: '',
      fkTipoServicio: null
    };
  },
  methods: {
    onServicioAgendado(pkServicio, fkTipoServicio) {
      this.pkServicio = pkServicio;
      this.fkTipoServicio = fkTipoServicio;
      this.showAgendarServicioModal = false;
      if (fkTipoServicio === 2) {
        this.showEnProgresoModal = true;
      } else {
        this.showVerificarClienteModal = true;
      }
    },
    onClienteVerificado(pkEmpresas) {
      this.pkEmpresas = pkEmpresas;
      this.showVerificarClienteModal = false;
      this.showRegistrarInspeccionModal = true;
    },
    onClienteNoEncontrado(ruc) {
      this.ruc = ruc;
      this.showVerificarClienteModal = false;
      this.showRegistrarEmpresaModal = true;
    },
    onEmpresaRegistrada(pkEmpresas) {
      this.pkEmpresas = pkEmpresas;
      this.showRegistrarEmpresaModal = false;
      this.showRegistrarInspeccionModal = true;
    },
    onInspeccionRegistrada() {
      this.showRegistrarInspeccionModal = false;
      alert('Inspección registrada con éxito');
    }
  }
};
</script>

<style scoped>
/* Agregar estilos personalizados si es necesario */
</style>
