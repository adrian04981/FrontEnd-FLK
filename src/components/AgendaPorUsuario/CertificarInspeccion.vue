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
        <select id="estado" class="form-control" v-model="estado" required>
          <option value="" disabled>Seleccionar estado</option>
          <option value="Apto">Apto</option>
          <option value="Observado">Observado</option>
        </select>
      </div>
      <button class="btn btn-primary" @click="descargarArchivo">Descargar Archivo</button>
      <button class="btn btn-primary" :disabled="!observacionesYRecomendaciones.trim() || !estado" @click="certificarInspeccion">Guardar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CertificarInspeccion',
  props: {
    inspeccion: Object,
  },
  data() {
    return {
      observacionesYRecomendaciones: this.inspeccion ? this.inspeccion.observacionesYRecomendaciones : '',
      estado: this.inspeccion ? this.inspeccion.estado : '',
    };
  },
  watch: {
    inspeccion: {
      handler(newVal) {
        if (newVal) {
          this.observacionesYRecomendaciones = newVal.observacionesYRecomendaciones;
          this.estado = newVal.estado;
        }
      },
      immediate: true,
    },
  },
  methods: {
    async mejorarTexto() {
      const apiKey = process.env.VUE_APP_OPENAI_API_KEY;
      const prompt = `Reescribe el siguiente texto de observaciones y recomendaciones con tus palabras:\n\n${this.observacionesYRecomendaciones}\n\nTexto reescrito:`;
      try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
          model: 'text-davinci-003',
          prompt: prompt,
          max_tokens: 150,
          n: 1,
          stop: null,
          temperature: 0.7,
        }, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        });
        this.observacionesYRecomendaciones = response.data.choices[0].text.trim();
      } catch (error) {
        console.error('Error al mejorar el texto:', error);
      }
    },
    async descargarArchivo() {
      try {
        const response = await axios.get(`https://localhost:7006/api/AgendaDeUsuario/DownloadFile/${this.inspeccion.pkInspeccion}`, {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `documentacion_${this.inspeccion.pkInspeccion}.rar`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error al descargar el archivo:', error);
      }
    },
    async certificarInspeccion() {
      if (!this.estado) {
        alert('Por favor, seleccione el estado de la inspección.');
        return;
      }
      if (!this.observacionesYRecomendaciones.trim()) {
        alert('Por favor, ingrese observaciones y recomendaciones.');
        return;
      }
      try {
        // Generar un ID aleatorio de 6 dígitos para pkCertificadoInspeccion
        const pkCertificadoInspeccion = Math.floor(100000 + Math.random() * 900000);

        // Obtener la fecha actual y calcular la fecha de caducidad
        const today = new Date();
        const fechaEmision = today.toISOString().split('T')[0];
        const fechaCaducidad = new Date(today.setFullYear(today.getFullYear() + 2)).toISOString().split('T')[0];
        const fechaHoraRegistroCertificacion = new Date().toISOString();

        // Datos para la API de actualización de inspección
        const dataInspeccion = {
          observacionesYRecomendaciones: this.observacionesYRecomendaciones,
          estado: this.estado,
        };

        // Datos para la API de registro de certificación
        const dataCertificacion = {
          pkCertificadoInspeccion: pkCertificadoInspeccion,
          fkInspeccion: this.inspeccion.pkInspeccion,
          fechaEmision: fechaEmision,
          fechaCaducidad: fechaCaducidad,
          fechaHoraRegistroCertificacion: fechaHoraRegistroCertificacion,
          fondoCertificado: null,
        };

        // Actualizar la inspección
        await axios.put(`https://localhost:7006/api/AgendaDeUsuario/UpdateInspeccion/${this.inspeccion.pkInspeccion}`, dataInspeccion, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Registrar la certificación
        await axios.post(`https://localhost:7006/api/CertificadoInspeccions`, dataCertificacion, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        this.$emit('close');
        this.$emit('update');
      } catch (error) {
        console.error('Error al actualizar la inspección y registrar la certificación:', error);
      }
    },
  },
};
</script>
