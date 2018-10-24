<template>
  <v-card>
    <v-container>
      <v-layout justify-center>
        <v-card-title primary-title justify-center>
            <div class="headline">
              <router-link
                :to="{ name: 'Table', params: { id: table._id }}">{{ table.name }}
              </router-link>
            </div>
        </v-card-title>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-text-field
            readonly
            label="Start"
            type="time"
            v-model="table.startHour"
            prepend-icon="access_time"
          >
          </v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
            readonly
            label="Finish"
            type="time"
            v-model="table.finishHour"
            prepend-icon="access_time"
          >
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-text-field
            readonly
            label="Current Game"
            v-model="currentGame"
            prepend-icon="user"
          >
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-text-field
            readonly
            label="Player Count"
            type="number"
            return-masked-value
            v-model="table.playerCount"
            prepend-icon="game"
          >
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <TableSpeeddial
      :table="table"
    ></TableSpeeddial>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex';

import TableSpeeddial from './TableSpeeddial';

export default {
  data() {
    return {
    };
  },
  props: ['table'],
  computed: {
    currentGame() {
      const gameplay = this.table.gameplays[this.table.gameplays.length - 1];
      const game = gameplay && gameplay.game;
      return game && game.title;
    },
    ...mapGetters([
      'games',
      'users',
    ]),
  },
  components: {
    TableSpeeddial,
  },
};
</script>
