<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Empresa</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editarEmpresa">
              <div class="mb-3">
                <label for="ruc" class="form-label">RUC</label>
                <input type="text" class="form-control" v-model="empresa.ruc" required>
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
              <button type="submit" class="btn btn-primary">Guardar Cambios</button>
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
        empresa: {
          ruc: '',
          nombre: '',
          razonSocial: '',
          email: '',
          direccion: '',
          telefono: ''
        },
      };
    },
    created() {
      this.fetchEmpresa();
    },
    methods: {
      async fetchEmpresa() {
        try {
          const response = await axios.get(`https://localhost:7006/api/Empresas/${this.id}`);
          this.empresa = response.data;
        } catch (error) {
          console.error('Error fetching empresa:', error);
        }
      },
      async editarEmpresa() {
        try {
          await axios.put(`https://localhost:7006/api/Empresas/${this.id}`, this.empresa);
          this.$emit('empresa-updated');
          this.$emit('close');
        } catch (error) {
          console.error('Error updating empresa:', error);
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
  