<template>
<!--msb: main sidebar-->
<div class="msb" id="msb">
		<nav class="navbar navbar-default" role="navigation">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<div class="brand-wrapper">
					<!-- Brand -->
					<div class="brand-name-wrapper">
						<a class="navbar-brand" href="#">
							GRUPO FLK
						</a>
					</div>
				</div>
			</div>
			<!-- Main Menu -->
			<div class="side-menu-container">
				<ul class="nav navbar-nav">

					<li><router-link to="/dashboard/pokemon" v-if="isAdmin || isRep"><i class="fa fa-dashboard"></i> Pokedex</router-link></li>
					<li><router-link to="/dashboard/users" v-if="isAdmin || isRep"><i class="fa fa-dashboard"></i> Gestionar Credenciales</router-link></li>
					<li><a href="#"><i class="fa fa-heart"></i> Extras</a></li>
					<li><a href="#"><span class="glyphicon glyphicon-signal"></span> Link</a></li>
                    <button @click="logout">Logout</button>
				</ul>
			</div>
		</nav>  
</div>
  </template>
  
  <script>
  import roleMixin from '../mixins/roleMixin.js'
  export default {
    mixins: [roleMixin],
    methods: {
      logout() {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('role');
        this.$router.push('/login');
      }
    }
  }
  </script>
  
  <style scoped>
body {
  margin-top: 50px;
  background-color: #fff;
  font-family: Arial, sans-serif;
  font-size: 14px;
  letter-spacing: 0.01em;
  color: #39464e;
}

.navbar-default {
  background-color: #FFF;
  margin-left: 200px;
}

/*main side bar*/
.msb {
  width: 200px;
  background-color: #F5F7F9;
  position: fixed;
  left: 0;
  top: 0;
  right: auto;
  min-height: 100%;
  overflow-y: auto;
  white-space: nowrap;
  height: 100%;
  z-index: 1;
  border-right: 1px solid #ddd;
}


  /* Slide in animation */
  @-moz-keyframes slidein {
    0% {
      left: -200px;
    }
    100% {
      left: 0;
    }
  }
  @-webkit-keyframes slidein {
    0% {
      left: -200px;
    }
    100% {
      left: 0;
    }
  }
  @keyframes slidein {
    0% {
      left: -200px;
    }
    100% {
      left: 0;
    }
  }
  @-moz-keyframes slideout {
    0% {
      left: 0;
    }
    100% {
      left: -200px;
    }
  }
  @-webkit-keyframes slideout {
    0% {
      left: 0;
    }
    100% {
      left: -200px;
    }
  }
  @keyframes slideout {
    0% {
      left: 0;
    }
    100% {
      left: -200px;
    }
  }

  @-moz-keyframes bodyslidein {
    0% {
      left: 0;
    }
    100% {
      margin-left: 200px;
    }
  }
  @-webkit-keyframes bodyslidein {
    0% {
      left: 0;
    }
    100% {
      left:0
    }
  }
  @keyframes bodyslidein {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: 200px;
    }
  }
  @-moz-keyframes bodyslideout {
    0% {
      margin-left: 200px;
    }
    100% {
      margin-right: 0;
    }
  }
  @-webkit-keyframes bodyslideout {
    0% {
      margin-left: 200px;
    }
    100% {
      margin-left: 0;
    }
  }
  @keyframes bodyslideout {
    0% {
      margin-left: 200px;
    }
    100% {
      margin-left: 0;
    }
  }
  </style>
  