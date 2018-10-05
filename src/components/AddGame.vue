<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field
      label="Game Id"
      v-model="id"
      :rules="idRules"
      required
    ></v-text-field>
    <v-text-field
      label="Game Title"
      v-model="title"
      :rules="titleRules"
      required
    ></v-text-field>
    <v-btn
      @click="submit"
      :disabled="!valid"
    >
    submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>
<script>
import axios from 'axios';

export default {
  data: () => ({
    valid: true,
    id: '',
    title: '',
    idRules: [
      v => !!v || 'Game Id is required',
    ],
    titleRules: [
      v => !!v || 'Game title is required',
    ],
    select: null,
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            id: this.id,
            title: this.title,
          },
          url: 'http://localhost:8081/games',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal('Great!', 'Game added successsfully!', 'success');
            this.$router.push({ name: 'Games' });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal('Oh oo!', 'Could not add the game!', 'error');
          });
      }
      return true;
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
