<template>
  <div>
    <div v-if="inspeccion">
      <h5>{{ inspeccion.nombre }}</h5>
      <p><strong>Razon Social:</strong> {{ inspeccion.razonSocial }}</p>
      <p><strong>Fecha y Hora de Inicio:</strong> {{ new Date(inspeccion.fechaHoraInicio).toLocaleString() }}</p>
      <p><strong>Fecha y Hora de Finalización:</strong> {{ new Date(inspeccion.fechaHoraFinalizacion).toLocaleString() }}</p>
      <div class="mb-3">
        <label for="archivo" class="form-label">Subir archivo (.rar, .zip, .doc, .docx, .txt)</label>
        <input type="file" id="archivo" class="form-control" @change="handleFileUpload" accept=".rar,.zip,.doc,.docx,.txt">
      </div>
      <button class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
      <button class="btn btn-primary" @click="subirArchivo">Subir Archivo</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'EditarDocumentacion',
  props: {
    inspeccion: Object,
  },
  data() {
    return {
      archivo: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.archivo = event.target.files[0];
    },
    async subirArchivo() {
      if (!this.archivo) {
        alert('Por favor, selecciona un archivo para subir.');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.archivo);

      try {
        await axios.post(`https://localhost:7006/api/AgendaDeUsuario/UploadFile/${this.inspeccion.pkInspeccion}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        this.$emit('close');
      } catch (error) {
        console.error('Error al subir el archivo:', error);
      }
    },
  },
};
</script>
