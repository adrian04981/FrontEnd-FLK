<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-10">
        <h2 class="text-center mb-4">Lista de inspectores</h2>
        <div class="text-center mb-4">
          <router-link to="/createuser" class="btn btn-primary">Agregar Inspectores</router-link>
        </div>
        <div class="fallout-data-table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="text-white">#</th>
                <th scope="col" class="text-white">Usuario</th>
                <th scope="col" class="text-white">Tipo de Inspección</th>
                <th scope="col" class="text-white">Fecha de Emisión</th>
                <th scope="col" class="text-white">Fecha de Vencimiento</th>
                <th scope="col" class="text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inspector in inspectores" :key="inspector.PK_InpectoresDisponibles">
                <td>{{ inspector.PK_InpectoresDisponibles }}</td>
                <td>{{ inspector.FK_Usuario }}</td>
                <td>{{ inspector.FK_Tipo_Inspeccion }}</td>
                <td>{{ inspector.FechaEmisionCertificado }}</td>
                <td>{{ inspector.FechaVencimientoCertificado }}</td>
                <td>
                  <router-link :to="'/EditInspector/' + inspector.PK_InpectoresDisponibles" class="btn btn-warning mr-2">Editar</router-link>
                  <router-link :to="'/DeleteInspector/' + inspector.PK_InpectoresDisponibles" class="btn btn-danger">Eliminar</router-link>
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
      inspectores: [],
    };
  },
  mounted() {
    this.$axios.get('InspectoresDisponibles')
      .then(response => {
        this.inspectores = response.data;
      })
      .catch(error => {
        console.error('Error al cargar datos de inspectores:', error);
      });
  },
}
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

.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
}
</style>
