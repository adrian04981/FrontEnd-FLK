<template>
  <div class="modal show d-block" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Certificadores Disponibles</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Email</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="certificador in certificadores" :key="certificador.pkCertificadoresDisponibles">
                <td>{{ certificador.certificadorNombre }}</td>
                <td>{{ certificador.certificadorDni }}</td>
                <td>{{ certificador.certificadorEmail }}</td>
                <td>{{ certificador.certificadorDireccion }}</td>
                <td>{{ certificador.certificadorTelefono }}</td>
                <td>
                  <button class="btn btn-primary" @click="seleccionarCertificador(certificador)">Seleccionar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  props: ['fechaYHora', 'tipoInspeccionId', 'idInspectoresAsignados'],
  setup(props, { emit }) {
    const certificadores = ref([]);

    onMounted(async () => {
      const response = await axios.get(`/AgendarCita/CertificadoresDisponiblesPorFechaYTipo/${props.fechaYHora}/${props.tipoInspeccionId}/${props.idInspectoresAsignados}`);
      certificadores.value = response.data;
    });

    const seleccionarCertificador = (certificador) => {
      emit('certificadorSeleccionado', certificador);
    };

    return {
      certificadores,
      seleccionarCertificador,
    };
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
