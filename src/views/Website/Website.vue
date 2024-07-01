<template>
  <div>
    <div class="navbar">
      <img :src="logoURL" alt="Vue" />
      <div id="LinkL" class="navbar-links">
        <a href="#">Inicio</a>
        <button class="btn btn-outline-light ms-2" @click="redirectToGCPDF">Verifica Aquí tu Certificado</button>
      </div>
      <div id="LinkR" class="navbar-links">
        <a href="#foot">Nosotros</a>
        <a href="Verificacion">Verificacion</a>
        <a href="/Login">Iniciar Sesion</a>
      </div>
    </div>

    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img :src="port1" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img :src="port2" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img :src="port3" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img :src="port4" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div class="content">
      <div class="section">
        <img :src="port3" alt="Imagen 1" />
        <img :src="port4" alt="Imagen 1" />
        <p>Somos especialistas en capacitación, certificación, homologación de operadores e inspección y certificación de operatividad de equipos.</p>
      </div>
    </div>
    <div class="section1">
      <img :src="ImgMid" alt="..." />
    </div>
    <div id="Titulo">
      <h1>Porque Elegirnos</h1>
    </div>
    <div class="icon-section">
      <div class="icon-box">
        <img :src="port5" alt="Imagen 1" />
        <p>Realizamos servicios directamente en tu establecimiento.</p>
      </div>
      <div class="icon-box">
        <img :src="port6" alt="Imagen 1" />
        <p>Realizamos capacitaciones 100% prácticos y especializados.</p>
      </div>
      <div class="icon-box">
        <img :src="port7" alt="Imagen 1" />
        <p>Realizamos cursos virtuales con la mejor solución tecnológica.</p>
      </div>
      <div class="icon-box">
        <img :src="port8" alt="Imagen 1" />
        <p>Realizamos certificaciones por más de 10 años la práctica correcta.</p>
      </div>
      <div class="icon-box">
        <img :src="port9" alt="Imagen 1" />
        <p>Realizamos servicios reconocidos en Latinoamérica.</p>
      </div>
      <div class="icon-box">
        <img :src="port10" alt="Imagen 1" />
        <p>Capacitaciones adaptadas a sus horarios y necesidades.</p>
      </div>
    </div>
    <div id="foot" class="footer">
      <div class="left-column">
        <img :src="Foot1" alt="Imagen 1" class="image-left" />
        <p>Contáctanos</p>
        <p>Cel: 987441447</p>
        <p>correo: operaciones@grupoflk.com</p>
      </div>
      <div class="right-column">
        <img :src="Foot2" alt="Imagen 1" class="image-right" />
        <img :src="Foot3" alt="Imagen 1" class="image-right" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import logoURL from '/src/assets/FLK_Sin_Fondo.png';
import port1 from '/src/assets/WebsiteAssets/portada-1.png';
import port2 from '/src/assets/WebsiteAssets/portada-2.png';
import port3 from '/src/assets/WebsiteAssets/portada-3.png';
import port4 from '/src/assets/WebsiteAssets/portada-4.png';
import port5 from '/src/assets/WebsiteAssets/Edificio.png';
import port6 from '/src/assets/WebsiteAssets/Montacarga.png';
import port7 from '/src/assets/WebsiteAssets/Laptop.png';
import port8 from '/src/assets/WebsiteAssets/Inteligencia.png';
import port9 from '/src/assets/WebsiteAssets/Ingeniero.png';
import port10 from '/src/assets/WebsiteAssets/Calendario.png';
import Foot1 from '/src/assets/WebsiteAssets/Sello_FLk.png';
import Foot2 from '/src/assets/WebsiteAssets/Certificacion.png';
import Foot3 from '/src/assets/WebsiteAssets/Departamentos_Peru.png';
import ImgMid from '/src/assets/WebsiteAssets/Acreditacion.png';

const showModal = ref(false);

const redirectToGCPDF = () => {
  window.location.href = 'http://localhost:5173/GCPDF';
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #000000;
  color: #fff;
  padding: 10px 300px;

  img {
    width: 6rem;
  }
}

.navbar-brand {
  font-size: 0.5rem;
  color: #fff;
  text-decoration: none;
}

#LinkL {
  margin-right: 50%;
}

.navbar-links {
  margin-left: auto;
}

.navbar-links a {
  color: #fff;
  margin-left: 15px;
  text-decoration: none;
}

.navbar-links a:hover {
  opacity: 0.8;
  color: rgb(218, 5, 5);
}

#Titulo {
  background-color: #000000;
  text-align: center;
  color: aliceblue;
}

.content {
  width: 100%;
  padding: 0;
  margin: 0;
}

.section {
  width: 100%;
  background-color: #000000;
  padding: 30px;
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 30px;
  font-family: courier;
}

.section img {
  width: 400px;
  height: 40vh;
  max-width: 100%;
  padding: 10px;
}

.section p {
  text-align: center;
  color: white;
  padding: 10px 10px;
}

.section1 {
  background-color: #3e3d3d;
  align-items: center;
}

.section1 img {
  width: 50%;
  margin: 40px;
  margin-left: 350px;
}

.icon-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: black;
  padding: 20px;
  margin: 0;
}

.icon-box {
  display: flex;
  align-items: center;
  flex: 0 0 48%;
  box-sizing: border-box;
  margin-bottom: 20px;
  background-color: black;
  padding: 20px;
  border-radius: 8px;
  margin: 10px;
}

.icon-box img {
  margin-right: 20px;
  border-radius: 8px;
}

.icon-box p {
  color: white;
  margin: 0;
}

.image-left {
  margin-top: 5%;
  width: 80%;
}

.image-right {
  margin-bottom: 50px;
}

.footer {
  background-size: cover;
  background-color: rgb(35, 35, 35);
  text-align: center;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  height: 50%;
}

.footer p {
  color: rgb(213, 213, 213);
}

.left-column,
.right-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
