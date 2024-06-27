<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-6 text-black">
        <div class="px-5 ms-xl-4">
          <i class="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style="color: #709085;"></i>
          <span class="h1 fw-bold mb-0">GRUPO FLK</span>
        </div>
        <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
          <form style="width: 23rem;" @submit.prevent="login">
            <h3 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Login</h3>
            <div data-mdb-input-init class="form-floating mb-3">
              <input type="text" id="form2Example18" v-model="username" class="form-control form-control-lg" required />
              <label class="form-label" for="form2Example18">Usuario</label>
            </div>
            <div data-mdb-input-init class="form-floating mb-3">
              <input type="password" id="form2Example28" v-model="password" class="form-control form-control-lg" required />
              <label class="form-label" for="form2Example28">Contraseña</label>
            </div>
            <div class="pt-1 mb-4">
              <button class="btn btn-info btn-lg btn-block" type="submit">Iniciar Sesion</button>
            </div>
            <p class="small mb-5 pb-lg-2">+
              +<a class="text-muted" href="#!">Olvidaste tu contraseña?</a></p>
          </form>
        </div>
      </div>
      <div class="col-sm-6 px-0 d-none d-sm-block">
        <img src="../assets/Fondo_1.jpg" alt="Login image" class="w-100 h-100" style="object-fit: cover; object-position: left;">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.errorMessage = 'Por favor, ingrese nombre de usuario y contraseña.';
        return;
      }

      try {
        const response = await axios.post('Usuarios/Login', {
          nombreUsuario: this.username,
          contraseña: this.password
        });

        if (response.data && response.data.fkRol && response.data.pkUsuario) {
          const roleId = response.data.fkRol;
          const usuarioId = response.data.pkUsuario;
          const roleResponse = await axios.get(`Rols/${roleId}`);
          const roleName = roleResponse.data.nombre;

          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('role', roleName);
          localStorage.setItem('id_usuario', usuarioId);

          switch (roleName) {
            case 'Administrador':
              this.$router.push('/dashboard-admin');
              break;
            case 'Asistente de Operaciones':
              this.$router.push('/dashboard-operations');
              break;
            case 'Recepcionista':
              this.$router.push('/dashboard-receptionist');
              break;
            default:
              this.errorMessage = 'Rol de usuario no reconocido';
              localStorage.removeItem('loggedIn');
              localStorage.removeItem('role');
              localStorage.removeItem('id_usuario');
              break;
          }
        } else {
          this.errorMessage = 'Nombre de usuario o contraseña incorrectos';
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Error al iniciar sesión, inténtalo de nuevo más tarde';
      }
    }
  }
};
</script>

<style scoped>
.bg-image-vertical {
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: auto 100%;
}

@media (min-width: 1025px) {
  .h-custom-2 {
    min-height: 100vh; /* Cambia la altura mínima a 100% de la altura de la ventana */
  }
}
</style>
