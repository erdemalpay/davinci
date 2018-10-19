import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moment from 'moment';

Vue.use(Vuex);

const apiurl = 'http://localhost:8081';

export default new Vuex.Store({
  state: {
    games: [],
    mainGames: [],
    users: [],
    tables: [],
    date: moment().format('YYYY-MM-DD'),
  },
  getters: {
    games: state => state.games,
    mainGames: state => state.mainGames,
    users: state => state.users,
    tables: state => state.tables,
    date: state => state.date,
    getTableById: state => id => state.tables.find(table => table._id === id),
  },
  mutations: {
    GAMES: (state, payload) => {
      state.games = payload;
    },
    MAINGAMES: (state, payload) => {
      state.mainGames = payload;
    },
    USERS: (state, payload) => {
      state.users = payload;
    },
    TABLES: (state, payload) => {
      state.tables = payload;
    },
    DATE: (state, payload) => {
      state.date = payload;
    },
  },
  actions: {
    async fetchGames({ commit }) {
      const response = await axios({
        method: 'get',
        url: `${apiurl}/games`,
      });
      commit('GAMES', response.data.games);
      console.log(response.data.games.filter(game => !game.expansion));
      commit('MAINGAMES', response.data.games.filter(game => !game.expansion));
    },
    async fetchUsers({ commit }) {
      const response = await axios({
        method: 'get',
        url: `${apiurl}/users`,
      });
      commit('USERS', response.data.users);
    },
    async fetchTables({ commit, state }) {
      const response = await axios({
        method: 'get',
        url: `${apiurl}/tables?date=${state.date}`,
      });
      commit('TABLES', response.data.tables);
    },
    async deleteTable({ dispatch }, tableId) {
      await axios({
        method: 'delete',
        url: `${apiurl}/tables/${tableId}`,
      });
      dispatch('fetchTables');
    },
    async addNewTable({ dispatch }, table) {
      await axios({
        method: 'post',
        data: table,
        url: `${apiurl}/tables`,
      });
      dispatch('fetchTables');
    },
    async updateTable({ dispatch }, table) {
      await axios({
        method: 'put',
        data: table,
        url: `${apiurl}/table/${this.table._id}`,
      });
      dispatch('fetchTables');
    },
    async addNewGameplay({ dispatch }, { gameplay, tableId }) {
      await axios({
        method: 'post',
        data: {
          gameplay,
        },
        url: `${apiurl}/table/${tableId}/gameplay`,
      });
      dispatch('fetchTables');
    },
    async updateGameplay({ dispatch }, gameplay) {
      await axios({
        method: 'put',
        data: {
          playerCount: gameplay.playerCount,
          game: gameplay.game,
          mentor: gameplay.mentor,
        },
        url: `${apiurl}/gameplay/${gameplay._id}/`,
      });
      dispatch('fetchTables');
    },
    async deleteGameplay({ dispatch }, { tableId, gameplayId }) {
      await axios({
        method: 'delete',
        url: `${apiurl}/table/${tableId}/gameplay/${gameplayId}`,
      });
      dispatch('fetchTables');
    },
  },
});
