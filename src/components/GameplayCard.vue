<template>
  <v-card>
    <v-container>
      <v-layout align-center>
        <v-flex xs5>
          <v-img
            :src="gameplay.game.thumbnail"
            height="125px"
            contain
          >
          </v-img>
        </v-flex>
        <v-flex xs7>
          <v-card-title primary-title>
            <div class="headline">{{ gameplay.game.title }}</div>
          </v-card-title>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-text-field
                v-model="gameplay.startHour"
                label="Start Hour"
                readonly
              ></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
              v-model="gameplay.finishHour"
              label="Finish Hour"
              readonly
            >
          </v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-text-field
            v-model="gameplay.playerCount"
            label="Player"
            readonly
          >
          </v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
            v-model="gameplay.mentor.name"
            label="Mentor"
            readonly
          >
          </v-text-field>
        </v-flex>
      </v-layout>
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
          <GameplayDialog
            slot="activator"
            :tableId="tableId"
            :edit=true
            ref="gameplayDialogRef"
          >
            <v-btn
              slot="dialogActivator"
              fab
              dark
              small
              color="green"
              @click="$refs.gameplayDialogRef.setGameplay(gameplay)"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </GameplayDialog>
          Edit Gameplay
        </v-tooltip>
        <v-tooltip right>
          <DeleteDialog
            slot="activator"
            :id="gameplay.id"
            @delete="deleteGameplay"
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
          Delete Gameplay
        </v-tooltip>
      </v-speed-dial>
    </v-container>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex';

import GameplayDialog from './GameplayDialog';
import DeleteDialog from './DeleteDialog';

export default {
  data() {
    return {
      speeddial: false,
    };
  },
  props: [
    'gameplay',
    'tableId',
  ],
  computed: {
    ...mapGetters([
      'date',
      'users',
    ]),
  },
  methods: {
    deleteGameplay() {
      this.$store.dispatch('deleteGameplay', { tableId: this.tableId, gameplayId: this.gameplay._id });
    },
  },
  components: {
    GameplayDialog,
    DeleteDialog,
  },
};
</script>
