<template>
  <div>
    <div v-if="inspeccion">
      <h5>{{ inspeccion.nombre }}</h5>
      <p><strong>Razon Social:</strong> {{ inspeccion.razonSocial }}</p>
      <div class="mb-3">
        <label for="observaciones" class="form-label">Observaciones y Recomendaciones</label>
        <textarea id="observaciones" class="form-control" v-model="observacionesYRecomendaciones"></textarea>
      </div>
      <div class="mb-3">
        <label for="estado" class="form-label">Estado</label>
        <select id="estado" class="form-control" v-model="estado">
          <option value="Apto">Apto</option>
          <option value="Observado">Observado</option>
        </select>
      </div>
      <button class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
      <button class="btn btn-primary" @click="certificarInspeccion">Guardar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CertificarInspeccion',
  props: {
    inspeccion: Object,
  },
  data() {
    return {
      observacionesYRecomendaciones: this.inspeccion ? this.inspeccion.observacionesYRecomendaciones : '',
      estado: this.inspeccion ? this.inspeccion.estado : 'Apto',
    };
  },
  methods: {
    async certificarInspeccion() {
      try {
        const data = {
          ...this.inspeccion,
          observacionesYRecomendaciones: this.observacionesYRecomendaciones,
          estado: this.estado,
        };

        await this.$axios.put(`/Inspecciones/${this.inspeccion.pkInspeccion}`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const fechaActual = new Date();
        const fechaCaducidad = new Date();
        fechaCaducidad.setFullYear(fechaCaducidad.getFullYear() + 1);

        const certificadoData = {
          pkCertificadoInspeccion: 0,
          fkInspeccion: this.inspeccion.pkInspeccion,
          fechaEmision: fechaActual.toISOString().split('T')[0],
          fechaCaducidad: fechaCaducidad.toISOString().split('T')[0],
          fechaHoraRegistroCertificacion: fechaActual.toISOString(),
          fondoCertificado: null,
        };

        await this.$axios.post(`/CertificadoInspeccions`, certificadoData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        this.$emit('close');
        this.$emit('update');
      } catch (error) {
        console.error('Error al certificar la inspección:', error);
      }
    },
  },
};
</script>