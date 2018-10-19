<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-btn round @click="tableDialog = true" width="100%">Add New Table</v-btn>
        <TableDialog
          :initialTable="{ date }"
          :dialog="tableDialog"
          @closeDialog="tableDialog=false"
          @fetchTables="fetchTables"
        >
        </TableDialog>
      </v-flex>
      <v-flex>
        <v-dialog
          ref="dialog"
          v-model="dateDialog"
          :return-value.sync="date"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="date"
            label="Date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="date"
            @input="$refs.dialog.save(date); fetchTables()"></v-date-picker>
        </v-dialog>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex class="tablecard" xs4 v-for="table in tables" :key="table._id">
        <TableCard
          :table="table"
        ></TableCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import TableCard from './TableCard';
import TableDialog from './TableDialog';

export default {
  name: 'Tables',
  data() {
    return {
      dateDialog: false,
      tableDialog: false,
    };
  },
  computed: {
    ...mapGetters([
      'games',
      'users',
      'tables',
      'date',
    ]),
  },
  mounted() {
    this.fetchGames();
    this.fetchTables();
    this.fetchUsers();
  },
  methods: {
    ...mapActions([
      'fetchGames',
      'fetchTables',
      'fetchUsers',
    ]),
  },
  components: {
    TableCard,
    TableDialog,
  },
};
</script>

