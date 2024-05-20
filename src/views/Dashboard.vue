<!-- src/views/Dashboard.vue -->
<template>
    <div class="dashboard">
      <h1>Dashboard</h1>
      <nav>
        <router-link to="/dashboard/pokemon" v-if="isAuthorized">Pokédex</router-link>
        <router-link to="/dashboard/users" v-if="isAdmin">Lista de Usuarios</router-link>
        <!-- Otras opciones de menú según el rol -->
        <button @click="logout">Logout</button>
      </nav>
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: 'Dashboard',
    computed: {
      isAuthorized() {
        const role = localStorage.getItem('role');
        return role === 'admin' || role === 'recepcionista';
      },
      isAdmin() {
        const role = localStorage.getItem('role');
        return role === 'admin';
      }
    },
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

  </style>
  