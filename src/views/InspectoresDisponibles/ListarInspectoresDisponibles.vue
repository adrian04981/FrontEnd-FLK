<template>
  <div class="container">
    <!-- Inspectores Disponibles Section -->
    <div class="row justify-content-center mt-5">
      <div class="col-10">
        <h2 class="text-center mb-4">Lista de Inspectores Disponibles</h2>
        <div class="text-center mb-4">
          <b-button variant="primary" @click="showModal('createInspector')">Crear Inspector</b-button>
        </div>
        <div class="fallout-data-table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" class="text-white">ID</th>
                <th scope="col" class="text-white">Usuario</th>
                <th scope="col" class="text-white">Tipo de Inspección</th>
                <th scope="col" class="text-white">Fecha de Emisión</th>
                <th scope="col" class="text-white">Fecha de Vencimiento</th>
                <th scope="col" class="text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="inspector in inspectoresDisponiblesList" :key="inspector.pkInpectoresDisponibles">
                <td>{{ inspector.pkInpectoresDisponibles }}</td>
                <td>{{ inspector.fkUsuario }}</td>
                <td>{{ inspector.fkTipoInspeccion }}</td>
                <td>{{ inspector.fechaEmisionCertificado }}</td>
                <td>{{ inspector.fechaVencimientoCertificado }}</td>
                <td>
                  <b-button variant="info" class="mr-2" @click="showModal('viewInspector', inspector)">Consultar</b-button>
                  <b-button variant="warning" class="mr-2" @click="showModal('editInspector', inspector)">Editar</b-button>
                  <b-button variant="danger" @click="showModal('deleteInspector', inspector)">Eliminar</b-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <b-modal v-if="selectedItem && modalType" v-model="showModalFlag" :title="modalTitle">
      <template v-slot:default>

      </template>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="showModalFlag = false">Cancelar</b-button>
      </template>
    </b-modal>

    <!-- Modals Editar -->
    <b-modal v-if="selectedItem && modalType" v-model="showModalFlag" :title="modalTitle">
      <template v-slot:default>
        
      </template>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="showModalFlag = false">Cancelar</b-button>
      </template>
    </b-modal>
    <!-- Modals Crear-->
    <b-modal v-if="selectedItem && modalType" v-model="showModalFlag" :title="modalTitle">
      <template v-slot:default>
        
      </template>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="showModalFlag = false">Cancelar</b-button>
      </template>
    </b-modal>
    <!-- Modals Eliminar-->
    <b-modal v-if="selectedItem && modalType" v-model="showModalFlag" :title="modalTitle">
      <template v-slot:default>
        
      </template>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="showModalFlag = false">Cancelar</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
function generateRandomId() {
  return Math.floor(10000000 + Math.random() * 90000000);
}

export default {
  name: 'Dashboard',
  data() {
    return {
      inspectoresDisponiblesList: [],
      showModalFlag: false,
      selectedItem: null,
      modalType: null,
    };
  },
  mounted() {
    this.fetchInspectoresDisponibles();
  },
  methods: {
    fetchInspectoresDisponibles() {
      this.$axios.get('https://localhost:7006/api/InspectoresDisponibles')
        .then(response => {
          this.inspectoresDisponiblesList = response.data;
        })
        .catch(error => {
          console.error('Error al cargar datos de inspectores disponibles:', error);
        });
    },
    showModal(type, item = null) {
      this.modalType = type;
      this.selectedItem = item ? { ...item } : {
        pkInpectoresDisponibles: 0,
        fkUsuario: 0,
        fkTipoInspeccion: 0,
        fechaEmisionCertificado: '',
        fechaVencimientoCertificado: '',
        certificadoPdf: null,
        firmaYselloDigital: null
      };
      this.showModalFlag = true;
    },
    handleSubmit() {
      // Implement handleSubmit function similar to existing one for users and roles
    },
    handleDelete() {
      // Implement handleDelete function similar to existing one for users and roles
    }
  },
  computed: {
    modalTitle() {
      switch (this.modalType) {
        case 'createInspector':
          return 'Crear Inspector';
        case 'editInspector':
          return 'Editar Inspector';
        case 'viewInspector':
          return 'Consultar Inspector';
        case 'deleteInspector':
          return 'Eliminar Inspector';
        default:
          return '';
      }
    }
  }
};
</script>

<style scoped>
.fallout-data-table {
  font-family: 'Roboto', sans-serif;
  color: #FFF;
  margin: 20px auto;
  padding: 20px;
  background-color: #222;
  border: 1px solid #888;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.fallout-data-table table {
  width: 100%;
  border-collapse: collapse;
}

.fallout-data-table th,
.fallout-data-table td {
  padding: 10px;
  border-bottom: 2px solid #888;
}

.fallout-data-table th {
  background-color: #111;
}

.fallout-data-table tbody tr:nth-child(even) {
  background-color: #333;
}

.fallout-data-table tbody tr:hover {
  background-color: #444;
}
</style>
