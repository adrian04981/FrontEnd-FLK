<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-10">
        <h2 class="text-center mb-4">Lista TipoServicio</h2>
        <div class="text-center mb-4">
          <router-link to="/createuser" class="btn btn-primary">Crear Tipo Servicios</router-link>
        </div>
        <div class="colorful-data-table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="text-dark">#</th>
                <th scope="col" class="text-dark">Nombre</th>
                <th scope="col" class="text-dark">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="TipoServicios in TipoServicio" :key="TipoServicios.PK_TiposServicio">
                <td>{{ TipoServicios.pkTiposServicio }}</td>
                <td>{{ TipoServicios.nombre }}</td>
                <td>
                  <router-link :to="'/ViewUsuario/' + TipoServicios.pkTiposServicio" class="btn btn-info mr-2">Consultar</router-link>
                  <router-link :to="'/Editusers/' + TipoServicios.pkTiposServicio" class="btn btn-warning mr-2">Editar</router-link>
                  <router-link :to="'/DeleteUsuario/' + TipoServicios.pkTiposServicio" class="btn btn-danger">Eliminar</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-5">
      <div class="col-10">
        <h2 class="text-center mb-4">Lista Servicios</h2>
        <div class="text-center mb-4">
          <router-link to="/createuser" class="btn btn-primary">Crear Servicios</router-link>
        </div>
        <div class="colorful-data-table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="text-dark">#</th>
                <th scope="col" class="text-dark">FechaAgendada</th>
                <th scope="col" class="text-dark">TipoServicio</th>
                <th scope="col" class="text-dark">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="Servicios in Servicio" :key="Servicios.pkServicio">
                <td>{{ Servicios.pkServicio }}</td>
                <td>{{ Servicios.fechaAgendada }}</td>
                <td>{{ Servicios.fkTipoServicio }}</td>
                <td>
                  <router-link :to="'/ViewUsuario/' + Servicios.pkServicio" class="btn btn-info mr-2">Consultar</router-link>
                  <router-link :to="'/Editusers/' + Servicios.pkServicio" class="btn btn-warning mr-2">Editar</router-link>
                  <router-link :to="'/DeleteUsuario/' + Servicios.pkServicio" class="btn btn-danger">Eliminar</router-link>
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
  computed: {
    isCurso() {
      const role = localStorage.getItem('TipoServicio');
      return role === 'Curso';
    },
    isInsp() {
      const role = localStorage.getItem('TipoServicio');
      return role === 'Inspeccion';
    }
  },
  data() {
    return {
      Servicio: [],
      TipoServicio:[]
    };
  },
  mounted() {
    this.$axios.get('Servicios')
      .then(response => {
        this.Servicio = response.data;
      })
      .catch(error => {
        console.error('Error al cargar datos de usuarios:', error);
      });
       // Obtiene la lista de roles al cargar el componente
    this.$axios.get('TiposServicios')
      .then(response => {
        this.TipoServicio = response.data;
      })
      .catch(error => {
        console.error('Error al cargar roles:', error);
      });
  },
  }
</script>

<style scoped>
.colorful-data-table {
  font-family: 'Roboto', sans-serif;
  color: #333;
  margin: 20px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border: 2px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.colorful-data-table table {
  width: 100%;
  border-collapse: collapse;
}

.colorful-data-table th,
.colorful-data-table td {
  padding: 15px;
  border-bottom: 2px solid #ccc;
}

.colorful-data-table th {
  background-color: #4caf50;
  color: white;
}

.colorful-data-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.colorful-data-table tbody tr:hover {
  background-color: #ddd;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}
</style>