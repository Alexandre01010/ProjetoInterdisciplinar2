<template>
  <div id="forumContent" class="d-flex justify-content-center">
    <b-col id="contentContainer" cols="12">
      <div id="forumTitle">
        <b-col cols="12">
          <h3 class="TitlePage">Minhas Candidaturas</h3>
        </b-col>
      </div>
      <div>
        <b-col id="listCards" md="12">
          <div class="mt-3" id="cardsDisplay" v-if="getMyCandid.length > 0">
            <div id="forumContent" class="d-flex justify-content-center">
                <b-table-simple responsive class="table input" borderless hover>
                    <b-tr class="head">
                        <b-th class="text-center">Proposta</b-th>
                        <b-th class="text-center">ordem de escolha</b-th>
                        <b-th class="text-center">Estado</b-th>
                        <b-th class="text-center">Ações</b-th>
                    </b-tr>
                <tableTr v-for="cand in getMyCandid" :key="cand.titulo" :tableTr="cand" />
                </b-table-simple>
            </div>
          </div>
          <div class="align-self-center" v-else>
            <warning message="Não foram encontrados resultados para a pesquisa!"/>
          </div>
        </b-col>
      </div>
    </b-col>
  </div>
</template>
<script>
import tableTr from "../components/candidaturaTableData.vue";
import warning from "../components/warning.vue";
//import cardEstagio from '../components/cardEstagio.vue'
export default {
  name: "MinhasCandidaturas.vue",
  components: {
    tableTr,
    //cardEstagio,
    warning,
  },
  data() {
    return {
        selectedCand: "",
    };
  },
  methods: {
      showModal(){
          //v-b-modal="'editCandidaturaModal'"
    
          this.$root.$emit('bv::show::modal', 'editCandidaturaModal', '#btnShow')
      },

      selectCand(cand){
          console.log(cand)
      },
    async getMyAplications() {
        try {
          await this.$store.dispatch("fetchMyCandidaturas");
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
    getMyCandid() {
    try{
        console.log(this.$store.getters.getMyCandidaturas)
        return this.$store.getters.getMyCandidaturas
    }catch(err){
        return[]
    }
    },
  },
  created() {
      this.getMyAplications()
    }
};
</script>
<style scoped>
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
.tabledata {
  font-size: 17px;
}
.head {
  color: #707070;
  font-weight: lighter;
  border-bottom: 1px solid #c94514;
  padding-bottom: 2px;
}
.table {
  background-color: #fff;
  color: #747883;
  font-weight: lighter;
  border: none;
}
.input {
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  border: none;
}
.proposalState {
  color: #fff;
  font-size: 12px;
  font-family: Rubik, sans-serif;
  font-weight: lighter;
}
</style>

