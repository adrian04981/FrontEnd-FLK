<template>
  <div class="container">
    <!-- Evaluacion de Inspecciones -->
    <div class="row justify-content-center mt-5">
      <div class="col-10">
        <h2 class="text-center mb-4">Evaluacion de Inspecciones</h2>
        <div class="text-center mb-4">
          <b-button @click="showCreateModal = true" class="btn btn-primary">Crear Inspección</b-button>
        </div>
        <div class="fallout-data-table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="text-white">#</th>
                <th scope="col" class="text-white">Servicio</th>
                <th scope="col" class="text-white">Empresas</th>
                <th scope="col" class="text-white">Tipo de Inspección</th>
                <th scope="col" class="text-white">Fecha Inspección</th>
                <th scope="col" class="text-white">Documentacion</th>
                <th scope="col" class="text-white">Estado</th>
                <th scope="col" class="text-white">Título</th>
                <th scope="col" class="text-white">Nombre</th>
                <th scope="col" class="text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inspeccion in inspeccionList" :key="inspeccion.pkInspeccion">
                <td>{{ inspeccion.pkInspeccion }}</td>
                <td>{{ inspeccion.fkServicio }}</td>
                <td>{{ inspeccion.fkEmpresas }}</td>
                <td>{{ inspeccion.fkTipoInspeccion }}</td>
                <td>{{ inspeccion.fechaInspeccion }}</td>
                <td>{{ inspeccion.documentacion }}</td>
                <td>{{ inspeccion.estado }}</td>
                <td>{{ inspeccion.titulo }}</td>
                <td>{{ inspeccion.nombre }}</td>
                <td>
                  <b-button @click="showInspeccion(inspeccion)" variant="info">Consultar</b-button>
                  <b-button @click="editInspeccion(inspeccion)" variant="warning" class="mr-2">Editar</b-button>
                  <b-button @click="registerObservations(inspeccion)" variant="success" class="mr-2">Registrar Observaciones</b-button>
                  <b-button @click="confirmDeleteInspeccion(inspeccion)" variant="danger">Eliminar</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal para Consultar Inspección -->
    <b-modal v-if="selectedInspeccion" v-model="showModal" title="Consultar Inspección" @hide="clearSelectedInspeccion">
      <ConsultarInspeccion :inspeccion="selectedInspeccion" />
    </b-modal>

    <!-- Modal para Editar Inspección -->
    <b-modal v-if="editInspeccionData" v-model="showEditModal" title="Editar Inspección" @hide="clearEditInspeccion">
      <EditarInspeccion :inspeccion="editInspeccionData" @update="updateInspeccion" />
    </b-modal>

    <!-- Modal para Registrar Observaciones -->
    <b-modal v-if="observationInspeccionData" v-model="showObservationModal" title="Registrar Observaciones" @hide="clearObservationInspeccion">
      <RegistrarObservaciones :inspeccion="observationInspeccionData" @update="updateInspeccion" />
    </b-modal>

    <!-- Modal para Crear Inspección -->
    <b-modal v-model="showCreateModal" title="Crear Inspección" @hide="clearCreateInspeccion">
      <b-form @submit.prevent="createInspeccion">
        <!-- Formulario de Creación de Inspección aquí -->
      </b-form>
    </b-modal>
  </div>
</template>

<script>

import axios from 'axios';
import ConsultarInspeccion from '@/components/EvaluaciondeInspeccionC/ConsultarInspeccionE.vue';
import EditarInspeccion from '@/components/EvaluaciondeInspeccionC/EditarInspeccionE.vue';
import RegistrarObservaciones from '@/components/EvaluaciondeInspeccionC/RegistrarObservacionInsp.vue';

