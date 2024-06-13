<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Personal</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editarPersonal">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" v-model="personal.nombre" required>
              </div>
              <div class="mb-3">
                <label for="dni" class="form-label">DNI</label>
                <input type="text" class="form-control" v-model="personal.dni" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" v-model="personal.email" required>
              </div>
              <div class="mb-3">
                <label for="direccion" class="form-label">Dirección</label>
                <input type="text" class="form-control" v-model="personal.direccion" required>
              </div>
              <div class="mb-3">
                <label for="telefono" class="form-label">Teléfono</label>
                <input type="text" class="form-control" v-model="personal.telefono" required>
              </div>
              <button type="submit" class="btn btn-primary">Guardar</button>
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
        personal: {}
      };
    },
    created() {
      this.fetchPersonal();
    },
    methods: {
      async fetchPersonal() {
        try {
          const response = await axios.get(`https://localhost:7006/api/Personals/${this.id}`);
          this.personal = response.data;
        } catch (error) {
          console.error('Error fetching personal:', error);
        }
      },
      async editarPersonal() {
        try {
          await axios.put(`https://localhost:7006/api/Personals/${this.id}`, this.personal);
          this.$emit('close');
        } catch (error) {
          console.error('Error editing personal:', error);
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
  