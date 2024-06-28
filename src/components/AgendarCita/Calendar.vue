<template>
  <div>
    <h2>Listado de Inspecciones</h2>

    <!-- Listado de inspecciones -->
    <ul>
      <li v-for="inspeccion in inspecciones" :key="inspeccion.pkInspeccion">
        <p><strong>Fecha de inicio:</strong> {{ inspeccion.fechaHoraInicio }}</p>
        <p><strong>Fecha de finalización:</strong> {{ inspeccion.fechaHoraFinalizacion }}</p>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inspecciones: [
        {
          pkInspeccion: 1,
          fechaHoraInicio: '2024-06-22T18:00:00',
          fechaHoraFinalizacion: '2024-06-22T23:00:00'
        },
        {
          pkInspeccion: 2,
          fechaHoraInicio: '2024-06-26T13:00:00',
          fechaHoraFinalizacion: '2024-06-26T17:00:00'
        },
        {
          pkInspeccion: 3,
          fechaHoraInicio: '2024-06-09T13:00:00',
          fechaHoraFinalizacion: '2024-06-09T17:00:00'
        }
      ]
    };
  }
};
</script>

<style>
/* Estilos opcionales para el componente */
</style>
