<template>
  <v-container fluid>
    <v-layout>
      <h1>{{ table.name }}</h1>
    </v-layout>
    <v-layout>
    <v-text-field
        label="Start"
        type="time"
        v-model="table.startHour">
      </v-text-field>
      <v-text-field
        label="Finish"
        type="time"
        v-model="table.finishHour">
      </v-text-field>
    </v-layout>
    <v-layout wrap>
      <v-flex class="gameplaycard" xs4 v-for="gameplay in table.gameplays" :key="gameplay._id">
        <GameplayCard
          :gameplay="gameplay"
          :tableId="table._id"
        ></GameplayCard>
      </v-flex>
    </v-layout>
    <TableSpeeddial
      :table="table"
    ></TableSpeeddial>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex';

import GameplayCard from './GameplayCard';
import GameplayDialog from './GameplayDialog';
import TableSpeeddial from './TableSpeeddial';

export default {
  data() {
    return {
      gameplayDialog: false,
    };
  },
  computed: {
    ...mapGetters([
      'games',
      'users',
    ]),
    table() {
      return this.$store.getters.getTableById(this.$route.params.id);
    },
  },
  mounted() {
    if (!this.table) {
      this.$router.push({ name: 'Tables' });
    }
  },
  components: {
    GameplayCard,
    GameplayDialog,
    TableSpeeddial,
  },
};
</script>
