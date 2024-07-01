<template>
  <div class="container mt-5">
    <h1>Agendar Cita</h1>
    <button class="btn btn-primary" @click="showModal = true">Agendar Servicio</button>

    <!-- Aquí se incluye el componente de calendario -->
    <Calendar />

    <SeleccionarServicio
      v-if="showModal"
      @close="showModal = false"
      @serviceSelected="handleServiceSelected"
    />

    <SeleccionarTipoInspeccion
      v-if="showInspeccionModal"
      @close="showInspeccionModal = false"
      @inspectionSelected="handleInspectionSelected"
    />

    <VerificarEmpresa
      v-if="showVerificarEmpresaModal"
      @close="showVerificarEmpresaModal = false"
      @empresaVerificada="handleEmpresaVerificada"
      @empresaNoEncontrada="showRegistrarEmpresaModal = true"
    />

    <RegistrarEmpresa
      v-if="showRegistrarEmpresaModal"
      @close="showRegistrarEmpresaModal = false"
      @empresaRegistrada="handleEmpresaRegistrada"
    />

    <ListarVehiculos
      v-if="showListarVehiculosModal"
      :ruc="empresaRuc"
      @close="showListarVehiculosModal = false"
      @vehiculoSeleccionado="handleVehiculoSeleccionado"
      @agregarVehiculo="showAgregarVehiculoModal = true"
    />

    <AgregarVehiculo
      v-if="showAgregarVehiculoModal"
      :fkEmpresas="fkEmpresas"
      @close="showAgregarVehiculoModal = false"
      @vehiculoAgregado="handleVehiculoAgregado"
    />

    <ListarInspectores
      v-if="showListarInspectoresModal"
      :tipoInspeccionId="selectedInspectionId"
      @close="showListarInspectoresModal = false"
      @turnSelected="handleTurnSelected"
    />

    <SeleccionarCertificador
      v-if="showSeleccionarCertificadorModal"
      :fechaYHora="selectedDate"
      :tipoInspeccionId="selectedInspectionId"
      :idInspectoresAsignados="idInspectoresAsignados"
      @close="showSeleccionarCertificadorModal = false"
      @certificadorSeleccionado="handleCertificadorSeleccionado"
    />

    <IngresarDireccion
      v-if="showIngresarDireccionModal"
      @close="showIngresarDireccionModal = false"
      @addressSelected="handleAddressSelected"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import Calendar from '../../components/AgendarCita/Calendar.vue';
import SeleccionarServicio from '../../components/AgendarCita/SeleccionarServicio.vue';
import SeleccionarTipoInspeccion from '../../components/AgendarCita/SeleccionarTipoInspeccion.vue';
import VerificarEmpresa from '../../components/AgendarCita/VerificarEmpresa.vue';
import RegistrarEmpresa from '../../components/AgendarCita/RegistrarEmpresa.vue';
import ListarVehiculos from '../../components/AgendarCita/ListarVehiculos.vue';
import AgregarVehiculo from '../../components/AgendarCita/AgregarVehiculo.vue';
import ListarInspectores from '../../components/AgendarCita/ListarInspectores.vue';
import SeleccionarCertificador from '../../components/AgendarCita/SeleccionarCertificador.vue';
import IngresarDireccion from '../../components/AgendarCita/IngresarDireccion.vue';

