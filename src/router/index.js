// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pokemon from '../views/Pokemon.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import UserList from '../views/GestionarCredenciales/UserList.vue'
import ListarTiposInspeccion from '../views/TipoInspeccion/ListarTiposInspeccion.vue'
import EditarTipoDeInspeccion from '../views/TipoInspeccion/EditarInspeccion.vue'
import ConsultarTipoInspeccion from '../views/TipoInspeccion/ConsultarTipoInspeccion.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/ListarTiposInspeccion',
    name: 'Tipo De Inspeccion',
    component: ListarTiposInspeccion
  },
  {
    path: '/EditarTipoDeInspeccion/:id',
    name: 'Editar Inspeccion',
    component: EditarTipoDeInspeccion
  },
  {
    path: '/ConsultarTipoInspeccion/:id',
    name: 'ConsultarTipoDeInspeccion',
    component: ConsultarTipoInspeccion,
  },

  {
    path: '/ListarPersonal',
    name: 'ListarPersonal',
    component: ListarTiposInspeccion

  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'pokemon',
        name: 'Pokemon',
        component: Pokemon
      },
      {
        path: 'users',
        name: 'UserList',
        component: UserList, // Ruta para la lista de usuarios
        meta: {
          requiresAdmin: true // Agregar metadatos para verificar el acceso de administrador
        }
      }
    ],
    beforeEnter: (to, from, next) => {
      const loggedIn = localStorage.getItem('loggedIn')
      if (loggedIn) {
        next()
      } else {
        next('/login')
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
