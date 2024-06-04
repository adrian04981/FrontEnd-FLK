<template>
  <div class="container">
    <!-- Inspectores Disponibles Section -->
    <div class="row justify-content-center mt-5">
      <div class="col-10">
        <h2 class="text-center mb-4">Lista de Inspectores Disponibles</h2>
        <div class="text-center mb-4">
          <b-button @click="showCreateModal" variant="primary">Crear Inspector</b-button>
        </div>
        <div class="fallout-data-table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="text-white">ID</th>
                <th scope="col" class="text-white">Usuario</th>
                <th scope="col" class="text-white">Tipo de Inspección</th>
                <th scope="col" class="text-white">Fecha de Emisión</th>
                <th scope="col" class="text-white">Fecha de Vencimiento</th>
                <th scope="col" class="text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inspector in inspectoresDisponiblesList" :key="inspector.pkInpectoresDisponibles">
                <td>{{ inspector.pkInpectoresDisponibles }}</td>
                <td>{{ inspector.fkUsuario }}</td>
                <td>{{ inspector.fkTipoInspeccion }}</td>
                <td>{{ inspector.fechaEmisionCertificado }}</td>
                <td>{{ inspector.fechaVencimientoCertificado }}</td>
                <td>
                  <b-button @click="showInspector(inspector)" variant="info">Consultar</b-button>
                  <b-button @click="editInspector(inspector)" variant="warning" class="mr-2">Editar</b-button>
                  <b-button @click="deleteInspector(inspector.pkInpectoresDisponibles)" variant="danger">Eliminar</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal para Consultar Inspector -->
    <b-modal v-if="selectedInspector" v-model="showModal" title="Consultar Inspector" @hide="clearSelectedInspector">
      <div>
        <p><strong>ID:</strong> {{ selectedInspector.pkInpectoresDisponibles }}</p>
        <p><strong>Usuario:</strong> {{ selectedInspector.fkUsuario }}</p>
        <p><strong>Tipo de Inspección:</strong> {{ selectedInspector.fkTipoInspeccion }}</p>
        <p><strong>Fecha de Emisión:</strong> {{ selectedInspector.fechaEmisionCertificado }}</p>
        <p><strong>Fecha de Vencimiento:</strong> {{ selectedInspector.fechaVencimientoCertificado }}</p>
      </div>
    </b-modal>

    <!-- Modal para Editar Inspector -->
    <b-modal v-if="selectedInspector" v-model="showEditModal" title="Editar Inspector" @hide="clearSelectedInspector">
      <div>
        <div class="form-group">
          <label for="Usuario">Usuario</label>
          <input type="text" class="form-control" v-model="selectedInspector.fkUsuario" />
        </div>
        <div class="form-group">
          <label for="tipoInspeccion">Tipo de Inspección</label>
          <input type="text" class="form-control" v-model="selectedInspector.fkTipoInspeccion" />
        </div>
        <div class="form-group">
          <label for="fechaEmision">Fecha de Emisión</label>
          <input type="date" class="form-control" v-model="selectedInspector.fechaEmisionCertificado" />
        </div>
        <div class="form-group">
          <label for="fechaVencimiento">Fecha de Vencimiento</label>
          <input type="date" class="form-control" v-model="selectedInspector.fechaVencimientoCertificado" />
        </div>
        <b-button @click="updateInspector" variant="primary">Guardar cambios</b-button>
      </div>
    </b-modal>

    <!-- Modal para Crear Inspector -->
    <b-modal v-model="showCreateModal" title="Crear Inspector" @hide="clearNewInspector">
      <div>
        <div class="form-group">
          <label for="usuario">Usuario</label>
          <input type="text" class="form-control" v-model="newInspector.fkUsuario" />
        </div>
        <div class="form-group">
          <label for="tipoInspeccion">Tipo de Inspección</label>
          <input type="text" class="form-control" v-model="newInspector.fkTipoInspeccion" />
        </div>
        <div class="form-group">
          <label for="fechaEmision">Fecha de Emisión</label>
          <input type="date" class="form-control" v-model="newInspector.fechaEmisionCertificado" />
        </div>
        <div class="form-group">
          <label for="fechaVencimiento">Fecha de Vencimiento</label>
          <input type="date" class="form-control" v-model="newInspector.fechaVencimientoCertificado" />
        </div>
        <b-button @click="createInspector" variant="primary">Crear Inspector</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      inspectoresDisponiblesList: [],
      showModal: false,
      showEditModal: false,
      showCreateModal: false,
      selectedInspector: null,
      newInspector: {
        fkUsuario: '',
        fkTipoInspeccion: '',
        fechaEmisionCertificado: '',
        fechaVencimientoCertificado: ''
      }
    };
  },
  mounted() {
    this.fetchInspectoresDisponibles();
  },
  methods: {
    fetchInspectoresDisponibles() {
      this.$axios.get('https://localhost:7006/api/InspectoresDisponibles')
        .then(response => {
          console.log('Datos de inspectores disponibles:', response.data); // Log para verificar datos
          this.inspectoresDisponiblesList = response.data;
        })
        .catch(error => {
          console.error('Error al cargar datos de inspectores disponibles:', error);
        });
    },
    showInspector(inspector) {
      this.selectedInspector = inspector;
      this.showModal = true;
    },
    editInspector(inspector) {
      this.selectedInspector = { ...inspector }; // Hacer una copia del objeto inspector
      this.showEditModal = true;
    },
    clearSelectedInspector() {
      this.selectedInspector = null;
    },
    updateInspector() {
      this.$axios.put(`https://localhost:7006/api/InspectoresDisponibles/${this.selectedInspector.pkInpectoresDisponibles}`, this.selectedInspector)
        .then(() => {
          alert('Inspector actualizado correctamente');
          this.fetchInspectoresDisponibles();
          this.showEditModal = false;
        })
        .catch(error => {
          console.error('Error al actualizar el inspector:', error);
          alert('Error al actualizar el inspector');
        });
    },
    deleteInspector(inspectorId) {
      if (confirm('¿Está seguro de que desea eliminar este inspector?')) {
        this.$axios.delete(`https://localhost:7006/api/InspectoresDisponibles/${inspectorId}`)
          .then(() => {
            this.inspectoresDisponiblesList = this.inspectoresDisponiblesList.filter(inspector => inspector.pkInpectoresDisponibles !== inspectorId);
            alert('Inspector eliminado correctamente');
          })
          .catch(error => {
            console.error('Error al eliminar el inspector:', error);
            alert('Error al eliminar el inspector');
          });
      }
    },
    showCreateModal() {
      this.showCreateModal = true;
    },
    clearNewInspector() {
      this.newInspector = {
        fkUsuario: '',
        fkTipoInspeccion: '',
        fechaEmisionCertificado: '',
        fechaVencimientoCertificado: ''
      };
    },
    createInspector() {
      this.$axios.post('https://localhost:7006/api/InspectoresDisponibles', this.newInspector)
        .then(() => {
          alert('Inspector creado correctamente');
          this.fetchInspectoresDisponibles();
          this.showCreateModal = false;
          this.clearNewInspector();
        })
        .catch(error => {
          console.error('Error al crear el inspector:', error);
          alert('Error al crear el inspector');
        });
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
