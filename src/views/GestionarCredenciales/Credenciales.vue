<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <!-- Roles Section -->
      <div class="col-5 roles-section">
        <h2 class="text-center mb-4">Lista roles</h2>
        <div class="text-center mb-4">
          <b-button variant="primary" @click="showModal('createRol')">Crear Rol</b-button>
        </div>
        <div class="fallout-data-table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="text-white">ID</th>
                <th scope="col" class="text-white">Nombre</th>
                <th scope="col" class="text-white">Descripción</th>
                <th scope="col" class="text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rol in rolList" :key="rol.pkRol">
                <td>{{ rol.pkRol }}</td>
                <td>{{ rol.nombre }}</td>
                <td>{{ rol.descripcion }}</td>
                <td>
                  <b-button variant="info" class="mr-2" @click="showModal('viewRol', rol)">Consultar</b-button>
                  <b-button variant="warning" class="mr-2" @click="showModal('editRol', rol)">Editar</b-button>
                  <b-button variant="danger" @click="showModal('deleteRol', rol)">Eliminar</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Usuarios Section -->
      <div class="col-5 usuarios-section">
        <h2 class="text-center mb-4">Lista Usuarios</h2>
        <div class="text-center mb-4">
          <b-button variant="primary" @click="showModal('createUser')">Crear Usuario</b-button>
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
                  <b-button variant="info" class="mr-2" @click="showModal('viewUser', usuario)">Consultar</b-button>
                  <b-button variant="warning" class="mr-2" @click="showModal('editUser', usuario)">Editar</b-button>
                  <b-button variant="danger" @click="showModal('deleteUser', usuario)">Eliminar</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <b-modal v-if="selectedItem && modalType" v-model="showModalFlag" :title="modalTitle">
      <template v-slot:default>
        <div v-if="modalType === 'viewUser' || modalType === 'viewRol'">
          <p><strong>ID:</strong> {{ selectedItem.pkUsuario || selectedItem.pkRol }}</p>
          <p><strong>Nombre:</strong> {{ selectedItem.nombreUsuario || selectedItem.nombre }}</p>
          <p v-if="selectedItem.contraseña"><strong>Contraseña:</strong> {{ selectedItem.contraseña }}</p>
          <p><strong>Rol/Descripción:</strong> {{ selectedItem.fkRol || selectedItem.descripcion }}</p>
        </div>

        <!-- Form for create/edit role -->
        <div v-else-if="modalType === 'createRol' || modalType === 'editRol'">
          <b-form @submit.prevent="handleSubmit">
            <b-form-group label="Nombre:" label-for="nombreRol">
              <b-form-input id="nombreRol" v-model="selectedItem.nombre" required></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">{{ modalType === 'createRol' ? 'Crear' : 'Guardar' }}</b-button>
          </b-form>
        </div>

        <!-- Form for create/edit user -->
        <div v-else-if="modalType === 'createUser' || modalType === 'editUser'">
          <b-form @submit.prevent="handleSubmit">
            <b-form-group label="Usuario:" label-for="nombreUsuario">
              <b-form-input id="nombreUsuario" v-model="selectedItem.nombreUsuario" required></b-form-input>
            </b-form-group>
            <b-form-group label="Contraseña:" label-for="contraseñaUsuario">
              <b-form-input id="contraseñaUsuario" type="password" v-model="selectedItem.contraseña" required></b-form-input>
            </b-form-group>
            <b-form-group label="Rol:" label-for="rolUsuario">
              <b-form-select id="rolUsuario" v-model="selectedItem.fkRol" :options="rolOptions" required></b-form-select>
            </b-form-group>
            <b-button type="submit" variant="primary">{{ modalType === 'createUser' ? 'Crear' : 'Guardar' }}</b-button>
          </b-form>
        </div>

        <!-- Confirm delete -->
        <div v-else-if="modalType === 'deleteUser' || modalType === 'deleteRol'">
          <p>¿Estás seguro de que quieres eliminar este {{ modalType === 'deleteUser' ? 'usuario' : 'rol' }}?</p>
          <b-button variant="danger" @click="handleDelete">Eliminar</b-button>
        </div>
      </template>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="showModalFlag = false">Cancelar</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
