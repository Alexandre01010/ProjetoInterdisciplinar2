<template>
  <div id="forumContent" class="d-flex justify-content-center">
    <b-col id="contentContainer" cols="12">
      <div id="forumTitle">
        <b-col cols="12">
          <h3 class="TitlePage">Foruns</h3>
        </b-col>
      </div>

      <b-col md="12">
        <b-row>
        <b-col md="8" class="mb-3">
        <b-input
          id="seacrhInput"
          class="mt-5"
          type="text"
          placeholder="Search"
          v-model="search"
        ></b-input></b-col>
        <b-col md="4">
            <b-button @click="$bvModal.show('aprovar_modal')" id="createForum" class="btnOpenForum mt-5"
              >Criar Novo Forum</b-button
            >
          </b-col>
        </b-row>
        <div v-if="getForums.length > 0" class="mt-3">
          <card-forum
            v-for="forum in getForums"
            :key="forum.titulo"
            :forum="forum"
          />
        </div>
        <div class="align-self-center mt-4" v-else>
          <warning
            message="Não foram encontrados resultados para a pesquisa!"
          />
        </div>
      </b-col>
    </b-col>





  <!-- Modal-->

  <b-modal id="aprovar_modal" size="lg" hide-header hide-footer>
        <b-col md="12">
          <b-row>
            <b-col class="items" md="12">
            <b-row>
                <p class="ml-3" id="title">Criar Forum</p>
                <b-button @click="$bvModal.hide('aprovar_modal')" variant="light" class="closeModal">X</b-button>
            </b-row>
            </b-col>
            <!-- <b-col class="d-flex justify-content-end" md="6">
              <b-button @click="$bvModal.hide('aprovar_modal')" variant="light" class="closeModal mb-3">X</b-button>
            </b-col> -->
          </b-row>
        </b-col>
        <div class="d-flex justify-content-center"> 
          <b-col md="8" >
            <b-input-group>
              <b-form-input v-model="titulo" list="my-list-id" placeholder="Título do Fórum" class="input"></b-form-input>
            </b-input-group>
            
              <div v-if="catchAlert.alert" class="d-flex justify-content-center mt-5">
                <b-alert id="alertMessage" show variant="danger">{{catchAlert.alert}}</b-alert>
              </div>
          </b-col>
        </div>
        <div class="d-flex justify-content-center">
          <b-button @click="createForum" id="aprovar" class="btnSubmitValues mt-4" type="submit">Criar Forum</b-button>
        </div>
      </b-modal>




  </div>
</template>

<script>
import cardForum from "../components/cardForum.vue";
import warning from "../components/warning.vue";
export default {
  name: "MinhasPropostas.vue",
  components: {
    cardForum,
    warning,
    //cardEstagio,
  },
  data() {
    return {
      search: "",
      titulo:"",
      catchAlert:{
        alert:""
      }
    };
  },
  methods: {
    async getMyForuns() {
      try {
        await this.$store.dispatch("fetchMyForuns");
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
    async createForum(){
      if (this.titulo==""||this.titulo==undefined||this.titulo==null) {
        this.catchAlert.alert="Introduza um título"
      }else{
        try {
        let newForum={titulo:this.titulo,texto:"texto"}
        await this.$store.dispatch("createForum",newForum);
        //reload na action
      } catch (error) {
        console.log(error);
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }

      }

    }
  },
  computed: {
    getForums() {
      return this.$store.getters.getForuns(this.search);
    },
  },
  created() {
    this.getMyForuns();
  },
};
</script>

<style>
#alertMessage{
  border-radius:25px ;
}
.closeModal {
  background-color: #fff;
  border: none;
  border-radius: 99px !important;
  width: 39px;
  height: 39px;
  color: #757070;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  margin-left:auto;
}
#forumContent {
  margin-top: 20px;
}
.participants {
  font-size: 14px;
}

.TitlePage {
  color: #707070;
  font-size: 30px;
  display: inline-block;
  font-weight: lighter;
  border-bottom: 1px solid #c94514;
  padding-bottom: 2px;
}
#forumCard {
  background-color: #fff;
  font-size: 17px;
  font-family: Rubik, sans-serif;
  border: none;
  border-radius: 36px;
  box-shadow: 2px 3px #d9d9d9;
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
#seacrhInput {
  border: none;
  border-radius: 19px;
  box-shadow: 2px 3px #d9d9d9;
}
#btnOpenForum {
  background-color: #0077b6;
  color: #fff;
  border: none;
  border-radius: 19px;
  width: 159px;
  font-size: 14px;
}
#badgeNotification {
  border-radius: 999px;
}
.cardIdentification {
  color: #767676;
  font-size: 12px;
}
.text-muted {
  font-size: 17px;
}
</style>
