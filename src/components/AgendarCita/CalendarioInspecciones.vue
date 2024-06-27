<template>
  <FullCalendar 
    :plugins="[dayGridPlugin, interactionPlugin]" 
    :initialView="'dayGridMonth'" 
    :events="inspecciones" 
  />
</template>

<script>
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  components: {
    FullCalendar
  },
  setup() {
    const inspecciones = ref([]);

    const fetchInspecciones = async () => {
      try {
        const response = await axios.get('/Inspecciones');
        inspecciones.value = response.data.map(inspeccion => ({
          title: `Inspección ${inspeccion.pkInspeccion}`,
          start: inspeccion.fechaHoraInicio,
          end: inspeccion.fechaHoraFinalizacion,
          extendedProps: {
            estado: inspeccion.estado,
            ubicacion: inspeccion.ubicacion
          }
        }));
      } catch (error) {
        console.error('Error al obtener las inspecciones:', error);
      }
    };

    onMounted(() => {
      fetchInspecciones();
    });

    return {
      inspecciones
    };
  }
};
</script>

<style>
@import "@fullcalendar/core/main.css";
@import "@fullcalendar/daygrid/main.css";
</style>
