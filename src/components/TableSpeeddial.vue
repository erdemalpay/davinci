<template>
  <v-container>
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
      <v-tooltip left>
        <GameplayDialog
          slot="activator"
          :table="table"
          :edit=false
          ref="gameplayDialogRef"
        >
          <v-btn
            slot="dialogActivator"
            fab
            dark
            small
            color="indigo"
            @click="$refs.gameplayDialogRef.setDefaultGameplay(table.playerCount, table.date)"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </GameplayDialog>
        Add Gameplay
      </v-tooltip>
      <v-tooltip left>
        <TableDialog
          :edit=true
          slot="activator"
          ref="tableDialogRef"
        >
          <v-btn
            slot="dialogActivator"
            fab
            dark
            small
            color="green"
            @click="$refs.tableDialogRef.setTable(table)"
            >
            <v-icon>edit</v-icon>
          </v-btn>
        </TableDialog>
        Edit Table
      </v-tooltip>
      <v-tooltip left>
        <DeleteDialog
          slot="activator"
          :id="table.id"
          @delete="deleteTable"
        >
          <v-btn
            slot="dialogActivator"
            fab
            dark
            small
            color="red"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </DeleteDialog>
        Delete Table
      </v-tooltip>
    </v-speed-dial>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

import GameplayDialog from './GameplayDialog';
import DeleteDialog from './DeleteDialog';
import TableDialog from './TableDialog';

export default {
  data() {
    return {
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
    async deleteTable() {
      await this.$store.dispatch('deleteTable', this.table._id);
      this.$router.push({ name: 'Tables' });
    },
  },
  components: {
    GameplayDialog,
    DeleteDialog,
    TableDialog,
  },
};
</script>
