<template>
  <div class="page" id="forumContent">
    <b-col md="12">
      <b-col md="12">
        <p id="title" class="mb-5">Forum - {{ forum.titulo }}</p>
      </b-col>
      <b-col md="12">
        <b-row>
          <b-col md="8" class="mb-3">
            <b-input
              id="seacrhInput"
              v-model="search"
              type="text"
              placeholder="Search"
            ></b-input>
          </b-col>
          <b-col md="4" class="d-flex justify-content-end">
            <b-button
              @click="$bvModal.show('aprovar_modal')"
              id="createDiscuss"
              class="btnOpenForum"
              >Criar Assunto</b-button
            >
          </b-col>
        </b-row>
        <b-row class="mt-3" v-if="getTemas.length > 0">
          <cardAssunto
            v-for="assunto in getTemas"
            :key="assunto.id_tema"
            :assunto="assunto"
            :forum="forum"
          />
        </b-row>

        <div class="align-self-center mt-3" v-else>
          <warning
            message="Não foram encontrados resultados para a pesquisa!"
          />
        </div>
      </b-col>
    </b-col>

    <!-- MODAL -->
    <b-modal id="aprovar_modal" size="lg" hide-header hide-footer>
      <b-col md="12">
        <b-row>
          <b-col class="items" md="12">
            <b-row>
              <p class="ml-3" id="title">Criar Assunto</p>
              <b-button
                @click="$bvModal.hide('aprovar_modal')"
                variant="light"
                class="closeModal"
                >X</b-button
              >
            </b-row>
          </b-col>
          <!-- <b-col class="d-flex justify-content-end" md="6">
              <b-button @click="$bvModal.hide('aprovar_modal')" variant="light" class="closeModal mb-3">X</b-button>
            </b-col> -->
        </b-row>
      </b-col>
      <div class="d-flex justify-content-center">
        <b-col md="8">
          <b-input-group>
            <b-form-input
              v-model="titulo"
              list="my-list-id"
              placeholder="Título do assunto"
              class="input"
            ></b-form-input>
          </b-input-group>

          <div
            v-if="catchAlert.alert"
            class="d-flex justify-content-center mt-5"
          >
            <b-alert id="alertMessage" show variant="danger">{{
              catchAlert.alert
            }}</b-alert>
          </div>
        </b-col>
      </div>
      <div class="d-flex justify-content-center">
        <b-button
          @click="createAssunto"
          id="aprovar"
          class="btnSubmitValues mt-4"
          type="submit"
          >Criar assunto</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import cardAssunto from "../components/cardAssunto.vue";
import warning from "../components/warning.vue";
export default {
  components: {
    warning,
    cardAssunto,
  },
  props: {
    forum: Object,
  },
  data() {
    return {
      search: "",
      titulo: "",
      catchAlert: {
        alert: "",
      },
    };
  },
  methods: {
    async createAssunto() {
      try {
        let newTema = { titulo: this.titulo, id_forum: this.forum.id_forum };
        await this.$store.dispatch("createTema", newTema);
        this.$router.go(-1)
      } catch (error) {
        console.log(error);
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    },
    async getForumTemas() {
      try {
        console.log(this.forum.id_forum + " id do forum");
        await this.$store.dispatch("fetchTemasByIdForum", this.forum);
      } catch (error) {
        console.log(error);
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      } finally {
        this.content = this.getMessage;
      }
    },
  },
  computed: {
    getTemas() {
      return this.$store.getters.getFilterdtemas(this.search);
    },
  },
  created() {
    this.getForumTemas();
    //this.getAuthorFoto();
  },
};
</script>

<style>
#btnDetails {
  background-color: #0077b6;
  color: #fff;
  border: none;
  border-radius: 19px;
  width: 159px;
  font-size: 14px;
  font-family: Rubik, sans-serif;
  font-weight: lighter;
}
.card {
  background-color: #fff;
  font-size: 17px;
  font-family: Rubik, sans-serif;
  border: none;
  border-radius: 36px !important;
  box-shadow: 2px 3px #d9d9d9;
}
.input {
  border-radius: 15px !important;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  border: none;
}
#search {
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  border: none;
  height: 38px;
}
#forumContent {
  margin-top: 20px;
}
#createForum {
  background-color: #0077b6;
  color: #fff;
  border: none;
  border-radius: 19px;
  width: 100%;
  font-size: 14px;
  height: 38px;
}
#createDiscuss {
  background-color: #0077b6;
  color: #fff;
  border: none;
  border-radius: 19px;
  width: 100%;
  font-size: 14px;
  height: 38px;
}
</style>
