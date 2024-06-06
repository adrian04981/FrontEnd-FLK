<template>
  <div class="container">
    <!-- Lista de Personal -->
    <div class="row justify-content-center mt-5">
      <div class="col-10">
        <h2 class="text mb-4">LISTA PERSONAL</h2>
    <div class="text mb-4">
      <router-link to="/createuser" class="btn btn-primary" style="background-color: #000000; color: white; font-size: 14px; padding: 10px 20px; border: 1px solid #000000; border-radius: 20px;">Crear Personal</router-link>      
    </div>
        <div class="fallout-data-table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="text-white">#</th>
                <th scope="col" class="text-white">NOMBRE</th>
                <th scope="col" class="text-white">DNI</th>
                <th scope="col" class="text-white">EMAIL</th>
                <th scope="col" class="text-white">DIRECCION</th>
                <th scope="col" class="text-white">TELEFONO</th>
                <th scope="col" class="text-white">ACCIONES</th>
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
                  <b-button @click="showPersonal(personal)" variant="danger">Consultar</b-button>
                  <router-link :to="'/EditarPersonal/' + personal.pkPersonal" class="btn btn-success mr-4">Editar</router-link>
                  <router-link :to="'/DeleteUsuario/' + personal.pkPersonal" class="btn btn-info">Eliminar</router-link>

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal para Consultar Personal -->
    <b-modal v-if="selectedPersonal" v-model="showModal" title="Consultar Personal" @hide="clearSelectedPersonal">
      <div style="text-transform: uppercase; text-align: center;">
        <p><strong>#:</strong> {{ selectedPersonal.pkPersonal }}</p>
        <p><strong>NOMBRE:</strong> {{ selectedPersonal.nombre }}</p>
        <p><strong>DNI:</strong> {{ selectedPersonal.dni }}</p>
        <p><strong>EMAIL:</strong> {{ selectedPersonal.email }}</p>
        <p><strong>DIRECCION:</strong> {{ selectedPersonal.direccion }}</p>
        <p><strong>TELEFONO:</strong> {{ selectedPersonal.telefono }}</p>
      </div>
    </b-modal>
  </div>
</template>


<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      personalList: [],
      showModal: false,
      selectedPersonal: null
    };
  },
  mounted() {
    this.fetchPersonal();
  },
  methods: {
    fetchPersonal() {
      this.$axios.get('Personals')
        .then(response => {
          console.log('Datos de personal:', response.data); // Log para verificar datos
          this.personalList = response.data;
        })
        .catch(error => {
          console.error('Error al cargar datos de personal:', error);
        });

      // Obtiene la lista de roles al cargar el componente
      this.$axios.get('Rols')
        .then(response => {
          this.roles = response.data; 
        })
        .catch(error => {
          console.error('Error al cargar roles:', error);
        });
    },
    showPersonal(personal) {
      this.selectedPersonal = personal;
      this.showModal = true;
    },
    clearSelectedPersonal() {
      this.selectedPersonal = null;
    }
  }
};
</script>
<style scoped>
.fallout-data-table {
  font-family: 'Roboto', sans-serif;
  color: #FFF;
  margin: 100px auto;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #888;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 1000px; /* Ajuste del ancho */
  height: 200px; /* Ajuste del largo */
} 

.fallout-data-table table {
  width: 100%;
  border-collapse: collapse;
}

.fallout-data-table th,
.fallout-data-table td {
  padding: 10px;
  border-bottom: 2px solid #888;
  text-align: center; /* Alinea el texto al centro */
}

.fallout-data-table th {
  background-color: #000000;
}

.fallout-data-table tbody tr:nth-child(even) {
  background-color: #ffffff;
}

.fallout-data-table tbody tr:hover {
  background-color: #3d3939;
}
</style>
