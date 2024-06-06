<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <!-- Roles Section -->
      <div class="col-md-5">
        <h2 class="text-center mb-4">Lista roles</h2>
        <div class="text-center mb-4">
          <button class="btn btn-primary" @click="showModal('createRol')">Crear Rol</button>
        </div>
        <div class="table-responsive">
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rol in rolList" :key="rol.pkRol">
                <td>{{ rol.pkRol }}</td>
                <td>{{ rol.nombre }}</td>
                <td>{{ rol.descripcion }}</td>
                <td>
                  <button class="btn btn-info btn-sm mr-2" @click="showModal('viewRol', rol)">Consultar</button>
                  <button class="btn btn-warning btn-sm mr-2" @click="showModal('editRol', rol)">Editar</button>
                  <button class="btn btn-danger btn-sm" @click="showModal('deleteRol', rol)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Usuarios Section -->
      <div class="col-md-5">
        <h2 class="text-center mb-4">Lista Usuarios</h2>
        <div class="text-center mb-4">
          <button class="btn btn-primary" @click="showModal('createUser')">Crear Usuario</button>
        </div>
        <div class="table-responsive">
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Usuario</th>
                <th scope="col">Contraseña</th>
                <th scope="col">Rol</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in usuarioList" :key="usuario.pkUsuario">
                <td>{{ usuario.pkUsuario }}</td>
                <td>{{ usuario.nombreUsuario }}</td>
                <td>{{ usuario.contraseña }}</td>
                <td>{{ usuario.fkRol }}</td>
                <td>
                  <button class="btn btn-info btn-sm mr-2" @click="showModal('viewUser', usuario)">Consultar</button>
                  <button class="btn btn-warning btn-sm mr-2" @click="showModal('editUser', usuario)">Editar</button>
                  <button class="btn btn-danger btn-sm" @click="showModal('deleteUser', usuario)">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalLabel">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div v-if="modalType === 'viewUser' || modalType === 'viewRol'">
              <p><strong>ID:</strong> {{ selectedItem.pkUsuario || selectedItem.pkRol }}</p>
              <p><strong>Nombre:</strong> {{ selectedItem.nombreUsuario || selectedItem.nombre }}</p>
              <p v-if="selectedItem.contraseña"><strong>Contraseña:</strong> {{ selectedItem.contraseña }}</p>
              <p><strong>Rol/Descripción:</strong> {{ selectedItem.fkRol || selectedItem.descripcion }}</p>
            </div>

            <!-- Form for create/edit role -->
            <div v-else-if="modalType === 'createRol' || modalType === 'editRol'">
              <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label for="nombreRol" class="form-label">Nombre:</label>
                  <input type="text" class="form-control" id="nombreRol" v-model="selectedItem.nombre" required>
                </div>
                <div class="mb-3">
                  <label for="descripcionRol" class="form-label">Descripción:</label>
                  <input type="text" class="form-control" id="descripcionRol" v-model="selectedItem.descripcion" required>
                </div>
                <button type="submit" class="btn btn-primary">{{ modalType === 'createRol' ? 'Crear' : 'Guardar' }}</button>
              </form>
            </div>

            <!-- Form for create/edit user -->
            <div v-else-if="modalType === 'createUser' || modalType === 'editUser'">
              <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label for="nombreUsuario" class="form-label">Usuario:</label>
                  <input type="text" class="form-control" id="nombreUsuario" v-model="selectedItem.nombreUsuario" required>
                </div>
                <div class="mb-3">
                  <label for="contraseñaUsuario" class="form-label">Contraseña:</label>
                  <input type="password" class="form-control" id="contraseñaUsuario" v-model="selectedItem.contraseña" required>
                </div>
                <div class="mb-3">
                  <label for="rolUsuario" class="form-label">Rol:</label>
                  <select class="form-select" id="rolUsuario" v-model="selectedItem.fkRol" required>
                    <option v-for="rol in rolOptions" :value="rol.value">{{ rol.text }}</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-primary">{{ modalType === 'createUser' ? 'Crear' : 'Guardar' }}</button>
              </form>
            </div>

            <!-- Confirm delete -->
            <div v-else-if="modalType === 'deleteUser' || modalType === 'deleteRol'">
              <p>¿Estás seguro de que quieres eliminar este {{ modalType === 'deleteUser' ? 'usuario' : 'rol' }}?</p>
              <button class="btn btn-danger" @click="handleDelete">Eliminar</button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

function generateRandomId() {
  return Math.floor(10000000 + Math.random() * 90000000);
}

export default {
  name: 'Dashboard',
  data() {
    return {
      usuarioList: [],
      rolList: [],
      selectedItem: null,
      modalType: null,
      modalInstance: null,
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
          ? { pkRol: 0, nombre: '', descripcion: '' }
          : { pkUsuario: 0, nombreUsuario: '', contraseña: '', fkRol: 0 };
      
      this.$nextTick(() => {
        const modalElement = document.getElementById('modal');
        this.modalInstance = new Modal(modalElement);
        this.modalInstance.show();
      });
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
            this.modalInstance.hide();
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
          nombre: this.selectedItem.nombre,
          descripcion: this.selectedItem.descripcion
        };
        this.$axios[method](url, data)
          .then(() => {
            this.modalInstance.hide();
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
          this.modalInstance.hide();
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
.roles-section, .usuarios-section {
  margin: 2.5%;
}

.table-responsive {
  background-color: #222;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.table-dark th, .table-dark td {
  border-color: #444;
}

.table-dark thead th {
  background-color: #333;
}

.table-dark tbody tr:hover {
  background-color: #555;
}

.table-dark tbody tr:nth-child(even) {
  background-color: #444;
}
</style>
