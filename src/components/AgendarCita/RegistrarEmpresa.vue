<template>
  <div class="modal show d-block" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Registrar Empresa</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="ruc" class="form-label">RUC</label>
            <input type="text" class="form-control" v-model="empresa.ruc" />
          </div>
          <div class="mb-3">
            <label for="nombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" v-model="empresa.nombre" />
          </div>
          <div class="mb-3">
            <label for="razonSocial" class="form-label">Razón Social</label>
            <input type="text" class="form-control" v-model="empresa.razonSocial" />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" v-model="empresa.email" />
          </div>
          <div class="mb-3">
            <label for="direccion" class="form-label">Dirección</label>
            <input type="text" class="form-control" v-model="empresa.direccion" />
          </div>
          <div class="mb-3">
            <label for="telefono" class="form-label">Teléfono</label>
            <input type="text" class="form-control" v-model="empresa.telefono" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="registrarEmpresa">Registrar</button>
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
    const empresa = ref({
      ruc: '',
      nombre: '',
      razonSocial: '',
      email: '',
      direccion: '',
      telefono: '',
    });

    const registrarEmpresa = async () => {
      try {
        const response = await axios.post('/AgendarCita/RegistrarEmpresa', empresa.value);
        console.log('Empresa registrada:', response.data);
        emit('empresaRegistrada', response.data);
      } catch (error) {
        console.error('Error al registrar la empresa:', error);
      }
    };

    return {
      empresa,
      registrarEmpresa,
    };
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
