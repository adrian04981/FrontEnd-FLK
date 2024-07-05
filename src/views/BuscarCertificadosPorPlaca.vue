<template>
  <div class="container mt-5">
    <div class="row mb-3">
      <div class="col-md-4">
        <input
          type="text"
          class="form-control"
          v-model="marca"
          placeholder="Ingrese Placa"
          @keyup.enter="fetchInspecciones"
        />
      </div>
      <div class="col-md-4">
        <input
          type="date"
          class="form-control"
          v-model="startDate"
          placeholder="Fecha Inicio"
        />
      </div>
      <div class="col-md-4">
        <input
          type="date"
          class="form-control"
          v-model="endDate"
          placeholder="Fecha Fin"
        />
      </div>
    </div>
    <button class="btn btn-primary mb-3" @click="fetchInspecciones">
      Buscar
    </button>
    <div class="row">
      <div
        class="col-md-4"
        v-for="inspeccion in filteredInspecciones"
        :key="inspeccion.pkInspeccion"
      >
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ inspeccion.servicioNombre }}</h5>
            <p class="card-text">
              Empresa: {{ inspeccion.empresaNombre }}<br />
              Fecha Inspección: {{ inspeccion.fechaInspeccion }}<br />
              Ubicación: {{ inspeccion.ubicacion }}<br />
              Estado: {{ inspeccion.estado }}
            </p>
            <button
              class="btn btn-secondary"
              @click="verDetalles(inspeccion)"
            >
              Ver Detalles
            </button>
            <button
              class="btn btn-success mt-2"
              @click="generarPdf(inspeccion)"
            >
              Generar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import GenerarPDF from '@/components/GenerarCertificado/GenerarPDF.vue';

export default {
  components: {
    GenerarPDF,
  },
  data() {
    return {
      marca: '',
      startDate: '',
      endDate: '',
      inspecciones: [],
      selectedInspeccion: null,
    };
  },
  computed: {
    filteredInspecciones() {
      return this.inspecciones.filter((inspeccion) => {
        const inspeccionDate = new Date(inspeccion.fechaInspeccion);
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        return (
          (!this.startDate || inspeccionDate >= start) &&
          (!this.endDate || inspeccionDate <= end)
        );
      });
    },
  },
  methods: {
    async fetchInspecciones() {
      try {
        const response = await axios.get(
          `https://localhost:7006/api/GenerarCertificado/InspeccionesPorMarca/${this.marca}`
        );
        this.inspecciones = response.data;
      } catch (error) {
        console.error('Error fetching inspecciones:', error);
      }
    },
    verDetalles(inspeccion) {
      this.selectedInspeccion = inspeccion;
    },
    generarPdf(inspeccion) {
      this.selectedInspeccion = inspeccion;
      this.$refs.generarPdf.generatePdf();
    },
  },
};
</script>

<style>
/* Añadir estilos si es necesario */
</style>
