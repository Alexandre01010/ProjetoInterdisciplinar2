<template>
  <div class="page" id="forumContent">
    <b-col md="12">
      <b-col md="12">
        <p id="title" class="mb-5">Forum - {{ tema.titulo }}</p>
      </b-col>
      <div>
        <b-col  md="12">
          
            <b-row>
              <b-col md="8">
                <b-input
                  id="seacrhInput"
                  v-model="search"
                  type="text"
                  placeholder="Search"
                ></b-input>
                <br />
                
              </b-col>
              <b-col md="4" class="d-flex justify-content-end">
            <b-button
              @click="$bvModal.show('aprovar_modal')"
              id="createDiscuss"
              class="btnOpenForum"
              >Criar Resposta</b-button
            >
          </b-col>
            </b-row>
          
          <!--Cards-->
          <div class="mt-1" id="cardsDisplay" v-if="getAnswersCp.length > 0">
            
            <respostaCard class="alert mt-3" show variant="light" v-for="answer in getAnswersCp" :key="answer.data_hora" :answer="answer"/>
          </div>
          <div class="align-self-center mt-3" v-else>
            <warning
              message="Não foram encontrados resultados para a pesquisa!"
            />
          </div>
        </b-col>
      </div>
    </b-col>


  <!-- modal -->

<b-modal id="aprovar_modal" size="lg" hide-header hide-footer>
      <b-col md="12">
        <b-row>
          <b-col class="items" md="12">
            <b-row>
              <p class="ml-3" id="title">Criar Resposta</p>
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
              placeholder="Texto de resposta"
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
          @click="createResposta"
          id="aprovar"
          class="btnSubmitValues mt-4"
          type="submit"
          >Criar resposta</b-button
        >
      </div>
    </b-modal>



  </div>
</template>
<script>
import warning from "../components/warning.vue";
import respostaCard from "../components/respostaCard.vue"
//import cardEstagio from '../components/cardEstagio.vue'
export default {
  name: "MinhasPropostas.vue",
  components: {
    warning,
    respostaCard,
  },
  props: {
    tema: Object,
    forum: Object,
  },
  data() {
    return {
      titulo:"",
      selectedOption: "all",
      filterText: "",
      search: "",
      catchAlert: {
        alert: "",
      },
    };
  },
  methods: {
    async createResposta(){
      try {
        let resposta={texto_resposta:this.titulo,id_forum:this.forum.id_forum,id_tema:this.tema.id_tema}
        await this.$store.dispatch("createResposta", resposta);
        this.$router.push({ name: "forum" });
        //navegar Pag anterior
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
    async getAnswers() {
      try {
        await this.$store.dispatch("fetchAnswers", this.tema);
        
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
    getAnswersCp() {
      console.log(this.$store.getters.getFilterdAnswers())
      return this.$store.getters.getFilterdAnswers(this.search);
    },
  },
  created() {
    this.getAnswers();
  },
};
</script>
<style scoped>
#createDiscuss {
  background-color: #0077b6;
  color: #fff;
  border: none;
  border-radius: 19px;
  width: 100%;
  font-size: 14px;
  height: 38px;
}
#forumContent {
  margin-top: 20px;
}
::-webkit-scrollbar {
  width: 14px;
  margin-top: 40px;
}
::-webkit-scrollbar-thumb {
  background: #c94514;
  background-clip: content-box;
  border: 6px solid transparent;
  margin-top: 40px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 14px 14px transparent;
  border: solid 5px transparent;
  margin-top: 40px;
  width: 12px;
}
#cardsDisplay {
  height: 59vh;
  overflow-y: scroll;
}
.TitlePage {
  color: #707070;
  font-size: 30px;
  display: inline-block;
  font-weight: lighter;
  border-bottom: 1px solid #c94514;
  padding-bottom: 2px;
}
#filterBtn {
  background-color: #fff;
  border: none;
  border-radius: 999px;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  width: 100%;
  height: 49px;
  position: relative;
}
#seacrhInput {
  border: none;
  border-radius: 19px;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  height: 49px !important;
}
#dropdownFilter {
  border: none;
  border-radius: 19px;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  color: #707070;
}
#filterInfo {
  background-color: #c94514;
  font-family: Rubik, sans-serif;
  font-weight: lighter;
}
.text {
  color: #707070;
  font-family: Rubik, sans-serif;
  font-weight: lighter;
}
@media (max-width: 719px) {
  #filterButton {
    margin-top: 9px;
    align-content: flex-start;
  }
  #filterBtn {
    width: 100%;
  }
}
</style>
