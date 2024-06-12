<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detalles del Vehículo</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <p><strong>ID:</strong> {{ vehiculo.pkVehiculo }}</p>
            <p><strong>Fabricante:</strong> {{ vehiculo.fabricante }}</p>
            <p><strong>Modelo:</strong> {{ vehiculo.modelo }}</p>
            <p><strong>Número de Serie:</strong> {{ vehiculo.numeroSerie }}</p>
            <p><strong>Marca:</strong> {{ vehiculo.marca }}</p>
            <p><strong>Tipo de Vehículo:</strong> {{ getTipoVehiculo(vehiculo.fkTipoDeVehiculos) }}</p>
            <p><strong>Empresa:</strong> {{ getEmpresa(vehiculo.fkEmpresas) }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['vehiculoId', 'tipos', 'empresas'],
    data() {
      return {
        vehiculo: {}
      };
    },
    created() {
      this.fetchVehiculo();
    },
    methods: {
      async fetchVehiculo() {
        try {
          const response = await axios.get(`https://localhost:7006/api/Vehiculoes/${this.vehiculoId}`);
          this.vehiculo = response.data;
        } catch (error) {
          console.error('Error fetching vehiculo:', error);
        }
      },
      getTipoVehiculo(id) {
        const tipo = this.tipos.find(t => t.pkTipoDeVehiculos === id);
        return tipo ? tipo.tipoDeVehiculo1 : 'Desconocido';
      },
      getEmpresa(id) {
        const empresa = this.empresas.find(e => e.pkEmpresas === id);
        return empresa ? empresa.nombre : 'Desconocido';
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
  