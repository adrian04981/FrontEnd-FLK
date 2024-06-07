<template>
    <div class="container">
      <!-- Lista de Servicios -->
      <div class="row justify-content-center mt-5">
        <div class="col-10">
          <h2 class="text-center mb-4">Lista Tipos Servicios</h2>
          <div class="text-center mb-4">
            <router-link to="/createtypeservice" class="btn btn-primary">Crear TypeServicio</router-link>
          </div>
          <div class="fallout-data-table">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="text-white">pkTiposServicio</th>
                  <th scope="col" class="text-white">nombre</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="service in services" :key="service.pkTiposServicio">
                  <td>{{ service.pkTiposServicio }}</td>
                  <td>{{ service.nombre }}</td>
                  <td>
                    <button @click="showService(service)" class="btn btn-primary mr-2">Consultar</button>
                    <button @click="editService(service)" class="btn btn-success mr-2">Editar</button>
                    <button @click="deleteService(service.pkTiposServicio)" class="btn btn-danger">Eliminar</button>
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
          <p><strong>pkTiposServicio:</strong> {{ selectedService.pkTiposServicio }}</p>
          <p><strong>nombre:</strong> {{ selectedService.nombre  }}</p>
        </div>
      </b-modal>
  
      <!-- Modal para Editar Servicio -->
      <b-modal v-if="selectedService" v-model="showEditModal" title="Editar Servicio" @hide="clearSelectedService">
        <div>
          <form @submit.prevent="updateService">
            <div class="form-group">
              <label for="pkTiposServicio">pkTiposServicio</label>
              <input type="text" class="form-control" id="pkTiposServicio" v-model="selectedService.pkTiposServicio">
            </div>
            <div class="form-group">
              <label for="nombre">nombre</label>
              <input type="text" class="form-control" id="nombre" v-model="selectedService.nombre">
            </div>
            <button type="submit" class="btn btn-success">Guardar Cambios</button>
          </form>
        </div>
      </b-modal>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GestionarTiposServicios',
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
        this.$axios.get('TiposServicios')
          .then(response => {
            console.log('Datos de servicios:', response.data);
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
        this.selectedService = { ...service };
        this.showEditModal = true;
      },
      updateService() {
        this.$axios.put(`TiposServicios/${this.selectedService.pkTiposServicio}`, this.selectedService)
          .then(response => {
            console.log('Servicio actualizado:', response.data);
            this.showEditModal = false;
            this.fetchServices();
          })
          .catch(error => {
            console.error('Error al actualizar el servicio:', error);
          });
      },
      deleteService(pkTiposServicio) {
        this.$axios.delete(`TiposServicios/${pkTiposServicio}`)
          .then(response => {
            console.log('Servicio eliminado:', response.data);
            this.fetchServices();
          })
          .catch(error => {
            console.error('Error al eliminar el servicio:', error);
          });
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
  