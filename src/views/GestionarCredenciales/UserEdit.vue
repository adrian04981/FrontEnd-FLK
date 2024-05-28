<template>
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-md-8">
          <h2 class="text-center mb-4 fallout-title">Editar Usuario</h2>
          <form @submit.prevent="editarUsuario" class="fallout-form">
            <div class="form-group">
              <label for="nombreUsuario" class="text-white">Nombre de Usuario</label>
              <input type="text" class="form-control" id="nombreUsuario" v-model="usuario.nombreUsuario">
            </div>
            <div class="form-group">
              <label for="contraseña" class="text-white">Contraseña</label>
              <input type="text" class="form-control" id="contraseña" v-model="usuario.contraseña">
            </div>
            <div class="form-group">
              <label for="fkRol" class="text-white">Rol</label>
              <input type="text" class="form-control" id="fkRol" v-model="usuario.fkRol">
            </div>
            <button type="submit" class="btn btn-primary">Guardar Cambios</button>
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
        usuario: {
          pkUsuario: '',
          nombreUsuario: '',
          contraseña: '',
          fkRol: ''
        }
      };
    },
    mounted() {
      const usuarioId = this.$route.params.id;
      axios.get(`https://localhost:7006/api/Usuarios/${usuarioId}`)
        .then(response => {
          this.usuario = response.data;
          console.log(this.usuario);
        })
        .catch(error => {
          console.error('Error al cargar datos del usuario:', error);
        });
    },
    methods: {
      editarUsuario() {
        const usuarioId = this.$route.params.id;
        axios.put(`https://localhost:7006/api/Usuarios/${usuarioId}`, this.usuario)
          .then(response => {
            console.log('Usuario editado:', response.data);
            // Redirigir a la lista de usuarios al guardar correctamente
            this.$router.push('/dashboard/UsersList');
          })
          .catch(error => {
            console.error('Error al editar usuario:', error);
            // Mostrar un mensaje de error al usuario si falla la edición
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .fallout-title {
    font-family: 'Roboto', sans-serif;
    color: #FFF;
    margin-bottom: 20px;
    padding: 10px;
    background-color: #222;
    border: 1px solid #888;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
  
  .fallout-form .form-group label {
    color: #FFF;
  }
  
  .fallout-form input[type="text"] {
    background-color: #333;
    color: #FFF;
    border: 1px solid #888;
  }
  
  .fallout-form button[type="submit"] {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .fallout-form button[type="submit"]:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
  </style>
  