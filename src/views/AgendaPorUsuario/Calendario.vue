<template>
  <div>
    <button @click="showModal = true">Abrir Modal</button>
    <UploadDocumentationModal
      :show="showModal"
      :inspectionId="1"
      @close="closeModal"
    />
  </div>
</template>

<script>
import UploadDocumentationModal from '../../components/AgendaPorUsuario/UploadDocumentationModal.vue';

export default {
  components: { UploadDocumentationModal },
  data() {
    return {
      showModal: false
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<style>
/* Puedes agregar estilos personalizados aquí */
</style>
