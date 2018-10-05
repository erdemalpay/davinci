<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-btn flat v-bind:to="{ name: 'AddGame' }" width="100%">Add New Game</v-btn>
    </v-flex>
    <v-flex xs4 v-for="game in games" :key="game._id">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">
              <v-btn flat v-bind:to="`/games/${game._id}`">{{ game.title }}</v-btn>
            </div>
            <span class="grey--text">{{ game._id }}</span>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Games',
  data() {
    return {
      games: [],
    };
  },
  mounted() {
    this.fetchGames();
  },
  methods: {
    async fetchGames() {
      return axios({
        method: 'get',
        url: 'http://localhost:8081/games',
      })
        .then((response) => {
          this.games = response.data.games;
        })
        .catch(() => {});
    },
  },
};
</script>

