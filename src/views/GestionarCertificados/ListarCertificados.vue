<template>
    <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Fecha Emision</th>
                            <th>Fecha Caducidad</th>
                            <th>Fondo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider" id="contenido">
                        <tr v-for="cert, i in CertificadoInspeccion" :key="cert.id">
                        <td>{{ (i+1) }}</td>
                        <td>{{cert.FechaEmision}}</td>
                        <td>{{cert.FechaCaducidad}}</td>
                        <td>{{cert.FondoCertificado}}</td>
                        <td> 
                            <router-link :to="{path:'edit/'+cert.id}" class="btn btn-warning">
                                <i class="fa-solid fa-edit"></i>
                            </router-link> &nbsp;
                            <button class="btn btn-danger">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </template>
    <script>
        import axios from 'axios';
        export default{
            data(){
                return{CertificadoInspeccion:null}
            },
            mounted(){
                this.getCertificadoInspeccion();
            },
            methods:{
                getCertificadoInspeccion(){
                    axios.get('https://localhost:7006/api/CertificadoInspeccions').then(
                        response => (
                            this.CertificadoInspeccion = response.data
                        )
                    );
                },
                eliminar(id){
                    
                }
            }
        }
    </script>