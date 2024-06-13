<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Asignar Inspectores y Certificador</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="asignarInspectores">
              <div class="mb-3">
                <label for="inspectores" class="form-label">Inspectores Disponibles</label>
                <select multiple class="form-select" v-model="fkInspectoresAsignados" required>
                  <option v-for="inspector in inspectoresDisponibles" :key="inspector.pkInpectoresDisponibles" :value="inspector.pkInpectoresDisponibles">
                    {{ inspector.fkUsuario }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="certificador" class="form-label">Certificador Disponible</label>
                <select class="form-select" v-model="fkCertificadorAsignado" required>
                  <option v-for="certificador in certificadoresDisponibles" :key="certificador.pkCertificadoresDisponibles" :value="certificador.pkCertificadoresDisponibles">
                    {{ certificador.fkUsuario }}
                  </option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Asignar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['pkInspeccion', 'fkTipoInspeccion'],
    data() {
      return {
        inspectoresDisponibles: [],
        certificadoresDisponibles: [],
        fkInspectoresAsignados: [],
        fkCertificadorAsignado: null
      };
    },
    created() {
      this.fetchInspectoresDisponibles();
      this.fetchCertificadoresDisponibles();
    },
    methods: {
      async fetchInspectoresDisponibles() {
        try {
          const response = await axios.get('https://localhost:7006/api/InspectoresDisponibles');
          this.inspectoresDisponibles = response.data.filter(inspector => inspector.fkTipoInspeccion === this.fkTipoInspeccion);
        } catch (error) {
          console.error('Error fetching inspectores disponibles:', error);
        }
      },
      async fetchCertificadoresDisponibles() {
        try {
          const response = await axios.get('https://localhost:7006/api/CertificadoresDisponibles');
          this.certificadoresDisponibles = response.data.filter(certificador => certificador.fkTipoInspeccion === this.fkTipoInspeccion);
        } catch (error) {
          console.error('Error fetching certificadores disponibles:', error);
        }
      },
      async asignarInspectores() {
        try {
          for (const inspectorId of this.fkInspectoresAsignados) {
            await axios.post('https://localhost:7006/api/AsignacionInspectores', {
              pkAsignacionId: 0,
              fkInpectoresDisponibles: inspectorId,
              fkInspeccion: this.pkInspeccion
            });
          }
          await axios.put(`https://localhost:7006/api/Inspecciones/${this.pkInspeccion}`, {
            fkCertificadorAsignado: this.fkCertificadorAsignado
          });
          this.$emit('inspectores-asignados');
          this.$emit('close');
        } catch (error) {
          console.error('Error asignando inspectores:', error);
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
  