<template>
  <v-layout>
    <v-dialog v-model="dialog" width="290px">
      <v-card>
        <v-card-title class="headline">
          {{ edit ? 'Update Gameplay' : 'Add Gameplay' }}</v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-text-field
                slot="activator"
                v-model="gameplay.date"
                label="Date"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-flex xs12>
                <v-menu
                  ref="startTimeMenu"
                  :close-on-content-click="false"
                  v-model="menuStartTime"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="gameplay.startHour"
                    type="time"
                    label="Start Time"
                    prepend-icon="access_time"
                    readonly
                  ></v-text-field>
                  <v-time-picker
                    v-if="menuStartTime"
                    v-model="gameplay.startHour"
                    full-width
                    format="24hr"
                    :allowedHours="allowedHours"
                    @change="menuStartTime = false;"
                  ></v-time-picker>
                </v-menu>
                <v-menu
                  ref="finishTimeMenu"
                  :close-on-content-click="false"
                  v-model="menuFinishTime"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="gameplay.finishHour"
                    type="time"
                    label="Finish Time"
                    prepend-icon="access_time"
                    readonly
                  ></v-text-field>
                  <v-time-picker
                    v-if="menuFinishTime"
                    full-width
                    format="24hr"
                    :allowedHours="allowedHours"
                    v-model="gameplay.finishHour"
                    @change="menuFinishTime = false;"
                  ></v-time-picker>
                </v-menu>
                <v-select
                  v-model="gameplay.playerCount"
                  :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                  label="Player Count"
                  required
                ></v-select>
                <v-autocomplete
                  v-model="gameplay.game"
                  :items="mainGames"
                  item-text="title"
                  item-value="_id"
                  label="Game"
                ></v-autocomplete>
                <v-select
                  v-model="gameplay.mentor"
                  :items="users"
                  item-text="name"
                  item-value="_id"
                  label="Mentor"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            flat="flat"
            @click="$emit('closeDialog')"
          >
            Cancel
          </v-btn>
          <v-btn
            v-if="!edit"
            flat="flat"
            @click="$emit('closeDialog'); addNewGameplay()"
          >
            Create
          </v-btn>
          <v-btn
            v-if="edit"
            flat="flat"
            @click="$emit('closeDialog'); editSelectedGameplay()"
          >
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      menuStartTime: false,
      menuFinishTime: false,
    };
  },
  computed: {
    gameplay() {
      const tempGameplay = this.initialGameplay;
      if (!tempGameplay.startHour) {
        tempGameplay.startHour = moment().format('HH:mm');
      }
      return tempGameplay;
    },
    ...mapGetters([
      'mainGames',
      'users',
    ]),
  },
  props: {
    initialGameplay: Object,
    tableId: String,
    dialog: Boolean,
    edit: Boolean,
  },
  methods: {
    allowedHours: v => v >= 12 && v <= 23,
    addNewGameplay() {
      this.$store.dispatch('addNewGameplay', { gameplay: this.gameplay, tableId: this.tableId });
    },
    updateGameplay() {
      this.$store.dispatch('updateGameplay', this.gameplay);
    },
    deleteGameplay() {
      this.$store.dispatch('deleteGameplay', { gameplayId: this.gameplay._id, tableId: this.tableId });
    },
  },
};
</script>
