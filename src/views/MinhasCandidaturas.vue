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
          <div id="inputFilters" class="mt-5">
            <b-row>
              <b-col md="9">
                <b-input id="seacrhInput" v-model="search" type="text" placeholder="Search"></b-input>
                <br/>
                <div v-if="selectedOption != 'all'">
                  <p class="text">
                    Filtros:
                    <b-badge id="filterInfo" class="mr-1">{{ filterText }}</b-badge>
                    <b-badge id="filterInfo" class="mr-1">{{ getProposals.length }} resultados</b-badge>
                  </p>
                </div>
              </b-col>
              <b-col id="filterButton" class="d-flex justify-content-end" md="3">
                <b-button id="filterBtn" variant="light" data-bs-toggle="dropdown"><b-icon icon="filter-right" aria-hidden="true"></b-icon></b-button>
                <ul id="dropdownFilter" class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                  <li>
                    <a @click="allProposals" class="dropdown-item">Todas</a>
                  </li>
                  <li>
                    <a @click="filterProjeto" class="dropdown-item">Proposta Projeto</a>
                  </li>
                  <li>
                    <a @click="filterEstagio" class="dropdown-item">Proposta Estágio</a>
                  </li>
                </ul>
              </b-col>
            </b-row>
          </div>
          <!--Cards-->
          <div class="mt-3" id="cardsDisplay" v-if="getProposals.length > 0">
            <div id="forumContent" class="d-flex justify-content-center">
                <b-table-simple responsive class="table input" borderless hover>
                    <b-tr class="head">
                        <b-th class="text-center">Proposta</b-th>
                        <b-th class="text-center">ordem de escolha</b-th>
                        <b-th class="text-center">Estado</b-th>
                        <b-th class="text-center">Ações</b-th>
                    </b-tr>
                    <b-tr class="text-center tabledata">
                        <b-td class="candTd">Desenvolvimento de uma aplicação de deteção</b-td>
                        <b-td class="candTd">9</b-td>
                        <b-td class="candTd"><b-badge class="proposalState" variant="success">Aprovado</b-badge></b-td>
                        <b-td>
                            <b-button class="btn_edit" variant="#0077B6" font-color="#0077B6"><b-icon-pencil-square class="btn ml-1" style="width: 23px; height: 23px"/></b-button>
                            <b-button id="remove" class="btn ml-1"><b-icon-trash-fill style="width: 23px; height: 23px" /></b-button>
                        </b-td>
                    </b-tr>
  </b-table-simple>
  </div>
          </div>
          <div class="align-self-center" v-else>
            <warning
              message="Não foram encontrados resultados para a pesquisa!"
            />
          </div>
        </b-col>
      </div>
    </b-col>
  </div>
</template>
<script>
//import cardProjeto from "../components/cardProjeto.vue";
import warning from "../components/warning.vue";
//import cardEstagio from '../components/cardEstagio.vue'
export default {
  name: "MinhasPropostas.vue",
  components: {
    //cardProjeto,
    //cardEstagio,
    warning,
  },
  data() {
    return {
      selectedOption: "all",
      selectedState: "all",
      stateText: "Todas Propostas",
      filterText: "",
      search: "",
    };
  },
  methods: {
    filterProjeto() {
      this.selectedOption = "projeto";
      this.filterText = "Projeto";
    },
    filterEstagio() {
      this.selectedOption = "estagio";
      this.filterText = "Estágio";
    },
    allProposals() {
      this.selectedOption = "all";
      this.selectedState = "all";
    },

    filterAprovado() {
      this.selectedState = "aprovado";
      this.stateText = "Aprovadas";
    },
    filterAnalise() {
      this.selectedState = "analise";
      this.stateText = "Análise";
    },
    filterRevisao() {
      this.selectedState = "revisao";
      this.stateText = "Revisão";
    },
    async getMyProposals() {
        try {
          await this.$store.dispatch("fetchMyProposals");
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
    getProposals() {
      return this.$store.getters
        .getFilterdProposals(this.selectedOption, this.search);
    },
  },
  created() {
      this.getMyProposals();
    },
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
#remove {
  color: #dc3545;
  background-color: #fff;
  border: none;
}
.btn {
  color: #0077b6;
  background-color: #fff;
  border: none;
  padding: 0;
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
.candTd{
    text-align: center; 
    vertical-align: middle;
}
</style>

