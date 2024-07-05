<template>
	<aside :class="[{ 'is-expanded': is_expanded }, { 'is-open': is_open }]" @click.self="closeMenu">
	  <div class="logo">
		<img :src="logoURL" alt="Vue" />
	  </div>
  
	  <div class="menu-toggle-wrap">
		<button class="menu-toggle" @click="ToggleMenu">
		  <span class="material-icons">{{ is_expanded ? 'keyboard_double_arrow_left' : 'keyboard_double_arrow_right' }}</span>
		</button>
	  </div>
  
	  <h3>Menu</h3>
	  <div class="menu">
		<router-link to="/dashboard-admin" class="button">
		  <span class="material-icons">home</span>
		  <span class="text">Menu Principal</span>
		</router-link>
		<router-link to="/dashboard-admin/GestionarCredencialesLista" class="button">
		  <span class="material-icons">key</span>
		  <span class="text">Gestionar Credenciales</span>
		</router-link>
		<router-link to="/dashboard-admin/GestionarEmpresas" class="button">
		  <span class="material-icons">group</span>
		  <span class="text">Gestionar Empresa</span>
		</router-link>
		<router-link to="/dashboard-admin/GestionarVehiculos" class="button">
		  <span class="material-icons">add_box</span>
		  <span class="text">Gestionar Vehiculos</span>
		</router-link>		
		<router-link to="/dashboard-admin/AgendarCita" class="button">
		  <span class="material-icons">add_box</span>
		  <span class="text">Agendar Cita</span>
		</router-link>
		<router-link to="/dashboard-admin/GestionarAsistentesDeOperacionesDisponibles" class="button">
		  <span class="material-icons">add_box</span>
		  <span class="text">Certificados de Asistentes de Operaciones</span>
		</router-link>
		<router-link to="/dashboard-admin/GestionarInspeccionesYAsignaturas" class="button">
		  <span class="material-icons">add_box</span>
		  <span class="text">Gestionar Inspecciones Y Asignaturas</span>
		</router-link>
		<router-link to="/dashboard-admin/GestionarServiciosAgendados" class="button">
		  <span class="material-icons">add_box</span>
		  <span class="text">Gestionar Servicios Agendados</span>
		</router-link>
	  </div>
	  <div class="flex"></div>
  
	  <div class="menu">
		<button class="button" @click="logout">
		  <span class="material-icons">logout</span>
		  <span class="text">Logout</span>
		</button>
	  </div>
	</aside>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  import logoURL from '/src/assets/SELLO_FLK.png'
  
  const is_expanded = ref(localStorage.getItem("is_expanded") === "true")
  const is_open = ref(false)
  const router = useRouter()
  
  const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value
	localStorage.setItem("is_expanded", is_expanded.value)
	is_open.value = !is_open.value
  }
  
  const closeMenu = () => {
	if (window.innerWidth <= 1024) {
	  is_open.value = false
	}
  }
  
  const handleClickOutside = (event) => {
	if (!event.target.closest('aside')) {
	  closeMenu()
	}
  }
  
  const logout = () => {
	localStorage.removeItem('loggedIn')
	localStorage.removeItem('role')
	localStorage.removeItem('id_usuario')
	router.push('/login')
  }
  
  onMounted(() => {
	document.addEventListener('click', handleClickOutside)
  })
  
  onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutside)
  })
  </script>
  
  <style lang="scss" scoped>
  aside {
	display: flex;
	flex-direction: column;
  
	background-color: var(--dark);
	color: var(--light);
  
	width: calc(2rem + 32px);
	overflow: hidden;
	min-height: 100vh;
	padding: 1rem;
  
	transition: 0.2s ease-in-out;
  
	.flex {
	  flex: 1 1 0%;
	}
  
	.logo {
	  margin-bottom: 1rem;
  
	  img {
		width: 6rem;
	  }
	}
  
	.menu-toggle-wrap {
	  display: flex;
	  justify-content: flex-end;
	  margin-bottom: 1rem;
  
	  position: relative;
	  top: 0;
	  transition: 0.2s ease-in-out;
  
	  .menu-toggle {
		transition: 0.2s ease-in-out;
		.material-icons {
		  font-size: 2rem;
		  color: var(--light);
		  transition: 0.2s ease-out;
		}
  
		&:hover {
		  .material-icons {
			color: var(--primary);
			transform: translateX(0.5rem);
		  }
		}
	  }
	}
  
	h3,
	.button .text {
	  opacity: 0;
	  transition: opacity 0.3s ease-in-out;
	}
  
	h3 {
	  color: var(--grey);
	  font-size: 0.875rem;
	  margin-bottom: 0.5rem;
	  text-transform: uppercase;
	}
  
	.menu {
	  margin: 0 -1rem;
  
	  .button {
		display: flex;
		align-items: center;
		text-decoration: none;
  
		transition: 0.2s ease-in-out;
		padding: 0.5rem 1rem;
  
		.material-icons {
		  font-size: 2rem;
		  color: var(--light);
		  transition: 0.2s ease-in-out;
		}
		.text {
		  color: var(--light);
		  transition: 0.2s ease-in-out;
		}
  
		&:hover {
		  background-color: var(--dark-alt);
  
		  .material-icons,
		  .text {
			color: var(--primary);
		  }
		}
  
		&.router-link-exact-active {
		  background-color: var(--dark-alt);
		  border-right: 5px solid var(--primary);
  
		  .material-icons,
		  .text {
			color: var(--primary);
		  }
		}
	  }
	}
  
	.footer {
	  opacity: 0;
	  transition: opacity 0.3s ease-in-out;
  
	  p {
		font-size: 0.875rem;
		color: var(--grey);
	  }
	}
  
	&.is-expanded {
	  width: var(--sidebar-width);
  
	  .menu-toggle-wrap {
		top: -3rem;
  
		.menu-toggle {
		  transform: rotate(-180deg);
		}
	  }
  
	  h3,
	  .button .text {
		opacity: 1;
	  }
  
	  .button {
		.material-icons {
		  margin-right: 1rem;
		}
	  }
  
	  .footer {
		opacity: 0;
	  }
	}
  
	@media (max-width: 1024px) {
	  position: fixed;
	  z-index: 99;
	  transform: translateX(-100%);
	  transition: transform 0.3s ease-in-out;
  
	  &.is-open {
		transform: translateX(0);
	  }
  
	  .menu-toggle-wrap {
		position: absolute;
		top: 1rem;
		right: 1rem;
	  }
	}
  }
  </style>
  