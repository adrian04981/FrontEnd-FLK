<template>
  <div class="container">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Ingrese la Placa de vehiculo" v-model="marca" />
      <button @click="fetchData" class="btn btn-outline-secondary">Cargar Inspecciones</button>
    </div>
    <div class="row">
      <div v-for="inspection in inspections" :key="inspection.id" class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ inspection.servicioNombre }}</h5>
            <p class="card-text">
              <strong>Empresa:</strong> {{ inspection.empresaNombre }}<br>
              <strong>Fecha de Inspección:</strong> {{ inspection.fechaInspeccion }}<br>
              <strong>Estado:</strong> {{ inspection.estado }}
            </p>
            <button @click="generatePdf(inspection)" class="btn btn-primary">Generar PDF</button>
          </div>
        </div>
      </div>
    </div>
    <div id="pdfContainer" v-if="pdfData">
      <iframe :src="pdfData" width="100%" height="600px"></iframe>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { backgroundImage } from '@/assets/backgroundImage.js';

export default {
  data() {
    return {
      marca: '',
      inspections: [], // Para almacenar la lista de inspecciones
      backgroundImage: backgroundImage,
      pdfData: null,
    };
  },
  methods: {
    fetchData() {
      if (!this.marca) {
        alert('Por favor, ingrese una marca.');
        return;
      }
      const url = `https://localhost:7006/api/GenerarCertificado/InspeccionesPorMarca/${this.marca}`;
      axios.get(url)
        .then(response => {
          if (response.data && response.data.length > 0) {
            this.inspections = response.data;
          } else {
            this.inspections = [];
            console.error('No inspection data received');
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          this.inspections = [];
        });
    },
    generatePdf(inspection) {
      if (inspection && this.backgroundImage) {
        console.log('Generating PDF...');
        const doc = new jsPDF('p', 'mm', 'a4');

        // Añadir la imagen de fondo
        doc.addImage(this.backgroundImage, 'PNG', 0, 0, 210, 297);

        const yOffset = 60;

        // Contenido del certificado
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Empresa:', 20, yOffset + 20);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(inspection.empresaNombre || 'N/A'), 20, yOffset + 30);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Servicio:', 20, yOffset + 40);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(inspection.servicioNombre || 'N/A'), 20, yOffset + 50);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Fecha de Inspección:', 20, yOffset + 60);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(inspection.fechaInspeccion || 'N/A'), 20, yOffset + 70);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Estado:', 20, yOffset + 80);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(inspection.estado || 'N/A'), 20, yOffset + 90);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Observaciones y Recomendaciones:', 20, yOffset + 100);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(inspection.observacionesYRecomendaciones || 'N/A'), 20, yOffset + 110);

        // Certificados
        const certificado = inspection.certificados[0];
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Certificado ID:', 20, yOffset + 120);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(certificado.pkCertificadoInspeccion || 'N/A'), 20, yOffset + 130);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Fecha de Registro:', 20, yOffset + 140);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        // Formatear fecha para mostrar solo la fecha sin la hora
        const fechaRegistro = String(certificado.fechaHoraRegistroCertificacion || 'N/A').split('T')[0];
        doc.text(fechaRegistro, 20, yOffset + 150);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Fecha de Caducidad:', 20, yOffset + 160);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(certificado.fechaCaducidad || 'N/A'), 20, yOffset + 170);

        // Firma (cambiada por NombreCertificador)
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('NombreCertificador:', 20, yOffset + 180);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(inspection.nombreCertificador || 'N/A'), 20, yOffset + 190);

        // Convertir el PDF a base64 y almacenarlo en pdfData
        this.pdfData = doc.output('datauristring');
      } else {
        if (!inspection) console.error('No inspection selected to generate PDF');
        if (!this.backgroundImage) console.error('Background image not loaded');
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.input-group {
  max-width: 600px;
  margin: 0 auto 20px;
}
.card {
  margin: 10px;
}
#pdfContainer {
  margin-top: 20px;
}
</style>
