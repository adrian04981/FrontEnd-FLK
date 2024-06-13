<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Tipo de Inspección</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editarInspeccion">
              <div class="mb-3">
                <label for="titulo" class="form-label">Título</label>
                <input type="text" id="titulo" class="form-control" v-model="inspeccion.titulo" required>
              </div>
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea id="descripcion" class="form-control" v-model="inspeccion.descripcion" required></textarea>
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
          titulo: '',
          descripcion: ''
        }
      };
    },
    created() {
      this.fetchInspeccion();
    },
    methods: {
      async fetchInspeccion() {
        try {
          const response = await axios.get(`https://localhost:7006/api/TipoInspeccions/${this.id}`);
          this.inspeccion = response.data;
        } catch (error) {
          console.error('Error fetching inspección:', error);
        }
      },
      async editarInspeccion() {
        try {
          await axios.put(`https://localhost:7006/api/TipoInspeccions/${this.id}`, this.inspeccion);
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
  