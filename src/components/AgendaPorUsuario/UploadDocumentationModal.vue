<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal">
      <h2>Subir Documentación</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="documentacion">Documentación:</label>
          <input type="file" id="documentacion" @change="handleFileUpload" required />
        </div>
        <div class="form-group">
          <label for="estado">Estado:</label>
          <select id="estado" v-model="estado" required>
            <option value="Pendiente">Pendiente</option>
            <option value="Esperando Revision">Esperando Revision</option>
          </select>
        </div>
        <button type="submit">Enviar</button>
        <button type="button" @click="closeModal">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    inspectionId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      documentacion: null,
      estado: 'Pendiente'
    };
  },
  methods: {
    handleFileUpload(event) {
      this.documentacion = event.target.files[0];
    },
    async submitForm() {
      try {
        const formData = new FormData();
        formData.append('documentacion', this.documentacion);

        const response = await axios.get(`https://localhost:7006/api/Inspecciones/${this.inspectionId}`);
        const inspectionData = response.data;

        inspectionData.documentacion = formData;
        inspectionData.estado = this.estado;

        await axios.put(`https://localhost:7006/api/Inspecciones/${this.inspectionId}`, inspectionData);

        this.$emit('update');
        this.closeModal();
      } catch (error) {
        console.error('Error al subir la documentación:', error);
      }
    },
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

