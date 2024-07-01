<template>
  <div class="container">
    <h1>Certificado de Inspección</h1>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Ingrese la marca" v-model="marca" />
      <button @click="fetchData" class="btn btn-outline-secondary">Cargar Inspecciones</button>
    </div>
    <button @click="generatePdf" class="btn btn-primary" :disabled="!inspectionData">Generar PDF</button>
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
      marca: '', // Para almacenar la marca ingresada
      inspectionData: null,
      backgroundImage: backgroundImage, // Usar la imagen importada
      pdfData: null // Para almacenar el PDF en base64
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
            this.inspectionData = response.data[0]; // Asumiendo que solo hay un objeto en el array
            console.log('Inspection Data:', this.inspectionData);
          } else {
            this.inspectionData = null;
            console.error('No inspection data received');
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          this.inspectionData = null;
        });
    },
    generatePdf() {
      if (this.inspectionData && this.backgroundImage) {
        console.log('Generating PDF...');
        const doc = new jsPDF('p', 'mm', 'a4');

        // Añadir la imagen de fondo
        doc.addImage(this.backgroundImage, 'PNG', 0, 0, 210, 297); // A4 size (210mm x 297mm)

        // Título
        const yOffset = 80; // Desplazamiento inicial del texto
        doc.setFontSize(22);
        doc.text('Certificado de Inspección', 105, yOffset, { align: 'center' });

        // Línea de separación
        doc.setLineWidth(0.5);
        doc.line(20, yOffset + 10, 190, yOffset + 10);

        // Contenido del certificado
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Empresa:', 20, yOffset + 20);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(this.inspectionData.empresaNombre || 'N/A'), 20, yOffset + 30);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Servicio:', 20, yOffset + 40);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(this.inspectionData.servicioNombre || 'N/A'), 20, yOffset + 50);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Fecha de Inspección:', 20, yOffset + 60);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(this.inspectionData.fechaInspeccion || 'N/A'), 20, yOffset + 70);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Estado:', 20, yOffset + 80);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(this.inspectionData.estado || 'N/A'), 20, yOffset + 90);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Observaciones y Recomendaciones:', 20, yOffset + 100);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(this.inspectionData.observacionesYRecomendaciones || 'N/A'), 20, yOffset + 110);

        // Certificados
        const certificado = this.inspectionData.certificados[0];
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
        doc.text(String(certificado.fechaHoraRegistroCertificacion || 'N/A'), 20, yOffset + 150);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Fecha de Caducidad:', 20, yOffset + 160);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(certificado.fechaCaducidad || 'N/A'), 20, yOffset + 170);

        // Línea de separación
        doc.setLineWidth(0.5);
        doc.line(20, yOffset + 180, 190, yOffset + 180);

        // Firma
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Firma del Inspector', 20, yOffset + 190);
        doc.line(20, yOffset + 192, 70, yOffset + 192); // Línea para la firma

        doc.text('Fecha de Emisión', 20, yOffset + 200);
        doc.line(20, yOffset + 202, 70, yOffset + 202); // Línea para la fecha

        // Convertir el PDF a base64 y almacenarlo en pdfData
        this.pdfData = doc.output('datauristring');
      } else {
        if (!this.inspectionData) console.error('No data available to generate PDF');
        if (!this.backgroundImage) console.error('Background image not loaded');
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}
.input-group {
  max-width: 600px;
  margin: 0 auto 20px;
}
#pdfContainer {
  margin-top: 20px;
}
</style>
