<template>
  <v-dialog v-model="dialog" persistent>
    <slot name="dialogActivator" slot="activator"></slot>
    <v-card>
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Name"
          v-model="table.name"
          :rules="nameRules"
          required
        >
        </v-text-field>
        <v-layout>
          <v-flex xs6>
            <v-text-field
              type="time"
              label="Start"
              v-model="table.startHour"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              type="time"
              label="Finish"
              v-model="table.finishHour"
            >
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-text-field
          label="Player Count"
          type="number"
          :rules="playerCountRules"
          required
          v-model="table.playerCount"
          min=1
        >
        </v-text-field>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          @click="close"
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          @click="submit"
          :disabled="!valid"
        >
          {{ edit ? 'Update' : 'Create' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';

export default {
  data() {
    return {
      valid: true,
      nameRules: [
        v => !!v || 'Table name is required',
      ],
      playerCountRules: [
        v => !!v || 'Player count should be at least 1',
      ],
      dialog: false,
      table: {},
    };
  },
  props: ['edit'],
  computed: {
    ...mapGetters([
      'date',
    ]),
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    ...mapActions([
      'fetchTables',
    ]),
    addNewTable() {
      this.$store.dispatch('addNewTable', this.table);
    },
    updateTable() {
      this.$store.dispatch('updateTable', this.table);
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.close();
        if (this.edit) {
          this.updateTable();
        } else {
          this.addNewTable();
        }
      }
    },
    setDefaultTable() {
      this.table = {
        name: '',
        playerCount: undefined,
        date: this.date,
        startHour: moment().format('HH:mm'),
      };
    },
    setTable(table) {
      this.table = Vue.util.extend({}, table);
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>
