<template>
  <div class="container pt-5">
    <h1>Certificados de Asistentes de Operaciones</h1>
    <button class="btn btn-primary mb-3" @click="showRegistrarModal = true">Registrar Certificado</button>

    <!-- Tabla Certificadores Disponibles -->
    <h2>Certificadores Disponibles</h2>
    <div class="row mb-3">
      <div class="col-auto">
        <div class="input-group input-group-sm">
          <label for="certificador-filter" class="input-group-text">Filtrar por Usuario ID:</label>
          <input type="text" class="form-control" id="certificador-filter" v-model="certificadorFilter">
        </div>
      </div>
    </div>
    <table id="certificadores-table" class="table table-striped" style="width:100%">
      <thead>
        <tr>
          <th>Usuario ID</th>
          <th>Tipo de Inspección</th>
          <th>Fecha de Emisión</th>
          <th>Fecha de Vencimiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="certificador in paginatedCertificadores" :key="certificador.pkCertificadoresDisponibles">
          <td>{{ certificador.fkUsuario }}</td>
          <td>{{ certificador.fkTipoInspeccion }}</td>
          <td>{{ certificador.fechaEmisionCertificado }}</td>
          <td>{{ certificador.fechaVencimientoCertificado }}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="consultarCertificador(certificador.pkCertificadoresDisponibles)">Consultar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination pagination-sm">
        <li class="page-item" :class="{ disabled: certificadorCurrentPage === 1 }">
          <button class="page-link" @click="prevCertificadorPage" :disabled="certificadorCurrentPage === 1">Anterior</button>
        </li>
        <li class="page-item" :class="{ disabled: certificadorCurrentPage === certificadorTotalPages }">
          <button class="page-link" @click="nextCertificadorPage" :disabled="certificadorCurrentPage === certificadorTotalPages">Siguiente</button>
        </li>
      </ul>
    </nav>
    <ConsultarCertificador v-if="showConsultarCertificadorModal" @close="showConsultarCertificadorModal = false" :id="certificadorToConsultar" />

    <!-- Tabla Inspectores Disponibles -->
    <h2>Inspectores Disponibles</h2>
    <div class="row mb-3">
      <div class="col-auto">
        <div class="input-group input-group-sm">
          <label for="inspector-filter" class="input-group-text">Filtrar por Usuario ID:</label>
          <input type="text" class="form-control" id="inspector-filter" v-model="inspectorFilter">
        </div>
      </div>
    </div>
    <table id="inspectores-table" class="table table-striped" style="width:100%">
      <thead>
        <tr>
          <th>Usuario ID</th>
          <th>Tipo de Inspección</th>
          <th>Fecha de Emisión</th>
          <th>Fecha de Vencimiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="inspector in paginatedInspectores" :key="inspector.pkInpectoresDisponibles">
          <td>{{ inspector.fkUsuario }}</td>
          <td>{{ inspector.fkTipoInspeccion }}</td>
          <td>{{ inspector.fechaEmisionCertificado }}</td>
          <td>{{ inspector.fechaVencimientoCertificado }}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="consultarInspector(inspector.pkInpectoresDisponibles)">Consultar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination pagination-sm">
        <li class="page-item" :class="{ disabled: inspectorCurrentPage === 1 }">
          <button class="page-link" @click="prevInspectorPage" :disabled="inspectorCurrentPage === 1">Anterior</button>
        </li>
        <li class="page-item" :class="{ disabled: inspectorCurrentPage === inspectorTotalPages }">
          <button class="page-link" @click="nextInspectorPage" :disabled="inspectorCurrentPage === inspectorTotalPages">Siguiente</button>
        </li>
      </ul>
    </nav>
    <ConsultarInspector v-if="showConsultarInspectorModal" @close="showConsultarInspectorModal = false" :id="inspectorToConsultar" />

    <!-- Tabla Docentes Disponibles -->
    <h2>Docentes Disponibles</h2>
    <div class="row mb-3">
      <div class="col-auto">
        <div class="input-group input-group-sm">
          <label for="docente-filter" class="input-group-text">Filtrar por Usuario ID:</label>
          <input type="text" class="form-control" id="docente-filter" v-model="docenteFilter">
        </div>
      </div>
    </div>
    <table id="docentes-table" class="table table-striped" style="width:100%">
      <thead>
        <tr>
          <th>Usuario ID</th>
          <th>Asignatura Certificada</th>
          <th>Fecha de Emisión</th>
          <th>Fecha de Vencimiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="docente in paginatedDocentes" :key="docente.pkDocenteDisponibles">
          <td>{{ docente.fkUsuario }}</td>
          <td>{{ docente.fkAsinaturaCertificada }}</td>
          <td>{{ docente.fechaEmisionCertificado }}</td>
          <td>{{ docente.fechaVencimientoCertificado }}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="consultarDocente(docente.pkDocenteDisponibles)">Consultar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination pagination-sm">
        <li class="page-item" :class="{ disabled: docenteCurrentPage === 1 }">
          <button class="page-link" @click="prevDocentePage" :disabled="docenteCurrentPage === 1">Anterior</button>
        </li>
        <li class="page-item" :class="{ disabled: docenteCurrentPage === docenteTotalPages }">
          <button class="page-link" @click="nextDocentePage" :disabled="docenteCurrentPage === docenteTotalPages">Siguiente</button>
        </li>
      </ul>
    </nav>
    <ConsultarDocente v-if="showConsultarDocenteModal" @close="showConsultarDocenteModal = false" :id="docenteToConsultar" />

    <!-- Modal para registrar certificado -->
    <RegistrarCertificado v-if="showRegistrarModal" @close="showRegistrarModal = false" @certificado-registered="fetchAllData" />
  </div>
