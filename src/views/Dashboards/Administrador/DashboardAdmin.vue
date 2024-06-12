<template>
  <div class="app">
    <button class="toggle-sidebar-btn" @click="toggleSidebar">☰</button>
    <div class="app-body">
      <sidebar-menu-admin class="sidebar-menu" :class="{ 'is-open': isSidebarOpen }" @close="isSidebarOpen = false"></sidebar-menu-admin>
      <main class="app-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import SidebarMenuAdmin from './SidebarMenuAdmin.vue';

export default {
  components: {
    SidebarMenuAdmin,
  },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.toggle-sidebar-btn {
  display: none;
  background: none;
  border: none;
  color: var(--dark);
  font-size: 24px;
  cursor: pointer;
  margin: 10px;
}

.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar-menu {
  width: 250px;
  background-color: var(--dark);
  z-index: 1;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.sidebar-menu.is-open {
  transform: translateX(0);
}

.app-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  transition: margin-left 0.3s ease;
}

@media (max-width: 768px) {
  .toggle-sidebar-btn {
    display: block;
  }

  .sidebar-menu {
    position: fixed;
    top: 0;
    bottom: 0;
    transform: translateX(-100%);
  }

  .sidebar-menu.is-open {
    transform: translateX(0);
  }

  .app-content {
    padding: 10px;
  }
}
</style>
