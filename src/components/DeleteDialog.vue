<template>
  <v-dialog v-model="dialog" width="290px">
    <v-card>
      <v-card-title class="headline">Are you sure to delete?</v-card-title>
      <v-card-actions>
        <v-btn
          flat="flat"
          @click="$emit('closeDialog')"
        >
          Cancel
        </v-btn>
        <v-btn
          flat="flat"
          @click="$emit('closeDialog');$emit('delete', id)"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ['dialog', 'id'],
};
</script>

