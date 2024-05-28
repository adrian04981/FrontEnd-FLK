// src/mixins/roleMixin.js
export const useUserMixin = {
  methods: {
    getUserRole() {
      // Verifica si el rol del usuario está definido en el almacenamiento local
      const role = localStorage.getItem('role');
      return role ? role : 'Invitado'; // Si no está definido, devuelve 'Invitado' como valor predeterminado
    }
  },
  computed: {
    userRole() {
      return localStorage.getItem('role');
    },
    isAdmin() {
      return this.userRole === 'Administrador';
    },
    isRep() {
      return this.userRole === 'Recepcionista';
    },
    isAsist() {
      return this.userRole === 'Asistente de Operaciones';
    }
  }
};
