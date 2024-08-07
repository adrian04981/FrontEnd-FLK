import { createRouter, createWebHistory } from 'vue-router';
import { useUserMixin } from '../mixins/roleMixin.js'; // Ajusta la ruta según la ubicación de tu mixin
// HOME
import Home from '../views/Home.vue';
import Pokemon from '../views/Pokemon.vue';
import Login from '../views/Login.vue';
import DashboardAdmin from '../views/Dashboards/Administrador/DashboardAdmin.vue';
import DashboardOperations from '../views/Dashboards/Asistente de Operaciones/DashboardOperations.vue';
import DashboardReceptionist from '../views/Dashboards/Recepcionista/DashboardReceptionist.vue';

// Gestionar TIPOS DE INSPECCION
import ListarTiposInspeccion from '../views/TipoInspeccion/ListarTiposInspeccion.vue';
import EditarInspeccion from '../views/TipoInspeccion/EditarInspeccion.vue';
import ConsultarTipoInspeccion from '../views/TipoInspeccion/ConsultarTipoInspeccion.vue';
import AgregarTipoInspeccion from '../views/TipoInspeccion/AgregarTipoInspeccion.vue';

import Website from '../views/Website/Website.vue'

//Gestionar Servicio
import GestionarServicio from '../views/GestionarServicio/GestionarServicio.vue';
import DeleteService from '../views/GestionarServicio/DeleteService.vue'; 
import GestionarTiposServicios from '../views/GestionarTiposServicios/GestionarTiposServicios.vue';
//Listar Inspectores Disponibles
import ListaInspectoresDisponibles from '../views/GestionarInspectoresDisponibles/ListaInspectoresDisponibles.vue';

//REGISTRAR INSPECCION
import RegistrarInspeccion from '../views/RegistrarInspeccion/RegistrarInspeccion.vue';

//Listar Certifiacor Disponible
import ListarCertificadosDisponibles from '../views/GestionarCertificadosDisponibles/ListarCertificadosDisponibles.vue'


//FIJOSSSSS//FIJOSSSSS//FIJOSSSSS

//GESTIONAR CREDENCIALES
import GestionarCredencialesLista from '../views/GestionarCredenciales/Lista.vue';

//AGENDAR CITA
import AgendarCita from '../views/AgendarCita/AgendarCita.vue';

//GESTIONAR VEHICULOS
import GestionarVehiculos from '../views/GestionarVehiculos/Lista.vue';

//GESTIONAR EMPRESAS
import GestionarEmpresas from '../views/GestionarEmpresas/Lista.vue';

//GESTIONAR ASISTENTES DE OPERACIONES DISPONIBLES
import GestionarAsistentesDeOperacionesDisponibles from '../views/GestionarDisponibilidadDeAsistentesDeOperaciones/Lista.vue';

//GESTIONAR Gestionar Inspecciones Y Asignaturas
import GestionarInspeccionesYAsignaturas from '../views/GestionarInspeccionesYAsignaturas/Lista.vue';
import Agendar from '../views/GestionarServiciosAgendados/Agendar.vue'
import EvaluarInspeccion from '../views/EvaluaciondeInspeccion/EvaluarInspeccion.vue'
import apu from '../views/AgendaPorUsuario/Agenda.vue'

//GENERAR CERTIFICADO PDF
import GenerarCertificado from '../views/GenerateCertificate.vue'
import BuscarCertificadosPorPlaca from '../views/BuscarCertificadosPorPlaca.vue'
// Función para agregar meta.requiresRole a las rutas seleccionadas
const addRequiresRole = (routes, role) => {
  return routes.map(route => {
    route.meta = { requiresRole: role };
    return route;
  });
};

const adminChildren = addRequiresRole([
  {
    path: 'ListarCertificadosDisponibles',
    name: 'ListarCertificadosDisponibles',
    component: ListarCertificadosDisponibles
  },  
  {
    path: 'apu',
    name: 'apu',
    component: apu
  },
    {
    path: 'GCPDF',
    name: 'GenerateCertificate',
    component: GenerarCertificado
  },
  {
    path: 'GestionarInspeccionesYAsignaturas',
    name: 'GestionarInspeccionesYAsignaturas',
    component: GestionarInspeccionesYAsignaturas
  },  
  {
    path: 'GestionarAsistentesDeOperacionesDisponibles',
    name: 'GestionarAsistentesDeOperacionesDisponibles',
    component: GestionarAsistentesDeOperacionesDisponibles
  },
  {
    path: 'AgendarCita',
    name: 'AgendarCita',
    component: AgendarCita
  },  
  {
    path: 'GestionarVehiculos',
    name: 'GestionarVehiculos',
    component: GestionarVehiculos
  },  
  {
    path: 'GestionarEmpresas',
    name: 'GestionarEmpresas',
    component: GestionarEmpresas
  },

  {
    path: 'ListarCertificadosDisponibles',
    name: 'ListarCertificadosDisponibles',
    component: ListarCertificadosDisponibles
  },
  {
    path: 'GestionarServiciosAgendados',
    name: 'GestionarServiciosAgendados',
    component: Agendar
  },
  {
    path: 'GestionarCredencialesLista',
    name: 'GestionarCredencialesLista',
    component: GestionarCredencialesLista
  },
  {
    path: 'evaluarinspeccion',
    name: 'EvaluarInspeccion',
    component: EvaluarInspeccion
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
    path: 'GestionarTiposServicios',
    name: 'TiposServicios',
    component: GestionarTiposServicios, 
 
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
  },
  {
    path: 'apu',
    name: 'apu',
    component: apu
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
    path: '/Login',
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
  path: '/RegistrarInspeccion',
  name: 'RegistrarInspeccion',
  component: RegistrarInspeccion
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
  },
  {
    path: '/evaluarInspecciones',
    name: 'EvaluarInspecciones',
    component: EvaluarInspeccion,
  },
  {
    path: '/',
    name: 'Website',
    component: Website,
  },
  {
    path: '/GCPDF',
    name: 'GenerateCertificate',
    component: GenerarCertificado
  },
  {
    path: '/BuscarCertificadosPorPlaca',
    name: 'BuscarCertificadosPorPlaca',
    component: BuscarCertificadosPorPlaca
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
