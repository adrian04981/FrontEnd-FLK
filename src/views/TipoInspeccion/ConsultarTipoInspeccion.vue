<template>
    <div>
      <h2>Consultar Tipo Inspección</h2>
      <div v-if="tipoInspeccion">
        <p><strong>ID:</strong> {{ tipoInspeccion.id }}</p>
        <p><strong>Titulo:</strong> {{ tipoInspeccion.titulo }}</p>
        <p><strong>Descripcion:</strong> {{ tipoInspeccion.descripcion }}</p>
      </div>
      <div v-else>
        <p>Cargando...</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'ViewTipoInspeccion',
    setup() {
      const route = useRoute();
      const tipoInspeccion = ref(null);
  
      onMounted(() => {
        const id = route.params.id;
        axios.get(`https://localhost:7006/api/TipoInspeccions/${id}`)
          .then(response => {
            tipoInspeccion.value = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      });
  
      return {
        tipoInspeccion,
      };
    },
  };
  </script>
  
  <style scoped>
  p {
    margin-bottom: 0.5rem;
  }
  </style>