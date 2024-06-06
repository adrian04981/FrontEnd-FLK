<template>
  <div class="container">
    <!-- Lista de Personal -->
    <div class="row justify-content-center mt-5">
      <div class="col-10">
        <h2 class="text-center mb-4">Lista PERSONAL</h2>
        <div class="text-center mb-4">
          <button class="btn btn-primary" @click="showModal('createPersonal')">Crear Personal</button>
        </div>
        <div class="fallout-data-table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="text-white">#</th>
                <th scope="col" class="text-white">Nombre</th>
                <th scope="col" class="text-white">DNI</th>
                <th scope="col" class="text-white">Email</th>
                <th scope="col" class="text-white">Dirección</th>
                <th scope="col" class="text-white">Telefono</th>
                <th scope="col" class="text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="personal in personalList" :key="personal.pkPersonal">
                <td>{{ personal.pkPersonal }}</td>
                <td>{{ personal.nombre }}</td>
                <td>{{ personal.dni }}</td>
                <td>{{ personal.email }}</td>
                <td>{{ personal.direccion }}</td>
                <td>{{ personal.telefono }}</td>
                <td>
                  <button class="btn btn-info btn-sm mr-2" @click="showModal('viewPersonal', personal)">Consultar</button>
                  <button class="btn btn-warning btn-sm mr-2" @click="showModal('editPersonal', personal)">Editar</button>
                  <button class="btn btn-danger btn-sm" @click="showModal('deletePersonal', personal)">Eliminar</button>
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
            <div v-if="modalType === 'viewPersonal'">
              <p><strong>#:</strong> {{ selectedItem.pkPersonal }}</p>
              <p><strong>Nombre:</strong> {{ selectedItem.nombre }}</p>
              <p><strong>DNI:</strong> {{ selectedItem.dni }}</p>
              <p><strong>Email:</strong> {{ selectedItem.email }}</p>
              <p><strong>Dirección:</strong> {{ selectedItem.direccion }}</p>
              <p><strong>Telefono:</strong> {{ selectedItem.telefono }}</p>
            </div>

            <!-- Form for create/edit personal -->
            <div v-else-if="modalType === 'createPersonal' || modalType === 'editPersonal'">
              <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre:</label>
                  <input type="text" class="form-control" id="nombre" v-model="selectedItem.nombre" required>
                </div>
                <div class="mb-3">
                  <label for="dni" class="form-label">DNI:</label>
                  <input type="text" class="form-control" id="dni" v-model="selectedItem.dni" required>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email:</label>
                  <input type="email" class="form-control" id="email" v-model="selectedItem.email" required>
                </div>
                <div class="mb-3">
                  <label for="direccion" class="form-label">Dirección:</label>
                  <input type="text" class="form-control" id="direccion" v-model="selectedItem.direccion" required>
                </div>
                <div class="mb-3">
                  <label for="telefono" class="form-label">Telefono:</label>
                  <input type="text" class="form-control" id="telefono" v-model="selectedItem.telefono" required>
                </div>
                <button type="submit" class="btn btn-primary">{{ modalType === 'createPersonal' ? 'Crear' : 'Guardar' }}</button>
              </form>
            </div>

            <!-- Confirm delete -->
            <div v-else-if="modalType === 'deletePersonal'">
              <p>¿Estás seguro de que quieres eliminar este personal?</p>
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
      personalList: [],
      selectedItem: null,
      modalType: null,
      modalInstance: null,
    };
  },
  mounted() {
    this.fetchPersonal();
  },
  methods: {
    fetchPersonal() {
      this.$axios.get('Personals')
        .then(response => {
          console.log('Datos de personal:', response.data);
          this.personalList = response.data;
        })
        .catch(error => {
          console.error('Error al cargar datos de personal:', error);
        });
    },
    showModal(type, item = null) {
      this.modalType = type;
      this.selectedItem = item ? { ...item } : { pkPersonal: 0, nombre: '', dni: '', email: '', direccion: '', telefono: '' };

      this.$nextTick(() => {
        const modalElement = document.getElementById('modal');
        this.modalInstance = new Modal(modalElement);
        this.modalInstance.show();
      });
    },
    handleSubmit() {
      if (this.modalType === 'createPersonal' || this.modalType === 'editPersonal') {
        const url = this.modalType === 'createPersonal' ? 'Personals' : `Personals/${this.selectedItem.pkPersonal}`;
        const method = this.modalType === 'createPersonal' ? 'post' : 'put';
        const data = {
          pkPersonal: this.selectedItem.pkPersonal || generateRandomId(),
          nombre: this.selectedItem.nombre,
          dni: this.selectedItem.dni,
          email: this.selectedItem.email,
          direccion: this.selectedItem.direccion,
          telefono: this.selectedItem.telefono
        };
        this.$axios[method](url, data)
          .then(() => {
            this.modalInstance.hide();
            this.fetchPersonal();
          })
          .catch(error => {
            console.error('Error al guardar personal:', error);
          });
      }
    },
    handleDelete() {
      const url = `Personals/${this.selectedItem.pkPersonal}`;
      this.$axios.delete(url)
        .then(() => {
          this.modalInstance.hide();
          this.fetchPersonal();
        })
        .catch(error => {
          console.error('Error al eliminar personal:', error);
        });
    }
  },
  computed: {
    modalTitle() {
      switch (this.modalType) {
        case 'createPersonal':
          return 'Crear Personal';
        case 'editPersonal':
          return 'Editar Personal';
        case 'viewPersonal':
          return 'Consultar Personal';
        case 'deletePersonal':
          return 'Eliminar Personal';
        default:
          return '';
      }
    }
  }
};
</script>

<style scoped>
.fallout-data-table {
  font-family: 'Roboto', sans-serif;
  color: #FFF;
  margin: 20px auto;
  padding: 20px;
  background-color: #f3eded;
  border: 1px solid #888;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  overflow-x: auto; /* Permite desplazamiento horizontal en dispositivos pequeños */
}

.fallout-data-table table {
  width: 100%;
  border-collapse: collapse;
}

.fallout-data-table th,
.fallout-data-table td {
  padding: 10px;
  border-bottom: 2px solid #888;
  font-size: 16px; /* Tamaño de letra un poco más grande */
}

.fallout-data-table th {
  background-color: #111;
  font-size: 18px; /* Tamaño de letra un poco más grande */
}

.fallout-data-table tbody tr:nth-child(even) {
  background-color: #d8c7c7;
}

.fallout-data-table tbody tr:hover {
  background-color: #444;
}
</style>
