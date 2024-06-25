<template>
    <div>
      <p><strong>#:</strong> {{ inspeccion.pkInspeccion }}</p>
      <p><strong>Servicio:</strong> {{ inspeccion.fkServicio }}</p>
      <p><strong>Empresas:</strong> {{ inspeccion.fkEmpresas }}</p>
      <p><strong>Tipo de Inspección:</strong> {{ inspeccion.fkTipoInspeccion }}</p>
      <p><strong>Inspectores Asignados:</strong> {{ inspeccion.fkInspectoresAsignados }}</p>
      <p><strong>Fecha Inspección:</strong> {{ inspeccion.fechaInspeccion }}</p>
      <p><strong>Ubicación:</strong> {{ inspeccion.ubicacion }}</p>
      <p><strong>Documentación:</strong> {{ inspeccion.documentacion }}</p>
      <p><strong>Estado:</strong> {{ inspeccion.estado }}</p>
      <p><strong>Vehículo:</strong> {{ inspeccion.fkVehiculo }}</p>
      <p><strong>Observaciones y Recomendaciones:</strong> {{ inspeccion.observacionesYRecomendaciones }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      inspeccion: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  