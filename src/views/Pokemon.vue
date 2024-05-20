<template>
  <div class="pokemon" v-if="isAdmin || isRep">
    <h1>Pokédex</h1>
    <div v-if="pokemon">
      <h2>{{ pokemon.name }}</h2>
      <img :src="pokemon.sprites.front_default" alt="Pokemon Sprite" />
      <p>Height: {{ pokemon.height }}</p>
      <p>Weight: {{ pokemon.weight }}</p>
    </div>
    <button @click="fetchPokemon">Fetch Random Pokemon</button>
  </div>
  <div v-else>
    <p>No tienes permiso para acceder a la Pokédex.</p>
  </div>
</template>

<script>
import axios from 'axios';
import roleMixin from '../mixins/roleMixin';

export default {
  mixins: [roleMixin],
  name: 'Pokemon',
  data() {
    return {
      pokemon: null,
    };
  },
  methods: {
    async fetchPokemon() {
      try {
        const randomId = Math.floor(Math.random() * 150) + 1;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        this.pokemon = response.data;
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      }
    },
  },
};
</script>

<style scoped>
.pokemon {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 2px solid #333;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

button {
  padding: 10px 20px;
  background-color: #ffcc00;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff9900;
}

img {
  max-width: 150px;
}
</style>
