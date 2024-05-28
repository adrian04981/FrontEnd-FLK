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
                    <router-link :to="'/ViewService/' + service.pkServicio" class="btn btn-info mr-2">Consultar</router-link>
                    <router-link :to="'/EditService/' + service.pkServicio" class="btn btn-warning mr-2">Editar</router-link>
                    <router-link :to="'/DeleteService/' + service.pkServicio" class="btn btn-danger">Eliminar</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- Lista de Tipos de Servicios -->
      <div class="row justify-content-center mt-5">
        <div class="col-10">
          <h2 class="text-center mb-4">Lista Tipos de Servicios</h2>
          <div class="text-center mb-4">
            <router-link to="/createservicetype" class="btn btn-primary">Crear Tipo de Servicio</router-link>
          </div>
          <div class="fallout-data-table">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="text-white">#</th>
                  <th scope="col" class="text-white">Nombre</th>
                  <th scope="col" class="text-white">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="serviceType in serviceTypes" :key="serviceType.id">
                  <td>{{ serviceType.id }}</td>
                  <td>{{ serviceType.name }}</td>
                  <td>
                    <router-link :to="'/ViewServiceType/' + serviceType.id" class="btn btn-info mr-2">Consultar</router-link>
                    <router-link :to="'/EditServiceType/' + serviceType.id" class="btn btn-warning mr-2">Editar</router-link>
                    <router-link :to="'/DeleteServiceType/' + serviceType.id" class="btn btn-danger">Eliminar</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dashboard',
    data() {
      return {
        services: [],
        serviceTypes: []
      };
    },
    mounted() {
      this.fetchServices();
      this.fetchServiceTypes();
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
      fetchServiceTypes() {
        this.$axios.get('TiposServicio')
          .then(response => {
            console.log('Datos de tipos de servicios:', response.data); // Log para verificar datos
            this.serviceTypes = response.data;
          })
          .catch(error => {
            console.error('Error al cargar tipos de servicios:', error);
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
  
  