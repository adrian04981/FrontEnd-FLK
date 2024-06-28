<template>
  <div>
    <div v-if="inspeccion">
      <h5>{{ inspeccion.nombre }}</h5>
      <p><strong>Razon Social:</strong> {{ inspeccion.razonSocial }}</p>
      <p><strong>Fecha y Hora de Inicio:</strong> {{ new Date(inspeccion.fechaHoraInicio).toLocaleString() }}</p>
      <p><strong>Fecha y Hora de Finalización:</strong> {{ new Date(inspeccion.fechaHoraFinalizacion).toLocaleString() }}</p>
      <div class="mb-3">
        <label for="documentacion" class="form-label">Documentación</label>
        <textarea id="documentacion" class="form-control" v-model="documentacion"></textarea>
      </div>
      <div class="mb-3">
        <label for="archivo" class="form-label">Subir archivo (.rar)</label>
        <input type="file" id="archivo" class="form-control" @change="handleFileUpload" accept=".rar">
      </div>
      <button class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
      <button class="btn btn-primary" @click="registrarDocumentacion">Registrar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditarDocumentacion',
  props: {
    inspeccion: Object,
  },
  data() {
    return {
      documentacion: this.inspeccion ? this.inspeccion.documentacion : '',
      archivo: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.archivo = event.target.files[0];
    },
    async registrarDocumentacion() {
      try {
        const data = {
          ...this.inspeccion,
          documentacion: this.documentacion,
          estado: 'Pendiente Evaluacion',
          archivo: this.archivo ? this.archivo.name : null,
        };

        await this.$axios.put(`/Inspecciones/${this.inspeccion.pkInspeccion}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        this.$emit('close');
      } catch (error) {
        console.error('Error al registrar la documentación:', error);
      }
    },
  },
};
</script>
