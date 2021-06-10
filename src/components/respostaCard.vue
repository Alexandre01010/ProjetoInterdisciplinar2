<template>
  <div class="alert">
    <b-row class="mt-2">
      <b-col md="2">
        <b-avatar size="50px" :src="getFoto"></b-avatar>
      </b-col>
      <b-col md="6">
        {{ answer.texto_resposta }}
      </b-col>
      <b-col md="4" class=" d-flex justify-content-end">
        <b-icon
          icon="chat-left-fill"
          style="width: 20px; height: 20px; color: #c74620"
        />
        <b-icon-arrow-up
          style="width: 25px; height: 25px; color: #0077b6"
          class="arrow-up-short ml-3"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    answer: Object,
  },
  methods: {
    async getAuthorFoto() {
      try {
        await this.$store.dispatch("fetchUserById", this.answer.id_user);
      } catch (error) {
        console.log(error);
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      } finally {
        // calls getter getMessage and result is put inside content component data
        this.content = this.getMessage;
      }
    },
  },
  computed: {
    getFoto() {
      console.log(this.$store.getters.getPretendedUserName);
      return this.$store.getters.getPretendedUserName.foto;
    },
  },
  created() {
    this.getAuthorFoto();
  },
};
</script>

<style>
.alert {
  border: none;
  border-radius: 19px;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  width: 100%;
}
.alert {
  background-color: #fff;
  font-size: 17px;
  font-family: Rubik, sans-serif;
  border: none;
  border-radius: 36px;
  box-shadow: 2px 3px #d9d9d9;
  width: 99%;
}
</style>
