<template>
  <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Registrar Usuario</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="registerUser">
            <div class="mb-3">
              <label for="nombreUsuario" class="form-label">Nombre de Usuario</label>
              <input type="text" class="form-control" id="nombreUsuario" v-model="usuario.nombreUsuario" required>
            </div>
            <div class="mb-3">
              <label for="contraseña" class="form-label">Contraseña</label>
              <input type="password" class="form-control" id="contraseña" v-model="usuario.contraseña" required>
            </div>
            <div class="mb-3">
              <label for="fkRol" class="form-label">Rol</label>
              <select class="form-select" id="fkRol" v-model="usuario.fkRol" required>
                <option v-for="rol in roles" :key="rol.pkRol" :value="rol.pkRol">{{ rol.nombre }}</option>
              </select>
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
  props: ['roles'],
  data() {
    return {
      usuario: {
        pkUsuario: 0,
        nombreUsuario: '',
        contraseña: '',
        fkRol: 0
      }
    };
  },
  methods: {
    async registerUser() {
      try {
        await axios.post('https://localhost:7006/api/Usuarios', this.usuario);
        this.$emit('user-registered');
        this.$emit('close');
      } catch (error) {
        console.error('Error registrando usuario:', error);
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
