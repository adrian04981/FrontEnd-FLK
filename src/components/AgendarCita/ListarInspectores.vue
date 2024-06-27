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
              <div v-for="inspector in inspectores" :key="inspector.pkInspectoresDisponibles" class="mb-2">
                <button 
                  class="btn w-100" 
                  :class="{'btn-primary': selectedInspectorId === inspector.pkInspectoresDisponibles, 'btn-outline-primary': selectedInspectorId !== inspector.pkInspectoresDisponibles}" 
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
    const calendar = ref(null);
    const selectedDate = ref(null);

    onMounted(async () => {
      const response = await axios.get(`/AgendarCita/InspectoresDisponiblesPorTipoInspeccion/${props.tipoInspeccionId}`);
      inspectores.value = response.data;
      initializeCalendar();
    });

    watch(() => selectedInspector.value, (newVal) => {
      if (newVal) {
        updateCalendarEvents();
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

    const initializeCalendar = () => {
      const calendarEl = document.getElementById('calendar');
      calendar.value = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        selectable: true,
        select: info => {
          selectedDate.value = info.startStr;
        },
        events: [],
      });
      calendar.value.render();
    };

    const updateCalendarEvents = async () => {
      const events = [];
      if (selectedInspector.value) {
        const inspectorEvents = await fetchInspecciones(selectedInspector.value.pkInspectoresDisponibles);
        events.push(...inspectorEvents);
      }

      calendar.value.removeAllEvents();
      calendar.value.addEventSource(events);
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
          const fechaYHora = new Date(selectedDate.value);
          if (selectedTurno.value === 'Mañana') {
            fechaYHora.setHours(8, 0, 0, 0);
          } else {
            fechaYHora.setHours(13, 0, 0, 0);
          }

          const formattedFechaYHora = fechaYHora.toISOString();

          const response = await axios.post('/AgendarCita/RegistrarAsignacionInspectores', {
            fkInspector: selectedInspector.value.pkInspectoresDisponibles,
            fechaYHora: formattedFechaYHora
          });
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
