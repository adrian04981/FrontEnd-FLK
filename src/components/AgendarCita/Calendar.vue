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
      endDate: ''
    };
  },
  methods: {
    async fetchInspecciones() {
      try {
        const response = await axios.get('https://localhost:7006/api/Inspecciones');
        this.inspecciones = response.data;
        this.filteredInspecciones = this.inspecciones;
      } catch (error) {
        console.error('Error al obtener las inspecciones:', error);
      }
    },
    filterInspecciones() {
      this.filteredInspecciones = this.inspecciones.filter(inspeccion => {
        const matchesSearchQuery = this.searchQuery
          ? inspeccion.fechaHoraInicio.includes(this.searchQuery) || inspeccion.fechaHoraFinalizacion.includes(this.searchQuery)
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
    }
  },
  mounted() {
    this.fetchInspecciones();
  }
};
</script>

<style>
/* Estilos opcionales para el componente */
</style>
