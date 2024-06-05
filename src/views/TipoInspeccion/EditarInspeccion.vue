<template>
  <div>
    <h2>Editar Tipo Inspección</h2>
    <form @submit.prevent="updateTipoInspeccion">
      <div>
        <label for="id">ID:</label>
        <input type="text" v-model="tipoInspeccion.pkTipoInspeccion" readonly />
      </div>
      <div>
        <label for="titulo">Titulo:</label>
        <input type="text" v-model="tipoInspeccion.titulo" />
      </div>
      <div>
        <label for="descripcion">Descripcion:</label>
        <input type="text" v-model="tipoInspeccion.descripcion" />
      </div>
      <div>
        <h3>Certificadores Disponibles</h3>
        <ul>
          <li v-for="(certificador, index) in tipoInspeccion.certificadoresDisponibles" :key="index">
            <input type="text" v-model="certificador.nombre" />
          </li>
        </ul>
      </div>
      <div>
        <h3>Inspecciones</h3>
        <ul>
          <li v-for="(inspeccion, index) in tipoInspeccion.inspecciones" :key="index">
            <input type="text" v-model="inspeccion.nombre" />
          </li>
        </ul>
      </div>
      <div>
        <h3>Inspectores Disponibles</h3>
        <ul>
          <li v-for="(inspector, index) in tipoInspeccion.inspectoresDisponibles" :key="index">
            <input type="text" v-model="inspector.nombre" />
          </li>
        </ul>
      </div>
      <button type="submit">Guardar Cambios</button>
    </form>
    <button @click="volver" class="btn btn-secondary mt-3">Volver</button>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'EditTipoInspeccion',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const tipoInspeccion = ref({
      pkTipoInspeccion: '',
      titulo: '',
      descripcion: '',
      certificadoresDisponibles: [],
      inspecciones: [],
      inspectoresDisponibles: []
    });

    onMounted(() => {
      const id = route.params.id;
      axios.get(`https://localhost:7006/api/TipoInspeccions/${id}`)
        .then(response => {
          tipoInspeccion.value = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    });

    const updateTipoInspeccion = () => {
      axios.put(`https://localhost:7006/api/TipoInspeccions/${tipoInspeccion.value.pkTipoInspeccion}`, tipoInspeccion.value)
        .then(() => {
          router.push('/');
        })
        .catch(error => {
          console.error(error);
        });
    };

    const volver = () => {
      router.back();
    };

    return {
      tipoInspeccion,
      updateTipoInspeccion,
      volver,
    };
  },
};
</script>

<style scoped>
div {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}
button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
