<template>
   <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Inspección</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editarInspeccion">
              <div class="mb-3">
                <label for="estado" class="form-label">Estado</label>
                <input type="text" id="estado" class="form-control" v-model="inspeccion.estado " required>
              </div>
              <div class="mb-3">
                <label for="documentacion" class="form-label">Documentacion</label>
                <input type="text" id="documentacion" class="form-control" v-model="inspeccion.documentacion" required>
              </div>
              <button type="submit" class="btn btn-primary">Guardar cambios</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
 import axios from 'axios';

  export default {
    props: ['id'],
    data() {
      return {
        inspeccion: {
          documentacion: '',
          estado: '',
          observacionesYRecomendaciones: ''
        }
      };
    },
    created() {
      this.fetchInspeccion();
    },
    methods: {
      async fetchInspeccion() {
        try {
          const response = await axios.get(`https://localhost:7006/api/Inspeccions/${this.id}`);
          this.inspeccion = response.data;
        } catch (error) {
          console.error('Error fetching inspección:', error);
        }
      },
      async editarInspeccion() {
        try {
          await axios.put(`https://localhost:7006/api/Inspeccions/${this.id}`, this.inspeccion);
          this.$emit('close');
          this.$emit('inspeccion-updated');
        } catch (error) {
          console.error('Error updating inspección:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  