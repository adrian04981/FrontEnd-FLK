<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Registrar Asignatura</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="registrarAsignatura">
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
        asignatura: {
          nombre: '',
          horasTeoria: '',
          horaPractica: ''
        }
      };
    },
    methods: {
      async registrarAsignatura() {
        try {
          await axios.post('https://localhost:7006/api/Asignaturas', this.asignatura);
          this.$emit('close');
          this.$emit('asignatura-registered');
        } catch (error) {
          console.error('Error registrando asignatura:', error);
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
  