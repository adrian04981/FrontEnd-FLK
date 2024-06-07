<template>
  <div class="container">
    <!-- Lista de Personal -->
    <div class="row justify-content-center mt-5">
      <div class="col-10">
        <h2 class="text-center mb-4">Lista PERSONAL</h2>
        <div class="text-center mb-4">
          <b-button @click="showCreateModal = true" class="btn btn-primary">Crear Personal</b-button>
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
                  <b-button @click="showPersonal(personal)" variant="info">Consultar</b-button>
                  <b-button @click="editPersonal(personal)" variant="warning" class="mr-2">Editar</b-button>
                  <b-button @click="confirmDeletePersonal(personal)" variant="danger">Eliminar</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal para Consultar Personal -->
    <b-modal v-if="selectedPersonal" v-model="showModal" title="Consultar Personal" @hide="clearSelectedPersonal">
      <div>
        <p><strong>#:</strong> {{ selectedPersonal.pkPersonal }}</p>
        <p><strong>Nombre:</strong> {{ selectedPersonal.nombre }}</p>
        <p><strong>DNI:</strong> {{ selectedPersonal.dni }}</p>
        <p><strong>Email:</strong> {{ selectedPersonal.email }}</p>
        <p><strong>Dirección:</strong> {{ selectedPersonal.direccion }}</p>
        <p><strong>Telefono:</strong> {{ selectedPersonal.telefono }}</p>
      </div>
    </b-modal>

    <!-- Modal para Editar Personal -->
    <b-modal v-if="editPersonalData" v-model="showEditModal" title="Editar Personal" @hide="clearEditPersonal">
      <div>
        <b-form @submit.prevent="updatePersonal">
          <b-form-group label="Nombre:" label-for="edit-nombre">
            <b-form-input id="edit-nombre" v-model="editPersonalData.nombre" required></b-form-input>
          </b-form-group>

          <b-form-group label="DNI:" label-for="edit-dni">
            <b-form-input id="edit-dni" v-model="editPersonalData.dni" required></b-form-input>
          </b-form-group>

          <b-form-group label="Email:" label-for="edit-email">
            <b-form-input id="edit-email" type="email" v-model="editPersonalData.email" required></b-form-input>
          </b-form-group>

          <b-form-group label="Dirección:" label-for="edit-direccion">
            <b-form-input id="edit-direccion" v-model="editPersonalData.direccion" required></b-form-input>
          </b-form-group>

          <b-form-group label="Telefono:" label-for="edit-telefono">
            <b-form-input id="edit-telefono" v-model="editPersonalData.telefono" required></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="success">Guardar</b-button>
        </b-form>
      </div>
    </b-modal>

    <!-- Modal para Crear Personal -->
    <b-modal v-model="showCreateModal" title="Crear Personal" @hide="clearCreatePersonal">
      <div>
        <b-form @submit.prevent="createPersonal">
          <b-form-group label="Nombre:" label-for="create-nombre">
            <b-form-input id="create-nombre" v-model="newPersonal.nombre" required></b-form-input>
          </b-form-group>

          <b-form-group label="DNI:" label-for="create-dni">
            <b-form-input id="create-dni" v-model="newPersonal.dni" required></b-form-input>
          </b-form-group>

          <b-form-group label="Email:" label-for="create-email">
            <b-form-input id="create-email" type="email" v-model="newPersonal.email" required></b-form-input>
          </b-form-group>

          <b-form-group label="Dirección:" label-for="create-direccion">
            <b-form-input id="create-direccion" v-model="newPersonal.direccion" required></b-form-input>
          </b-form-group>

          <b-form-group label="Telefono:" label-for="create-telefono">
            <b-form-input id="create-telefono" v-model="newPersonal.telefono" required></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="success">Crear</b-button>
        </b-form>
      </div>
    </b-modal>

    <!-- Modal para Confirmar Eliminación -->
    <b-modal v-if="deletePersonalData" v-model="showDeleteModal" title="Confirmar Eliminación" @hide="clearDeletePersonal">
      <div>
        <p>¿Está seguro de que desea eliminar a {{ deletePersonalData.nombre }}?</p>
        <b-button @click="deletePersonal" variant="danger">Sí</b-button>
        <b-button @click="showDeleteModal = false" variant="secondary">No</b-button>
      </div>
    </b-modal>

    <!-- Modal para Mensaje de Eliminación Exitosa -->
    <b-modal v-model="showSuccessModal" title="Eliminación Exitosa" @hide="clearSuccessModal">
      <div>
        <p>Fue correctamente eliminado</p>
        <b-button @click="showSuccessModal = false" variant="primary">Cerrar</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Dashboard',
  data() {
    return {
      personalList: [],
      showModal: false,
      showEditModal: false,
      showCreateModal: false,
      showDeleteModal: false,
      showSuccessModal: false,
      selectedPersonal: null,
      editPersonalData: null,
      deletePersonalData: null,
      newPersonal: {
        nombre: '',
        dni: '',
        email: '',
        direccion: '',
        telefono: ''
      }
    };
  },
  mounted() {
    this.fetchPersonal();
  },
  methods: {
    fetchPersonal() {
      axios.get('https://localhost:7006/api/Personals')
        .then(response => {
          this.personalList = response.data;
        })
        .catch(error => {
          console.error('Error al cargar datos de personal:', error);
        });
    },
    showPersonal(personal) {
      this.selectedPersonal = personal;
      this.showModal = true;
    },
    editPersonal(personal) {
      this.editPersonalData = { ...personal };
      this.showEditModal = true;
    },
    updatePersonal() {
      axios.put(`https://localhost:7006/api/Personals/${this.editPersonalData.pkPersonal}`, this.editPersonalData)
        .then(response => {
          this.showEditModal = false;
          this.fetchPersonal();
        })
        .catch(error => {
          console.error('Error al actualizar personal:', error);
        });
    },
    createPersonal() {
      axios.post('https://localhost:7006/api/Personals', this.newPersonal)
        .then(response => {
          this.showCreateModal = false;
          this.fetchPersonal();
          this.clearCreatePersonal();
        })
        .catch(error => {
          console.error('Error al crear personal:', error);
        });
    },
    confirmDeletePersonal(personal) {
      this.deletePersonalData = personal;
      this.showDeleteModal = true;
    },
    deletePersonal() {
      axios.delete(`https://localhost:7006/api/Personals/${this.deletePersonalData.pkPersonal}`)
        .then(response => {
          this.showDeleteModal = false;
          this.showSuccessModal = true;
          this.fetchPersonal();
        })
        .catch(error => {
          console.error('Error al eliminar personal:', error);
        });
    },
    clearSelectedPersonal() {
      this.selectedPersonal = null;
    },
    clearEditPersonal() {
      this.editPersonalData = null;
    },
    clearCreatePersonal() {
      this.newPersonal = {
        nombre: '',
        dni: '',
        email: '',
        direccion: '',
        telefono: ''
      };
    },
    clearDeletePersonal() {
      this.deletePersonalData = null;
    },
    clearSuccessModal() {
      this.showSuccessModal = false;
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
