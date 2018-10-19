<template>
  <v-container>
    <h2>{{ table.name }}</h2>
    <v-layout wrap>
      <v-flex class="gameplaycard" xs4 v-for="gameplay in table.gameplays" :key="gameplay._id">
        <GameplayCard
          :gameplay="gameplay"
        ></GameplayCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import GameplayCard from './GameplayCard';

export default {
  data() {
    return {
      table: {},
    };
  },
  computed: {
    ...mapGetters([
      'games',
      'users',
    ]),
  },
  mounted() {
    this.table = this.$store.getters.getTableById(this.$route.params.id);
  },
  methods: {
    ...mapActions([
      'fetchTable',
    ]),
  },
  components: {
    GameplayCard,
  },
};
</script>
