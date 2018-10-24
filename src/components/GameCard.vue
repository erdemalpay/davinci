<template>
  <v-card>
    <v-layout align-center>
      <v-flex xs4>
        <v-img
          :src="game.thumbnail"
          height="125px"
          contain
        >
        </v-img>
      </v-flex>
      <v-flex xs8>
        <v-layout>
          <v-card-title primary-title>
            <div class="headline">
              <v-btn flat v-bind:to="`/games/${game._id}`">{{ game.title }}</v-btn>
            </div>
          </v-card-title>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>
<script>
export default {
  props: ['game'],
};
</script>

