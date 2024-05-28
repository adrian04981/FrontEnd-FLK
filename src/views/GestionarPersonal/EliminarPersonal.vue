<template>
    <div>
      <h2>Listar Personal</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="personal in listaPersonal" :key="personal.id">
            <td>{{ personal.id }}</td>
            <td>{{ personal.nombre }}</td>
            <td>{{ personal.dni }}</td>
            <td>{{ personal.email }}</td>
            <td>{{ personal.direccion }}</td>
            <td>{{ personal.telefono }}</td>
            <td>
              <button @click="eliminarPersonal(personal.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        listaPersonal: []
      };
    },
    methods: {
      async fetchListaPersonal() {
        try {
          const response = await axios.get('https://localhost:7006/api/ListarPersonal');
          this.listaPersonal = response.data;
        } catch (error) {
          console.error('Error al obtener la lista de personal:', error);
        }
      },
      async eliminarPersonal(id) {
        try {
          await axios.delete(`https://localhost:7006/api/ListarPersonal/${id}`);
          this.listaPersonal = this.listaPersonal.filter(personal => personal.id !== id);
          alert('Personal eliminado correctamente');
        } catch (error) {
          console.error('Error al eliminar el personal:', error);
          alert('Error al eliminar el personal');
        }
      }
    },
    mounted() {
      this.fetchListaPersonal();
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  th {
    background-color: #f2f2f2;
    text-align: left;
  }
  </style>