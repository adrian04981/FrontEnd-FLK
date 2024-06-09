<template>
    <div class="container pt-5">
      <!-- Fila para la paginación -->
      <div class="row justify-content-between mb-3">
        <div class="col-auto">
          <!-- Selector de número de página -->
          <div class="input-group input-group-sm">
            <label for="page-select" class="input-group-text">Entre página:</label>
            <select class="form-select" id="page-select" v-model="pageSize">
              <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
            </select>
          </div>
        </div>
        <div class="col-auto">
          <!-- Controles de navegación de página -->
          <nav aria-label="Page navigation">
            <ul class="pagination pagination-sm">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="currentPage -= 1" :disabled="currentPage === 1">Anterior</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="currentPage += 1" :disabled="currentPage === totalPages">Siguiente</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <!-- Fila para el buscador -->
      <div class="row justify-content-end mb-3">
        <div class="col-auto">
          <!-- Buscador -->
          <div class="input-group input-group-sm">
            <input type="text" class="form-control" placeholder="Buscar..." v-model="search">
            <button class="btn btn-outline-secondary" type="button" @click="search = ''">Limpiar</button>
          </div>
        </div>
      </div>
      <!-- Tabla de empleados -->
      <table id="example" class="table table-striped" style="width:100%">
        <!-- Cuerpo de la tabla -->
        <tbody>
          <!-- Encabezado de la tabla -->
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Office</th>
            <th>Age</th>
            <th>Start date</th>
            <th>Salary</th>
          </tr>
          <!-- Filtrar y mostrar empleados -->
          <tr v-for="(employee, index) in paginatedEmployees" :key="index">
            <td>{{ employee[0] }}</td>
            <td>{{ employee[1] }}</td>
            <td>{{ employee[2] }}</td>
            <td>{{ employee[3] }}</td>
            <td>{{ employee[4] }}</td>
            <td>{{ employee[5] }}</td>
          </tr>
        </tbody>
        <!-- Pie de página de la tabla -->
        <tfoot>
        </tfoot>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        employees: [
        ["Tiger Nixon", "System Architect", "Edinburgh", 61, "2011-04-25", "$320,800"],
        ["Garrett Winters", "Accountant", "Tokyo", 63, "2011-07-25", "$170,750"],
        ["Ashton Cox", "Junior Technical Author", "San Francisco", 66, "2009-01-12", "$86,000"],
        ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", 22, "2012-03-29", "$433,060"],
        ["Airi Satou", "Accountant", "Tokyo", 33, "2008-11-28", "$162,700"],
        ["Brielle Williamson", "Integration Specialist", "New York", 61, "2012-12-02", "$372,000"],
        ["Herrod Chandler", "Sales Assistant", "San Francisco", 59, "2012-08-06", "$137,500"],
        ["Rhona Davidson", "Integration Specialist", "Tokyo", 55, "2010-10-14", "$327,900"],
        ["Colleen Hurst", "Javascript Developer", "San Francisco", 39, "2009-09-15", "$205,500"],
        ["Sonya Frost", "Software Engineer", "Edinburgh", 23, "2008-12-13", "$103,600"],
        ["Jena Gaines", "Office Manager", "London", 30, "2008-12-19", "$90,560"],
        ["Quinn Flynn", "Support Lead", "Edinburgh", 22, "2013-03-03", "$342,000"],
        ["Charde Marshall", "Regional Director", "San Francisco", 36, "2008-10-16", "$470,600"],
        ["Haley Kennedy", "Senior Marketing Designer", "London", 43, "2012-12-18", "$313,500"],
        ["Tatyana Fitzpatrick", "Regional Director", "London", 19, "2010-03-17", "$385,750"],
        ["Michael Silva", "Marketing Designer", "London", 66, "2012-11-27", "$198,500"],
        ["Paul Byrd", "Chief Financial Officer (CFO)", "New York", 64, "2010-06-09", "$725,000"],
        ["Gloria Little", "Systems Administrator", "New York", 59, "2009-04-10", "$237,500"],
        ["Bradley Greer", "Software Engineer", "London", 41, "2012-10-13", "$132,000"],
        ["Dai Rios", "Personnel Lead", "Edinburgh", 35, "2012-09-26", "$217,500"],
        ["Jenette Caldwell", "Development Lead", "New York", 30, "2011-09-03", "$345,000"],
        ["Yuri Berry", "Chief Marketing Officer (CMO)", "New York", 40, "2009-06-25", "$675,000"],
        ["Caesar Vance", "Pre-Sales Support", "New York", 21, "2011-12-12", "$106,450"],
        ["Doris Wilder", "Sales Assistant", "Sydney", 23, "2010-09-20", "$85,600"],
        ["Angelica Ramos", "Chief Executive Officer (CEO)", "London", 47, "2009-10-09", "$1,200,000"],
        ["Gavin Joyce", "Developer", "Edinburgh", 42, "2010-12-22", "$92,575"],
        ["Jennifer Chang", "Regional Director", "Singapore", 28, "2010-11-14", "$357,650"],
        ["Brenden Wagner", "Software Engineer", "San Francisco", 28, "2011-06-07", "$206,850"],
        ["Fiona Green", "Chief Operating Officer (COO)", "San Francisco", 48, "2010-03-11", "$850,000"],
        ["Shou Itou", "Regional Marketing", "Tokyo", 20, "2011-08-14", "$163,000"],
        ["Michelle House", "Integration Specialist", "Sydney", 37, "2011-06-02", "$95,400"],
        ["Suki Burks", "Developer", "London", 53, "2009-10-22", "$114,500"],
        ["Prescott Bartlett", "Technical Author", "London", 27, "2011-05-07", "$145,000"],
        ["Gavin Cortez", "Team Leader", "San Francisco", 22, "2008-10-26", "$235,500"],
        ["Martena Mccray", "Post-Sales support", "Edinburgh", 46, "2011-03-09", "$324,050"],
        ["Unity Butler", "Marketing Designer", "San Francisco", 47, "2009-12-09", "$85,675"],
        ["Howard Hatfield", "Office Manager", "San Francisco", 51, "2008-12-16", "$164,500"],
        ["Hope Fuentes", "Secretary", "San Francisco", 41, "2010-02-12", "$109,850"],
        ["Vivian Harrell", "Financial Controller", "San Francisco", 62, "2009-02-14", "$452,500"],
        ["Timothy Mooney", "Office Manager", "London", 37, "2008-12-11", "$136,200"],
        ["Jackson Bradshaw", "Director", "New York", 65, "2008-09-26", "$645,750"],
        ["Olivia Liang", "Support Engineer", "Singapore", 64, "2011-02-03", "$234,500"],
        ["Bruno Nash", "Software Engineer", "London", 38, "2011-05-03", "$163,500"],
        ["Sakura Yamamoto", "Support Engineer", "Tokyo", 37, "2009-08-19", "$139,575"],
        ["Thor Walton", "Developer", "New York", 61, "2013-08-11", "$98,540"],
        ["Finn Camacho", "Support Engineer", "San Francisco", 47, "2009-07-07", "$87,500"],
        ["Serge Baldwin", "Data Coordinator", "Singapore", 64, "2012-04-09", "$138,575"],
        ["Zenaida Frank", "Software Engineer", "New York", 63, "2010-01-04", "$125,250"],
        ["Zorita Serrano", "Software Engineer", "San Francisco", 56, "2012-06-01", "$115,000"],
        ["Jennifer Acosta", "Junior Javascript Developer", "Edinburgh", 43, "2013-02-01", "$75,650"],
        ["Cara Stevens", "Sales Assistant", "New York", 46, "2011-12-06", "$145,600"],
        ["Hermione Butler", "Regional Director", "London", 47, "2011-03-21", "$356,250"],
        ["Lael Greer", "Systems Administrator", "London", 21, "2009-02-27", "$103,500"],
        ["Jonas Alexander", "Developer", "San Francisco", 30, "2010-07-14", "$86,500"],
        ["Shad Decker", "Regional Director", "Edinburgh", 51, "2008-11-13", "$183,000"],
        ["Michael Bruce", "Javascript Developer", "Singapore", 29, "2011-06-27", "$183,000"],
        ["Donna Snider", "Customer Support", "New York", 27, "2011-01-25", "$112,000"]
        ],
        search: '', // Variable para la búsqueda
        pageSize: 10, // Tamaño de página seleccionado
        pageSizes: [5, 10, 15, 20], // Opciones de tamaño de página
        currentPage: 1 // Página actual
      };
    },
    computed: {
      // Filtrar empleados según la búsqueda
      filteredEmployees() {
        return this.employees.filter(employee =>
          employee.some(field => field.toString().toLowerCase().includes(this.search.toLowerCase()))
        );
      },
      // Calcular el número total de páginas
      totalPages() {
        return Math.ceil(this.filteredEmployees.length / this.pageSize);
      },
      // Calcular el índice inicial del rango de empleados a mostrar
      startIndex() {
        return (this.currentPage - 1) * this.pageSize;
      },
      // Calcular el índice final del rango de empleados a mostrar
      endIndex() {
        return Math.min(this.startIndex + this.pageSize, this.filteredEmployees.length) - 1;
      },
      // Obtener los empleados a mostrar en la página actual
      paginatedEmployees() {
        return this.filteredEmployees.slice(this.startIndex, this.endIndex + 1);
      }
    }
  };
  </script>
  
  <style>
  /* Agregar estilos personalizados si es necesario */
  </style>
  