<template>
  <div>
    <h2>Agendar Cita</h2>
    <div>
      <label for="usuario">Usuario:</label>
      <input type="text" v-model="usuario" />
    </div>
    <div>
      <label for="contrasena">Contraseña:</label>
      <input type="password" v-model="contrasena" />
    </div>
    <div>
      <label for="documento">Documento de Identidad del Cliente:</label>
      <input type="text" v-model="documentoIdentidad" />
    </div>
    <button @click="verificarCliente">Verificar Cliente</button>
    <form @submit.prevent="agendarCita" v-if="clienteEncontrado">
      <div>
        <label for="servicio">Servicio:</label>
        <input type="text" v-model="servicio" />
      </div>
      <div>
        <label for="asistente">Asistente de Operaciones:</label>
        <select v-model="asistente">
          <option value="Asistente1">Asistente 1</option>
          <option value="Asistente2">Asistente 2</option>
          <option value="Asistente3">Asistente 3</option>
        </select>
      </div>
      <button type="submit">Agendar Cita</button>
    </form>
    <div v-if="citaAgendada">
      <p>Cita agendada con éxito.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      usuario: '',
      contrasena: '',
      documentoIdentidad: '',
      clienteEncontrado: false,
      servicio: '',
      asistente: '',
      citaAgendada: false
    };
  },
  methods: {
    async verificarCliente() {
      try {
        // Simular autenticación de recepcionista con credenciales
        if (this.usuario === 'usuario' && this.contrasena === 'contrasena') {
          // Simular verificación del cliente en la base de datos
          const response = await axios.get(`https://localhost:7006/api/AgendarServicio/Inspecciones/${this.documentoIdentidad}`);
          if (response.data) {
            this.clienteEncontrado = true;
          } else {
            alert('Cliente no encontrado en la base de datos. Por favor ingrese los datos requeridos.');
          }
        } else {
          alert('Credenciales incorrectas. Por favor ingrese credenciales válidas.');
        }
      } catch (error) {
        console.error('Error al verificar cliente:', error);
        alert('Error al verificar cliente.');
      }
    },
    async agendarCita() {
      try {
        // Simular agendamiento de cita
        // Aquí iría el código para enviar los datos al backend y agendar la cita
        this.citaAgendada = true;
      } catch (error) {
        console.error('Error al agendar cita:', error);
        alert('Error al agendar cita.');
      }
    }
  }
};
</script>

<style scoped>
/* Estilos opcionales */
</style>
