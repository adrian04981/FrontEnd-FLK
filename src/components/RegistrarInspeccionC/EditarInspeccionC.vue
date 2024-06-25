<template>
  <b-modal ref="modal" title="Editar Inspección" @hide="cerrarModal">
    <div>
      <label for="estado">Estado:</label>
      <input v-model="inspeccion.estado" type="text" class="form-control mb-2" id="estado">

      <label for="documentacion">Documentación:</label>
      <textarea v-model="inspeccion.documentacion" class="form-control" id="documentacion"></textarea>
    </div>
    <template v-slot:modal-footer>
      <button @click="guardarCambios" class="btn btn-primary">Guardar</button>
    </template>
  </b-modal>
</template>

<script>
export default {
  name: 'EditarInspeccion',
  props: {
    inspeccion: Object
  },
  methods: {
    cerrarModal() {
      this.$emit('cerrar');
    },
    async guardarCambios() {
      try {
        await this.$emit('guardar', this.inspeccion);
        this.$refs.modal.hide();
        alert('Inspección actualizada con éxito');
      } catch (error) {
        console.error('Error al actualizar la inspección:', error);
        alert('Error al actualizar la inspección');
      }
    },
    show() {
      this.$refs.modal.show();
    }
  }
};
</script>

<style scoped>
/* Añadir estilos personalizados si es necesario */
</style>
