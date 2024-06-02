import { createRouter, createWebHistory } from 'vue-router';
import { useUserMixin } from '../mixins/roleMixin.js'; // Ajusta la ruta según la ubicación de tu mixin

// HOME
import Home from '../views/Home.vue';
import Pokemon from '../views/Pokemon.vue';
import Login from '../views/Login.vue';
import DashboardAdmin from '../views/Dashboards/Administrador/DashboardAdmin.vue';
import DashboardOperations from '../views/Dashboards/Asistente de Operaciones/DashboardOperations.vue';
import DashboardReceptionist from '../views/Dashboards/Recepcionista/DashboardReceptionist.vue';

// Gestiona usuario + rol
import Credentials from '../views/GestionarCredenciales/Credentials.vue';
import UserCreate from '../views/GestionarCredenciales/UserCreate.vue';
import UserEdit from '../views/GestionarCredenciales/UserEdit.vue';
// Gestiona personal
import ListarPersonal from '../views/GestionarPersonal/ListarPersonal.vue';
import EditarPersonal from '../views/GestionarPersonal/EditarPersonal.vue';
import ConsultarPersonal from '../views/GestionarPersonal/ConsultarPersonal.vue';
// Gestionar TIPOS DE INSPECCION
import ListarTiposInspeccion from '../views/TipoInspeccion/ListarTiposInspeccion.vue';
import EditarInspeccion from '../views/TipoInspeccion/EditarInspeccion.vue';
import ConsultarTipoInspeccion from '../views/TipoInspeccion/ConsultarTipoInspeccion.vue';

//Gestionar Servicio
import GestionarServicio from '../views/GestionarServicio/GestionarServicio.vue';

//Listar Inspectores Disponibles
import ListarInspectoresDisponibles from '../views/InspectoresDisponibles/ListarInspectoresDisponibles.vue';

// Función para agregar meta.requiresRole a las rutas seleccionadas
const addRequiresRole = (routes, role) => {
  return routes.map(route => {
    route.meta = { requiresRole: role };
    return route;
  });
};

const adminChildren = addRequiresRole([
  {
    path: 'credentials',
    name: 'Credentials',
    component: Credentials
  },
  {
    path: 'usercreate',
    name: 'UserCreate',
    component: UserCreate
  },
  {
    path: 'useredit/:id',
    name: 'UserEdit',
    component: UserEdit
  },
  {
    path: 'listarpersonal',
    name: 'listarPersonal',
    component: ListarPersonal
  },
  {
    path: 'editarpersonal/:id',
    name: 'EditarPersonal',
    component: EditarPersonal
  },
  {
    path: 'consultarpersonal/:id',
    name: 'ConsultarPersonal',
    component: ConsultarPersonal
  },
  {
    path: 'GestionarServicio',
    name: 'Servicio',
    component: GestionarServicio, // Ruta para la lista de usuarios
  },
  {
    path: 'ListarInspectoresDisponibles',
    name: 'ListarInspectoresDisponibles',
    component: ListarInspectoresDisponibles
  }
    
  
], 'Administrador');

const operationsChildren = addRequiresRole([
  {
    path: 'pokemon',
    name: 'Pokemon',
    component: Pokemon
  }
], 'Asistente de Operaciones');

const receptionistChildren = addRequiresRole([
  {
    path: 'pokemon',
    name: 'Pokemon',
    component: Pokemon
  }
], 'Recepcionista');

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard-admin',
    name: 'DashboardAdmin',
    component: DashboardAdmin,
    children: adminChildren
  },
  {
    path: '/dashboard-operations',
    name: 'DashboardOperations',
    component: DashboardOperations,
    children: operationsChildren
  },
  {
    path: '/dashboard-receptionist',
    name: 'DashboardReceptionist',
    component: DashboardReceptionist,
    children: receptionistChildren
  },
  {
    path: '/listartiposinspeccion',
    name: 'TipoDeInspeccion',
    component: ListarTiposInspeccion
  },
  {
    path: '/editarinspeccion/:id',
    name: 'EditarInspeccion',
    component: EditarInspeccion
  },
  {
    path: '/consultartipoinspeccion/:id',
    name: 'ConsultarTipoInspeccion',
    component: ConsultarTipoInspeccion,
  },
  {
    path: '/ListarInspectoresDisponibles',
    name: 'ListarInspectoresDisponibles',
    component: ListarInspectoresDisponibles
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Verificar las rutas antes de la navegación
router.beforeEach((to, from, next) => {
  const userMixin = useUserMixin; // Acceder al mixin
  const userRole = userMixin.methods.getUserRole(); // Obtener el rol del usuario actual

  if (to.matched.some(record => record.meta.requiresRole)) {
    const requiredRole = to.meta.requiresRole;
    if (userRole !== requiredRole) {
      next('/login'); // O redirige a otra página según tu lógica
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
