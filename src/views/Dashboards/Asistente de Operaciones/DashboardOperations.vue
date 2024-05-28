<template>
    <div class="dashboard-wrapper">
      <SidebarMenuOperations></SidebarMenuOperations>
      <div class="dashboard">
        <h1>Hola, Asistente de Operaciones</h1>
        <router-view />
      </div>
    </div>
  </template>
  
    
    <script>
    import SidebarMenuOperations from './SidebarMenuOperations.vue';
    export default {
        components: {
        SidebarMenuOperations
    },
      name: 'Dashboard',
      methods: {
        logout() {
          localStorage.removeItem('loggedIn');
          localStorage.removeItem('role');
          this.$router.push('/login');
        }
      }
    }
    
    </script>
  
  <style>
  .dashboard {
    display: flex;
  }
  .content {
    flex: 1;
    padding: 20px;
  }
  </style>
    