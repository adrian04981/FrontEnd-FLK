<template>
  <div style="display: none;">
    <iframe v-if="pdfData" :src="pdfData" width="100%" height="600px"></iframe>
  </div>
</template>

<script>
import { jsPDF } from 'jspdf';
import { backgroundImage } from '@/assets/backgroundImage.js';

export default {
  props: {
    inspeccion: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pdfData: null,
      backgroundImage: backgroundImage,
    };
  },
  methods: {
    generatePdf() {
      if (this.inspeccion && this.backgroundImage) {
        const doc = new jsPDF('p', 'mm', 'a4');

        // Añadir la imagen de fondo
        doc.addImage(this.backgroundImage, 'PNG', 0, 0, 210, 297);

        // Título
        const yOffset = 80;
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
        doc.text(String(this.inspeccion.empresaNombre || 'N/A'), 20, yOffset + 30);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Servicio:', 20, yOffset + 40);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(this.inspeccion.servicioNombre || 'N/A'), 20, yOffset + 50);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Fecha de Inspección:', 20, yOffset + 60);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(this.inspeccion.fechaInspeccion || 'N/A'), 20, yOffset + 70);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Estado:', 20, yOffset + 80);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(String(this.inspeccion.estado || 'N/A'), 20, yOffset + 90);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Observaciones y Recomendaciones:', 20, yOffset + 100);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        const obsYRec = String(this.inspeccion.observacionesYRecomendaciones || 'N/A');
        doc.text(doc.splitTextToSize(obsYRec, 170), 20, yOffset + 110);

        // Certificados
        const certificado = this.inspeccion.certificados[0];
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
        doc.line(20, yOffset + 192, 70, yOffset + 192);

        doc.text('Fecha de Emisión', 20, yOffset + 200);
        doc.line(20, yOffset + 202, 70, yOffset + 202);

        // Convertir el PDF a base64 y almacenarlo en pdfData
        this.pdfData = doc.output('datauristring');
        window.open(this.pdfData);
      } else {
        if (!this.inspeccion) console.error('No data available to generate PDF');
        if (!this.backgroundImage) console.error('Background image not loaded');
      }
    },
  },
};
</script>

<style scoped>
.mt-5 {
  margin-top: 5rem;
}
</style>
