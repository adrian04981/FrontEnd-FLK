<template>
  <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Verificar Cliente</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="verificarCliente">
            <div class="mb-3">
              <label for="ruc" class="form-label">RUC</label>
              <input type="text" class="form-control" v-model="ruc" required>
            </div>
            <button type="submit" class="btn btn-primary">Verificar</button>
            <button type="button" class="btn btn-secondary" @click="registrarEmpresa">Registrar Empresa</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      ruc: ''
    };
  },
  methods: {
    async verificarCliente() {
      try {
        const response = await axios.get(`https://localhost:7006/api/Empresas/byRuc/${this.ruc}`);
        const empresa = response.data;
        if (empresa) {
          this.$emit('cliente-verificado', empresa.pkEmpresas);
        } else {
          this.$emit('cliente-no-encontrado', this.ruc);
        }
        this.$emit('close');
      } catch (error) {
        console.error('Error verificando cliente:', error);
      }
    },
    registrarEmpresa() {
      this.$emit('cliente-no-encontrado', this.ruc);
      this.$emit('close');
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
