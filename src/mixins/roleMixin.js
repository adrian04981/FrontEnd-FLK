
export default {
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
  