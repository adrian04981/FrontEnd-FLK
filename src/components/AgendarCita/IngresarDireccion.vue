<template>
  <div class="modal show d-block" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ingresar Dirección</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <input 
            type="text" 
            class="form-control mb-3" 
            placeholder="Ingrese la dirección" 
            v-model="address"
          />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="saveAddress">Guardar Dirección</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(props, { emit }) {
    const address = ref('');

    const saveAddress = () => {
      emit('addressSelected', address.value);
      emit('close');
    };

    return {
      address,
      saveAddress,
    };
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
