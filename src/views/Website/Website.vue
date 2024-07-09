<template>
  <div>
    <nav class="navbar">
      <img :src="logoURL" alt="Vue Logo" class="logo" />
      <div class="navbar-links">
        <a href="#">Inicio</a>
        <button class="btn btn-outline-light ms-2" @click="redirectToGCPDF">Verifica tu Certificado</button>
      </div>
      <div class="navbar-links">
        <a href="#foot">Nosotros</a>
        <a href="/Login">Iniciar Sesión</a>
      </div>
    </nav>

    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img :src="port1" class="d-block w-100" alt="Slide 1">
        </div>
        <div class="carousel-item">
          <img :src="port2" class="d-block w-100" alt="Slide 2">
        </div>
        <div class="carousel-item">
          <img :src="port3" class="d-block w-100" alt="Slide 3">
        </div>
        <div class="carousel-item">
          <img :src="port4" class="d-block w-100" alt="Slide 4">
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

    <section class="content">
      <div class="section">
        <img :src="port3" alt="Imagen 1" />
        <img :src="port4" alt="Imagen 2" />
        <p>Somos especialistas en capacitación, certificación, homologación de operadores e inspección y certificación de operatividad de equipos.</p>
      </div>
    </section>

    <section class="section1">
      <img :src="ImgMid" alt="Imagen Media" />
    </section>

    <div id="Titulo">
      <h1>¿Por qué Elegirnos?</h1>
    </div>

    <section class="icon-section">
      <div class="icon-box" v-for="(image, index) in iconImages" :key="index">
        <img :src="image.src" :alt="image.alt" />
        <p>{{ image.text }}</p>
      </div>
    </section>

    <footer id="foot" class="footer">
      <div class="left-column">
        <img :src="Foot1" alt="Logo FLK" class="image-left" />
        <p>Contáctanos</p>
        <p>Cel: 987441447</p>
        <p>Correo: operaciones@grupoflk.com</p>
      </div>
      <div class="right-column">
        <img :src="Foot2" alt="Certificación" class="image-right" />
        <img :src="Foot3" alt="Departamentos Perú" class="image-right" />
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import logoURL from '/src/assets/FLK_Sin_Fondo.png';
import port1 from '/src/assets/WebsiteAssets/portada-1.png';
import port2 from '/src/assets/WebsiteAssets/portada-2.png';
import port3 from '/src/assets/WebsiteAssets/portada-3.png';
import port4 from '/src/assets/WebsiteAssets/portada-4.png';
import ImgMid from '/src/assets/WebsiteAssets/Acreditacion.png';
import Foot1 from '/src/assets/WebsiteAssets/Sello_FLk.png';
import Foot2 from '/src/assets/WebsiteAssets/Certificacion.png';
import Foot3 from '/src/assets/WebsiteAssets/Departamentos_Peru.png';

const redirectToGCPDF = () => {
  window.location.href = 'http://localhost:5173/GCPDF';
};

const iconImages = ref([
  { src: '/src/assets/WebsiteAssets/Edificio.png', alt: 'Edificio', text: 'Realizamos servicios directamente en tu establecimiento.' },
  { src: '/src/assets/WebsiteAssets/Montacarga.png', alt: 'Montacarga', text: 'Realizamos capacitaciones 100% prácticas y especializadas.' },
  { src: '/src/assets/WebsiteAssets/Laptop.png', alt: 'Laptop', text: 'Realizamos cursos virtuales con la mejor solución tecnológica.' },
  { src: '/src/assets/WebsiteAssets/Inteligencia.png', alt: 'Inteligencia', text: 'Realizamos certificaciones por más de 10 años la práctica correcta.' },
  { src: '/src/assets/WebsiteAssets/Ingeniero.png', alt: 'Ingeniero', text: 'Realizamos servicios reconocidos en Latinoamérica.' },
  { src: '/src/assets/WebsiteAssets/Calendario.png', alt: 'Calendario', text: 'Capacitaciones adaptadas a sus horarios y necesidades.' },
]);
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  .logo {
    width: 6rem;
  }

  .navbar-links {
    display: flex;
    align-items: center;

    a, button {
      color: #fff;
      margin-left: 15px;
      text-decoration: none;
    }

    a:hover, button:hover {
      opacity: 0.8;
      color: #da0505;
    }
  }
}

#Titulo {
  background-color: #000;
  text-align: center;
  color: #fff;
  padding: 20px 0;
}

.content {
  width: 100%;
  padding: 0;
  margin: 0;
}

.section {
  width: 100%;
  background-color: #000;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;
  font-family: Courier, monospace;
  color: #fff;

  img {
    width: 100%;
    max-width: 400px;
    height: auto;
    padding: 10px;
  }

  p {
    text-align: center;
    padding: 10px;
  }
}

.section1 {
  background-color: #3e3d3d;
  display: flex;
  justify-content: center;
  padding: 20px;

  img {
    width: 100%;
    max-width: 500px;
    margin: 20px;
  }
}

.icon-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #000;
  padding: 20px;
  margin: 0;

  .icon-box {
    display: flex;
    align-items: center;
    width: calc(50% - 20px);
    margin: 10px;
    background-color: #333;
    padding: 20px;
    border-radius: 8px;
    color: #fff;

    img {
      margin-right: 20px;
      border-radius: 8px;
      width: 50px;
      height: 50px;
    }

    p {
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    .icon-box {
      width: calc(100% - 20px);
    }
  }
}

.footer {
  background-color: #232323;
  color: #d5d5d5;
  text-align: center;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .left-column,
  .right-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
  }

  .image-left,
  .image-right {
    width: 80%;
    margin: 10px 0;
  }

  p {
    margin: 5px 0;
  }
}
</style>
