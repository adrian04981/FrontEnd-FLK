<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Registrar Tipo de Inspección</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="registrarInspeccion">
              <div class="mb-3">
                <label for="titulo" class="form-label">Título</label>
                <input type="text" id="titulo" class="form-control" v-model="inspeccion.titulo" required>
              </div>
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea id="descripcion" class="form-control" v-model="inspeccion.descripcion" required></textarea>
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
        inspeccion: {
          titulo: '',
          descripcion: ''
        }
      };
    },
    methods: {
      async registrarInspeccion() {
        try {
          await axios.post('https://localhost:7006/api/TipoInspeccions', this.inspeccion);
          this.$emit('close');
          this.$emit('inspeccion-registered');
        } catch (error) {
          console.error('Error registrando inspección:', error);
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
  