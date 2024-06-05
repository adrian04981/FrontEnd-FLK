<template>
    <title>Agendar Servicio</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
        }
        .form-group input, .form-group select {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
        }
        .error {
            color: red;
            margin-top: 10px;
        }
        button {
            padding: 10px 20px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:disabled {
            background-color: #ccc;
        }
    </style>
<body>
    <div id="app" class="container">
        <h2>Agendar Servicio</h2>
        <div class="form-group">
            <label for="tipoServicio">Tipo de Servicio:</label>
            <select id="tipoServicio" v-model="tipoServicio" required>
                <option value="1">Tipo 1</option>
                <option value="2">Tipo 2</option>
                <!-- Agregar más opciones según sea necesario -->
            </select>
        </div>
        <div class="form-group">
            <label for="fechaAgendada">Fecha y Hora:</label>
            <input type="datetime-local" id="fechaAgendada" v-model="fechaAgendada" required @change="validateFecha" />
        </div>
        <button @click="agendarServicio" :disabled="!fechaAgendada || error">Agendar</button>
        <p class="error" v-if="error">{{ errorMessage }}</p>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                tipoServicio: '1',
                fechaAgendada: '',
                serviciosAgendados: [],
                error: false,
                errorMessage: ''
            },
            methods: {
                validateFecha() {
                    const selectedDate = new Date(this.fechaAgendada);
                    const isDuplicate = this.serviciosAgendados.some(servicio => {
                        const existingDate = new Date(servicio.fechaAgendada);
                        return existingDate.toDateString() === selectedDate.toDateString() &&
                               existingDate.getHours() === selectedDate.getHours() &&
                               existingDate.getMinutes() === selectedDate.getMinutes();
                    });

                    if (isDuplicate) {
                        this.error = true;
                        this.errorMessage = 'Ya existe un servicio agendado a esta hora en este día.';
                    } else {
                        this.error = false;
                        this.errorMessage = '';
                    }
                },
                async agendarServicio() {
                    if (this.error) {
                        return;
                    }

                    const nuevoServicio = {
                        pkServicio: this.serviciosAgendados.length + 1,
                        fkTipoServicio: this.tipoServicio,
                        fechaAgendada: this.fechaAgendada
                    };

                    try {
                        // Aquí harías una llamada a tu API para guardar el servicio
                        const response = await axios.post('https://localhost:7006/api/Servicios', nuevoServicio);
                        // Simulación de respuesta
                        const response = { data: nuevoServicio };

                        this.serviciosAgendados.push(response.data);
                        alert('Servicio agendado correctamente');
                        this.fechaAgendada = ''; // Resetear el campo de fecha y hora
                    } catch (error) {
                        console.error('Error al agendar el servicio:', error);
                        alert('Error al agendar el servicio');
                    }
                }
            }
        });
    </script>
</body>
<template></template>

