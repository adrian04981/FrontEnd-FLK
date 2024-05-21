<!-- src/views/Dashboard.vue -->
<template>
    <div class="dashboard">
      <sidebar-menu></sidebar-menu>
      <h1>Menu Principal</h1>
      <router-view />
    </div>
  </template>
  
  <script>
  import SidebarMenu from './SidebarMenu.vue';
import roleMixin from '../mixins/roleMixin.js'
  export default {
      components: {
    SidebarMenu
  },
    mixins: [roleMixin],
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
  