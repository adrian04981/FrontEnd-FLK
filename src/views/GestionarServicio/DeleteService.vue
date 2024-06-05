<template>
    <div>
      <h2>Eliminar Servicio</h2>
      <p>¿Estás seguro de que deseas eliminar este servicio?</p>
      <button @click="deleteService" class="btn btn-danger">Eliminar</button>
      <router-link to="/" class="btn btn-secondary">Cancelar</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DeleteService',
    methods: {
      deleteService() {
        // Aquí colocarías la lógica para eliminar el servicio
        // Puedes usar this.$axios para realizar una solicitud de eliminación al servidor
        // Por ejemplo:
        // this.$axios.delete(`Servicios/${this.$route.params.id}`)
        //   .then(response => {
        //     console.log('Servicio eliminado:', response.data);
        //     this.$router.push('/'); // Redirigir a la página principal o a la lista de servicios
        //   })
        //   .catch(error => {
        //     console.error('Error al eliminar el servicio:', error);
        //   });
        
        // Simplemente para propósitos de demostración, redirigir al usuario a la página principal
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style>
  /* Estilos CSS específicos para este componente si es necesario */
  </style>
  
  