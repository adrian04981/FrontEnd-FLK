<template>
  <div class="container">
    <h2>Buscar o Registrar Cliente : Empresa</h2>
    
    <div class="form-group">
      <label for="ruc">RUC:</label>
      <input type="text" id="ruc" v-model="consultaId" />
      <button @click="buscarCliente">Buscar</button>
    </div>
    
    <div v-if="cliente">
      <h3>Detalles del Cliente</h3>
    </div>
    
    <form @submit.prevent="registrarCliente">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="empresa.nombre" required />
      </div>
      <div class="form-group">
        <label for="razonSocial">Razón Social:</label>
        <input type="text" id="razonSocial" v-model="empresa.razonSocial" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="empresa.email" required />
      </div>
      <div class="form-group">
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" v-model="empresa.direccion" required />
      </div>
      <div class="form-group">
        <label for="telefono">Teléfono:</label>
        <input type="tel" id="telefono" v-model="empresa.telefono" required />
      </div>
      <button type="submit">Registrar</button>
    </form>
    
    <p v-if="error" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      consultaId: '',
      cliente: null,
      empresa: {
        ruc: '',
        nombre: '',
        razonSocial: '',
        email: '',
        direccion: '',
        telefono: ''
      },
      error: false,
      errorMessage: ''
    };
  },
  methods: {
    buscarCliente() {
      const apiUrl = `https://localhost:7006/api/Empresas/byRuc/${this.consultaId}`;
      
      axios.get(apiUrl)
        .then(response => {
          this.cliente = response.data;
          this.empresa = { ...this.cliente };  // Llenar los campos del formulario con los datos obtenidos
          this.error = false;
          this.errorMessage = '';
        })
        .catch(error => {
          console.error('Error al buscar el cliente:', error);
          this.error = true;
          this.errorMessage = 'Cliente no encontrado. Puede proceder a registrarlo.';
          this.cliente = null;
        });
    },
    registrarCliente() {
      const apiUrl = 'https://localhost:7006/api/Empresas';
      
      axios.post(apiUrl, this.empresa)
        .then(response => {
          alert('Empresa registrada exitosamente');
          this.cliente = response.data;
          this.error = false;
          this.errorMessage = '';
        })
        .catch(error => {
          console.error('Error al registrar la empresa:', error);
          this.error = true;
          this.errorMessage = 'Hubo un problema al registrar la empresa. Por favor, inténtelo de nuevo.';
        });
    }
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
.form-group input {
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
