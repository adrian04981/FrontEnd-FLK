<template>
    <div>
      <b-form @submit.prevent="submitObservations">
        <b-form-group label="Observaciones y Recomendaciones:" label-for="edit-observaciones">
          <b-form-input id="edit-observaciones" v-model="localInspeccion.observacionesYRecomendaciones" required></b-form-input>
        </b-form-group>
  
        <b-button type="submit" variant="success">Guardar Observaciones</b-button>
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
      submitObservations() {
        this.$emit('update', this.localInspeccion);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  