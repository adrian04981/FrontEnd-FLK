<template>
  <div class="container">
    <!-- Lista de Servicios -->
    <div class="row justify-content-center mt-5">
      <div class="col-10">
        <h2 class="text-center mb-4">Lista Servicios</h2>
        <div class="text-center mb-4">
          <router-link to="/createservice" class="btn btn-primary">Crear Servicio</router-link>
        </div>
        <div class="fallout-data-table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="text-white">PK_Servicio</th>
                <th scope="col" class="text-white">FK_TipoServicio</th>
                <th scope="col" class="text-white">Fecha Agendada</th>
                <th scope="col" class="text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="service in services" :key="service.pkServicio">
                <td>{{ service.pkServicio }}</td>
                <td>{{ service.fkTipoServicio }}</td>
                <td>{{ service.fechaAgendada }}</td>
                <td>
                  <button @click="showService(service)" class="btn btn-primary mr-2">Consultar</button>
                  <button @click="editService(service)" class="btn btn-success mr-2">Editar</button>
                  <button @click="deleteService(service.pkServicio)" class="btn btn-danger">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal para Consultar Servicio -->
    <b-modal v-if="selectedService" v-model="showModal" title="Consultar Servicio" @hide="clearSelectedService">
      <div>
        <p><strong>PK_Servicio:</strong> {{ selectedService.pkServicio }}</p>
        <p><strong>FK_TipoServicio:</strong> {{ selectedService.fkTipoServicio }}</p>
        <p><strong>Fecha Agendada:</strong> {{ selectedService.fechaAgendada }}</p>
      </div>
    </b-modal>

    <!-- Modal para Editar Servicio -->
    <b-modal v-if="selectedService" v-model="showEditModal" title="Editar Servicio" @hide="clearSelectedService">
      <div>
        <form @submit.prevent="updateService">
          <div class="form-group">
            <label for="pkServicio">PK_Servicio</label>
            <input type="text" class="form-control" id="pkServicio" v-model="selectedService.pkServicio" disabled>
          </div>
          <div class="form-group">
            <label for="fkTipoServicio">FK_TipoServicio</label>
            <input type="text" class="form-control" id="fkTipoServicio" v-model="selectedService.fkTipoServicio">
          </div>
          <div class="form-group">
            <label for="fechaAgendada">Fecha Agendada</label>
            <input type="date" class="form-control" id="fechaAgendada" v-model="selectedService.fechaAgendada">
          </div>
          <button type="submit" class="btn btn-success">Guardar Cambios</button>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'GestionarServicio',
  data() {
    return {
      services: [],
      showModal: false,
      showEditModal: false,
      selectedService: null
    };
  },
  mounted() {
    this.fetchServices();
  },
  methods: {
    fetchServices() {
      this.$axios.get('Servicios')
        .then(response => {
          console.log('Datos de servicios:', response.data); // Log para verificar datos
          this.services = response.data;
        })
        .catch(error => {
          console.error('Error al cargar datos de servicios:', error);
        });
    },
    showService(service) {
      this.selectedService = service;
      this.showModal = true;
    },
    editService(service) {
      this.selectedService = { ...service }; // Crear una copia para editar
      this.showEditModal = true;
    },
    updateService() {
      this.$axios.put(`Servicios/${this.selectedService.pkServicio}`, this.selectedService)
        .then(response => {
          console.log('Servicio actualizado:', response.data);
          this.showEditModal = false;
          this.fetchServices(); // Refrescar la lista de servicios
        })
        .catch(error => {
          console.error('Error al actualizar el servicio:', error);
        });
    },
    deleteService(pkServicio) {
      this.$router.push(`/delete/${pkServicio}`); // Corregido: ruta de eliminación
    },
    clearSelectedService() {
      this.selectedService = null;
      this.showModal = false;
      this.showEditModal = false;
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

.btn-primary {
  background-color: blue;
  border-color: blue;
}

.btn-success {
  background-color: green;
  border-color: green;
}

.btn-danger {
  background-color: red;
  border-color: red;
}
</style>


