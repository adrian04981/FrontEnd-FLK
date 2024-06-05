<template>
  <div>
    <h2>Editar Cliente</h2>
    <div>
      <label for="tipoCliente">Tipo de Cliente:</label>
      <select v-model="tipoCliente">
        <option value="personal">Personal</option>
        <option value="empresa">Empresa</option>
      </select>
    </div>
    <div>
      <label for="idConsulta">ID a Consultar:</label>
      <input type="text" v-model="consultaId" />
      <button @click="fetchCliente">Consultar</button>
    </div>
    <form @submit.prevent="updateCliente" v-if="cliente.id">
      <div>
        <label for="id">ID:</label>
        <input type="text" v-model="cliente.id" disabled />
      </div>
      <div>
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="cliente.nombre" required />
      </div>
      <div v-if="tipoCliente === 'personal'">
        <label for="dni">DNI:</label>
        <input type="text" v-model="cliente.dni" required />
      </div>
      <div v-if="tipoCliente === 'empresa'">
        <label for="ruc">RUC:</label>
        <input type="text" v-model="cliente.ruc" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="cliente.email" required />
      </div>
      <div>
        <label for="direccion">Dirección:</label>
        <input type="text" v-model="cliente.direccion" required />
      </div>
      <div>
        <label for="telefono">Teléfono:</label>
        <input type="text" v-model="cliente.telefono" required />
      </div>
      <button type="submit">Guardar cambios</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tipoCliente: 'personal', // Default to 'personal'
      consultaId: '',
      cliente: {
        id: '',
        nombre: '',
        dni: '',
        ruc: '',
        email: '',
        direccion: '',
        telefono: ''
      }
    };
  },
  methods: {
    async fetchCliente() {
      try {
        const url = this.tipoCliente === 'personal'
          ? `https://localhost:7006/api/ListarPersonal/${this.consultaId}`
          : `https://localhost:7006/api/ListarEmpresa/${this.consultaId}`;

        const response = await axios.get(url);
        this.cliente = response.data;
      } catch (error) {
        console.error('Error al obtener el cliente:', error);
        alert('Error al consultar el cliente');
      }
    },
    async updateCliente() {
      try {
        const url = this.tipoCliente === 'personal'
          ? `https://localhost:7006/api/ListarPersonal/${this.cliente.id}`
          : `${this.cliente.id}`;

        await axios.put(url, this.cliente);
        alert('Datos actualizados correctamente');
        this.$router.push('/');  // Redireccionar a otra página después de guardar
      } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        alert('Error al actualizar el cliente');
      }
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
form > div {
  margin-bottom: 10px;
}
form > div > label {
  margin-right: 10px;
}
</style>
