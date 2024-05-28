<template>
    <div class="container">
          <div class="row justify-content-center mt-5">
            <div class="col-10">
              <h2 class="text-center mb-4">Lista de tipos de Inspecciones</h2>
              <div class="fallout-data-table">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" class="text-white">ID</th>
                      <th scope="col" class="text-white">Nombre</th>
                      <th scope="col" class="text-white">Descripcion</th>
                      <th scope="col" class="text-white">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="Inspecciones in tipoInspeccions" :key="Inspecciones.pkTipoInspeccion">
                      <td>{{ Inspecciones.pkTipoInspeccion }}</td>
                      <td>{{ Inspecciones.titulo }}</td>
                      <td>{{ Inspecciones.descripcion }}</td>
                      <td>
                        <router-link :to="'/ConsultarTipoInspeccion/' + Inspecciones.pkTipoInspeccion" class="btn btn-info mr-2">Consultar</router-link>
                        <router-link :to="'/EditarTipoDeInspeccion/' + Inspecciones.pkTipoInspeccion" class="btn btn-warning mr-2">Editar</router-link>
                        <router-link :to="'/DeleteUsuario/' +Inspecciones.pkTipoInspeccion" class="btn btn-danger">Eliminar</router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>     
      </template>
      




      <script> 
      export default {
        name: 'Dashboard',
        data() {
          return {
            tipoInspeccions:[]
          };
        },
        mounted() {
          this.$axios.get('TipoInspeccions')
            .then(response => {
              this.tipoInspeccions = response.data;
            })
            .catch(error => {
              console.error('Error al cargar datos del tipo de inspecciones:', error);
            });
        },
        }
      </script>
      







      <style scoped>
      .fallout-data-table {
        font-family: 'Roboto', sans-serif;
        color: #FFF;
        margin: 20px auto;
        padding: 20px;
        background-color: #222;
        border: 1px solid #888;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }
      
      .fallout-data-table table {
        width: 100%;
        border-collapse: collapse;
      }
      
      .fallout-data-table th,
      .fallout-data-table td {
        padding: 10px;
        border-bottom: 2px solid #888;
      }
      
      .fallout-data-table th {
        background-color: #111;
      }
      
      .fallout-data-table tbody tr:nth-child(even) {
        background-color: #333;
      }
      
      .fallout-data-table tbody tr:hover {
        background-color: #444;
      }
      </style>
      















