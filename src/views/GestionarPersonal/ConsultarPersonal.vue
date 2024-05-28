<template>
    <div>
      <h2>Editar Personal</h2>
      <div>
        <label for="idConsulta">ID a Consultar:</label>
        <input type="text" v-model="consultaId" />
        <button @click="fetchPersonal">Consultar</button>
      </div>
      <form @submit.prevent="updatePersonal" v-if="personal.id">
        <div>
          <label for="id">ID:</label>
          <input type="text" v-model="personal.id" disabled />
        </div>
        <div>
          <label for="nombre">Nombre:</label>
          <input type="text" v-model="personal.nombre" required />
        </div>
        <div>
          <label for="dni">DNI:</label>
          <input type="text" v-model="personal.dni" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="personal.email" required />
        </div>
        <div>
          <label for="direccion">Dirección:</label>
          <input type="text" v-model="personal.direccion" required />
        </div>
        <div>
          <label for="telefono">Teléfono:</label>
          <input type="text" v-model="personal.telefono" required />
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
        consultaId: '',
        personal: {
          id: '',
          nombre: '',
          dni: '',
          email: '',
          direccion: '',
          telefono: ''
        }
      };
    },
    methods: {
      async fetchPersonal() {
        try {
          const response = await axios.get(`https://localhost:7006/api/ListarPersonal/${this.consultaId}`);
          this.personal = response.data;
        } catch (error) {
          console.error('Error al obtener el personal:', error);
          alert('Error al consultar el personal');
        }
      },
      async updatePersonal() {
        try {
          await axios.put(`https://localhost:7006/api/ListarPersonal/${this.personal.id}`, this.personal);
          alert('Datos actualizados correctamente');
          this.$router.push('/');  // Redireccionar a otra página después de guardar
        } catch (error) {
          console.error('Error al actualizar el personal:', error);
          alert('Error al actualizar el personal');
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