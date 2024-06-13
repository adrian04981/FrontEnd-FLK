<template>
  <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Registrar Certificado</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="registrarCertificado">
            <div class="mb-3">
              <label for="tipoCertificado" class="form-label">Tipo de Certificado</label>
              <select id="tipoCertificado" class="form-select" v-model="tipoCertificado" required>
                <option value="certificador">Certificador</option>
                <option value="inspector">Inspector</option>
                <option value="docente">Docente</option>
              </select>
            </div>
            <div class="mb-3" v-if="tipoCertificado">
              <label for="usuario" class="form-label">Usuario</label>
              <select id="usuario" class="form-select" v-model="certificado.fkUsuario" required>
                <option v-for="usuario in usuarios" :key="usuario.pkPersonal" :value="usuario.fkUsuario">{{ usuario.nombre }}</option>
              </select>
            </div>
            <div class="mb-3" v-if="tipoCertificado !== 'docente'">
              <label for="tipoInspeccion" class="form-label">Tipo de Inspección</label>
              <select id="tipoInspeccion" class="form-select" v-model="certificado.fkTipoInspeccion" required>
                <option v-for="tipo in tiposInspeccion" :key="tipo.pkTipoInspeccion" :value="tipo.pkTipoInspeccion">{{ tipo.titulo }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="fechaEmision" class="form-label">Fecha de Emisión</label>
              <input type="date" id="fechaEmision" class="form-control" v-model="certificado.fechaEmisionCertificado" required>
            </div>
            <div class="mb-3">
              <label for="fechaVencimiento" class="form-label">Fecha de Vencimiento</label>
              <input type="date" id="fechaVencimiento" class="form-control" v-model="certificado.fechaVencimientoCertificado" required>
            </div>
            <div class="mb-3">
              <label for="certificadoPdf" class="form-label">Certificado PDF</label>
              <input type="text" id="certificadoPdf" class="form-control" v-model="certificado.certificadoPdf" required>
            </div>
            <div class="mb-3" v-if="tipoCertificado === 'certificador'">
              <label for="firmaYselloDigital" class="form-label">Firma y Sello Digital</label>
              <input type="text" id="firmaYselloDigital" class="form-control" v-model="certificado.firmaYselloDigital">
            </div>
            <button type="submit" class="btn btn-primary">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tipoCertificado: '',
      certificado: {
        fkUsuario: 0,
        fkTipoInspeccion: 0,
        fechaEmisionCertificado: '',
        fechaVencimientoCertificado: '',
        certificadoPdf: '',
        firmaYselloDigital: ''
      },
      usuarios: [],
      tiposInspeccion: []
    };
  },
  created() {
    this.fetchUsuarios();
    this.fetchTiposInspeccion();
  },
  methods: {
    async fetchUsuarios() {
      try {
        const response = await axios.get('https://localhost:7006/api/Personals');
        this.usuarios = response.data;
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    },
    async fetchTiposInspeccion() {
      try {
        const response = await axios.get('https://localhost:7006/api/TipoInspeccions');
        this.tiposInspeccion = response.data;
      } catch (error) {
        console.error('Error fetching tipos de inspección:', error);
      }
    },
    async registrarCertificado() {
      try {
        let apiUrl = '';
        if (this.tipoCertificado === 'certificador') {
          apiUrl = 'https://localhost:7006/api/CertificadoresDisponibles';
        } else if (this.tipoCertificado === 'inspector') {
          apiUrl = 'https://localhost:7006/api/InspectoresDisponibles';
        } else if (this.tipoCertificado === 'docente') {
          apiUrl = 'https://localhost:7006/api/DocenteDisponibles';
        }

        await axios.post(apiUrl, this.certificado);
        this.$emit('certificado-registered');
        this.$emit('close');
      } catch (error) {
        console.error('Error registrando certificado:', error);
      }
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
}
</style>
