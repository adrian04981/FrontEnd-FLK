<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Registrar Empresa</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="registrarEmpresa">
              <div class="mb-3">
                <label for="ruc" class="form-label">RUC</label>
                <input type="text" class="form-control" v-model="empresa.ruc" readonly>
              </div>
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" v-model="empresa.nombre" required>
              </div>
              <div class="mb-3">
                <label for="razonSocial" class="form-label">Razón Social</label>
                <input type="text" class="form-control" v-model="empresa.razonSocial" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" v-model="empresa.email" required>
              </div>
              <div class="mb-3">
                <label for="direccion" class="form-label">Dirección</label>
                <input type="text" class="form-control" v-model="empresa.direccion" required>
              </div>
              <div class="mb-3">
                <label for="telefono" class="form-label">Teléfono</label>
                <input type="text" class="form-control" v-model="empresa.telefono" required>
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
    props: ['ruc'],
    data() {
      return {
        empresa: {
          pkEmpresas: 0,
          ruc: this.ruc,
          nombre: '',
          razonSocial: '',
          email: '',
          direccion: '',
          telefono: ''
        }
      };
    },
    methods: {
      async registrarEmpresa() {
        try {
          const response = await axios.post('https://localhost:7006/api/Empresas', this.empresa);
          const pkEmpresas = response.data.pkEmpresas;
          this.$emit('empresa-registrada', pkEmpresas);
          this.$emit('close');
        } catch (error) {
          console.error('Error registrando empresa:', error);
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
  