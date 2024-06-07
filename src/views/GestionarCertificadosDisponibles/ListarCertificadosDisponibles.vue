<template>
    <div class="container">
      <!-- Lista de Certificados -->
      <div class="row justify-content-center mt-5">
        <div class="col-10">
          <h2 class="text-center mb-4">Lista de Certificados Disponibles</h2>
          <div class="text-center mb-4">
            <b-button @click="showCreateModal = true" class="btn btn-primary">Crear Certificado</b-button>
          </div>
          <div class="fallout-data-table">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="text-white">#</th>
                  <th scope="col" class="text-white">fkUsuario</th>
                  <th scope="col" class="text-white">fkTipoInspeccion</th>
                  <th scope="col" class="text-white">Fecha de Emisión</th>
                  <th scope="col" class="text-white">Fecha de Vencimiento</th>
                  <th scope="col" class="text-white">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="certificadod in certificadoList" :key="certificadod.pkCertificadoresDisponibles">
                  <td>{{ certificadod.pkCertificadoresDisponibles }}</td>
                  <td>{{ certificadod.fkUsuario }}</td>
                  <td>{{ certificadod.fkTipoInspeccion }}</td>
                  <td>{{ certificadod.fechaEmisionCertificado }}</td>
                  <td>{{ certificadod.fechaVencimientoCertificado }}</td>
                  <td>
                    <b-button @click="showCertificado(certificadod)" variant="info">Consultar</b-button>
                    <b-button @click="editCertificado(certificadod)" variant="warning" class="mr-2">Editar</b-button>
                    <b-button @click="confirmDeleteCertificado(certificadod)" variant="danger">Eliminar</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <!-- Modal para Consultar Certificado -->
      <b-modal v-if="selectedCertificado" v-model="showModal" title="Consultar Certificado" @hide="clearSelectedCertificado">
        <div>
          <p><strong>#:</strong> {{ selectedCertificado.pkCertificadoresDisponibles }}</p>
          <p><strong>Usuario:</strong> {{ selectedCertificado.fkUsuario }}</p>
          <p><strong>Tipo Inspección:</strong> {{ selectedCertificado.fkTipoInspeccion }}</p>
          <p><strong>Fecha de Emisión:</strong> {{ selectedCertificado.fechaEmisionCertificado }}</p>
          <p><strong>Fecha de Vencimiento:</strong> {{ selectedCertificado.fechaVencimientoCertificado }}</p>
          <p><strong>Certificado PDF:</strong> {{ selectedCertificado.certificadoPdf }}</p>
          <p><strong>Firma y Sello:</strong> {{ selectedCertificado.firmaYselloDigital }}</p>
        </div>
      </b-modal>
  
      <!-- Modal para Editar Certificado -->
      <b-modal v-if="editCertificadoData" v-model="showEditModal" title="Editar Certificado" @hide="clearEditCertificado">
        <div>
          <b-form @submit.prevent="updateCertificado">
            <b-form-group label="Usuario:" label-for="edit-usuario">
              <b-form-input id="edit-usuario" v-model="editCertificadoData.fkUsuario" required></b-form-input>
            </b-form-group>
  
            <b-form-group label="Tipo Inspección:" label-for="edit-tipoInspeccion">
              <b-form-input id="edit-tipoInspeccion" v-model="editCertificadoData.fkTipoInspeccion" required></b-form-input>
            </b-form-group>
  
            <b-form-group label="Fecha de Emisión:" label-for="edit-fechaEmision">
              <b-form-input id="edit-fechaEmision" v-model="editCertificadoData.fechaEmisionCertificado" required></b-form-input>
            </b-form-group>
  
            <b-form-group label="Fecha de Vencimiento:" label-for="edit-fechaVencimiento">
              <b-form-input id="edit-fechaVencimiento" v-model="editCertificadoData.fechaVencimientoCertificado" required></b-form-input>
            </b-form-group>
  
            <b-form-group label="Certificado PDF:" label-for="edit-certificadoPdf">
              <b-form-input id="edit-certificadoPdf" v-model="editCertificadoData.certificadoPdf"></b-form-input>
            </b-form-group>
  
            <b-form-group label="Firma y Sello:" label-for="edit-firmaYselloDigital">
              <b-form-input id="edit-firmaYselloDigital" v-model="editCertificadoData.firmaYselloDigital"></b-form-input>
            </b-form-group>
  
            <b-button type="submit" variant="success">Guardar</b-button>
          </b-form>
        </div>
      </b-modal>
  
      <!-- Modal para Crear Certificado -->
      <b-modal v-model="showCreateModal" title="Crear Certificado" @hide="clearCreateCertificado">
        <div>
          <b-form @submit.prevent="createCertificado">
            <b-form-group label="Usuario:" label-for="create-usuario">
              <b-form-input id="create-usuario" v-model="newCertificado.fkUsuario" required></b-form-input>
            </b-form-group>
  
            <b-form-group label="Tipo Inspección:" label-for="create-tipoInspeccion">
              <b-form-input id="create-tipoInspeccion" v-model="newCertificado.fkTipoInspeccion" required></b-form-input>
            </b-form-group>
  
            <b-form-group label="Fecha de Emisión:" label-for="create-fechaEmision">
              <b-form-input id="create-fechaEmision" v-model="newCertificado.fechaEmisionCertificado" required></b-form-input>
            </b-form-group>
  
            <b-form-group label="Fecha de Vencimiento:" label-for="create-fechaVencimiento">
              <b-form-input id="create-fechaVencimiento" v-model="newCertificado.fechaVencimientoCertificado" required></b-form-input>
            </b-form-group>
  
            <b-form-group label="Certificado PDF:" label-for="create-certificadoPdf">
              <b-form-input id="create-certificadoPdf" v-model="newCertificado.certificadoPdf"></b-form-input>
            </b-form-group>
  
            <b-form-group label="Firma y Sello:" label-for="create-firmaYselloDigital">
              <b-form-input id="create-firmaYselloDigital" v-model="newCertificado.firmaYselloDigital"></b-form-input>
            </b-form-group>
  
            <b-button type="submit" variant="success">Crear</b-button>
          </b-form>
        </div>
      </b-modal>
  
      <!-- Modal para Confirmar Eliminación -->
      <b-modal v-if="deleteCertificadoData" v-model="showDeleteModal" title="Confirmar Eliminación" @hide="clearDeleteCertificado">
        <div>
          <p>¿Está seguro de que desea eliminar el certificado de {{ deleteCertificadoData.fkUsuario }}?</p>
          <b-button @click="deleteCertificado" variant="danger">Sí</b-button>
          <b-button @click="showDeleteModal = false" variant="secondary">No</b-button>
        </div>
      </b-modal>
  
      <!-- Modal para Mensaje de Eliminación Exitosa -->
      <b-modal v-model="showSuccessModal" title="Eliminación Exitosa" @hide="clearSuccessModal">
        <div>
          <p>El certificado fue correctamente eliminado</p>
          <b-button @click="showSuccessModal = false" variant="primary">Cerrar</b-button>
        </div>
      </b-modal>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Dashboard',
    data() {
      return {
        certificadoList: [],
        showModal: false,
        showEditModal: false,
        showCreateModal: false,
        showDeleteModal: false,
        showSuccessModal: false,
        selectedCertificado: null,
        editCertificadoData: null,
        deleteCertificadoData: null,
        newCertificado: {
          fkUsuario: '',
          fkTipoInspeccion: '',
          fechaEmisionCertificado: '',
          fechaVencimientoCertificado: '',
          certificadoPdf: null,
          firmaYselloDigital: null
        }
      };
    },
    mounted() {
      this.fetchCertificados();
    },
    methods: {
      fetchCertificados() {
        axios.get('https://localhost:7006/api/CertificadoresDisponibles')
          .then(response => {
            this.certificadoList = response.data;
          })
          .catch(error => {
            console.error('Error al cargar datos de certificados:', error);
          });
      },
      showCertificado(certificadod) {
        axios.get(`https://localhost:7006/api/CertificadoresDisponibles/${certificadod.pkCertificadoresDisponibles}`)
          .then(response => {
            this.selectedCertificado = response.data;
            this.showModal = true;
          })
          .catch(error => {
            console.error('Error al cargar datos del certificado:', error);
          });
      },
      editCertificado(certificadod) {
        this.editCertificadoData = { ...certificadod };
        this.showEditModal = true;
      },
      updateCertificado() {
        axios.put(`https://localhost:7006/api/CertificadoresDisponibles/${this.editCertificadoData.pkCertificadoresDisponibles}`, this.editCertificadoData)
          .then(response => {
            this.showEditModal = false;
            this.fetchCertificados();
          })
          .catch(error => {
            console.error('Error al actualizar certificado:', error);
          });
      },
      createCertificado() {
        axios.post('https://localhost:7006/api/CertificadoresDisponibles', this.newCertificado)
          .then(response => {
            this.showCreateModal = false;
            this.fetchCertificados();
            this.clearCreateCertificado();
          })
          .catch(error => {
            console.error('Error al crear certificado:', error);
          });
      },
      confirmDeleteCertificado(certificadod) {
        this.deleteCertificadoData = certificadod;
        this.showDeleteModal = true;
      },
      deleteCertificado() {
        axios.delete(`https://localhost:7006/api/CertificadoresDisponibles/${this.deleteCertificadoData.pkCertificadoresDisponibles}`)
          .then(response => {
            this.showDeleteModal = false;
            this.showSuccessModal = true;
            this.fetchCertificados();
          })
          .catch(error => {
            console.error('Error al eliminar certificado:', error);
          });
      },
      clearSelectedCertificado() {
        this.selectedCertificado = null;
      },
      clearEditCertificado() {
        this.editCertificadoData = null;
      },
      clearCreateCertificado() {
        this.newCertificado = {
          fkUsuario: '',
          fkTipoInspeccion: '',
          fechaEmisionCertificado: '',
          fechaVencimientoCertificado: '',
          certificadoPdf: null,
          firmaYselloDigital: null
        };
      },
      clearDeleteCertificado() {
        this.deleteCertificadoData = null;
      },
      clearSuccessModal() {
        this.showSuccessModal = false;
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
  