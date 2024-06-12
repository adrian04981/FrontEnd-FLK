<template>
  <div class="container pt-5">
    <button class="btn btn-primary mb-3" @click="showRegisterModal = true">Registrar Usuario</button>
    
    <!-- Fila para los filtros -->
    <div class="row mb-3">
      <div class="col-auto">
        <!-- Filtro por nombre de usuario -->
        <div class="input-group input-group-sm">
          <label for="username-filter" class="input-group-text">Filtrar por nombre:</label>
          <input type="text" class="form-control" id="username-filter" v-model="usernameFilter">
        </div>
      </div>
      <div class="col-auto">
        <!-- Filtro por rol -->
        <div class="input-group input-group-sm">
          <label for="role-filter" class="input-group-text">Filtrar por rol:</label>
          <select class="form-select" id="role-filter" v-model="roleFilter">
            <option value="">Todos</option>
            <option v-for="role in roles" :key="role.pkRol" :value="role.pkRol">{{ role.nombre }}</option>
          </select>
        </div>
      </div>
      <div class="col-auto">
        <!-- Barra de búsqueda -->
        <div class="input-group input-group-sm">
          <input type="text" class="form-control" placeholder="Buscar en todos los campos..." v-model="globalSearch">
          <button class="btn btn-outline-secondary" type="button" @click="clearFilters">Limpiar</button>
        </div>
      </div>
    </div>
    <!-- Tabla de usuarios -->
    <table id="usuarios-table" class="table table-striped" style="width:100%">
      <!-- Encabezado de la tabla -->
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre de Usuario</th>
          <th>Contraseña</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <!-- Cuerpo de la tabla -->
      <tbody>
        <tr v-for="usuario in paginatedUsuarios" :key="usuario.pkUsuario">
          <td>{{ usuario.pkUsuario }}</td>
          <td>{{ usuario.nombreUsuario }}</td>
          <td>{{ '*'.repeat(usuario.contraseña.length) }}</td>
          <td>{{ getRoleName(usuario.fkRol) }}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="consultarUsuario(usuario.pkUsuario)">Consultar</button>
            <button class="btn btn-danger btn-sm" @click="confirmDelete(usuario.pkUsuario)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Controles de navegación de página -->
    <div class="row justify-content-between mb-3">
      <div class="col-auto">
        <div class="input-group input-group-sm">
          <label for="page-select" class="input-group-text">Página:</label>
          <select class="form-select" id="page-select" v-model="pageSize">
            <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>
      </div>
      <div class="col-auto">
        <nav aria-label="Page navigation">
          <ul class="pagination pagination-sm">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="prevPage" :disabled="currentPage === 1">Anterior</button>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- Modal para registrar usuario -->
    <RegisterUser v-if="showRegisterModal" @close="showRegisterModal = false" @user-registered="fetchUsuarios" :roles="roles" />
    <!-- Modal para eliminar usuario -->
    <EliminarUsuario v-if="showDeleteModal" @close="showDeleteModal = false" @user-deleted="fetchUsuarios" :usuarioId="usuarioToDelete" />
    <!-- Modal para consultar usuario -->
    <ConsultarUsuario v-if="showConsultarModal" @close="showConsultarModal = false" :usuario="usuarioToConsultar" />
  </div>
</template>

<script>
import axios from 'axios';
import RegisterUser from 'C:/Users/adria/FrontEnd-FLK/src/components/GestionarCredenciales/RegistrarUsuario.vue';
import EliminarUsuario from 'C:/Users/adria/FrontEnd-FLK/src/components/GestionarCredenciales/EliminarUsuario.vue';
import ConsultarUsuario from 'C:/Users/adria/FrontEnd-FLK/src/components/GestionarCredenciales/ConsultarUsuario.vue';

export default {
  components: {
    RegisterUser,
    EliminarUsuario,
    ConsultarUsuario
  },
  data() {
    return {
      usuarios: [],
      roles: [],
      usernameFilter: '',
      roleFilter: '',
      globalSearch: '',
      pageSize: 10,
      currentPage: 1,
      pageSizes: [5, 10, 15, 20],
      showRegisterModal: false,
      showDeleteModal: false,
      showConsultarModal: false,
      usuarioToDelete: null,
      usuarioToConsultar: null,
    };
  },
  created() {
    this.fetchUsuarios();
    this.fetchRoles();
  },
  computed: {
    filteredUsuarios() {
      return this.usuarios.filter(usuario => {
        const matchesUsername = usuario.nombreUsuario.toLowerCase().includes(this.usernameFilter.toLowerCase());
        const matchesRole = this.roleFilter ? usuario.fkRol == this.roleFilter : true;
        const matchesGlobalSearch = Object.values(usuario).some(value =>
          value.toString().toLowerCase().includes(this.globalSearch.toLowerCase())
        );

        return matchesUsername && matchesRole && matchesGlobalSearch;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredUsuarios.length / this.pageSize);
    },
    paginatedUsuarios() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredUsuarios.slice(start, end);
    }
  },
  methods: {
    async fetchUsuarios() {
      try {
        const response = await axios.get('https://localhost:7006/api/Usuarios');
        this.usuarios = response.data;
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    },
    async fetchRoles() {
      try {
        const response = await axios.get('https://localhost:7006/api/Rols');
        this.roles = response.data;
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    },
    getRoleName(roleId) {
      const role = this.roles.find(role => role.pkRol === roleId);
      return role ? role.nombre : '';
    },
    clearFilters() {
      this.usernameFilter = '';
      this.roleFilter = '';
      this.globalSearch = '';
      this.currentPage = 1;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    confirmDelete(usuarioId) {
      this.usuarioToDelete = usuarioId;
      this.showDeleteModal = true;
    },
    async consultarUsuario(usuarioId) {
      try {
        const response = await axios.get(`https://localhost:7006/api/Usuarios/${usuarioId}`);
        this.usuarioToConsultar = response.data;
        this.showConsultarModal = true;
      } catch (error) {
        console.error('Error fetching usuario:', error);
      }
    }
  }
};
</script>

<style>
/* Agregar estilos personalizados si es necesario */
</style>
