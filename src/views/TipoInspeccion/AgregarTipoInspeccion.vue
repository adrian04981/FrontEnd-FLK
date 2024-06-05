<template>
  <div class="container">
    <h1>Agregar Tipo de Inspección</h1>
    <form @submit.prevent="agregarTipoInspeccion">
      <div class="form-group">
        <label for="id">ID:</label>
        <input type="text" v-model="tipoInspeccion.id" id="id" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="titulo">Título:</label>
        <input type="text" v-model="tipoInspeccion.titulo" id="titulo" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="descripcion">Descripción:</label>
        <input type="text" v-model="tipoInspeccion.descripcion" id="descripcion" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-success">Agregar</button>
      <button type="button" @click="volver" class="btn btn-secondary ml-2">Volver</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tipoInspeccion: {
        id: '',
        titulo: '',
        descripcion: '',
      },
    };
  },
  methods: {
    async agregarTipoInspeccion() {
      try {
        const response = await axios.post('https://localhost:7006/api/TipoInspeccions', this.tipoInspeccion);
        console.log('Tipo de inspección agregado:', response.data);
        alert('Tipo de inspección agregado con éxito');
        this.limpiarFormulario();
        this.$router.push({ name: 'ListarTiposInspeccion' });
      } catch (error) {
        console.error('Error al agregar el tipo de inspección:', error);
        alert('Error al agregar el tipo de inspección');
      }
    },
    limpiarFormulario() {
      this.tipoInspeccion.id = '';
      this.tipoInspeccion.titulo = '';
      this.tipoInspeccion.descripcion = '';
    },
    volver() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

button {
  padding: 10px 20px;
}

.btn-success {
  background-color: #42b983;
  color: white;
  border: none;
}

.btn-success:hover {
  background-color: #369f77;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
  border: none;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>