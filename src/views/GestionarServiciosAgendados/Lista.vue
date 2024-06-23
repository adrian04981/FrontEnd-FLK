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
              <button class="btn btn-info btn-sm" @click="openViewModal(item)">Consultar</button>
              <button class="btn btn-warning btn-sm" @click="openEditModal(item)">Editar</button>
              <button class="btn btn-danger btn-sm" @click="openDeleteModal(item)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal de Consulta -->
      <div class="modal fade" id="viewModal" tabindex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="viewModalLabel">Detalles del Registro</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p><strong>Servicio:</strong> {{ viewForm.pkServicio }}</p>
              <p><strong>Tipo de servicio:</strong> {{ viewForm.fkTipoServicio }}</p>
              <p><strong>Fecha de Agendación:</strong> {{ viewForm.fechaAgendada }}</p>
              <p><strong>Inspeccion:</strong> {{ viewForm.pkInspeccion }}</p>
              <p><strong>Empresas:</strong> {{ viewForm.fkEmpresas }}</p>
              <p><strong>Certificador asignado:</strong> {{ viewForm.fkCertificadorAsignado }}</p>
              <p><strong>Tipo de inspeccion:</strong> {{ viewForm.fkTipoInspeccion }}</p>
              <p><strong>Fecha inspeccion:</strong> {{ viewForm.fechaInspeccion }}</p>
              <p><strong>Ubicacion:</strong> {{ viewForm.ubicacion }}</p>
              <p><strong>Documentacion:</strong> {{ viewForm.documentacion }}</p>
              <p><strong>Estado:</strong> {{ viewForm.estado }}</p>
              <p><strong>Vehiculo:</strong> {{ viewForm.fkVehiculo }}</p>
              <p><strong>Observaciones y recomendaciones:</strong> {{ viewForm.observacionesYRecomendaciones }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal de Edición -->
      <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
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
                  <label for="empresa" class="form-label">Empresa</label>
                  <input type="text" class="form-control" id="empresa" v-model="editForm.empresa">
                </div>
                <div class="mb-3">
                  <label for="vehiculo" class="form-label">Vehículo</label>
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
        combinedData: [],
        tipoInspeccionFilter: '',
        editForm: {
          id: null,
          tipoServicio: '',
          tipoInspeccion: '',
          fechaAgendada: '',
          empresa: '',
          vehiculo: ''
        },
        deleteForm: {
          id: null,
          tipoServicio: '',
          tipoInspeccion: '',
          fechaAgendada: ''
        },
        viewForm: {
          pkServicio: '',
          fkTipoServicio: '',
          fechaAgendada: '',
          pkInspeccion: '',
          fkEmpresas: '',
          fkCertificadorAsignado: '',
          fkTipoInspeccion: '',
          fechaInspeccion: '',
          ubicacion: '',
          documentacion: '',
          estado: '',
          fkVehiculo: '',
          observacionesYRecomendaciones: ''
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
          this.combinedData = this.servicios.map(servicio => {
            const inspeccion = this.inspecciones.find(ins => ins.fkServicio === servicio.pkServicio);
            const tipoInspeccion = inspeccion ? this.tiposInspeccion.find(tipo => tipo.pkTipoInspeccion === inspeccion.fkTipoInspeccion) : null;
            return {
              id: servicio.pkServicio,
              tipoServicio: servicio.fkTipoServicio,
              fechaAgendada: servicio.fechaAgendada,
              tipoInspeccion: tipoInspeccion ? tipoInspeccion.titulo : ''
            };
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
      openEditModal(item) {
        const servicio = this.servicios.find(serv => serv.pkServicio === item.id);
        const inspeccion = this.inspecciones.find(ins => ins.fkServicio === item.id);
        this.editForm = {
          id: servicio.pkServicio,
          tipoServicio: servicio.fkTipoServicio,
          tipoInspeccion: inspeccion ? inspeccion.fkTipoInspeccion : '',
          fechaAgendada: servicio.fechaAgendada,
          empresa: inspeccion ? inspeccion.fkEmpresas : '',
          vehiculo: inspeccion ? inspeccion.fkVehiculo : ''
        };
        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();
      },
      openDeleteModal(item) {
        this.deleteForm = { ...item };
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        deleteModal.show();
      },
      openViewModal(item) {
        const servicio = this.servicios.find(serv => serv.pkServicio === item.id);
        const inspeccion = this.inspecciones.find(ins => ins.fkServicio === item.id);
        const tipoInspeccion = this.tiposInspeccion.find(tipo => tipo.pkTipoInspeccion === inspeccion.fkTipoInspeccion);
        this.viewForm = {
          pkServicio: servicio ? servicio.pkServicio : '',
          fkTipoServicio: servicio ? servicio.fkTipoServicio : '',
          fechaAgendada: servicio ? servicio.fechaAgendada : '',
          pkInspeccion: inspeccion ? inspeccion.pkInspeccion : '',
          fkEmpresas: inspeccion ? inspeccion.fkEmpresas : '',
          fkCertificadorAsignado: inspeccion ? inspeccion.fkCertificadorAsignado : '',
          fkTipoInspeccion: tipoInspeccion ? tipoInspeccion.titulo : '',
          fechaInspeccion: inspeccion ? inspeccion.fechaInspeccion : '',
          ubicacion: inspeccion ? inspeccion.ubicacion : '',
          documentacion: inspeccion ? inspeccion.documentacion : '',
          estado: inspeccion ? inspeccion.estado : '',
          fkVehiculo: inspeccion ? inspeccion.fkVehiculo : '',
          observacionesYRecomendaciones: inspeccion ? inspeccion.observacionesYRecomendaciones : ''
        };
        const viewModal = new bootstrap.Modal(document.getElementById('viewModal'));
        viewModal.show();
      },
      async updateItem() {
        try {
          const { id, tipoServicio, fechaAgendada, tipoInspeccion, empresa, vehiculo } = this.editForm;
          const servicioUpdate = { fkTipoServicio: tipoServicio, fechaAgendada };
  
          // Actualizar Servicio
          const responseServicio = await axios.put(`https://localhost:7006/api/Servicios/${id}`, servicioUpdate);
  
          const inspeccion = this.inspecciones.find(ins => ins.fkServicio === id);
  
          if (inspeccion) {
            const inspeccionUpdate = {
              fkTipoInspeccion: tipoInspeccion,
              fkEmpresas: empresa,
              fkVehiculo: vehiculo
            };
  
            // Actualizar Inspección
            const responseInspeccion = await axios.put(`https://localhost:7006/api/Inspecciones/${inspeccion.pkInspeccion}`, inspeccionUpdate);
          }
  
          console.log('Registro actualizado:', responseServicio.data);
          this.fetchData();
          const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
          editModal.hide();
        } catch (error) {
          console.error('Error actualizando el registro:', error);
        }
      },
      async deleteItem() {
        try {
          const response = await axios.delete(`https://localhost:7006/api/Servicios/${this.deleteForm.id}`);
          console.log('Registro eliminado:', response.data);
          this.fetchData();
          const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
          deleteModal.hide();
        } catch (error) {
          console.error('Error eliminando el registro:', error);
        }
      }
    },
    computed: {
      filteredData() {
        return this.combinedData.filter(item =>
          item.tipoInspeccion && item.tipoInspeccion.toLowerCase().includes(this.tipoInspeccionFilter.toLowerCase())
        );
      }
    }
  };
  </script>
  
  <style>
  .container {
    max-width: 900px;
  }
  </style>
  