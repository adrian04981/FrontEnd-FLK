<template>
  <div class="container pt-5">
    <h1>Lista de Vehículos</h1>
    
    <button class="btn btn-primary mb-3" @click="showAgregarVehiculoModal = true">Agregar Vehículo</button>

    <!-- Fila para los filtros de vehículos -->
    <div class="row mb-3">
      <div class="col-auto">
        <!-- Filtro por fabricante -->
        <div class="input-group input-group-sm">
          <label for="fabricante-filter" class="input-group-text">Filtrar por fabricante:</label>
          <input type="text" class="form-control" id="fabricante-filter" v-model="fabricanteFilter">
        </div>
      </div>
      <div class="col-auto">
        <!-- Filtro por modelo -->
        <div class="input-group input-group-sm">
          <label for="modelo-filter" class="input-group-text">Filtrar por modelo:</label>
          <input type="text" class="form-control" id="modelo-filter" v-model="modeloFilter">
        </div>
      </div>
      <div class="col-auto">
        <!-- Barra de búsqueda -->
        <div class="input-group input-group-sm">
          <input type="text" class="form-control" placeholder="Buscar en todos los campos..." v-model="globalSearchVehiculo">
          <button class="btn btn-outline-secondary" type="button" @click="clearFiltersVehiculo">Limpiar</button>
        </div>
      </div>
    </div>

    <!-- Tabla de vehículos -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Fabricante</th>
          <th>Modelo</th>
          <th>Número de Serie</th>
          <th>Marca</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehiculo in paginatedVehiculos" :key="vehiculo.pkVehiculo">
          <td>{{ vehiculo.pkVehiculo }}</td>
          <td>{{ vehiculo.fabricante }}</td>
          <td>{{ vehiculo.modelo }}</td>
          <td>{{ vehiculo.numeroSerie }}</td>
          <td>{{ vehiculo.marca }}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="consultarVehiculo(vehiculo.pkVehiculo)">Consultar</button>
            <button class="btn btn-warning btn-sm" @click="editarVehiculo(vehiculo.pkVehiculo)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="eliminarVehiculo(vehiculo.pkVehiculo)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Controles de navegación de página para vehículos -->
    <div class="row justify-content-between mb-3">
      <div class="col-auto">
        <div class="input-group input-group-sm">
          <label for="page-select-vehiculo" class="input-group-text">Página:</label>
          <select class="form-select" id="page-select-vehiculo" v-model="pageSizeVehiculo">
            <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>
      </div>
      <div class="col-auto">
        <nav aria-label="Page navigation">
          <ul class="pagination pagination-sm">
            <li class="page-item" :class="{ disabled: currentPageVehiculo === 1 }">
              <button class="page-link" @click="prevPageVehiculo" :disabled="currentPageVehiculo === 1">Anterior</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPageVehiculo === totalPagesVehiculo }">
              <button class="page-link" @click="nextPageVehiculo" :disabled="currentPageVehiculo === totalPagesVehiculo">Siguiente</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <h1>Lista de Tipos de Vehículos</h1>

    <button class="btn btn-primary mb-3" @click="showAgregarTipoVehiculoModal = true">Agregar Tipo de Vehículo</button>

    <!-- Fila para los filtros de tipos de vehículos -->
    <div class="row mb-3">
      <div class="col-auto">
        <!-- Filtro por tipo de vehículo -->
        <div class="input-group input-group-sm">
          <label for="tipo-filter" class="input-group-text">Filtrar por tipo:</label>
          <input type="text" class="form-control" id="tipo-filter" v-model="tipoFilter">
        </div>
      </div>
      <div class="col-auto">
        <!-- Filtro por capacidad de carga mínima -->
        <div class="input-group input-group-sm">
          <label for="capacidad-min-filter" class="input-group-text">Capacidad mínima:</label>
          <input type="number" class="form-control" id="capacidad-min-filter" v-model.number="capacidadMinFilter">
        </div>
      </div>
      <div class="col-auto">
        <!-- Barra de búsqueda -->
        <div class="input-group input-group-sm">
          <input type="text" class="form-control" placeholder="Buscar en todos los campos..." v-model="globalSearchTipo">
          <button class="btn btn-outline-secondary" type="button" @click="clearFiltersTipo">Limpiar</button>
        </div>
      </div>
    </div>

    <!-- Tabla de tipos de vehículos -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tipo de Vehículo</th>
          <th>Capacidad de Carga</th>
          <th>Especificaciones Técnicas</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tipo in paginatedTipos" :key="tipo.pkTipoDeVehiculos">
          <td>{{ tipo.pkTipoDeVehiculos }}</td>
          <td>{{ tipo.tipoDeVehiculo1 }}</td>
          <td>{{ tipo.capacidadCarga }}</td>
          <td>{{ tipo.descripcion }}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="consultarTipoVehiculo(tipo.pkTipoDeVehiculos)">Consultar</button>
            <button class="btn btn-warning btn-sm" @click="editarTipoVehiculo(tipo.pkTipoDeVehiculos)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="eliminarTipoVehiculo(tipo.pkTipoDeVehiculos)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Controles de navegación de página para tipos de vehículos -->
    <div class="row justify-content-between mb-3">
      <div class="col-auto">
        <div class="input-group input-group-sm">
          <label for="page-select-tipo" class="input-group-text">Página:</label>
          <select class="form-select" id="page-select-tipo" v-model="pageSizeTipo">
            <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>
      </div>
      <div class="col-auto">
        <nav aria-label="Page navigation">
          <ul class="pagination pagination-sm">
            <li class="page-item" :class="{ disabled: currentPageTipo === 1 }">
              <button class="page-link" @click="prevPageTipo" :disabled="currentPageTipo === 1">Anterior</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPageTipo === totalPagesTipo }">
              <button class="page-link" @click="nextPageTipo" :disabled="currentPageTipo === totalPagesTipo">Siguiente</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Modal para agregar vehículo -->
    <AgregarVehiculo v-if="showAgregarVehiculoModal" @close="showAgregarVehiculoModal = false" @vehiculo-agregado="fetchVehiculos" :tipos="tipos" :empresas="empresas" />
    
    <!-- Modal para consultar vehículo -->
    <ConsultarVehiculo v-if="showConsultarVehiculoModal" @close="showConsultarVehiculoModal = false" :vehiculoId="vehiculoId" :tipos="tipos" :empresas="empresas" />
    
    <!-- Modal para editar vehículo -->
    <EditarVehiculo v-if="showEditarVehiculoModal" @close="showEditarVehiculoModal = false" @vehiculo-editado="fetchVehiculos" :vehiculoId="vehiculoId" :tipos="tipos" :empresas="empresas" />
    
    <!-- Modal para eliminar vehículo -->
    <EliminarVehiculo v-if="showEliminarVehiculoModal" @close="showEliminarVehiculoModal = false" @vehiculo-eliminado="fetchVehiculos" :vehiculoId="vehiculoId" />
    
    <!-- Modal para agregar tipo de vehículo -->
    <CrearTipoVehiculo v-if="showAgregarTipoVehiculoModal" @close="showAgregarTipoVehiculoModal = false" @tipo-vehiculo-agregado="fetchTipos" />
    
    <!-- Modal para consultar tipo de vehículo -->
    <ConsultarTipoVehiculo v-if="showConsultarTipoVehiculoModal" @close="showConsultarTipoVehiculoModal = false" :tipoDeVehiculoId="tipoDeVehiculoId" />
    
    <!-- Modal para editar tipo de vehículo -->
    <EditarTipoVehiculo v-if="showEditarTipoVehiculoModal" @close="showEditarTipoVehiculoModal = false" @tipo-vehiculo-editado="fetchTipos" :tipoDeVehiculoId="tipoDeVehiculoId" />
    
    <!-- Modal para eliminar tipo de vehículo -->
    <EliminarTipoVehiculo v-if="showEliminarTipoVehiculoModal" @close="showEliminarTipoVehiculoModal = false" @tipo-vehiculo-eliminado="fetchTipos" :tipoDeVehiculoId="tipoDeVehiculoId" />
  </div>
