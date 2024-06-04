<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-10">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="text-center mb-0">Lista de tipos de Inspecciones</h2>
          <button @click="irAAgregar" class="btn btn-primary">Agregar</button>
        </div>
        <div class="fallout-data-table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="text-white">ID</th>
                <th scope="col" class="text-white">Nombre</th>
                <th scope="col" class="text-white">Descripcion</th>
                <th scope="col" class="text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="Inspecciones in tipoInspeccions" :key="Inspecciones.pkTipoInspeccion">
                <td>{{ Inspecciones.pkTipoInspeccion }}</td>
                <td>{{ Inspecciones.titulo }}</td>
                <td>{{ Inspecciones.descripcion }}</td>
                <td>
                  <router-link :to="'/ConsultarTipoInspeccion/' + Inspecciones.pkTipoInspeccion" class="btn btn-info mr-2">Consultar</router-link>
                  <router-link :to="'/editarinspeccion/' + Inspecciones.pkTipoInspeccion" class="btn btn-warning mr-2">Editar</router-link>
                  <button @click="confirmarEliminacion(Inspecciones.pkTipoInspeccion)" class="btn btn-danger">Eliminar</button>
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
import axios from 'axios';

export default {
  name: 'Dashboard',
  data() {
    return {
      tipoInspeccions: []
    };
  },
  mounted() {
    this.cargarTiposInspeccion();
  },
  methods: {
    async cargarTiposInspeccion() {
      try {
        const response = await axios.get('https://localhost:7006/api/TipoInspeccions');
        this.tipoInspeccions = response.data;
      } catch (error) {
        console.error('Error al cargar datos del tipo de inspecciones:', error);
      }
    },
    irAAgregar() {
      this.$router.push('/agregartipoinspeccion');
    },
    confirmarEliminacion(id) {
      const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este tipo de inspección?");
      if (confirmar) {
        this.eliminarTipoInspeccion(id);
      }
    },
    async eliminarTipoInspeccion(id) {
      try {
        await axios.delete(`https://localhost:7006/api/TipoInspeccions/${id}`);
        this.tipoInspeccions = this.tipoInspeccions.filter(inspeccion => inspeccion.pkTipoInspeccion !== id);
        alert('Tipo de inspección eliminado con éxito');
      } catch (error) {
        console.error('Error al eliminar el tipo de inspección:', error);
        alert('Error al eliminar el tipo de inspección');
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

button {
  padding: 10px 20px;
  cursor: pointer;
}

.btn-danger {
  background-color: #dc3545; /* Rojo */
  color: white;
  border: none;
}

.btn-danger:hover {
  background-color: #c82333; /* Rojo oscuro al pasar el ratón */
}
</style>
