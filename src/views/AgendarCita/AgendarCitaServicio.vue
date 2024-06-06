<template>
  <div class="container">
    <h2>Agendar Servicio</h2>
    <div class="form-group">
      <label for="tipoServicio">Tipo de Servicio:</label>
      <select id="tipoServicio" v-model="tipoServicio" required>
        <option v-for="servicio in TiposServicios" :key="servicio.pkTiposServicio" :value="servicio.pkTiposServicio">
          {{ servicio.nombre }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="fechaAgendada">Fecha Agendada:</label>
      <input
        type="date"
        id="fechaAgendada"
        v-model="fechaAgendada"
        required
        @change="validateFecha"
      />
    </div>
    <button @click="agendarServicio" :disabled="!fechaAgendada || error">
      Agendar
    </button>
    <p class="error" v-if="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      tipoServicio: '',
      fechaAgendada: '',
      TiposServicios: [],
      error: false,
      errorMessage: ''
    };
  },
  methods: {
    validateFecha() {
      // Lógica de validación para la fecha
      if (!this.fechaAgendada) {
        this.error = true;
        this.errorMessage = 'Por favor, selecciona una fecha.';
      } else {
        this.error = false;
        this.errorMessage = '';
      }
    },
    agendarServicio() {
      if (!this.error) {
        const servicio = {
          pkServicio: 0,
          fkTipoServicio: this.tipoServicio,
          fechaAgendada: this.fechaAgendada
        };

        axios.post('/Servicios', servicio)
          .then(response => {
            alert(`Servicio agendado para ${this.fechaAgendada}`);
          })
          .catch(error => {
            console.error('Error al agendar el servicio:', error);
            this.error = true;
            this.errorMessage = 'Hubo un problema al agendar el servicio. Por favor, inténtalo de nuevo.';
          });
      }
    }
  },
  mounted() {
    axios.get('/TiposServicios')
      .then(response => {
        this.TiposServicios = response.data;
      })
      .catch(error => {
        console.error('Error al cargar datos de servicios:', error);
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
.form-group select {
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
