<template>
    <div class="dashboard-wrapper">
      <sidebar-menu></sidebar-menu>
      <div class="DashboardReceptionist">
        <h1>Menu, Recepcionista</h1>
        <router-view />
      </div>
    </div>
  </template>
  
    
    <script>
    import SidebarMenu from '../Recepcionista/SidebarMenuRecepcionist.vue';
    export default {
        components: {
      SidebarMenu
    },
      name: 'DashboardReceptionist',
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
    