<template>
    <div class="dashboard-wrapper">
      <sidebar-menu></sidebar-menu>
      <div class="dashboard">
        <h1>Hola, Administrador</h1>
        <router-view />
      </div>
    </div>
  </template>
  
    
    <script>
    import SidebarMenu from '../Administrador/SidebarMenuAdmin.vue'
    export default {
        components: {
      SidebarMenu
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
    