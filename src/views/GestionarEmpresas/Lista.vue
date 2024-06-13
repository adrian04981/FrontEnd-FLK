<template>
    <div class="container pt-5">
      <h1>Lista de Empresas</h1>
      <button class="btn btn-primary mb-3" @click="showAgregarModal = true">Agregar Empresa</button>
      
      <!-- Fila para los filtros -->
      <div class="row mb-3">
        <div class="col-auto">
          <!-- Filtro por nombre -->
          <div class="input-group input-group-sm">
            <label for="nombre-filter" class="input-group-text">Filtrar por nombre:</label>
            <input type="text" class="form-control" id="nombre-filter" v-model="nombreFilter">
          </div>
        </div>
        <div class="col-auto">
          <!-- Filtro por RUC -->
          <div class="input-group input-group-sm">
            <label for="ruc-filter" class="input-group-text">Filtrar por RUC:</label>
            <input type="text" class="form-control" id="ruc-filter" v-model="rucFilter">
          </div>
        </div>
        <div class="col-auto">
          <!-- Barra de búsqueda -->
          <div class="input-group input-group-sm">
            <input type="text" class="form-control" placeholder="Buscar en todos los campos..." v-model="globalSearch">
            <button class="btn btn-outline-secondary" type="button" @click="clearFilters">Limpiar</button>
          </div>
        </div>
      </div>
      <!-- Tabla de empresas -->
      <table id="empresas-table" class="table table-striped" style="width:100%">
        <thead>
          <tr>
            <th>RUC</th>
            <th>Nombre</th>
            <th>Razón Social</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="empresa in paginatedEmpresas" :key="empresa.pkEmpresas">
            <td>{{ empresa.ruc }}</td>
            <td>{{ empresa.nombre }}</td>
            <td>{{ empresa.razonSocial }}</td>
            <td>{{ empresa.email }}</td>
            <td>{{ empresa.direccion }}</td>
            <td>{{ empresa.telefono }}</td>
            <td>
              <button class="btn btn-info btn-sm" @click="consultarEmpresa(empresa.pkEmpresas)">Consultar</button>
              <button class="btn btn-warning btn-sm" @click="editarEmpresa(empresa.pkEmpresas)">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Controles de navegación de página -->
      <div class="row justify-content-between mb-3">
        <div class="col-auto">
          <div class="input-group input-group-sm">
            <label for="page-select" class="input-group-text">Página:</label>
            <select class="form-select" id="page-select" v-model="pageSize">
              <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
            </select>
          </div>
        </div>
        <div class="col-auto">
          <nav aria-label="Page navigation">
            <ul class="pagination pagination-sm">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="prevPage" :disabled="currentPage === 1">Anterior</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <!-- Modal para agregar empresa -->
      <AgregarEmpresa v-if="showAgregarModal" @close="showAgregarModal = false" @empresa-added="fetchEmpresas" />
      <!-- Modal para consultar empresa -->
      <ConsultarEmpresa v-if="showConsultarModal" @close="showConsultarModal = false" :id="empresaToConsultar" />
      <!-- Modal para editar empresa -->
      <EditarEmpresa v-if="showEditarModal" @close="showEditarModal = false" @empresa-updated="fetchEmpresas" :id="empresaToEditar" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import AgregarEmpresa from '@/components/GestionarEmpresas/AgregarEmpresa.vue';
  import ConsultarEmpresa from '@/components/GestionarEmpresas/ConsultarEmpresa.vue';
  import EditarEmpresa from '@/components/GestionarEmpresas/EditarEmpresa.vue';
  
  export default {
    components: {
      AgregarEmpresa,
      ConsultarEmpresa,
      EditarEmpresa
    },
    data() {
      return {
        empresas: [],
        nombreFilter: '',
        rucFilter: '',
        globalSearch: '',
        pageSize: 10,
        currentPage: 1,
        pageSizes: [5, 10, 15, 20],
        showAgregarModal: false,
        showConsultarModal: false,
        showEditarModal: false,
        empresaToConsultar: null,
        empresaToEditar: null,
      };
    },
    created() {
      this.fetchEmpresas();
    },
    computed: {
      filteredEmpresas() {
        return this.empresas.filter(empresa => {
          const matchesNombre = empresa.nombre.toLowerCase().includes(this.nombreFilter.toLowerCase());
          const matchesRUC = empresa.ruc.toLowerCase().includes(this.rucFilter.toLowerCase());
          const matchesGlobalSearch = Object.values(empresa).some(value =>
            value.toString().toLowerCase().includes(this.globalSearch.toLowerCase())
          );
  
          return matchesNombre && matchesRUC && matchesGlobalSearch;
        });
      },
      totalPages() {
        return Math.ceil(this.filteredEmpresas.length / this.pageSize);
      },
      paginatedEmpresas() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.filteredEmpresas.slice(start, end);
      }
    },
    methods: {
      async fetchEmpresas() {
        try {
          const response = await axios.get('https://localhost:7006/api/Empresas');
          this.empresas = response.data;
        } catch (error) {
          console.error('Error fetching empresas:', error);
        }
      },
      clearFilters() {
        this.nombreFilter = '';
        this.rucFilter = '';
        this.globalSearch = '';
        this.currentPage = 1;
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      consultarEmpresa(id) {
        this.empresaToConsultar = id;
        this.showConsultarModal = true;
      },
      editarEmpresa(id) {
        this.empresaToEditar = id;
        this.showEditarModal = true;
      }
    }
  };
  </script>
  
  <style>
  /* Agregar estilos personalizados si es necesario */
  </style>
  