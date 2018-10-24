<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent>
      <slot name="dialogActivator" slot="activator"></slot>
      <v-card>
        <v-form model="valid" ref="form" lazy-validation>
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
                  <v-text-field
                    type="time"
                    label="Start"
                    v-model="gameplay.startHour"
                  >
                  </v-text-field>
                  <v-text-field
                    type="time"
                    label="Finish"
                    v-model="gameplay.finishHour"
                  >
                  </v-text-field>
                  <v-text-field
                    label="Player Count"
                    type="number"
                    :rules="playerCountRules"
                    required
                    v-model="gameplay.playerCount"
                    min=1
                  >
                  </v-text-field>
                  <v-autocomplete
                    v-model="gameplay.game"
                    :items="mainGames"
                    item-text="title"
                    item-value="_id"
                    required
                    :rules="gameRules"
                    label="Game"
                  ></v-autocomplete>
                  <v-select
                    v-model="gameplay.mentor"
                    :items="users"
                    item-text="name"
                    return-object
                    label="Mentor"
                    :rules="mentorRules"
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            @click="close"
          >
            Cancel
          </v-btn>
          <v-spacer/>
          <v-btn
            @click="submit"
            :disabled="!valid"
          >
            {{ edit ? 'Update' : 'Create' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import Vue from 'vue';
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      valid: true,
      dialog: false,
      menuStartTime: false,
      menuFinishTime: false,
      gameRules: [
        v => !!v || 'Game should be selected',
      ],
      mentorRules: [
        v => !!v || 'Mentor should be selected',
      ],
      playerCountRules: [
        v => !!v || 'Player count should be at least 1',
      ],
      gameplay: {},
    };
  },
  computed: {
    ...mapGetters([
      'mainGames',
      'users',
    ]),
  },
  props: [
    'tableId',
    'edit',
  ],
  methods: {
    ...mapActions([
      'fetchTables',
    ]),
    addNewGameplay() {
      this.$store.dispatch('addNewGameplay', { gameplay: this.gameplay, tableId: this.tableId });
    },
    async updateGameplay() {
      await this.$store.dispatch('updateGameplay', this.gameplay);
      await this.$store.dispatch('fetchTables');
      this.$emit('update');
    },
    setDefaultGameplay(playerCount, date) {
      this.gameplay = {
        startHour: moment().format('HH:mm'),
        playerCount,
        date,
      };
    },
    setGameplay(gameplay) {
      this.gameplay = Vue.util.extend({}, gameplay);
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.close();
        if (this.edit) {
          this.updateGameplay();
        } else {
          this.addNewGameplay();
        }
      }
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>