</template>

<script>
import axios from 'axios';
import AgregarVehiculo from '@/components/GestionarVehiculos/AgregarVehiculo.vue';
import ConsultarVehiculo from '@/components/GestionarVehiculos/ConsultarVehiculo.vue';
import EditarVehiculo from '@/components/GestionarVehiculos/EditarVehiculo.vue';
import EliminarVehiculo from '@/components/GestionarVehiculos/EliminarVehiculo.vue';
import CrearTipoVehiculo from '@/components/GestionarVehiculos/CrearTipoVehiculo.vue';
import ConsultarTipoVehiculo from '@/components/GestionarVehiculos/ConsultarTipoVehiculo.vue';
import EditarTipoVehiculo from '@/components/GestionarVehiculos/EditarTipoVehiculo.vue';
import EliminarTipoVehiculo from '@/components/GestionarVehiculos/EliminarTipoVehiculo.vue';


export default {
  components: {
    AgregarVehiculo,
    ConsultarVehiculo,
    EditarVehiculo,
    EliminarVehiculo,
    CrearTipoVehiculo,
    ConsultarTipoVehiculo,
    EditarTipoVehiculo,
    EliminarTipoVehiculo
  },
  data() {
    return {
      tipos: [],
      vehiculos: [],
      empresas: [],
      tipoFilter: '',
      capacidadMinFilter: '',
      globalSearchTipo: '',
      fabricanteFilter: '',
      modeloFilter: '',
      globalSearchVehiculo: '',
      pageSizeTipo: 10,
      currentPageTipo: 1,
      pageSizeVehiculo: 10,
      currentPageVehiculo: 1,
      pageSizes: [5, 10, 15, 20],
      showAgregarVehiculoModal: false,
      showConsultarVehiculoModal: false,
      showEditarVehiculoModal: false,
      showEliminarVehiculoModal: false,
      showAgregarTipoVehiculoModal: false,
      showConsultarTipoVehiculoModal: false,
      showEditarTipoVehiculoModal: false,
      showEliminarTipoVehiculoModal: false,
      vehiculoId: null,
      tipoDeVehiculoId: null
    };
  },
  created() {
    this.fetchTipos();
    this.fetchVehiculos();
    this.fetchEmpresas();
  },
  computed: {
    filteredTipos() {
      return this.tipos.filter(tipo => {
        const matchesTipo = tipo.tipoDeVehiculo1.toLowerCase().includes(this.tipoFilter.toLowerCase());
        const matchesCapacidadMin = this.capacidadMinFilter ? tipo.capacidadCarga >= this.capacidadMinFilter : true;
        const matchesGlobalSearch = Object.values(tipo).some(value =>
          value.toString().toLowerCase().includes(this.globalSearchTipo.toLowerCase())
        );

        return matchesTipo && matchesCapacidadMin && matchesGlobalSearch;
      });
    },
    totalPagesTipo() {
      return Math.ceil(this.filteredTipos.length / this.pageSizeTipo);
    },
    paginatedTipos() {
      const start = (this.currentPageTipo - 1) * this.pageSizeTipo;
      const end = start + this.pageSizeTipo;
      return this.filteredTipos.slice(start, end);
    },
    filteredVehiculos() {
      return this.vehiculos.filter(vehiculo => {
        const matchesFabricante = vehiculo.fabricante.toLowerCase().includes(this.fabricanteFilter.toLowerCase());
        const matchesModelo = vehiculo.modelo.toLowerCase().includes(this.modeloFilter.toLowerCase());
        const matchesGlobalSearch = Object.values(vehiculo).some(value =>
          value.toString().toLowerCase().includes(this.globalSearchVehiculo.toLowerCase())
        );

        return matchesFabricante && matchesModelo && matchesGlobalSearch;
      });
    },
    totalPagesVehiculo() {
      return Math.ceil(this.filteredVehiculos.length / this.pageSizeVehiculo);
    },
    paginatedVehiculos() {
      const start = (this.currentPageVehiculo - 1) * this.pageSizeVehiculo;
      const end = start + this.pageSizeVehiculo;
      return this.filteredVehiculos.slice(start, end);
    }
  },
  methods: {
    async fetchTipos() {
      try {
        const response = await axios.get('https://localhost:7006/api/TipoDeVehiculoes');
        this.tipos = response.data;
      } catch (error) {
        console.error('Error fetching tipos:', error);
      }
    },
    async fetchVehiculos() {
      try {
        const response = await axios.get('https://localhost:7006/api/Vehiculoes');
        this.vehiculos = response.data;
      } catch (error) {
        console.error('Error fetching vehiculos:', error);
      }
    },
    async fetchEmpresas() {
      try {
        const response = await axios.get('https://localhost:7006/api/Empresas');
        this.empresas = response.data;
      } catch (error) {
        console.error('Error fetching empresas:', error);
      }
    },
    clearFiltersTipo() {
      this.tipoFilter = '';
      this.capacidadMinFilter = '';
      this.globalSearchTipo = '';
      this.currentPageTipo = 1;
    },
    clearFiltersVehiculo() {
      this.fabricanteFilter = '';
      this.modeloFilter = '';
      this.globalSearchVehiculo = '';
      this.currentPageVehiculo = 1;
    },
    prevPageTipo() {
      if (this.currentPageTipo > 1) {
        this.currentPageTipo--;
      }
    },
    nextPageTipo() {
      if (this.currentPageTipo < this.totalPagesTipo) {
        this.currentPageTipo++;
      }
    },
    prevPageVehiculo() {
      if (this.currentPageVehiculo > 1) {
        this.currentPageVehiculo--;
      }
    },
    nextPageVehiculo() {
      if (this.currentPageVehiculo < this.totalPagesVehiculo) {
        this.currentPageVehiculo++;
      }
    },
    consultarVehiculo(id) {
      this.vehiculoId = id;
      this.showConsultarVehiculoModal = true;
    },
    editarVehiculo(id) {
      this.vehiculoId = id;
      this.showEditarVehiculoModal = true;
    },
    eliminarVehiculo(id) {
      this.vehiculoId = id;
      this.showEliminarVehiculoModal = true;
    },
    consultarTipoVehiculo(id) {
      this.tipoDeVehiculoId = id;
      this.showConsultarTipoVehiculoModal = true;
    },
    editarTipoVehiculo(id) {
      this.tipoDeVehiculoId = id;
      this.showEditarTipoVehiculoModal = true;
    },
    eliminarTipoVehiculo(id) {
      this.tipoDeVehiculoId = id;
      this.showEliminarTipoVehiculoModal = true;
    }
  }
};
</script>

<style>
/* Agregar estilos personalizados si es necesario */
</style>
