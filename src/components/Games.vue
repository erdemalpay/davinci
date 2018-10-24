<template>
  <v-card>
    <v-card-title>
      Games
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="filteredGames"
       :search="search"
      :rows-per-page-items="rowsPerPage"
      :rowsPerPage=10
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="justify-center">{{ props.item.title }}</td>
        <td class="justify-center"><v-checkbox readonly v-model="props.item.expansion"/></td>
        <td class="justify-center">
          <v-icon
            small
            @click="deleteItem(props.item._id)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import GameCard from './GameCard';

export default {
  data() {
    return {
      search: '',
      rowsPerPage: [10, 50, 100],
      headers: [
        {
          text: 'Game',
          align: 'left',
          value: 'title',
        },
        {
          text: 'Expansion',
          value: 'expansion',
        },
        {
          text: '',
          value: 'action',
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'games',
    ]),
    filteredGames() {
      return this.games;
    },
    paginatedGames() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      return this.filteredGames.slice(start, end);
    },
    paginationLength() {
      return Math.floor(this.filteredGames.length / this.size);
    },
  },
  mounted() {
    this.fetchGames();
  },
  components: {
    GameCard,
  },
  methods: {
    ...mapActions([
      'fetchGames',
    ]),
    deleteItem(gameId) {
      this.$store.dispatch('deleteGame', gameId);
    },
  },
};
</script>

