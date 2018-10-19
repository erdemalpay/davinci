<template>
  <v-dialog v-model="dialog" width="300px">
    <v-card>
      <v-text-field
        label="Name"
        v-model="table.name"
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
      <v-card-actions>
        <v-btn
          @click="$emit('closeDialog')"
        >
          Cancel
        </v-btn>
        <v-btn
          v-if="!edit"
          @click="$emit('closeDialog');addNewTable()"
        >
          Create
        </v-btn>
        <v-btn
          v-if="edit"
          @click="$emit('closeDialog');saveTable()"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex';
import moment from 'moment';

export default {
  props: ['edit', 'dialog', 'initialTable'],
  computed: {
    table() {
      const tempTable = this.initialTable;
      if (!tempTable.startHour) {
        tempTable.startHour = moment().format('HH:mm');
      }
      return tempTable;
    },
  },
  methods: {
    ...mapActions([
      'fetchTables',
    ]),
    addNewTable() {
      this.$store.dispatch('addNewTable', this.table);
    },
    updateTable() {
      this.$store.dispatch('updateTable', this.table);
    },
  },
};
</script>
