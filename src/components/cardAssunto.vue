<template>
  <b-col cols="12">
    <b-card class="mt-5 discussionCard">
      <b-col md="12">
        <b-row align-v="center">
          <b-col md="2">
            <b-row>
              <div class="d-flex justify-content-center">
                <b-col>
                  <b-avatar size="50px" :src="fotos"></b-avatar
                ></b-col></div
            ></b-row>
            <b-row class="mt-1"> </b-row>
          </b-col>
          <b-col md="6">
            <b-row>
              {{ assunto.titulo }}
            </b-row>
            <b-row class="mt-4"
              ><b-icon
                icon="chat-left-fill"
                style="width: 20px; height: 20px; color: #c74620"
              />
            </b-row>
            <b-row
              ><div class="d-flex justify-content-center ml-2">
                {{ respostas }}
              </div>
            </b-row>
          </b-col>
          <b-col md="4">
            <router-link
              class="menuItems"
              :to="{
                name: 'respostas',
                params: { tema: assunto, forum: forum },
              }"
              ><b-button id="btnDetails" variant="primary"
                >Respostas</b-button
              ></router-link
            >
          </b-col>
        </b-row>
      </b-col>
    </b-card>
  </b-col>
</template>

<script>
export default {
  data() {
    return {
      fotos: "",
      respostas: 2,
    };
  },
  props: {
    assunto: Object,
    forum: Object,
  },

  methods: {
    async getAnswers() {
      try {
        await this.$store.dispatch("fetchAnswers", this.assunto);
        this.respostas=this.$store.getters.getFilterdAnswers("").length
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

    async getAuthorFoto() {
      try {
        console.log(this.assunto.id_user);
        await this.$store.dispatch("fetchUserById", this.assunto.id_user);
        
        console.log(this.$store.getters.getPretendedUserName);
        this.fotos = this.$store.getters.getPretendedUserName.foto;
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
  computed: {},
  created() {
    this.getAnswers()
    this.getAuthorFoto();
  },
};
</script>

<style></style>
