<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header bg-dark text-white">
          <h2>Crear Nuevo Usuario</h2>
        </div>
        <div class="card-body">
          <form @submit.prevent="createUser">
            <div class="form-group">
              <label for="id">ID de Usuario:</label>
              <input type="text" class="form-control" id="id" v-model="nuevoUsuario.pkUsuario" required>
            </div>
            <div class="form-group">
              <label for="nombre">Nombre de Usuario:</label>
              <input type="text" class="form-control" id="nombreUsuario" v-model="nuevoUsuario.nombreUsuario" required>
            </div>
            <div class="form-group">
              <label for="contraseña">Contraseña:</label>
              <input type="password" class="form-control" id="contraseña" v-model="nuevoUsuario.contraseña" required>
            </div>
            <div class="form-group">
              <label for="rol">Rol:</label>
              <input type="text" class="form-control" id="rol" v-model="nuevoUsuario.fkRol" required>
            </div>
            <button type="submit" class="btn btn-primary">Crear Usuario</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        nuevoUsuario: {
          pkUsuario: '',
          nombreUsuario: '',
          contraseña: '',
          fkRol: ''
        }
      };
    },
    methods: {
      createUser() {
        axios.post('https://localhost:7006/api/Usuarios', this.nuevoUsuario)
          .then(response => {
            console.log('Usuario creado:', response.data);
            this.$router.push('/dashboard/UserList');
            // Redirigir o mostrar mensaje de éxito
          })
          .catch(error => {
            console.error('Error al crear usuario:', error);
            // Mostrar mensaje de error al usuario
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    max-width: 600px;
    margin: 0 auto;
  }
  .card-header {
    font-size: 24px;
  }
  </style>
  