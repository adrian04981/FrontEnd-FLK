<template>
    <div class="container">
          <div class="row justify-content-center mt-5">
            <div class="col-10">
              <h2 class="text-center mb-4">Lista roles</h2>
              <div class="text-center mb-4">
                <router-link to="/createuser" class="btn btn-primary">Crear Rol</router-link>
              </div>
              <div class="fallout-data-table">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" class="text-white">#</th>
                      <th scope="col" class="text-white">Nombre</th>
                      <th scope="col" class="text-white">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="rol in roles" :key="rol.pkRol">
                      <td>{{ rol.pkRol }}</td>
                      <td>{{ rol.nombre }}</td>
                      <td>
                        <router-link :to="'/ViewUsuario/' + rol.pkRol" class="btn btn-info mr-2">Consultar</router-link>
                        <router-link :to="'/Editusers/' + rol.pkRol" class="btn btn-warning mr-2">Editar</router-link>
                        <router-link :to="'/DeleteUsuario/' + rol.pkRol" class="btn btn-danger">Eliminar</router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row justify-content-center mt-5">
            <div class="col-10">
              <h2 class="text-center mb-4">Lista Usuarios</h2>
              <div class="text-center mb-4">
                <router-link to="/createuser" class="btn btn-primary">Crear Usuario</router-link>
              </div>
              <div class="fallout-data-table">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" class="text-white">#</th>
                      <th scope="col" class="text-white">Usuario</th>
                      <th scope="col" class="text-white">Contraseña</th>
                      <th scope="col" class="text-white">Rol</th>
                      <th scope="col" class="text-white">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="usuario in usuarios" :key="usuario.pkUsuario">
                      <td>{{ usuario.pkUsuario }}</td>
                      <td>{{ usuario.nombreUsuario }}</td>
                      <td>{{ usuario.contraseña }}</td>
                      <td>{{ usuario.fkRol }}</td>
                      <td>
                        <router-link :to="'/ViewUsuario/' + usuario.pkUsuario" class="btn btn-info mr-2">Consultar</router-link>
                        <router-link :to="'/Editusers/' + usuario.pkUsuario" class="btn btn-warning mr-2">Editar</router-link>
                        <router-link :to="'/DeleteUsuario/' + usuario.pkUsuario" class="btn btn-danger">Eliminar</router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </template>
      <script> 
      export default {
        name: 'Dashboard',
        computed: {
          isAdmin() {
            const role = localStorage.getItem('role');
            return role === 'Administrador';
          },
          isRep() {
            const role = localStorage.getItem('role');
            return role === 'Recepcionista';
          },
          isAsist() {
            const role = localStorage.getItem('role');
            return role === 'Asistente de Operaciones';
          }
        },
        data() {
          return {
            usuarios: [],
            roles:[]
          };
        },
        mounted() {
          this.$axios.get('Usuarios')
            .then(response => {
              this.usuarios = response.data;
            })
            .catch(error => {
              console.error('Error al cargar datos de usuarios:', error);
            });
             // Obtiene la lista de roles al cargar el componente
          this.$axios.get('Rols')
            .then(response => {
              this.roles = response.data;
            })
            .catch(error => {
              console.error('Error al cargar roles:', error);
            });
        },
        }
      </script>
      
      <style scoped>
      .fallout-data-table {
        font-family: 'Roboto', sans-serif;
        color: #FFF;
        margin: 20px auto;
        padding: 20px;
        background-color: #222;
        border: 1px solid #888;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
      
      .fallout-data-table table {
        width: 100%;
        border-collapse: collapse;
      }
      
      .fallout-data-table th,
      .fallout-data-table td {
        padding: 10px;
        border-bottom: 2px solid #888;
      }
      
      .fallout-data-table th {
        background-color: #111;
      }
      
      .fallout-data-table tbody tr:nth-child(even) {
        background-color: #333;
      }
      
      .fallout-data-table tbody tr:hover {
        background-color: #444;
      }
      </style>
      















