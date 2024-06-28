<template>
  <div class="container">
    <h1>Certificado de Inspección</h1>
    <div class="mb-3">
      <input v-model="placa" @keyup.enter="fetchCertificado" class="form-control" type="text" placeholder="Ingresa la placa" />
      <button @click="fetchCertificado" class="btn btn-primary mt-2">Buscar</button>
    </div>
    <div v-if="certificado">
      <button @click="generatePdf" class="btn btn-primary">Generar PDF</button>
      <div id="pdfContainer" v-if="pdfData">
        <iframe :src="pdfData" width="100%" height="600px"></iframe>
        <button @click="printPdf" class="btn btn-secondary">Imprimir</button>
        <button @click="downloadPdf" class="btn btn-success">Descargar como PDF</button>
      </div>
    </div>
    <div v-else>
      <p>Documento en Proceso</p>
    </div>
  </div>
</template>

<script>
import { jsPDF } from 'jspdf';
import { backgroundImage } from '@/assets/backgroundImage.js';

export default {
  data() {
    return {
      placa: '',
      certificado: null,
      backgroundImage: backgroundImage,
      pdfData: null
    };
  },
  methods: {
    fetchCertificado() {
      if (!this.placa) {
        alert('Por favor ingresa una placa');
        return;
      }

      fetch(`https://localhost:7006/api/GenerarCertificado/InspeccionesPorPlaca/${this.placa}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0) {
            this.certificado = data[0];
          } else {
            this.certificado = null;
          }
        })
        .catch(error => {
          console.error('Error fetching certificado:', error);
        });
    },
    generatePdf() {
      if (this.certificado && this.backgroundImage) {
        const doc = new jsPDF('p', 'mm', 'a4');
        doc.addImage(this.backgroundImage, 'PNG', 0, 0, 210, 297);

        const yOffset = 60;

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Empresa:', 20, yOffset + 20);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(this.certificado.empresaNombre, 20, yOffset + 30);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Servicio:', 20, yOffset + 40);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(this.certificado.servicioNombre, 20, yOffset + 50);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Fecha de Inspección:', 20, yOffset + 60);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(this.certificado.fechaInspeccion, 20, yOffset + 70);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Estado:', 20, yOffset + 80);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(this.certificado.estado, 20, yOffset + 90);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Observaciones y Recomendaciones:', 20, yOffset + 100);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(this.certificado.observacionesYRecomendaciones || 'N/A', 20, yOffset + 110);

        const certificado = this.certificado.certificados[0];
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Certificado ID:', 20, yOffset + 120);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(`${certificado.pkCertificadoInspeccion}`, 20, yOffset + 130);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Fecha de Registro:', 20, yOffset + 140);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(certificado.fechaHoraRegistroCertificacion, 20, yOffset + 150);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Fecha de Caducidad:', 20, yOffset + 160);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(certificado.fechaCaducidad, 20, yOffset + 170);

        doc.setLineWidth(0.5);
        doc.line(20, yOffset + 180, 190, yOffset + 180);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Firma del Inspector', 20, yOffset + 190);
        doc.line(20, yOffset + 192, 70, yOffset + 192);

        this.pdfData = doc.output('datauristring');
      } else {
        if (!this.certificado) console.error('No data available to generate PDF');
        if (!this.backgroundImage) console.error('Background image not loaded');
      }
    },
    printPdf() {
      if (this.pdfData) {
        const win = window.open();
        win.document.write('<iframe src="' + this.pdfData + '" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>');
        win.document.close();
        win.print();
      }
    },
    downloadPdf() {
      if (this.pdfData) {
        const link = document.createElement('a');
        link.href = this.pdfData;
        link.download = 'Certificado_Inspeccion.pdf';
        link.click();
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
#pdfContainer {
  margin-top: 20px;
}
</style>
