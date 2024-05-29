<template>
<div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-10">
          <h2 class="text-center mb-4">Lista roles</h2>
          <div class="text-center mb-4">
            <router-link to="/dashboard-admin/RolCreate" class="btn btn-primary">Crear Rol</router-link>
          </div>
          <div class="fallout-data-table">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="text-white">ID</th>
                  <th scope="col" class="text-white">Nombre</th>
                  <th scope="col" class="text-white">Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rol in rolList" :key="rol.pkRol">
                  <td>{{ rol.pkRol }}</td>
                  <td>{{ rol.nombre }}</td>
                  <td>
                    <router-link :to="'/dashboard-admin/ViewUsuario/' + rol.pkRol" class="btn btn-info mr-2">Consultar</router-link>
                    <router-link :to="'/dashboard-admin/useredit/' + rol.pkRol" class="btn btn-warning mr-2">Editar</router-link>
                    <router-link :to="'/dashboard-admin/DeleteUsuario/' + rol.pkRol" class="btn btn-danger">Eliminar</router-link>
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
            <router-link to="/dashboard-admin/UserCreate" class="btn btn-primary">Crear Usuario</router-link>
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
                <tr v-for="usuario in usuarioList" :key="usuario.pkUsuario">
                  <td>{{ usuario.pkUsuario }}</td>
                  <td>{{ usuario.nombreUsuario }}</td>
                  <td>{{ usuario.contraseña }}</td>
                  <td>{{ usuario.fkRol }}</td>
                  <td>
                    <button class="btn btn-info mr-2" @click="showUsuario(usuario)" variant="info">Consultar</button>
                    <router-link :to="'/dashboard-admin/UserEdit/' + usuario.pkUsuario" class="btn btn-warning mr-2">Editar</router-link>
                    <router-link :to="'/dashboard-admin/UserDelete/' + usuario.pkUsuario" class="btn btn-danger">Eliminar</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Modal para Consultar Personal -->
    <b-modal v-if="selectedUsuario" v-model="showModal" title="Consultar Usuario" @hide="clearSelectedPersonal">
      <div>
        <p><strong>#:</strong> {{ selectedUsuario.pkUsuario }}</p>
        <p><strong>Usuario:</strong> {{ selectedUsuario.nombreUsuario }}</p>
        <p><strong>Contraseña:</strong> {{ selectedUsuario.contraseña }}</p>
        <p><strong>Rol:</strong> {{ selectedUsuario.fkRol }}</p>
      </div>
    </b-modal>

    
    
    </div>
  </template>
  <script> 
  export default {
    name: 'Dashboard',
    data() {
      return {
        usuarioList: [],
        rolList:[],
        showModal: false,
        selectedUsuario: null
      };
    },
    mounted() {
    this.fetchServices();
  },
  methods: {
    fetchServices() {
      this.$axios.get('Usuarios')
        .then(response => {
          console.log('Datos de servicios:', response.data); // Log para verificar datos
          this.usuarioList = response.data;
        })
        .catch(error => {
          console.error('Error al cargar datos de servicios:', error);
        });
        this.$axios.get('Rols')
        .then(response => {
          console.log('Datos de servicios:', response.data); // Log para verificar datos
          this.rolList = response.data;
        })
        .catch(error => {
          console.error('Error al cargar datos de servicios:', error);
        });
    },
    showUsuario(usuario) {
      this.selectedUsuario = usuario;
      this.showModal = true;
    },
    clearSelectedUsuario() {
      this.selectedUsuario = null;
    }
  }    
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
  