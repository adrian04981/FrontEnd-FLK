<template>
  <div class="container pt-5">
    <h1>Lista Combinada</h1>
    
    <!-- Filtro por Tipo de Inspección -->
    <div class="row mb-3">
      <div class="col-auto">
        <div class="input-group input-group-sm">
          <label for="tipo-inspeccion-filter" class="input-group-text">Filtrar por Tipo de Inspección:</label>
          <input type="text" class="form-control" id="tipo-inspeccion-filter" v-model="tipoInspeccionFilter" placeholder="Tipo de Inspección">
        </div>
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
            <p><strong>Empresa:</strong> {{ detailsForm.empresa }}</p>
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
      combinedData: [],
      tipoInspeccionFilter: '',
      detailsForm: {
        id: null,
        tipoServicio: '',
        tipoInspeccion: '',
        fechaAgendada: '',
        empresa: '',
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

        return {
          id: inspeccion.pkInspeccion,
          tipoServicio: servicio?.fkTipoServicio || 'Desconocido',
          tipoInspeccion: tipoInspeccion?.titulo || 'Desconocido',
          fechaAgendada: servicio?.fechaAgendada || 'Desconocido',
          empresa: inspeccion.fkEmpresas || 'Desconocido',
          certificadorAsignado: inspeccion.fkCertificadorAsignado || 'Desconocido',
          fechaInspeccion: inspeccion.fechaInspeccion || 'Desconocido',
          ubicacion: inspeccion.ubicacion || 'Desconocido',
          documentacion: inspeccion.documentacion || 'Desconocido',
          estado: inspeccion.estado || 'Desconocido',
          vehiculo: inspeccion.fkVehiculo || 'Desconocido',
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
