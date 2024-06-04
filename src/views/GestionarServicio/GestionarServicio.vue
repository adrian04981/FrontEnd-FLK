<template>
  <div class="container">
    <!-- Lista de Tipos de Servicios -->
    <div class="row justify-content-center mt-5">
      <div class="col-10">
        <h2 class="text-center mb-4">Lista de Tipos de Servicios</h2>
        <div class="text-center mb-4">
          <router-link to="/createTypeService" class="btn btn-primary">Crear Tipo de Servicio</router-link>
        </div>
        <div class="fallout-data-table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="text-white">PK_TipoServicio</th>
                <th scope="col" class="text-white">Nombre</th>
                <th scope="col" class="text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tipo in tiposServicios" :key="tipo.pkTiposServicio">
                <td>{{ tipo.pkTiposServicio }}</td>
                <td>{{ tipo.nombre }}</td>
                <td>
                  <b-button @click="showTipo(tipo)" variant="info">Consultar</b-button>
                  <b-button @click="editTipo(tipo)" variant="warning" class="mr-2">Editar</b-button>
                  <b-button @click="confirmDeleteTipo(tipo)" variant="danger">Eliminar</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal para Consultar Tipo de Servicio -->
    <b-modal v-if="selectedTipo" v-model="showModal" title="Consultar Tipo de Servicio" @hide="clearSelectedTipo">
      <div>
        <p><strong>PK_TipoServicio:</strong> {{ selectedTipo.pkTiposServicio }}</p>
        <p><strong>Nombre:</strong> {{ selectedTipo.nombre }}</p>
      </div>
    </b-modal>

    <!-- Modal para Editar Tipo de Servicio -->
    <b-modal v-if="selectedTipo" v-model="showEditModal" title="Editar Tipo de Servicio" @hide="clearSelectedTipo">
      <div>
        <form @submit.prevent="updateTipo">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" v-model="selectedTipo.nombre" class="form-control" required>
          </div>
          <b-button type="submit" variant="primary">Guardar Cambios</b-button>
          <b-button type="button" @click="showEditModal = false" variant="secondary">Cancelar</b-button>
        </form>
      </div>
    </b-modal>

    <!-- Modal para Confirmar Eliminación -->
    <b-modal v-if="selectedTipo" v-model="showDeleteModal" title="Eliminar Tipo de Servicio" @hide="clearSelectedTipo">
      <div>
        <p>¿Está seguro que desea eliminar el tipo de servicio <strong>{{ selectedTipo.nombre }}</strong>?</p>
        <b-button @click="deleteTipo" variant="danger">Eliminar</b-button>
        <b-button @click="showDeleteModal = false" variant="secondary">Cancelar</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      tiposServicios: [],
      showModal: false,
      showEditModal: false,
      showDeleteModal: false,
      selectedTipo: null
    };
  },
  mounted() {
    this.fetchTiposServicios();
  },
  methods: {
    fetchTiposServicios() {
      this.$axios.get('TiposServicios')
        .then(response => {
          console.log('Datos de tipos de servicios:', response.data); // Log para verificar datos
          this.tiposServicios = response.data;
        })
        .catch(error => {
          console.error('Error al cargar datos de tipos de servicios:', error);
        });
    },
    showTipo(tipo) {
      this.selectedTipo = tipo;
      this.showModal = true;
    },
    editTipo(tipo) {
      this.selectedTipo = { ...tipo };
      this.showEditModal = true;
    },
    confirmDeleteTipo(tipo) {
      this.selectedTipo = tipo;
      this.showDeleteModal = true;
    },
    clearSelectedTipo() {
      this.selectedTipo = null;
    },
    updateTipo() {
      this.$axios.put(`TiposServicios/${this.selectedTipo.pkTiposServicio}`, this.selectedTipo)
        .then(() => {
          this.fetchTiposServicios();
          this.showEditModal = false;
          this.selectedTipo = null;
        })
        .catch(error => {
          console.error('Error al actualizar tipo de servicio:', error);
        });
    },
    deleteTipo() {
      console.log(`Intentando eliminar tipo de servicio con ID: ${this.selectedTipo.pkTiposServicio}`);
      this.$axios.delete(`TiposServicios/${this.selectedTipo.pkTiposServicio}`)
        .then(() => {
          console.log('Tipo de servicio eliminado con éxito');
          this.fetchTiposServicios();
          this.showDeleteModal = false;
          this.selectedTipo = null;
        })
        .catch(error => {
          console.error('Error al eliminar tipo de servicio:', error);
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
