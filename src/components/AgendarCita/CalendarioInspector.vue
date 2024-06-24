<template>
    <div class="modal show d-block" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Disponibilidad del Inspector</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <div id="calendar"></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
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
    props: ['inspectorId'],
    setup(props) {
      const calendar = ref(null);
  
      const fetchInspecciones = async () => {
        if (props.inspectorId) {
          const response = await axios.get(`/AgendarCita/InspeccionesPorInspector/${props.inspectorId}`);
          return response.data.map(inspeccion => ({
            title: 'Inspección',
            start: inspeccion.fechaHoraInicio,
            end: inspeccion.fechaHoraFinalizacion
          }));
        }
        return [];
      };
  
      const renderCalendar = async () => {
        const events = await fetchInspecciones();
        const calendarEl = document.getElementById('calendar');
        if (calendar.value) {
          calendar.value.destroy();
        }
        calendar.value = new Calendar(calendarEl, {
          plugins: [dayGridPlugin, interactionPlugin],
          initialView: 'dayGridMonth',
          events: events,
        });
        calendar.value.render();
      };
  
      watch(() => props.inspectorId, renderCalendar, { immediate: true });
  
      return {
        renderCalendar,
      };
    },
  };
  </script>
  
  <style scoped>
  .modal {
    background-color: rgba(0, 0, 0, 0.5);
  }
  #calendar {
    max-width: 900px;
    margin: 0 auto;
  }
  </style>
  