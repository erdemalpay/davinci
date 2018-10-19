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
            prepend-icon="game"
          >
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-speed-dial
      v-model="speeddial"
      top
      right
      direction="bottom"
      transition="slide-y-transition"
    >
      <v-btn
        slot="activator"
        v-model="speeddial"
        fab
      >
        <v-icon v-if="!speeddial">arrow_drop_down</v-icon>
        <v-icon v-if="speeddial">close</v-icon>
      </v-btn>
      <v-tooltip right>
        <v-btn
          slot="activator"
          fab
          dark
          small
          color="indigo"
          @click="gameplayDialog = true;"
        >
          <v-icon>add</v-icon>
        </v-btn>
        Add Gameplay
      </v-tooltip>
      <v-tooltip right>
        <v-btn
          slot="activator"
          fab
          dark
          small
          color="green"
          @click="editDialog = true"
        >
          <v-icon>edit</v-icon>
        </v-btn>
        Edit Table
      </v-tooltip>
      <v-tooltip right>
        <v-btn
          slot="activator"
          fab
          dark
          small
          color="red"
          @click="deleteDialog = true"
        >
          <v-icon>delete</v-icon>
        </v-btn>
        Delete Table
      </v-tooltip>
    </v-speed-dial>
    <GameplayDialog
      :tableId="table._id"
      :initialGameplay="{ date: table.date }"
      :dialog="gameplayDialog"
      :edit=false
      @closeDialog="gameplayDialog = false"
    >
    </GameplayDialog>
    <DeleteDialog
      :id="table.id"
      :dialog="deleteDialog"
      @closeDialog="deleteDialog = false"
      @delete="deleteTable"
    >
    </DeleteDialog>
    <TableDialog
      edit=true
      :dialog="editDialog"
      :initialTable="table"
      @closeDialog="editDialog = false"
    >
    </TableDialog>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

import GameplayDialog from './GameplayDialog';
import DeleteDialog from './DeleteDialog';
import TableDialog from './TableDialog';

export default {
  data() {
    return {
      gameplayDialog: false,
      deleteDialog: false,
      editDialog: false,
      speeddial: false,
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
  methods: {
    ...mapActions([
      'fetchTables',
    ]),
    deleteTable() {
      this.$store.dispatch('deleteTable', this.table._id);
    },
  },
  components: {
    GameplayDialog,
    DeleteDialog,
    TableDialog,
  },
};
</script>