export default {
  components: {
    Calendar,
    SeleccionarServicio,
    SeleccionarTipoInspeccion,
    VerificarEmpresa,
    RegistrarEmpresa,
    ListarVehiculos,
    AgregarVehiculo,
    ListarInspectores,
    SeleccionarCertificador,
    IngresarDireccion,
  },
  setup() {
    const showModal = ref(false);
    const showInspeccionModal = ref(false);
    const showVerificarEmpresaModal = ref(false);
    const showRegistrarEmpresaModal = ref(false);
    const showListarVehiculosModal = ref(false);
    const showAgregarVehiculoModal = ref(false);
    const showListarInspectoresModal = ref(false);
    const showSeleccionarCertificadorModal = ref(false);
    const showIngresarDireccionModal = ref(false);
    const empresaRuc = ref('');
    const selectedInspectionId = ref(null);
    const selectedDate = ref('');
    const selectedTurno = ref('');
    const idInspectoresAsignados = ref(null);
    const selectedCertificadorId = ref(null);
    const selectedAddress = ref('');
    const selectedVehiculoId = ref(null);
    const fkServicio = ref(null);
    const fkEmpresas = ref(null);

    const handleServiceSelected = async (service) => {
      try {
        const response = await axios.post('AgendarCita/RegistrarServicio', {
          fkTipoServicio: service.pkTiposServicio,
          fechaAgendada: new Date().toISOString().split('T')[0], // Fecha de hoy en formato YYYY-MM-DD
        });
        fkServicio.value = response.data.pkServicio;
        console.log('Servicio registrado:', response.data);
        if (service.nombre === 'Inspeccion') {
          showInspeccionModal.value = true;
        }
      } catch (error) {
        console.error('Error al registrar el servicio:', error);
      }
      showModal.value = false;
    };

    const handleInspectionSelected = (inspection) => {
      selectedInspectionId.value = inspection.pkTipoInspeccion;
      showVerificarEmpresaModal.value = true;
      showInspeccionModal.value = false;
    };

    const handleEmpresaVerificada = (empresa) => {
      console.log('Empresa verificada:', empresa);
      empresaRuc.value = empresa.ruc;
      fkEmpresas.value = empresa.pkEmpresas;
      showVerificarEmpresaModal.value = false;
      showListarVehiculosModal.value = true;
    };

    const handleEmpresaRegistrada = (empresa) => {
      console.log('Empresa registrada:', empresa);
      empresaRuc.value = empresa.ruc;
      fkEmpresas.value = empresa.pkEmpresas;
      showRegistrarEmpresaModal.value = false;
      showListarVehiculosModal.value = true;
    };

    const handleVehiculoSeleccionado = (vehiculo) => {
      console.log('Vehículo seleccionado:', vehiculo);
      selectedVehiculoId.value = vehiculo.pkVehiculo;
      showListarVehiculosModal.value = false;
      showListarInspectoresModal.value = true;
    };

    const handleVehiculoAgregado = (vehiculo) => {
      console.log('Vehículo agregado:', vehiculo);
      selectedVehiculoId.value = vehiculo.pkVehiculo;
      showAgregarVehiculoModal.value = false;
      showListarVehiculosModal.value = false;
      showListarInspectoresModal.value = true;
    };

    const handleTurnSelected = ({ fechaYHora, turno, idInspectoresAsignados: asignacionId }) => {
      selectedDate.value = fechaYHora;
      selectedTurno.value = turno;
      idInspectoresAsignados.value = asignacionId;
      showListarInspectoresModal.value = false;
      showSeleccionarCertificadorModal.value = true;
    };

    const handleCertificadorSeleccionado = (certificador) => {
      console.log('Certificador seleccionado:', certificador);
      selectedCertificadorId.value = certificador.pkCertificadoresDisponibles;
      showSeleccionarCertificadorModal.value = false;
      showIngresarDireccionModal.value = true;
    };

    const handleAddressSelected = async (address) => {
      console.log('Dirección seleccionada:', address);
      selectedAddress.value = address;
      showIngresarDireccionModal.value = false;

      // Registrar la inspección
      try {
        const date = new Date(selectedDate.value);
        let fechaHoraInicio, fechaHoraFinalizacion;

        if (selectedTurno.value === 'Mañana') {
          fechaHoraInicio = new Date(date.setHours(8, 0, 0, 0)).toISOString();
          fechaHoraFinalizacion = new Date(date.setHours(12, 0, 0, 0)).toISOString();
        } else if (selectedTurno.value === 'Tarde') {
          fechaHoraInicio = new Date(date.setHours(13, 0, 0, 0)).toISOString();
          fechaHoraFinalizacion = new Date(date.setHours(18, 0, 0, 0)).toISOString();
        }

        const inspeccionData = {
          pkInspeccion: 0,
          fkServicio: fkServicio.value,
          fkEmpresas: fkEmpresas.value,
          fkCertificadorAsignado: selectedCertificadorId.value,
          fkTipoInspeccion: selectedInspectionId.value,
          fkInspectoresAsignados: idInspectoresAsignados.value,
          fechaInspeccion: selectedDate.value.split('T')[0], // Fecha en formato YYYY-MM-DD
          ubicacion: selectedAddress.value,
          documentacion: "",
          estado: "Pendiente",
          fkVehiculo: selectedVehiculoId.value,
          observacionesYRecomendaciones: "",
          fechaHoraInicio: fechaHoraInicio,
          fechaHoraFinalizacion: fechaHoraFinalizacion,
          fechaHoraEntrada: null,
          fechaHoraSalida: null,
          fechaHoraRegistroInspeccion: new Date().toISOString()
        };

        const response = await axios.post('/AgendarCita/RegistrarInspeccion', inspeccionData);
        console.log('Inspección registrada:', response.data);
      } catch (error) {
        console.error('Error al registrar la inspección:', error);
      }
    };

    return {
      showModal,
      showInspeccionModal,
      showVerificarEmpresaModal,
      showRegistrarEmpresaModal,
      showListarVehiculosModal,
      showAgregarVehiculoModal,
      showListarInspectoresModal,
      showSeleccionarCertificadorModal,
      showIngresarDireccionModal,
      empresaRuc,
      selectedInspectionId,
      selectedDate,
      selectedTurno,
      idInspectoresAsignados,
      selectedCertificadorId,
      selectedAddress,
      selectedVehiculoId,
      fkServicio,
      fkEmpresas,
      handleServiceSelected,
      handleInspectionSelected,
      handleEmpresaVerificada,
      handleEmpresaRegistrada,
      handleVehiculoSeleccionado,
      handleVehiculoAgregado,
      handleTurnSelected,
      handleCertificadorSeleccionado,
      handleAddressSelected,
    };
  },
};
</script>

<style scoped>
/* Estilos personalizados si es necesario */
</style>
