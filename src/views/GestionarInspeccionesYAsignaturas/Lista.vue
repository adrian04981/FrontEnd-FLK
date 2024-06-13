<template>
  <div class="container pt-5">
    <h1>Tipos de Inspección</h1>
    <button class="btn btn-primary mb-3" @click="showRegistrarInspeccionModal = true">Registrar Tipo de Inspección</button>
    <div class="row mb-3">
      <div class="col-auto">
        <div class="input-group input-group-sm">
          <label for="inspeccion-filter" class="input-group-text">Filtrar por Título:</label>
          <input type="text" class="form-control" id="inspeccion-filter" v-model="inspeccionFilter">
        </div>
      </div>
    </div>
    <table id="inspecciones-table" class="table table-striped" style="width:100%">
      <thead>
        <tr>
          <th>Título</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="inspeccion in paginatedInspecciones" :key="inspeccion.pkTipoInspeccion">
          <td>{{ inspeccion.titulo }}</td>
          <td>{{ inspeccion.descripcion }}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="consultarInspeccion(inspeccion.pkTipoInspeccion)">Consultar</button>
            <button class="btn btn-warning btn-sm" @click="editarInspeccion(inspeccion.pkTipoInspeccion)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination pagination-sm">
        <li class="page-item" :class="{ disabled: inspeccionCurrentPage === 1 }">
          <button class="page-link" @click="prevInspeccionPage" :disabled="inspeccionCurrentPage === 1">Anterior</button>
        </li>
        <li class="page-item" :class="{ disabled: inspeccionCurrentPage === inspeccionTotalPages }">
          <button class="page-link" @click="nextInspeccionPage" :disabled="inspeccionCurrentPage === inspeccionTotalPages">Siguiente</button>
        </li>
      </ul>
    </nav>
    <ConsultarInspeccion v-if="showConsultarInspeccionModal" @close="showConsultarInspeccionModal = false" :id="inspeccionToConsultar" />
    <EditarInspeccion v-if="showEditarInspeccionModal" @close="showEditarInspeccionModal = false" :id="inspeccionToEditar" />
    <RegistrarInspeccion v-if="showRegistrarInspeccionModal" @close="showRegistrarInspeccionModal = false" @inspeccion-registered="fetchInspecciones" />

    <h1>Asignaturas</h1>
    <button class="btn btn-primary mb-3" @click="showRegistrarAsignaturaModal = true">Registrar Asignatura</button>
    <div class="row mb-3">
      <div class="col-auto">
        <div class="input-group input-group-sm">
          <label for="asignatura-filter" class="input-group-text">Filtrar por Nombre:</label>
          <input type="text" class="form-control" id="asignatura-filter" v-model="asignaturaFilter">
        </div>
      </div>
    </div>
    <table id="asignaturas-table" class="table table-striped" style="width:100%">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Horas Teoría</th>
          <th>Horas Práctica</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="asignatura in paginatedAsignaturas" :key="asignatura.pkAsignatura">
          <td>{{ asignatura.nombre }}</td>
          <td>{{ asignatura.horasTeoria }}</td>
          <td>{{ asignatura.horaPractica }}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="consultarAsignatura(asignatura.pkAsignatura)">Consultar</button>
            <button class="btn btn-warning btn-sm" @click="editarAsignatura(asignatura.pkAsignatura)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav aria-label="Page navigation">
      <ul class="pagination pagination-sm">
        <li class="page-item" :class="{ disabled: asignaturaCurrentPage === 1 }">
          <button class="page-link" @click="prevAsignaturaPage" :disabled="asignaturaCurrentPage === 1">Anterior</button>
        </li>
        <li class="page-item" :class="{ disabled: asignaturaCurrentPage === asignaturaTotalPages }">
          <button class="page-link" @click="nextAsignaturaPage" :disabled="asignaturaCurrentPage === asignaturaTotalPages">Siguiente</button>
        </li>
      </ul>
    </nav>
    <ConsultarAsignatura v-if="showConsultarAsignaturaModal" @close="showConsultarAsignaturaModal = false" :id="asignaturaToConsultar" />
    <EditarAsignatura v-if="showEditarAsignaturaModal" @close="showEditarAsignaturaModal = false" :id="asignaturaToEditar" />
    <RegistrarAsignatura v-if="showRegistrarAsignaturaModal" @close="showRegistrarAsignaturaModal = false" @asignatura-registered="fetchAsignaturas" />
  </div>
</template>

