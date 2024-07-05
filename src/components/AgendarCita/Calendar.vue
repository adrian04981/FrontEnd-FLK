<template>
  <div class="container mt-4">
    <h2>Listado de Inspecciones</h2>
    <div class="row mb-3">
      <div class="col-md-4">
        <input 
          type="text" 
          class="form-control" 
          placeholder="Buscar inspecciones..." 
          v-model="searchQuery"
          @input="filterInspecciones"
        >
      </div>
      <div class="col-md-3">
        <input 
          type="date" 
          class="form-control" 
          v-model="startDate"
          @change="filterInspecciones"
        >
      </div>
      <div class="col-md-3">
        <input 
          type="date" 
          class="form-control" 
          v-model="endDate"
          @change="filterInspecciones"
        >
      </div>
      <div class="col-md-2">
        <button class="btn btn-primary w-100" @click="resetFilters">Resetear Filtros</button>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4" v-for="inspeccion in filteredInspecciones" :key="inspeccion.pkInspeccion">
        <div class="card mb-3">
          <div class="card-body">
            <p><strong>Fecha de inicio:</strong> {{ inspeccion.fechaHoraInicio }}</p>
            <p><strong>Fecha de finalización:</strong> {{ inspeccion.fechaHoraFinalizacion }}</p>
            <p><strong>Certificador:</strong> {{ inspeccion.certificadorNombre }}</p>
            <p><strong>Título:</strong> {{ inspeccion.titulo }}</p>
            <p><strong>Ubicación:</strong> {{ inspeccion.ubicacion }}</p>
            <p><strong>Empresa:</strong> {{ inspeccion.empresaRazonSocial }}</p>
            <button class="btn btn-info" @click="consultarInspeccion(inspeccion)">Consultar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para mostrar detalles de la inspección -->
    <div v-if="selectedInspeccion" class="modal" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detalles de la Inspección</h5>
            <button type="button" class="btn-close" @click="selectedInspeccion = null"></button>
          </div>
          <div class="modal-body">
            <p><strong>Fecha de inicio:</strong> {{ selectedInspeccion.fechaHoraInicio }}</p>
            <p><strong>Fecha de finalización:</strong> {{ selectedInspeccion.fechaHoraFinalizacion }}</p>
            <p><strong>Certificador:</strong> {{ selectedInspeccion.certificadorNombre }}</p>
            <p><strong>Título:</strong> {{ selectedInspeccion.titulo }}</p>
            <p><strong>Ubicación:</strong> {{ selectedInspeccion.ubicacion }}</p>
            <p><strong>Empresa:</strong> {{ selectedInspeccion.empresaRazonSocial }}</p>
            <p><strong>Inspectores:</strong></p>
            <ul>
              <li v-for="inspector in selectedInspeccion.inspectoresList" :key="inspector.inspectorNombre">
                {{ inspector.inspectorNombre }}
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="selectedInspeccion = null">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      inspecciones: [],
      filteredInspecciones: [],
      searchQuery: '',
      startDate: '',
      endDate: '',
      selectedInspeccion: null,
    };
  },
  methods: {
    async fetchInspecciones() {
      try {
        const response = await axios.get('https://localhost:7006/api/AgendaGeneral/InspeccionesConNombres');
        this.inspecciones = response.data;
        this.filteredInspecciones = this.inspecciones;
      } catch (error) {
        console.error('Error al obtener las inspecciones:', error);
      }
    },
    filterInspecciones() {
      this.filteredInspecciones = this.inspecciones.filter(inspeccion => {
        const matchesSearchQuery = this.searchQuery
          ? inspeccion.titulo.toLowerCase().includes(this.searchQuery.toLowerCase())
          : true;

        const matchesStartDate = this.startDate
          ? new Date(inspeccion.fechaHoraInicio) >= new Date(this.startDate)
          : true;

        const matchesEndDate = this.endDate
          ? new Date(inspeccion.fechaHoraFinalizacion) <= new Date(this.endDate)
          : true;

        return matchesSearchQuery && matchesStartDate && matchesEndDate;
      });
    },
    resetFilters() {
      this.searchQuery = '';
      this.startDate = '';
      this.endDate = '';
      this.filteredInspecciones = this.inspecciones;
    },
    consultarInspeccion(inspeccion) {
      this.selectedInspeccion = inspeccion;
    }
  },
  mounted() {
    this.fetchInspecciones();
  }
};
</script>
<style scoped>
/* Estilos opcionales para el componente */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-dialog {
  max-width: 500px;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
</style>
