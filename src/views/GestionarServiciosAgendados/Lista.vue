<template>
  <div class="container pt-5">
    <h1>Servicios e Inspecciones</h1>
    
    <!-- Filtro por Tipo de Inspección -->
    <div class="row mb-3">
      <div class="col-auto">
        <div class="input-group input-group-sm">
          <label for="tipo-inspeccion-filter" class="input-group-text">Filtrar por Tipo de Inspección:</label>
          <input type="text" class="form-control" id="tipo-inspeccion-filter" v-model="tipoInspeccionFilter" placeholder="Tipo de Inspección">
        </div>
      </div>
      <div class="col-auto">
        <button class="btn btn-success btn-sm" @click="openCreateModal">Crear Nuevo Registro</button>
      </div>
    </div>
    
    <!-- Tabla -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tipo de Servicio</th>
          <th>Tipo de Inspección</th>
          <th>Fecha Agendada</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.tipoServicio }}</td>
          <td>{{ item.tipoInspeccion }}</td>
          <td>{{ item.fechaAgendada }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="showDetails(item)">Mostrar</button>
            <button class="btn btn-warning btn-sm" @click="openEditModal(item)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="openDeleteModal(item)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- Modal de Crear -->
    <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createModalLabel">Crear Nuevo Registro</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createItem">
              <div class="mb-3">
                <label for="createTipoServicio" class="form-label">Tipo de Servicio</label>
                <input type="text" class="form-control" id="createTipoServicio" v-model="createForm.tipoServicio">
              </div>
              <div class="mb-3">
                <label for="createTipoInspeccion" class="form-label">Tipo de Inspección</label>
                <input type="text" class="form-control" id="createTipoInspeccion" v-model="createForm.tipoInspeccion">
              </div>
              <div class="mb-3">
                <label for="createFechaAgendada" class="form-label">Fecha Agendada</label>
                <input type="date" class="form-control" id="createFechaAgendada" v-model="createForm.fechaAgendada">
              </div>
              <div class="mb-3">
                <label for="createEmpresaNombre" class="form-label">Nombre de la Empresa</label>
                <input type="text" class="form-control" id="createEmpresaNombre" v-model="createForm.empresaNombre">
              </div>
              <div class="mb-3">
                <label for="createVehiculo" class="form-label">Nombre del Vehículo</label>
                <input type="text" class="form-control" id="createVehiculo" v-model="createForm.vehiculo">
              </div>
              <button type="submit" class="btn btn-primary">Crear</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalles -->
    <div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detailsModalLabel">Detalles del Registro</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>ID:</strong> {{ detailsForm.id }}</p>
            <p><strong>Tipo de Servicio:</strong> {{ detailsForm.tipoServicio }}</p>
            <p><strong>Tipo de Inspección:</strong> {{ detailsForm.tipoInspeccion }}</p>
            <p><strong>Fecha Agendada:</strong> {{ detailsForm.fechaAgendada }}</p>
            <p><strong>Empresa:</strong> {{ detailsForm.empresaNombre }}</p>
            <p><strong>Certificador Asignado:</strong> {{ detailsForm.certificadorAsignado }}</p>
            <p><strong>Fecha de Inspección:</strong> {{ detailsForm.fechaInspeccion }}</p>
            <p><strong>Ubicación:</strong> {{ detailsForm.ubicacion }}</p>
            <p><strong>Documentación:</strong> {{ detailsForm.documentacion }}</p>
            <p><strong>Estado:</strong> {{ detailsForm.estado }}</p>
            <p><strong>Vehículo:</strong> {{ detailsForm.vehiculo }}</p>
            <p><strong>Observaciones y Recomendaciones:</strong> {{ detailsForm.observacionesYRecomendaciones }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Edición -->
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">Editar Registro</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateItem">
              <div class="mb-3">
                <label for="tipoServicio" class="form-label">Tipo de Servicio</label>
                <input type="text" class="form-control" id="tipoServicio" v-model="editForm.tipoServicio">
              </div>
              <div class="mb-3">
                <label for="tipoInspeccion" class="form-label">Tipo de Inspección</label>
                <input type="text" class="form-control" id="tipoInspeccion" v-model="editForm.tipoInspeccion">
              </div>
              <div class="mb-3">
                <label for="fechaAgendada" class="form-label">Fecha Agendada</label>
                <input type="date" class="form-control" id="fechaAgendada" v-model="editForm.fechaAgendada">
              </div>
              <div class="mb-3">
                <label for="empresaNombre" class="form-label">Nombre de la Empresa</label>
                <input type="text" class="form-control" id="empresaNombre" v-model="editForm.empresaNombre">
              </div>
              <div class="mb-3">
                <label for="vehiculo" class="form-label">Nombre del Vehículo</label>
                <input type="text" class="form-control" id="vehiculo" v-model="editForm.vehiculo">
              </div>
              <button type="submit" class="btn btn-primary">Guardar Cambios</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal de Eliminación -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Eliminar Registro</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>¿Está seguro de que desea eliminar este registro?</p>
            <p><strong>ID:</strong> {{ deleteForm.id }}</p>
            <p><strong>Tipo de Servicio:</strong> {{ deleteForm.tipoServicio }}</p>
            <p><strong>Tipo de Inspección:</strong> {{ deleteForm.tipoInspeccion }}</p>
            <p><strong>Fecha Agendada:</strong> {{ deleteForm.fechaAgendada }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="deleteItem">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

export default {
  data() {
    return {
      servicios: [],
      inspecciones: [],
      tiposInspeccion: [],
      tiposServicios: [],
      empresas: [],
      tiposVehiculos: [],
      combinedData: [],
      tipoInspeccionFilter: '',
      detailsForm: {
        id: null,
        tipoServicio: '',
        tipoInspeccion: '',
        fechaAgendada: '',
        empresa: '',
        empresaNombre: '',
        certificadorAsignado: '',
        fechaInspeccion: '',
        ubicacion: '',
        documentacion: '',
        estado: '',
        vehiculo: '',
        observacionesYRecomendaciones: ''
      },
      editForm: {
        id: null,
        tipoServicio: '',
        tipoInspeccion: '',
        fechaAgendada: ''
      },
      deleteForm: {
        id: null,
        tipoServicio: '',
        tipoInspeccion: '',
        fechaAgendada: ''
      },
      createForm: {
        tipoServicio: '',
        tipoInspeccion: '',
        fechaAgendada: '',
        empresaNombre: '',
        vehiculo: ''
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        // Fetch Servicios
        const serviciosResponse = await axios.get('https://localhost:7006/api/Servicios');
        this.servicios = serviciosResponse.data;

        // Fetch Inspecciones
        const inspeccionesResponse = await axios.get('https://localhost:7006/api/Inspecciones');
        this.inspecciones = inspeccionesResponse.data;

        // Fetch Tipos de Inspección
        const tiposInspeccionResponse = await axios.get('https://localhost:7006/api/TipoInspeccions');
        this.tiposInspeccion = tiposInspeccionResponse.data;

        // Fetch Tipos de Servicios
        const tiposServiciosResponse = await axios.get('https://localhost:7006/api/TiposServicios');
        this.tiposServicios = tiposServiciosResponse.data;

        // Fetch Empresas
        const empresasResponse = await axios.get('https://localhost:7006/api/Empresas');
        this.empresas = empresasResponse.data;

        // Fetch Tipos de Vehículos
        const tiposVehiculosResponse = await axios.get('https://localhost:7006/api/TipoDeVehiculoes');
        this.tiposVehiculos = tiposVehiculosResponse.data;

        // Combine data
        this.combineData();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    combineData() {
      this.combinedData = this.inspecciones.map(inspeccion => {
        const servicio = this.servicios.find(serv => serv.pkServicio === inspeccion.fkServicio);
        const tipoInspeccion = this.tiposInspeccion.find(tipo => tipo.pkTipoInspeccion === inspeccion.fkTipoInspeccion);
        const tipoServicio = servicio ? this.tiposServicios.find(tipo => tipo.pkTiposServicio === servicio.fkTipoServicio) : null;
        const empresa = this.empresas.find(emp => emp.pkEmpresas === inspeccion.fkEmpresas);
        const vehiculo = this.tiposVehiculos.find(veh => veh.pkTipoDeVehiculos === inspeccion.fkVehiculo);

        return {
          id: inspeccion.pkInspeccion,
          tipoServicio: tipoServicio ? tipoServicio.nombre : 'Desconocido',
          tipoInspeccion: tipoInspeccion ? tipoInspeccion.titulo : 'Desconocido',
          fechaAgendada: servicio ? servicio.fechaAgendada : 'Desconocido',
          empresa: empresa ? empresa.nombre : 'Desconocido',
          empresaNombre: empresa ? empresa.nombre : 'Desconocido',
          certificadorAsignado: inspeccion.fkCertificadorAsignado || 'No asignado',
          fechaInspeccion: inspeccion.fechaInspeccion || 'Desconocido',
          ubicacion: inspeccion.ubicacion || 'Desconocido',
          documentacion: inspeccion.documentacion || 'Desconocido',
          estado: inspeccion.estado || 'Desconocido',
          vehiculo: vehiculo ? vehiculo.tipoDeVehiculo1 : 'Desconocido',
          observacionesYRecomendaciones: inspeccion.observacionesYRecomendaciones || 'Desconocido'
        };
      });
    },
    showDetails(item) {
      this.detailsForm = { ...item };
      const detailsModal = new bootstrap.Modal(document.getElementById('detailsModal'));
      detailsModal.show();
    },
    openEditModal(item) {
      this.editForm = { ...item };
      const editModal = new bootstrap.Modal(document.getElementById('editModal'));
      editModal.show();
    },
    updateItem() {
      const index = this.combinedData.findIndex(data => data.id === this.editForm.id);
      if (index !== -1) {
        this.combinedData.splice(index, 1, { ...this.editForm });
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        editModal.hide();
      }
    },
    openDeleteModal(item) {
      this.deleteForm = { ...item };
      const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
      deleteModal.show();
    },
    deleteItem() {
      const index = this.combinedData.findIndex(data => data.id === this.deleteForm.id);
      if (index !== -1) {
        this.combinedData.splice(index, 1);
        const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
        deleteModal.hide();
      }
    },
    openCreateModal() {
      this.createForm = {
        tipoServicio: '',
        tipoInspeccion: '',
        fechaAgendada: '',
        empresaNombre: '',
        vehiculo: ''
      };
      const createModal = new bootstrap.Modal(document.getElementById('createModal'));
      createModal.show();
    },
    createItem() {
      const newItem = {
        id: this.combinedData.length ? Math.max(this.combinedData.map(item => item.id)) + 1 : 1,
        tipoServicio: this.createForm.tipoServicio,
        tipoInspeccion: this.createForm.tipoInspeccion,
        fechaAgendada: this.createForm.fechaAgendada,
        empresaNombre: this.createForm.empresaNombre,
        vehiculo: this.createForm.vehiculo
      };
      this.combinedData.push(newItem);
      const createModal = bootstrap.Modal.getInstance(document.getElementById('createModal'));
      createModal.hide();
    }
  },
  computed: {
    filteredData() {
      if (this.tipoInspeccionFilter) {
        return this.combinedData.filter(item => item.tipoInspeccion.toLowerCase().includes(this.tipoInspeccionFilter.toLowerCase()));
      }
      return this.combinedData;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.input-group {
  width: 300px;
}
</style>