export default {
  components: {
    ConsultarInspeccion,
    EditarInspeccion,
    RegistrarObservaciones
  },
  data() {
    return {
      inspeccionList: [],
      selectedInspeccion: null,
      showModal: false,
      editInspeccionData: null,
      showEditModal: false,
      observationInspeccionData: null,
      showObservationModal: false,
      newInspeccion: {
        fkServicio: '',
        fkEmpresas: '',
        fkCertificadorAsignado: '',
        fkTipoInspeccion: '',
        fkInspectoresAsignados: '',
        fechaInspeccion: '',
        ubicacion: '',
        documentacion: '',
        estado: '',
        fkVehiculo: '',
        observacionesYRecomendaciones: '',
      },
      showCreateModal: false,
    };
  },
  methods: {
    fetchInspecciones() {
      const id_usuario = localStorage.getItem('id_usuario'); // Asegúrate de que el id_usuario está almacenado en localStorage
      fetch(`https://localhost:7006/api/Inspecciones/CertificadoresDisponibles/${id_usuario}`)
        .then(response => response.json())
        .then(data => {
          this.inspeccionList = data;
        })
        .catch(error => console.error('Error fetching usuarios:', error));
    },
    showInspeccion(inspeccion) {
      this.selectedInspeccion = inspeccion;
      this.showModal = true;
    },
    editInspeccion(inspeccion) {
      this.editInspeccionData = { ...inspeccion };
      this.showEditModal = true;
    },
    registerObservations(inspeccion) {
      this.observationInspeccionData = { ...inspeccion };
      this.showObservationModal = true;
    },
    updateInspeccion(updatedInspeccion) {
      fetch(`https://localhost:7006/api/Inspecciones/${updatedInspeccion.pkInspeccion}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInspeccion),
      })
        .then(response => response.json())
        .then(() => {
          this.fetchInspecciones();
          this.showEditModal = false;
          this.showObservationModal = false;
        })
        .catch(error => console.error('Error updating inspeccion:', error));
    },
    confirmDeleteInspeccion(inspeccion) {
      if (confirm('¿Está seguro de que desea eliminar esta inspección?')) {
        this.deleteInspeccion(inspeccion.pkInspeccion);
      }
    },
    deleteInspeccion(pkInspeccion) {
      fetch(`https://localhost:7006/api/Inspecciones//${pkInspeccion}/`, {
        method: 'DELETE',
      })
        .then(() => {
          this.fetchInspecciones();
        })
        .catch(error => console.error('Error deleting inspeccion:', error));
    },
    createInspeccion() {
      fetch('https://localhost:7006/api/Inspecciones/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newInspeccion),
      })
        .then(response => response.json())
        .then(() => {
          this.fetchInspecciones();
          this.showCreateModal = false;
          this.newInspeccion = {
            fkServicio: '',
            fkEmpresas: '',
            fkCertificadorAsignado: '',
            fkTipoInspeccion: '',
            fkInspectoresAsignados: '',
            fechaInspeccion: '',
            ubicacion: '',
            documentacion: '',
            estado: '',
            fkVehiculo: '',
            observacionesYRecomendaciones: '',
          };
        })
        .catch(error => console.error('Error creating inspeccion:', error));
    },
    clearSelectedInspeccion() {
      this.selectedInspeccion = null;
    },
    clearEditInspeccion() {
      this.editInspeccionData = null;
    },
    clearObservationInspeccion() {
      this.observationInspeccionData = null;
    },
    clearCreateInspeccion() {
      this.newInspeccion = {
        fkServicio: '',
        fkEmpresas: '',
        fkCertificadorAsignado: '',
        fkTipoInspeccion: '',
        fkInspectoresAsignados: '',
        fechaInspeccion: '',
        ubicacion: '',
        documentacion: '',
        estado: '',
        fkVehiculo: '',
        observacionesYRecomendaciones: '',
      };
    },
  },
  mounted() {
    this.fetchInspecciones();
  },
};
</script>

<style scoped>
.fallout-data-table .table {
  background-color: #343a40;
}
.fallout-data-table .text-white {
  color: white;
}
</style>
