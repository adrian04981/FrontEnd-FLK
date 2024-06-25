<template>
    <div>
      <b-form @submit.prevent="submitEdit">
        <b-form-group label="Servicio:" label-for="edit-servicio">
          <b-form-input id="edit-servicio" v-model="localInspeccion.fkServicio" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Empresas:" label-for="edit-empresas">
          <b-form-input id="edit-empresas" v-model="localInspeccion.fkEmpresas" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Certificador Asignado:" label-for="edit-certificador">
          <b-form-input id="edit-certificador" v-model="localInspeccion.fkCertificadorAsignado" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Tipo de Inspección:" label-for="edit-tipo">
          <b-form-input id="edit-tipo" v-model="localInspeccion.fkTipoInspeccion" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Inspectores Asignados:" label-for="edit-inspectores">
          <b-form-input id="edit-inspectores" v-model="localInspeccion.fkInspectoresAsignados" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Fecha Inspección:" label-for="edit-fecha">
          <b-form-input id="edit-fecha" type="date" v-model="localInspeccion.fechaInspeccion" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Ubicación:" label-for="edit-ubicacion">
          <b-form-input id="edit-ubicacion" v-model="localInspeccion.ubicacion" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Documentación:" label-for="edit-documentacion">
          <b-form-input id="edit-documentacion" v-model="localInspeccion.documentacion" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Estado:" label-for="edit-estado">
          <b-form-input id="edit-estado" v-model="localInspeccion.estado" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Vehículo:" label-for="edit-vehiculo">
          <b-form-input id="edit-vehiculo" v-model="localInspeccion.fkVehiculo" required></b-form-input>
        </b-form-group>
  
        <b-form-group label="Observaciones y Recomendaciones:" label-for="edit-observaciones">
          <b-form-input id="edit-observaciones" v-model="localInspeccion.observacionesYRecomendaciones" required></b-form-input>
        </b-form-group>
  
        <b-button type="submit" variant="success">Guardar</b-button>
      </b-form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      inspeccion: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        localInspeccion: { ...this.inspeccion }
      };
    },
    methods: {
      submitEdit() {
        this.$emit('update', this.localInspeccion);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  