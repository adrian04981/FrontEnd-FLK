<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Asignatura</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editarAsignatura">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" id="nombre" class="form-control" v-model="asignatura.nombre" required>
              </div>
              <div class="mb-3">
                <label for="horasTeoria" class="form-label">Horas Teoría</label>
                <input type="number" id="horasTeoria" class="form-control" v-model="asignatura.horasTeoria" required>
              </div>
              <div class="mb-3">
                <label for="horaPractica" class="form-label">Horas Práctica</label>
                <input type="number" id="horaPractica" class="form-control" v-model="asignatura.horaPractica" required>
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
        asignatura: {
          nombre: '',
          horasTeoria: '',
          horaPractica: ''
        }
      };
    },
    created() {
      this.fetchAsignatura();
    },
    methods: {
      async fetchAsignatura() {
        try {
          const response = await axios.get(`https://localhost:7006/api/Asignaturas/${this.id}`);
          this.asignatura = response.data;
        } catch (error) {
          console.error('Error fetching asignatura:', error);
        }
      },
      async editarAsignatura() {
        try {
          await axios.put(`https://localhost:7006/api/Asignaturas/${this.id}`, this.asignatura);
          this.$emit('close');
          this.$emit('asignatura-updated');
        } catch (error) {
          console.error('Error updating asignatura:', error);
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
  