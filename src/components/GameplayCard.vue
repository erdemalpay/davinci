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
            value="name"
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
          Edit Gameplay
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
          Delete Gameplay
        </v-tooltip>
      </v-speed-dial>
      <GameplayDialog
        :tableId="tableId"
        :initialGameplay="gameplay"
        :dialog="gameplayDialog"
        :edit=true
        @closeDialog="gameplayDialog = false"
      >
      </GameplayDialog>
      <DeleteDialog
        :id="gameplay.id"
        :dialog="deleteDialog"
        @closeDialog="deleteDialog = false"
        @delete="deleteGameplay"
      >
      </DeleteDialog>
    </v-container>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      speeddial: false,
      gameplayDialog: false,
      deleteDialog: false,
    };
  },
  props: {
    gameplay: Object,
    tableId: String,
  },
  computed: {
    ...mapGetters([
      'date',
      'users',
    ]),
  },
  methods: {
    deleteGameplay() {
      this.$store.dispatch('deleteGameplay', { tableId: this.tableId, gameplayId : this.gameplay._id });
    },
  }
};
</script>
