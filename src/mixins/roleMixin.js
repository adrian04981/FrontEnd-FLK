// <!-- src/mixins/roleMixin.js -->
export const useUserMixin = {
  computed: {
    userRole() {
      const role = localStorage.getItem('role');
      return role ? role : 'Invitado';
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
  },
  methods: {
    getUserRole() {
      return localStorage.getItem('role') || 'Invitado';
    }
  }
};
