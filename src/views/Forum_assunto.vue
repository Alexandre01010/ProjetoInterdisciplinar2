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
          <b-col md="2" class="d-flex justify-content-end">
            <b-button id="createDiscuss" class="btnOpenForum"
              >Criar Assunto</b-button
            >
          </b-col>
          <b-col md="2">
            <b-button id="createForum" class="btnOpenForum"
              >Criar Novo Forum</b-button
            >
          </b-col>
        </b-row>
        <b-row class="mt-3" v-if="getTemas.length>0">
          <b-col  v-for="assunto in getTemas" :key="assunto.id" cols="12" >
            <b-card class="mt-5 discussionCard" >
              <b-col md="12">
                <b-row align-v="center">
                  <b-col md="2">
                    <b-row>
                      <div class="d-flex justify-content-center">
                        <b-col>
                          <b-avatar size="50px" :src="assunto.img"></b-avatar
                        ></b-col></div
                    ></b-row>
                    <b-row class="mt-1">
                      {{ assunto.user }}
                    </b-row>
                  </b-col>
                  <b-col md="6">
                    <b-row>
                      {{ assunto.titulo }}
                    </b-row>
                    <b-row class="mt-4"
                      ><b-icon
                        icon="chat-left-fill"
                        style="width: 20px; height: 20px; color: #c74620" />
                      <b-icon-arrow-up
                        style="width: 25px; height: 25px; color: #0077b6"
                        class="arrow-up-short ml-3"
                    /></b-row>
                    <b-row
                      ><div class="d-flex justify-content-center ml-2">4</div>
                      <div class="d-flex justify-content-center ml-4">5</div>
                    </b-row>
                  </b-col>
                  <b-col md="4">
                    <router-link class="menuItems" :to="{ name: 'forumAnswers', params: { forum: forum } }"><b-button id="btnDetails" variant="primary">Respostas</b-button></router-link>
                  </b-col>
                </b-row>
              </b-col>
            </b-card>
          </b-col>
          
        </b-row>
        <div class="align-self-center" v-else>
            <warning
              message="Não foram encontrados resultados para a pesquisa!"
            />
          </div>
      </b-col>

      <div></div>
    </b-col>
  </div>
</template>

<script>
import warning from "../components/warning.vue";
export default {
  components:{
    warning
  },
  props: {
        forum: Object,
    },
  data() {
    
    return {
      search: "",
      
    };
  },
  methods: {
    async getForumTemas(){
      try {
          console.log(this.forum.id_forum +" id do forum")
          await this.$store.dispatch("fetchTemasByIdForum",this.forum);
        } catch (error) {
          console.log(error);
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        } finally {
          
          this.content = this.getMessage;
        }
    }
  },
  computed:{
    getTemas() {
      
      return this.$store.getters
        .getFilterdtemas(this.search);
    },
  },
  created() {
      this.getForumTemas();
    },
};
</script>

<style  >
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