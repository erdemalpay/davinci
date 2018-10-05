<template>
  <v-layout row justify-center>
      <v-btn flat @click="addTable = true" width="100%">Add New Table</v-btn>
      <v-dialog v-model="addTable" width="300px">
        <v-card>
          <v-card-title class="headline">Create a new table?</v-card-title>
          <v-card-actions>
            <v-btn
              flat="flat"
              @click="addTable = false"
            >
              Cancel
            </v-btn>

            <v-btn
              flat="flat"
              @click="addTable = false; addNewTable()"
            >
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        persistent
        lazy
        full-width
        width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="date"
          label="Date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date"
          @input="$refs.dialog.save(date); fetchTables()"></v-date-picker>
      </v-dialog>
    <v-layout row wrap>
      <v-flex xs4 v-for="(table, tableIndex) in tables" :key="table._id">
        <v-list two-line>
            Table No:{{ tableIndex }}
            <v-btn flat @click="addGamePlay = true" width="100%">Add Gameplay</v-btn>
            <v-dialog v-model="addGamePlay" width="290px">
              <v-card>
                <v-card-title class="headline">Add Gameplay</v-card-title>
                <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-select
                    v-model="playerCount"
                    :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                    label="Player Count"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="game"
                    :items="games"
                    item-text="title"
                    label="Games"
                  ></v-autocomplete>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
                <v-card-actions>
                  <v-btn
                    flat="flat"
                    @click="addGamePlay = false"
                  >
                    Cancel
                  </v-btn>

                  <v-btn
                    flat="flat"
                    @click="addGamePlay = false; addNewGamePlay()"
                  >
                    Create
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <template v-for="(gamePlay, index) in table.gamePlays">
              <v-list-tile :key="index" avatar ripple>
                <v-list-tile-content>
                  <v-list-tile-title>{{ gamePlay.game.title }}</v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">{{ gamePlay.playerCount }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                  <v-icon color="grey lighten-1">star_border</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < table.gamePlays.length"
                :key="`divider-${index}`"></v-divider>
            </template>
          </v-list>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'Tables',
  data() {
    return {
      date: moment().format('YYYY-MM-DD'),
      menu: false,
      modal: false,
      addTable: false,
      addGamePlay: false,
      tables: [],
      games: [],
      playerCount: 0,
      game: null,
    };
  },
  mounted() {
    this.fetchTables();
    this.fetchGames();
  },
  methods: {
    async fetchTables() {
      return axios({
        method: 'get',
        url: `http://localhost:8081/tables?date=${this.date}`,
      })
        .then((response) => {
          console.log(response.data);
          this.tables = response.data;
        })
        .catch(() => {});
    },
    async fetchGames() {
      return axios({
        method: 'get',
        url: 'http://localhost:8081/games',
      })
        .then((response) => {
          console.log('Games:', response.data);
          this.games = response.data.games;
        })
        .catch(() => {});
    },
    async addNewTable() {
      return axios({
        method: 'post',
        data: {
          date: new Date(),
        },
        url: 'http://localhost:8081/tables',
      })
        .then(() => {
          this.fetchTables();
        })
        .catch(() => {});
    },
    async addNewGamePlay() {
      return axios({
        method: 'post',
        data: {
          date: new Date(),
        },
        url: 'http://localhost:8081/tables',
      })
        .then(() => {
          this.fetchTables();
        })
        .catch(() => {});
    },
  },
};
</script>

