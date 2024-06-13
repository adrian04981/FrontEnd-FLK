<template>
  <div class="container pt-5">
    <h1>Lista de Usuarios</h1>
    <button class="btn btn-primary mb-3" @click="showRegisterModal = true">Registrar Usuario</button>
    
    <!-- Fila para los filtros de Usuarios -->
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
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre de Usuario</th>
          <th>Contraseña</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in paginatedUsuarios" :key="usuario.pkUsuario">
          <td>{{ usuario.pkUsuario }}</td>
          <td>{{ usuario.nombreUsuario }}</td>
          <td>{{ '*'.repeat(usuario.contraseña.length) }}</td>
          <td>{{ getRoleName(usuario.fkRol) }}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="consultarUsuario(usuario.pkUsuario)">Consultar</button>
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

    <!-- Fila para los filtros de Personal -->
    <h1>Datos de Usuario</h1>
    <div class="row mb-3">
      <div class="col-auto">
        <!-- Filtro por nombre de personal -->
        <div class="input-group input-group-sm">
          <label for="personal-name-filter" class="input-group-text">Filtrar por nombre:</label>
          <input type="text" class="form-control" id="personal-name-filter" v-model="personalNameFilter">
        </div>
      </div>
      <div class="col-auto">
        <!-- Barra de búsqueda -->
        <div class="input-group input-group-sm">
          <input type="text" class="form-control" placeholder="Buscar en todos los campos..." v-model="personalGlobalSearch">
          <button class="btn btn-outline-secondary" type="button" @click="clearPersonalFilters">Limpiar</button>
        </div>
      </div>
    </div>
    <!-- Tabla de personal -->
    <table id="personal-table" class="table table-striped" style="width:100%">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>DNI</th>
          <th>Email</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="personal in paginatedPersonal" :key="personal.pkPersonal">
          <td>{{ personal.nombre }}</td>
          <td>{{ personal.dni }}</td>
          <td>{{ personal.email }}</td>
          <td>{{ personal.direccion }}</td>
          <td>{{ personal.telefono }}</td>
          <td>
            <button class="btn btn-info btn-sm" @click="consultarPersonal(personal.pkPersonal)">Consultar</button>
            <button class="btn btn-warning btn-sm" @click="editarPersonal(personal.pkPersonal)">Editar</button>
            <button class="btn btn-danger btn-sm" @click="confirmDeletePersonal(personal.pkPersonal, personal.fkUsuario)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Controles de navegación de página -->
    <div class="row justify-content-between mb-3">
      <div class="col-auto">
        <div class="input-group input-group-sm">
          <label for="personal-page-select" class="input-group-text">Página:</label>
          <select class="form-select" id="personal-page-select" v-model="personalPageSize">
            <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
          </select>
        </div>
      </div>
      <div class="col-auto">
        <nav aria-label="Page navigation">
          <ul class="pagination pagination-sm">
            <li class="page-item" :class="{ disabled: personalCurrentPage === 1 }">
              <button class="page-link" @click="prevPersonalPage" :disabled="personalCurrentPage === 1">Anterior</button>
            </li>
            <li class="page-item" :class="{ disabled: personalCurrentPage === personalTotalPages }">
              <button class="page-link" @click="nextPersonalPage" :disabled="personalCurrentPage === personalTotalPages">Siguiente</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Modal para registrar usuario -->
    <RegisterUser v-if="showRegisterModal" @close="showRegisterModal = false" @user-registered="fetchUsuarios" :roles="roles" />
    <!-- Modal para consultar usuario -->
    <ConsultarUsuario v-if="showConsultarModal" @close="showConsultarModal = false" :usuario="usuarioToConsultar" />

    <!-- Modales para personal -->
    <ConsultarPersonal v-if="showConsultarPersonalModal" @close="showConsultarPersonalModal = false" :id="personalId" />
    <EditarPersonal v-if="showEditarPersonalModal" @close="showEditarPersonalModal = false" :id="personalId" />
    <EliminarPersonal v-if="showDeletePersonalModal" @close="showDeletePersonalModal = false" @personal-deleted="fetchPersonales" :personalId="personalToDelete" :usuarioId="usuarioToDelete" />
  </div>
</template>

<script>
import axios from 'axios';
import RegisterUser from '@/components/GestionarCredenciales/RegistrarUsuario.vue';
import ConsultarUsuario from '@/components/GestionarCredenciales/ConsultarUsuario.vue';
import ConsultarPersonal from '@/components/GestionarPersonal/ConsultarPersonal.vue';
import EditarPersonal from '@/components/GestionarPersonal/EditarPersonal.vue';
import EliminarPersonal from '@/components/GestionarPersonal/EliminarPersonal.vue';


export default {
  components: {
    RegisterUser,
    ConsultarUsuario,
    ConsultarPersonal,
    EditarPersonal,
    EliminarPersonal
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
      showConsultarModal: false,
      usuarioToConsultar: null,
      showConsultarPersonalModal: false,
      showEditarPersonalModal: false,
      personalId: null,
      personales: [],
      personalNameFilter: '',
      personalGlobalSearch: '',
      personalPageSize: 10,
      personalCurrentPage: 1,
      personalToDelete: null,
      usuarioToDelete: null,
      showDeletePersonalModal: false
    };
  },
  created() {
    this.fetchUsuarios();
    this.fetchRoles();
    this.fetchPersonales();
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
    },
    filteredPersonal() {
      return this.personales.filter(personal => {
        const matchesName = personal.nombre.toLowerCase().includes(this.personalNameFilter.toLowerCase());
        const matchesGlobalSearch = Object.values(personal).some(value =>
          value.toString().toLowerCase().includes(this.personalGlobalSearch.toLowerCase())
        );

        return matchesName && matchesGlobalSearch;
      });
    },
    personalTotalPages() {
      return Math.ceil(this.filteredPersonal.length / this.personalPageSize);
    },
    paginatedPersonal() {
      const start = (this.personalCurrentPage - 1) * this.personalPageSize;
      const end = start + this.personalPageSize;
      return this.filteredPersonal.slice(start, end);
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
    async fetchPersonales() {
      try {
        const response = await axios.get('https://localhost:7006/api/Personals');
        this.personales = response.data;
      } catch (error) {
        console.error('Error fetching personales:', error);
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
    clearPersonalFilters() {
      this.personalNameFilter = '';
      this.personalGlobalSearch = '';
      this.personalCurrentPage = 1;
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
    prevPersonalPage() {
      if (this.personalCurrentPage > 1) {
        this.personalCurrentPage--;
      }
    },
    nextPersonalPage() {
      if (this.personalCurrentPage < this.personalTotalPages) {
        this.personalCurrentPage++;
      }
    },
    confirmDeletePersonal(personalId, usuarioId) {
      this.personalToDelete = personalId;
      this.usuarioToDelete = usuarioId;
      this.showDeletePersonalModal = true;
    },
    async consultarUsuario(usuarioId) {
      try {
        const response = await axios.get(`https://localhost:7006/api/Usuarios/${usuarioId}`);
        this.usuarioToConsultar = response.data;
        this.showConsultarModal = true;
      } catch (error) {
        console.error('Error fetching usuario:', error);
      }
    },
    consultarPersonal(id) {
      this.personalId = id;
      this.showConsultarPersonalModal = true;
    },
    editarPersonal(id) {
      this.personalId = id;
      this.showEditarPersonalModal = true;
    }
  }
};
</script>

<style>
/* Agregar estilos personalizados si es necesario */
</style>