<script>
import axios from 'axios';
import ConsultarInspeccion from '@/components/GestionarInspeccionesYAsignaturas/ConsultarInspeccion.vue';
import EditarInspeccion from '@/components/GestionarInspeccionesYAsignaturas/EditarInspeccion.vue';
import RegistrarInspeccion from '@/components/GestionarInspeccionesYAsignaturas/RegistrarInspeccion.vue';
import ConsultarAsignatura from '@/components/GestionarInspeccionesYAsignaturas/ConsultarAsignatura.vue';
import EditarAsignatura from '@/components/GestionarInspeccionesYAsignaturas/EditarAsignatura.vue';
import RegistrarAsignatura from '@/components/GestionarInspeccionesYAsignaturas/RegistrarAsignatura.vue';

export default {
  components: {
    ConsultarInspeccion,
    EditarInspeccion,
    RegistrarInspeccion,
    ConsultarAsignatura,
    EditarAsignatura,
    RegistrarAsignatura
  },
  data() {
    return {
      inspecciones: [],
      inspeccionFilter: '',
      inspeccionPageSize: 10,
      inspeccionCurrentPage: 1,
      inspeccionPageSizes: [5, 10, 15, 20],
      showConsultarInspeccionModal: false,
      showEditarInspeccionModal: false,
      showRegistrarInspeccionModal: false,
      inspeccionToConsultar: null,
      inspeccionToEditar: null,

      asignaturas: [],
      asignaturaFilter: '',
      asignaturaPageSize: 10,
      asignaturaCurrentPage: 1,
      asignaturaPageSizes: [5, 10, 15, 20],
      showConsultarAsignaturaModal: false,
      showEditarAsignaturaModal: false,
      showRegistrarAsignaturaModal: false,
      asignaturaToConsultar: null,
      asignaturaToEditar: null,
    };
  },
  created() {
    this.fetchInspecciones();
    this.fetchAsignaturas();
  },
  computed: {
    filteredInspecciones() {
      return this.inspecciones.filter(inspeccion =>
        inspeccion.titulo.toLowerCase().includes(this.inspeccionFilter.toLowerCase())
      );
    },
    inspeccionTotalPages() {
      return Math.ceil(this.filteredInspecciones.length / this.inspeccionPageSize);
    },
    paginatedInspecciones() {
      const start = (this.inspeccionCurrentPage - 1) * this.inspeccionPageSize;
      const end = start + this.inspeccionPageSize;
      return this.filteredInspecciones.slice(start, end);
    },

    filteredAsignaturas() {
      return this.asignaturas.filter(asignatura =>
        asignatura.nombre.toLowerCase().includes(this.asignaturaFilter.toLowerCase())
      );
    },
    asignaturaTotalPages() {
      return Math.ceil(this.filteredAsignaturas.length / this.asignaturaPageSize);
    },
    paginatedAsignaturas() {
      const start = (this.asignaturaCurrentPage - 1) * this.asignaturaPageSize;
      const end = start + this.asignaturaPageSize;
      return this.filteredAsignaturas.slice(start, end);
    },
  },
  methods: {
    async fetchInspecciones() {
      try {
        const response = await axios.get('https://localhost:7006/api/TipoInspeccions');
        this.inspecciones = response.data;
      } catch (error) {
        console.error('Error fetching inspecciones:', error);
      }
    },
    prevInspeccionPage() {
      if (this.inspeccionCurrentPage > 1) {
        this.inspeccionCurrentPage--;
      }
    },
    nextInspeccionPage() {
      if (this.inspeccionCurrentPage < this.inspeccionTotalPages) {
        this.inspeccionCurrentPage++;
      }
    },
    consultarInspeccion(id) {
      this.inspeccionToConsultar = id;
      this.showConsultarInspeccionModal = true;
    },
    editarInspeccion(id) {
      this.inspeccionToEditar = id;
      this.showEditarInspeccionModal = true;
    },

    async fetchAsignaturas() {
      try {
        const response = await axios.get('https://localhost:7006/api/Asignaturas');
        this.asignaturas = response.data;
      } catch (error) {
        console.error('Error fetching asignaturas:', error);
      }
    },
    prevAsignaturaPage() {
      if (this.asignaturaCurrentPage > 1) {
        this.asignaturaCurrentPage--;
      }
    },
    nextAsignaturaPage() {
      if (this.asignaturaCurrentPage < this.asignaturaTotalPages) {
        this.asignaturaCurrentPage++;
      }
    },
    consultarAsignatura(id) {
      this.asignaturaToConsultar = id;
      this.showConsultarAsignaturaModal = true;
    },
    editarAsignatura(id) {
      this.asignaturaToEditar = id;
      this.showEditarAsignaturaModal = true;
    }
  }
};
</script>

<style>
/* Agregar estilos personalizados si es necesario */
</style>
