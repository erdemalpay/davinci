<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-dialog
          ref="dialog"
          v-model="dateDialog"
          lazy
          full-width
          width="310px"
        >
          <v-text-field
            slot="activator"
            v-model="date"
            label="Date"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="newDate"
            @input="updateDate(newDate)"></v-date-picker>
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
    <v-flex>
      <TableDialog
        ref="dialogRef"
      >
        <v-btn
            id="addButton"
            fab
            slot="dialogActivator"
            top
            right
            @click="$refs.dialogRef.setDefaultTable()"
          >
          <v-icon>add</v-icon>
        </v-btn>
      </TableDialog>
    </v-flex>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import TableCard from './TableCard';
import TableDialog from './TableDialog';

export default {
  name: 'Tables',
  data() {
    return {
      dateDialog: false,
      newDate: '',
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
    updateDate(date) {
      this.dateDialog = false;
      this.$store.dispatch('updateDate', date);
    },
    makeNewTable() {
      return {
        name: '',
        playerCount: undefined,
        date: this.date,
        startHour: moment().format('HH:mm'),
      };
    },
  },
  components: {
    TableCard,
    TableDialog,
  },
};
</script>

