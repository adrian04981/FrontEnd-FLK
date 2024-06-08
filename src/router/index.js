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
import Credenciales from '../views/GestionarCredenciales/Credenciales.vue';
// Gestiona personal
import ListarPersonal from '../views/GestionarPersonal/ListarPersonal.vue';
import EditarPersonal from '../views/GestionarPersonal/EditarPersonal.vue';
import ConsultarPersonal from '../views/GestionarPersonal/ConsultarPersonal.vue';
// Gestionar TIPOS DE INSPECCION
import ListarTiposInspeccion from '../views/TipoInspeccion/ListarTiposInspeccion.vue';
import EditarInspeccion from '../views/TipoInspeccion/EditarInspeccion.vue';
import ConsultarTipoInspeccion from '../views/TipoInspeccion/ConsultarTipoInspeccion.vue';
import AgregarTipoInspeccion from '../views/TipoInspeccion/AgregarTipoInspeccion.vue';

// Agendar Cita 
import AgendarCita from '../views/AgendarCita/AgendarCitaServicio.vue';

//Gestionar Servicio
import GestionarServicio from '../views/GestionarServicio/GestionarServicio.vue';
import DeleteService from '../views/GestionarServicio/DeleteService.vue'; 

//Listar Inspectores Disponibles
import ListaInspectoresDisponibles from '../views/GestionarInspectoresDisponiles/ListaInspectoresDisponibles.vue';

// Función para agregar meta.requiresRole a las rutas seleccionadas
const addRequiresRole = (routes, role) => {
  return routes.map(route => {
    route.meta = { requiresRole: role };
    return route;
  });
};

const adminChildren = addRequiresRole([
  {
    path: 'Credenciales',
    name: 'Credenciales',
    component: Credenciales
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
    component: GestionarServicio, 
    children: [
      {
        path: 'DeleteService/:id', 
        name: 'DeleteService',
        component: DeleteService
      }
    ]
  },
  {
    path: 'listartiposinspeccion',
    name: 'TipoDeInspeccion',
    component: ListarTiposInspeccion
  },
  {
    path: 'editarinspeccion/:id',
    name: 'EditarInspeccion',
    component: EditarInspeccion
  },
  {
    path: 'consultartipoinspeccion/:id',
    name: 'ConsultarTipoInspeccion',
    component: ConsultarTipoInspeccion,
  },
  {
    path: 'ListaInspectoresDisponibles',
    name: 'ListaInspectoresDisponibles',
    component: ListaInspectoresDisponibles
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
    path: '/Home',
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
    path: '/agregartipoinspeccion',
    name: 'AgregarTipoInspeccion',
    component: AgregarTipoInspeccion,
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
