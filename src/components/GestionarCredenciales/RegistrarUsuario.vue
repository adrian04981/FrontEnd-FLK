<template>
  <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Registrar Usuario</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="registrarUsuario">
            <div class="mb-3">
              <label for="nombreUsuario" class="form-label">Nombre de Usuario</label>
              <input type="text" class="form-control" v-model="usuario.nombreUsuario" required>
            </div>
            <div class="mb-3">
              <label for="contraseña" class="form-label">Contraseña</label>
              <input type="password" class="form-control" v-model="usuario.contraseña" required>
            </div>
            <div class="mb-3">
              <label for="rol" class="form-label">Rol</label>
              <select class="form-select" v-model="usuario.fkRol" required>
                <option v-for="rol in roles" :key="rol.pkRol" :value="rol.pkRol">{{ rol.nombre }}</option>
              </select>
            </div>
            <hr />
            <h5>Datos del Personal</h5>
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
        nombreUsuario: '',
        contraseña: '',
        fkRol: ''
      },
      personal: {
        nombre: '',
        dni: '',
        email: '',
        direccion: '',
        telefono: '',
        fkUsuario: null // Se actualizará después de crear el usuario
      }
    };
  },
  methods: {
    async registrarUsuario() {
      try {
        const response = await axios.post('https://localhost:7006/api/Usuarios', this.usuario);
        const usuarioId = response.data.pkUsuario;
        
        // Ahora registrar el personal con el ID del usuario
        this.personal.fkUsuario = usuarioId;
        await axios.post('https://localhost:7006/api/Personals', this.personal);
        
        this.$emit('user-registered');
        this.$emit('close');
      } catch (error) {
        console.error('Error registrando usuario o personal:', error);
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
