<template>
  <v-dialog v-model="dialog">
    <slot name="dialogActivator" slot="activator"></slot>
    <v-card>
      <v-card-title class="headline">Are you sure to delete?</v-card-title>
      <v-card-actions>
        <v-btn
          @click="close"
        >
          Cancel
        </v-btn>
        <v-spacer/>
        <v-btn
          @click="submit"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  props: ['id'],
  methods: {
    submit() {
      this.$emit('delete', this.id);
      this.close();
    },
    close() {
      this.dialog = false;
    },
  },
};
</script>

