<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Eliminar Personal</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <p>¿Estás seguro que deseas eliminar este personal?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="eliminarPersonal">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['personalId', 'usuarioId'],
    methods: {
      async eliminarPersonal() {
        try {
          await axios.delete(`https://localhost:7006/api/Personals/${this.personalId}`);
          await axios.delete(`https://localhost:7006/api/Usuarios/${this.usuarioId}`);
          this.$emit('personal-deleted');
          this.$emit('close');
        } catch (error) {
          console.error('Error deleting personal:', error);
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
  