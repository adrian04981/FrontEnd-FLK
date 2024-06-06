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
    <button @click="agendarServicio" :disabled="!tipoServicio || error">
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
      TiposServicios: [],
      error: false,
      errorMessage: ''
    };
  },
  methods: {
    agendarServicio() {
      if (!this.error) {
        const servicio = {
          fkTipoServicio: this.tipoServicio
        };

        axios.post('/api/Servicios', servicio)
          .then(response => {
            alert(`Servicio agendado`);
            // Redirigir al usuario a la página deseada con el ID generado
            this.$router.push(`/dashboard-admin/AgendarCitaBuscarCliente/${response.data.pkServicio}`);
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
    axios.get('/api/TiposServicios')
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
