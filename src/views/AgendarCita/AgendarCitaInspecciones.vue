<template>
  <div class="container">
    <h2>Agendar Inspección</h2>
    <div class="form-group">
      <label for="fkCertificadorAsignado">Certificador Asignado:</label>
      <select id="fkCertificadorAsignado" v-model="inspeccion.fkCertificadorAsignado" required>
        <option v-for="certificador in certificadores" :key="certificador.id" :value="certificador.id">
          {{ certificador.nombre }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="fkTipoInspeccion">Tipo de Inspección:</label>
      <select id="fkTipoInspeccion" v-model="inspeccion.fkTipoInspeccion" required>
        <option v-for="tipo in tiposInspeccion" :key="tipo.id" :value="tipo.id">
          {{ tipo.nombre }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="fkInspectoresAsignados">Inspectores Asignados:</label>
      <select id="fkInspectoresAsignados" v-model="inspeccion.fkInspectoresAsignados" required>
        <option v-for="inspector in inspectores" :key="inspector.id" :value="inspector.id">
          {{ inspector.nombre }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="fkVehiculo">Vehículo:</label>
      <select id="fkVehiculo" v-model="inspeccion.fkVehiculo" required>
        <option v-for="vehiculo in vehiculos" :key="vehiculo.id" :value="vehiculo.id">
          {{ vehiculo.nombre }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="ubicacion">Ubicación:</label>
      <input type="text" id="ubicacion" v-model="inspeccion.ubicacion" required />
    </div>
    <div class="form-group">
      <label for="documentacion">Documentación:</label>
      <input type="text" id="documentacion" v-model="inspeccion.documentacion" required />
    </div>
    <div class="form-group">
      <label for="estado">Estado:</label>
      <input type="text" id="estado" v-model="inspeccion.estado" required />
    </div>
    <div class="form-group">
      <label for="observacionesYRecomendaciones">Observaciones y Recomendaciones:</label>
      <textarea id="observacionesYRecomendaciones" v-model="inspeccion.observacionesYRecomendaciones" required></textarea>
    </div>
    <button @click="agendarInspeccion">Agendar</button>
    <p class="error" v-if="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      inspeccion: {
        pkInspeccion: 0,
        fkServicio: this.$route.params.servicioId, // Obtener el id del servicio de la URL
        fkEmpresas: this.$route.params.clienteId, // Obtener el id del cliente de la URL
        fkCertificadorAsignado: 0,
        fkTipoInspeccion: 0,
        fkInspectoresAsignados: 0,
        fechaInspeccion: '',
        ubicacion: '',
        documentacion: '',
        estado: '',
        fkVehiculo: 0,
        observacionesYRecomendaciones: ''
      },
      certificadores: [],
      tiposInspeccion: [],
      inspectores: [],
      vehiculos: [],
      error: false,
      errorMessage: ''
    };
  },
  methods: {
    agendarInspeccion() {
      if (!this.error) {
        this.inspeccion.fechaInspeccion = new Date().toISOString().split('T')[0];

        axios.post('https://localhost:7006/api/Inspecciones', this.inspeccion)
          .then(response => {
            alert('Inspección agendada con éxito');
          })
          .catch(error => {
            console.error('Error al agendar la inspección:', error);
            this.error = true;
            this.errorMessage = 'Hubo un problema al agendar la inspección. Por favor, inténtalo de nuevo.';
          });
      }
    }
  },
  mounted() {
    axios.get('/api/Certificadores')
      .then(response => {
        this.certificadores = response.data;
      })
      .catch(error => {
        console.error('Error al cargar datos de certificadores:', error);
      });

    axios.get('/api/TiposInspeccion')
      .then(response => {
        this.tiposInspeccion = response.data;
      })
      .catch(error => {
        console.error('Error al cargar datos de tipos de inspección:', error);
      });

    axios.get('/api/Inspectores')
      .then(response => {
        this.inspectores = response.data;
      })
      .catch(error => {
        console.error('Error al cargar datos de inspectores:', error);
      });

    axios.get('/api/Vehiculos')
      .then(response => {
        this.vehiculos = response.data;
      })
      .catch(error => {
        console.error('Error al cargar datos de vehículos:', error);
      });
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
.error {
  color: red;
  margin-top: 10px;
}
button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #ccc;
}
</style>
