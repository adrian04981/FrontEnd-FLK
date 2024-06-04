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
                    <b-button variant="info" class="mr-2" @click="fetchInspector(inspector.pkInpectoresDisponibles)">Consultar</b-button>
                    <b-button variant="warning" class="mr-2" @click="showModal('editInspector', inspector)">Editar</b-button>
                    <b-button variant="danger" @click="showModal('deleteInspector', inspector)">Eliminar</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <!-- Modal -->
      <b-modal v-if="selectedItem && modalType" v-model="showModalFlag" :title="modalTitle">
        <template v-slot:default>
          <div v-if="modalType === 'viewInspector' || modalType === 'editInspector'">
            <b-form @submit.prevent="modalType === 'editInspector' ? handleSubmit() : null">
              <b-form-group label="ID:" label-for="inspectorId">
                <b-form-input id="inspectorId" v-model="selectedItem.pkInpectoresDisponibles" readonly></b-form-input>
              </b-form-group>
              <b-form-group label="Usuario:" label-for="inspectorUsuario">
                <b-form-input id="inspectorUsuario" v-model="selectedItem.fkUsuario" :readonly="modalType === 'viewInspector'"></b-form-input>
              </b-form-group>
              <b-form-group label="Tipo de Inspección:" label-for="inspectorTipoInspeccion">
                <b-form-input id="inspectorTipoInspeccion" v-model="selectedItem.fkTipoInspeccion" :readonly="modalType === 'viewInspector'"></b-form-input>
              </b-form-group>
              <b-form-group label="Fecha de Emisión:" label-for="inspectorFechaEmision">
                <b-form-input id="inspectorFechaEmision" type="date" v-model="selectedItem.fechaEmisionCertificado" :readonly="modalType === 'viewInspector'"></b-form-input>
              </b-form-group>
              <b-form-group label="Fecha de Vencimiento:" label-for="inspectorFechaVencimiento">
                <b-form-input id="inspectorFechaVencimiento" type="date" v-model="selectedItem.fechaVencimientoCertificado" :readonly="modalType === 'viewInspector'"></b-form-input>
              </b-form-group>
              <div v-if="modalType === 'editInspector'">
                <b-button type="submit" variant="primary">Guardar</b-button>
              </div>
            </b-form>
          </div>
  
          <div v-else-if="modalType === 'createInspector'">
            <b-form @submit.prevent="handleSubmit()">
              <b-form-group label="Usuario:" label-for="newInspectorUsuario">
                <b-form-input id="newInspectorUsuario" v-model="selectedItem.fkUsuario" required></b-form-input>
              </b-form-group>
              <b-form-group label="Tipo de Inspección:" label-for="newInspectorTipoInspeccion">
                <b-form-input id="newInspectorTipoInspeccion" v-model="selectedItem.fkTipoInspeccion" required></b-form-input>
              </b-form-group>
              <b-form-group label="Fecha de Emisión:" label-for="newInspectorFechaEmision">
                <b-form-input id="newInspectorFechaEmision" type="date" v-model="selectedItem.fechaEmisionCertificado" required></b-form-input>
              </b-form-group>
              <b-form-group label="Fecha de Vencimiento:" label-for="newInspectorFechaVencimiento">
                <b-form-input id="newInspectorFechaVencimiento" type="date" v-model="selectedItem.fechaVencimientoCertificado" required></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary">Crear</b-button>
            </b-form>
          </div>
  
          <div v-else-if="modalType === 'deleteInspector'">
            <p>¿Está seguro de que desea eliminar este inspector?</p>
            <b-button variant="danger" @click="handleDelete()">Eliminar</b-button>
          </div>
        </template>
        <template v-slot:modal-footer>
          <b-button variant="secondary" @click="showModalFlag = false">Cancelar</b-button>
        </template>
      </b-modal>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Dashboard',
    data() {
      return {
        inspectoresDisponiblesList: [],
        showModalFlag: false,
        selectedItem: null,
        modalType: null,
        consultaId: '',
      };
    },
    mounted() {
      this.fetchInspectoresDisponibles();
    },
    methods: {
      fetchInspectoresDisponibles() {
        axios.get('https://localhost:7006/api/InspectoresDisponibles')
          .then(response => {
            this.inspectoresDisponiblesList = response.data;
          })
          .catch(error => {
            console.error('Error al cargar datos de inspectores disponibles:', error);
          });
      },
      fetchInspector(id) {
        axios.get(`https://localhost:7006/api/InspectoresDisponibles/${id}`)
          .then(response => {
            this.selectedItem = response.data;
            this.showModalFlag = true;
            this.modalType = 'viewInspector';
          })
          .catch(error => {
            console.error('Error al consultar inspector:', error);
            alert('Error al consultar inspector');
          });
      },
      showModal(type, item = null) {
        this.modalType = type;
        if (item) {
          this.selectedItem = { ...item };
        } else {
          this.selectedItem = {
            pkInpectoresDisponibles: null,
            fkUsuario: '',
            fkTipoInspeccion: '',
            fechaEmisionCertificado: '',
            fechaVencimientoCertificado: '',
            certificadoPdf: null,
            firmaYselloDigital: null,
          };
        }
        this.showModalFlag = true;
      },
      handleSubmit() {
        if (this.modalType === 'createInspector') {
          axios.post('https://localhost:7006/api/InspectoresDisponibles', this.selectedItem)
            .then(response => {
              this.inspectoresDisponiblesList.push(response.data);
              this.showModalFlag = false;
            })
            .catch(error => {
              console.error('Error al crear inspector:', error);
            });
        } else if (this.modalType === 'editInspector') {
          axios.put(`https://localhost:7006/api/InspectoresDisponibles/${this.selectedItem.pkInpectoresDisponibles}`, this.selectedItem)
            .then(() => {
              const index = this.inspectoresDisponiblesList.findIndex(inspector => inspector.pkInpectoresDisponibles === this.selectedItem.pkInpectoresDisponibles);
              this.$set(this.inspectoresDisponiblesList, index, this.selectedItem);
              this.showModalFlag = false;
            })
            .catch(error => {
              console.error('Error al editar inspector:', error);
            });
        }
      },
      handleDelete() {
        axios.delete(`https://localhost:7006/api/InspectoresDisponibles/${this.selectedItem.pkInpectoresDisponibles}`)
          .then(() => {
            this.inspectoresDisponiblesList = this.inspectoresDisponiblesList.filter(inspector => inspector.pkInpectoresDisponibles !== this.selectedItem.pkInpectoresDisponibles);
            this.showModalFlag = false;
          })
          .catch(error => {
            console.error('Error al eliminar inspector:', error);
          });
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
  