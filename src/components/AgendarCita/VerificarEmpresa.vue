<template>
    <div class="modal show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Verificar Empresa</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="ruc" class="form-label">RUC de la Empresa</label>
              <input type="text" class="form-control" v-model="ruc" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="verificarEmpresa">Verificar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    setup(_, { emit }) {
      const ruc = ref('');
  
      const verificarEmpresa = async () => {
        try {
          const response = await axios.get(`/AgendarCita/VerificarEmpresaPorRuc/${ruc.value}`);
          if (response.data) {
            console.log('Empresa encontrada:', response.data);
            emit('empresaVerificada', response.data);
          } else {
            emit('empresaNoEncontrada');
          }
        } catch (error) {
          console.error('Error al verificar la empresa:', error);
          emit('empresaNoEncontrada');
        }
      };
  
      return {
        ruc,
        verificarEmpresa,
      };
    },
  };
  </script>
  
  <style scoped>
  .modal {
    background-color: rgba(0, 0, 0, 0.5);
  }
  </style>
  