function generateRandomId() {
  return Math.floor(10000000 + Math.random() * 90000000);
}

export default {
  name: 'Dashboard',
  data() {
    return {
      usuarioList: [],
      rolList: [],
      showModalFlag: false,
      selectedItem: null,
      modalType: null,
    };
  },
  mounted() {
    this.fetchServices();
  },
  methods: {
    fetchServices() {
      this.$axios.get('Usuarios')
        .then(response => {
          this.usuarioList = response.data;
        })
        .catch(error => {
          console.error('Error al cargar datos de usuarios:', error);
        });
      this.$axios.get('Rols')
        .then(response => {
          this.rolList = response.data;
        })
        .catch(error => {
          console.error('Error al cargar datos de roles:', error);
        });
    },
    showModal(type, item = null) {
      this.modalType = type;
      this.selectedItem = item
        ? { ...item }
        : type.includes('Rol')
          ? { pkRol: 0, nombre: '' }
          : { pkUsuario: 0, nombreUsuario: '', contraseña: '', fkRol: 0 };
      this.showModalFlag = true;
    },
    handleSubmit() {
      if (this.modalType === 'createUser' || this.modalType === 'editUser') {
        const url = this.modalType === 'createUser' ? 'Usuarios' : `Usuarios/${this.selectedItem.pkUsuario}`;
        const method = this.modalType === 'createUser' ? 'post' : 'put';
        const data = {
          pkUsuario: this.selectedItem.pkUsuario || generateRandomId(),
          nombreUsuario: this.selectedItem.nombreUsuario,
          contraseña: this.selectedItem.contraseña,
          fkRol: this.selectedItem.fkRol
        };
        this.$axios[method](url, data)
          .then(() => {
            this.showModalFlag = false;
            this.fetchServices();
          })
          .catch(error => {
            console.error('Error al guardar usuario:', error);
          });
      } else if (this.modalType === 'createRol' || this.modalType === 'editRol') {
        const url = this.modalType === 'createRol' ? 'Rols' : `Rols/${this.selectedItem.pkRol}`;
        const method = this.modalType === 'createRol' ? 'post' : 'put';
        const data = {
          pkRol: this.selectedItem.pkRol || generateRandomId(),
          nombre: this.selectedItem.nombre
        };
        this.$axios[method](url, data)
          .then(() => {
            this.showModalFlag = false;
            this.fetchServices();
          })
          .catch(error => {
            console.error('Error al guardar rol:', error);
          });
      }
    },
    handleDelete() {
      const url = this.modalType === 'deleteUser' ? `Usuarios/${this.selectedItem.pkUsuario}` : `Rols/${this.selectedItem.pkRol}`;
      this.$axios.delete(url)
        .then(() => {
          this.showModalFlag = false;
          this.fetchServices();
        })
        .catch(error => {
          console.error('Error al eliminar:', error);
        });
    }
  },
  computed: {
    modalTitle() {
      switch (this.modalType) {
        case 'createUser':
          return 'Crear Usuario';
        case 'editUser':
          return 'Editar Usuario';
        case 'viewUser':
          return 'Consultar Usuario';
        case 'deleteUser':
          return 'Eliminar Usuario';
        case 'createRol':
          return 'Crear Rol';
        case 'editRol':
          return 'Editar Rol';
        case 'viewRol':
          return 'Consultar Rol';
        case 'deleteRol':
          return 'Eliminar Rol';
        default:
          return '';
      }
    },
    rolOptions() {
      return this.rolList.map(rol => ({
        value: rol.pkRol,
        text: rol.nombre,
      }));
    }
  }
};
</script>

<style scoped>
.roles-section {
  margin-right: 5%;
}

.usuarios-section {
  margin-left: 5%;
}

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
