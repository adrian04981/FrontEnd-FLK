<template>
  <div>
    <b-form @submit.prevent="submitObservations">
      <b-form-group label="Observaciones y Recomendaciones:" label-for="edit-observaciones">
        <b-form-input id="edit-observaciones" v-model="localInspeccion.observacionesYRecomendaciones" required></b-form-input>
      </b-form-group>
      
      <b-form-group label="Nuevo Label:" label-for="new-text-input">
        <b-form-input id="new-text-input" v-model="newText" required></b-form-input>
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
      localInspeccion: { ...this.inspeccion },
      newText: '' // Agrega una nueva propiedad para el nuevo campo de texto
    };
  },
  methods: {
    submitObservations() {
      this.$emit('update', this.localInspeccion);
      // Puedes manejar el nuevo campo de texto aquí si es necesario
      console.log(this.newText);
    }
  }
};
</script>

<style scoped>
</style>
  