<template>
  <div class="modal show d-block" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Inspectores Disponibles</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h6>Seleccione Inspector:</h6>
              <div v-for="inspector in inspectores" :key="inspector.pkInpectoresDisponibles" class="mb-2">
                <button 
                  class="btn w-100" 
                  :class="{'btn-primary': selectedInspectorId === inspector.pkInpectoresDisponibles, 'btn-outline-primary': selectedInspectorId !== inspector.pkInpectoresDisponibles}" 
                  @click="selectInspector(inspector)">
                  {{ inspector.nombreInspector }}
                </button>
              </div>
            </div>
            <div class="col-md-8">
              <div id="calendar"></div>
              <div v-if="selectedDate">
                <h6>Seleccione Turno:</h6>
                <button 
                  class="btn w-100 mb-2" 
                  :class="{'btn-primary': selectedTurno === 'Mañana', 'btn-outline-secondary': selectedTurno !== 'Mañana'}" 
                  @click="selectTurno('Mañana')">
                  Turno Mañana 8:00 - 12:00
                </button>
                <button 
                  class="btn w-100" 
                  :class="{'btn-primary': selectedTurno === 'Tarde', 'btn-outline-secondary': selectedTurno !== 'Tarde'}" 
                  @click="selectTurno('Tarde')">
                  Turno Tarde 13:00 - 18:00
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
          <button type="button" class="btn btn-primary" @click="registrarAsignacionInspector">Seleccionar Inspector</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  props: ['tipoInspeccionId'],
  setup(props, { emit }) {
    const inspectores = ref([]);
    const selectedInspector = ref(null);
    const selectedTurno = ref(null);
    const inspecciones = ref([]);
    const calendar = ref(null);
    const selectedDate = ref(null);

    onMounted(async () => {
      const response = await axios.get(`/AgendarCita/InspectoresDisponiblesPorTipoInspeccion/${props.tipoInspeccionId}`);
      inspectores.value = response.data;
    });

    watch(() => selectedInspector.value, (newVal) => {
      if (newVal) {
        updateCalendar();
      }
    });

    const fetchInspecciones = async (inspectorId) => {
      const response = await axios.get(`/AgendarCita/InspeccionesPorInspector/${inspectorId}`);
      return response.data.map(inspeccion => ({
        title: 'Inspección',
        start: inspeccion.fechaHoraInicio,
        end: inspeccion.fechaHoraFinalizacion
      }));
    };

    const updateCalendar = async () => {
      if (calendar.value) {
        calendar.value.destroy();
      }

      const events = [];
      if (selectedInspector.value) {
        const inspectorEvents = await fetchInspecciones(selectedInspector.value.pkInpectoresDisponibles);
        events.push(...inspectorEvents);
      }

      const calendarEl = document.getElementById('calendar');
      calendar.value = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        selectable: true,
        select: info => {
          selectedDate.value = info.startStr;
        },
        events: events,
      });
      calendar.value.render();
    };

    const selectInspector = (inspector) => {
      selectedInspector.value = inspector;
    };

    const selectTurno = (turno) => {
      selectedTurno.value = turno;
    };

    const registrarAsignacionInspector = async () => {
      if (selectedInspector.value && selectedTurno.value && selectedDate.value) {
        try {
          // Construir fecha y hora correcta según el turno
          const fechaYHora = new Date(selectedDate.value);
          if (selectedTurno.value === 'Mañana') {
            fechaYHora.setHours(8, 0, 0, 0);
          } else {
            fechaYHora.setHours(13, 0, 0, 0);
          }

          const formattedFechaYHora = fechaYHora.toISOString();

          const response = await axios.post('/AgendarCita/RegistrarAsignacionInspectores', {
            fkInspector: selectedInspector.value.pkInpectoresDisponibles,
          });
          console.log('Asignación registrada:', response.data);
          emit('turnSelected', { fechaYHora: formattedFechaYHora, turno: selectedTurno.value, idInspectoresAsignados: response.data.pkAsignacionId });
          emit('close');
        } catch (error) {
          console.error('Error al registrar la asignación:', error);
        }
      } else {
        alert('Seleccione un inspector, una fecha y un turno.');
      }
    };

    return {
      inspectores,
      selectedInspector,
      selectedDate,
      selectedTurno,
      updateCalendar,
      selectInspector,
      selectTurno,
      registrarAsignacionInspector,
    };
  },
};
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}
#calendar {
  max-width: 100%;
  margin: 0 auto;
}
</style>
