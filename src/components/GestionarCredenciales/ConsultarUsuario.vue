<template>
    <div class="modal" tabindex="-1" role="dialog" style="display:block; background:rgba(0,0,0,0.5)">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detalles del Usuario</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <p><strong>ID:</strong> {{ usuario.pkUsuario }}</p>
            <p><strong>Nombre de Usuario:</strong> {{ usuario.nombreUsuario }}</p>
            <p><strong>Contraseña:</strong> {{ usuario.contraseña }}</p>
            <p><strong>Rol:</strong> {{ getRoleName(usuario.fkRol) }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['usuario'],
    methods: {
      getRoleName(roleId) {
        const roles = [
          { pkRol: 1, nombre: 'Administrador' },
          { pkRol: 2, nombre: 'Asistente de Operaciones' },
          { pkRol: 3, nombre: 'Recepcionista' },
        ];
        const role = roles.find(role => role.pkRol === roleId);
        return role ? role.nombre : 'Desconocido';
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
  }
  </style>
  