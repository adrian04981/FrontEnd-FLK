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
              <tr v-for="service in services" :key="service.PK_Servicio">
                <td>{{ service.pkServicio }}</td>
                <td>{{ service.fkTipoServicio }}</td>
                <td>{{ service.fechaAgendada }}</td>
                <td>
                  <b-button @click="showService(service)" variant="info">Consultar</b-button>
                  <router-link :to="'/EditService/' + service.pkServicio" class="btn btn-warning mr-2">Editar</router-link>
                  <router-link :to="'/DeleteService/' + service.pkServicio" class="btn btn-danger">Eliminar</router-link>
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
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      services: [],
      showModal: false,
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
    clearSelectedService() {
      this.selectedService = null;
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
