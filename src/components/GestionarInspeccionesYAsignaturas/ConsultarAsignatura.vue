<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Consultar Asignatura</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <p><strong>Nombre:</strong> {{ asignatura.nombre }}</p>
            <p><strong>Horas Teoría:</strong> {{ asignatura.horasTeoria }}</p>
            <p><strong>Horas Práctica:</strong> {{ asignatura.horaPractica }}</p>
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
        asignatura: {}
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
  