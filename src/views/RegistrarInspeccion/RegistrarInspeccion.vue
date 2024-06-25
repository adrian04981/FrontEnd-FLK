<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-10">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="text-center mb-0">Lista de Inspecciones</h2>
          <button @click="irAAgregar" class="btn btn-primary">Agregar</button>
        </div>
        <div class="fallout-data-table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="text-white">ID</th>
                <th scope="col" class="text-white">Servicio</th>
                <th scope="col" class="text-white">Empresa</th>
                <th scope="col" class="text-white">Certificador</th>
                <th scope="col" class="text-white">Tipo</th>
                <th scope="col" class="text-white">Inspectores</th>
                <th scope="col" class="text-white">Fecha</th>
                <th scope="col" class="text-white">Ubicación</th>
                <th scope="col" class="text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inspeccion in inspecciones" :key="inspeccion.pkInspeccion">
                <td>{{ inspeccion.pkInspeccion }}</td>
                <td>{{ inspeccion.fkServicio }}</td>
                <td>{{ inspeccion.fkEmpresas }}</td>
                <td>{{ inspeccion.fkCertificadorAsignado }}</td>
                <td>{{ inspeccion.fkTipoInspeccion }}</td>
                <td>{{ inspeccion.fkInspectoresAsignados }}</td>
                <td>{{ inspeccion.fechaInspeccion }}</td>
                <td>{{ inspeccion.ubicacion }}</td>
                <td>
                  <router-link :to="'/EditarInspeccionC/' + inspeccion.pkInspeccion" class="btn btn-info mr-2">Editar</router-link>
                  <button @click="confirmarEliminacion(inspeccion.pkInspeccion)" class="btn btn-danger">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <EditarInspeccion
      ref="editarModal"
      :inspeccion="inspeccionActual"
      @cerrar="cerrarModal"
      @guardar="guardarCambios"
    />
  </div>
</template>

<script>
import axios from 'axios';
import EditarInspeccion from '@/components/RegistrarInspeccionC/EditarInspeccionC.vue';

export default {
  name: 'RegistrarInspeccion',
  components: {
    EditarInspeccion
  },
  data() {
    return {
      inspecciones: [],
      inspeccionActual: {
        pkInspeccion: '',
        fkServicio: '',
        fkEmpresas: '',
        fkCertificadorAsignado: '',
        fkTipoInspeccion: '',
        fkInspectoresAsignados: '',
        fechaInspeccion: '',
        ubicacion: '',
        documentacion: '',
        estado: '',
        fkVehiculo: 0,
        observacionesYRecomendaciones: ''
      }
    };
  },
  mounted() {
    this.cargarInspecciones();
  },
  methods: {
    async cargarInspecciones() {
      try {
        const response = await axios.get('https://localhost:7006/api/Inspecciones');
        this.inspecciones = response.data;
      } catch (error) {
        console.error('Error al cargar datos de inspecciones:', error);
      }
    },
    irAAgregar() {
      this.$router.push('/agregarinspeccion');
    },
    confirmarEliminacion(id) {
      const confirmar = window.confirm("¿Estás seguro de que deseas eliminar esta inspección?");
      if (confirmar) {
        this.eliminarInspeccion(id);
      }
    },
    async eliminarInspeccion(id) {
      try {
        await axios.delete(`https://localhost:7006/api/Inspecciones/${id}`);
        this.inspecciones = this.inspecciones.filter(inspeccion => inspeccion.pkInspeccion !== id);
        alert('Inspección eliminada con éxito');
      } catch (error) {
        console.error('Error al eliminar la inspección:', error);
        alert('Error al eliminar la inspección');
      }
    },
    abrirModal(inspeccion) {
      this.inspeccionActual = { ...inspeccion };
      this.$refs.editarModal.show();
    },
    cerrarModal() {
      this.inspeccionActual = {
        pkInspeccion: '',
        fkServicio: '',
        fkEmpresas: '',
        fkCertificadorAsignado: '',
        fkTipoInspeccion: '',
        fkInspectoresAsignados: '',
        fechaInspeccion: '',
        ubicacion: '',
        documentacion: '',
        estado: '',
        fkVehiculo: 0,
        observacionesYRecomendaciones: ''
      };
    },
    async guardarCambios(inspeccion) {
      try {
        await axios.put(`https://localhost:7006/api/Inspecciones/${inspeccion.pkInspeccion}`, inspeccion);
        this.cargarInspecciones();
      } catch (error) {
        console.error('Error al actualizar la inspección:', error);
        alert('Error al actualizar la inspección');
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
