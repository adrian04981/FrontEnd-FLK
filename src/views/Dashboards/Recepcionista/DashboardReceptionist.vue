<template>
  <div class="dashboard-wrapper">
    <sidebar-menu class="sidebar-menu"></sidebar-menu>
    <div class="dashboard-content">
      <h1>Hola, Recepcionista</h1>
      <router-view />
    </div>
  </div>
</template>

<script>
import SidebarMenu from './SidebarMenuRecepcionist.vue';

export default {
  components: {
    SidebarMenu,
  },
  name: 'Dashboard',
  methods: {
    logout() {
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('role');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
.dashboard-wrapper {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.sidebar-menu {
  width: 250px;
  background-color: #f8f9fa;
  z-index: 1;
}

.dashboard-content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

@media (max-width: 768px) {
  .dashboard-wrapper {
    flex-direction: column;
  }

  .sidebar-menu {
    width: 100%;
    height: auto;
  }

  .dashboard-content {
    padding: 10px;
    margin-top: 10px;
  }
}
</style>