</template>

<script>
import axios from 'axios';
import ConsultarCertificador from '@/components/GestionarDisponibilidadDeAsistentesDeOperaciones/ConsultarCertificador.vue';
import ConsultarInspector from '@/components/GestionarDisponibilidadDeAsistentesDeOperaciones/ConsultarInspector.vue';
import ConsultarDocente from '@/components/GestionarDisponibilidadDeAsistentesDeOperaciones/ConsultarDocente.vue';
import RegistrarCertificado from '@/components/GestionarDisponibilidadDeAsistentesDeOperaciones/RegistrarCertificado.vue';

export default {
  components: {
    ConsultarCertificador,
    ConsultarInspector,
    ConsultarDocente,
    RegistrarCertificado
  },
  data() {
    return {
      certificadores: [],
      certificadorFilter: '',
      certificadorPageSize: 10,
      certificadorCurrentPage: 1,
      certificadorPageSizes: [5, 10, 15, 20],
      showConsultarCertificadorModal: false,
      certificadorToConsultar: null,

      inspectores: [],
      inspectorFilter: '',
      inspectorPageSize: 10,
      inspectorCurrentPage: 1,
      inspectorPageSizes: [5, 10, 15, 20],
      showConsultarInspectorModal: false,
      inspectorToConsultar: null,

      docentes: [],
      docenteFilter: '',
      docentePageSize: 10,
      docenteCurrentPage: 1,
      docentePageSizes: [5, 10, 15, 20],
      showConsultarDocenteModal: false,
      docenteToConsultar: null,

      showRegistrarModal: false
    };
  },
  created() {
    this.fetchAllData();
  },
  computed: {
    filteredCertificadores() {
      return this.certificadores.filter(certificador =>
        certificador.fkUsuario.toString().includes(this.certificadorFilter)
      );
    },
    certificadorTotalPages() {
      return Math.ceil(this.filteredCertificadores.length / this.certificadorPageSize);
    },
    paginatedCertificadores() {
      const start = (this.certificadorCurrentPage - 1) * this.certificadorPageSize;
      const end = start + this.certificadorPageSize;
      return this.filteredCertificadores.slice(start, end);
    },

    filteredInspectores() {
      return this.inspectores.filter(inspector =>
        inspector.fkUsuario.toString().includes(this.inspectorFilter)
      );
    },
    inspectorTotalPages() {
      return Math.ceil(this.filteredInspectores.length / this.inspectorPageSize);
    },
    paginatedInspectores() {
      const start = (this.inspectorCurrentPage - 1) * this.inspectorPageSize;
      const end = start + this.inspectorPageSize;
      return this.filteredInspectores.slice(start, end);
    },

    filteredDocentes() {
      return this.docentes.filter(docente =>
        docente.fkUsuario.toString().includes(this.docenteFilter)
      );
    },
    docenteTotalPages() {
      return Math.ceil(this.filteredDocentes.length / this.docentePageSize);
    },
    paginatedDocentes() {
      const start = (this.docenteCurrentPage - 1) * this.docentePageSize;
      const end = start + this.docentePageSize;
      return this.filteredDocentes.slice(start, end);
    },
  },
  methods: {
    async fetchAllData() {
      await this.fetchCertificadores();
      await this.fetchInspectores();
      await this.fetchDocentes();
    },
    async fetchCertificadores() {
      try {
        const response = await axios.get('https://localhost:7006/api/CertificadoresDisponibles');
        this.certificadores = response.data;
      } catch (error) {
        console.error('Error fetching certificadores:', error);
      }
    },
    prevCertificadorPage() {
      if (this.certificadorCurrentPage > 1) {
        this.certificadorCurrentPage--;
      }
    },
    nextCertificadorPage() {
      if (this.certificadorCurrentPage < this.certificadorTotalPages) {
        this.certificadorCurrentPage++;
      }
    },
    consultarCertificador(id) {
      this.certificadorToConsultar = id;
      this.showConsultarCertificadorModal = true;
    },

    async fetchInspectores() {
      try {
        const response = await axios.get('https://localhost:7006/api/InspectoresDisponibles');
        this.inspectores = response.data;
      } catch (error) {
        console.error('Error fetching inspectores:', error);
      }
    },
    prevInspectorPage() {
      if (this.inspectorCurrentPage > 1) {
        this.inspectorCurrentPage--;
      }
    },
    nextInspectorPage() {
      if (this.inspectorCurrentPage < this.inspectorTotalPages) {
        this.inspectorCurrentPage++;
      }
    },
    consultarInspector(id) {
      this.inspectorToConsultar = id;
      this.showConsultarInspectorModal = true;
    },

    async fetchDocentes() {
      try {
        const response = await axios.get('https://localhost:7006/api/DocenteDisponibles');
        this.docentes = response.data;
      } catch (error) {
        console.error('Error fetching docentes:', error);
      }
    },
    prevDocentePage() {
      if (this.docenteCurrentPage > 1) {
        this.docenteCurrentPage--;
      }
    },
    nextDocentePage() {
      if (this.docenteCurrentPage < this.docenteTotalPages) {
        this.docenteCurrentPage++;
      }
    },
    consultarDocente(id) {
      this.docenteToConsultar = id;
      this.showConsultarDocenteModal = true;
    }
  }
};
</script>

<style>
/* Agregar estilos personalizados si es necesario */
</style>
