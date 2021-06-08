<template>
  <div id="forumContent" class="d-flex justify-content-center">
  <b-table-simple class="table input" borderless hover>
    <b-tr class="head">
      <b-th class="text-center">Proposta</b-th>
      <b-th class="text-center">ordem de escolha</b-th>
      <b-th class="text-center">Estado</b-th>
      <b-th class="text-center">Ações</b-th>
    </b-tr>
    <b-tr
      class="text-center tabledata"
    >
      <b-td>Desenvolvimento de uma aplicação de deteção</b-td>
      <b-td>9</b-td>
          <b-td><b-badge class="proposalState" variant="success">Aprovado</b-badge></b-td>
      <b-td>
        <b-button
          class="btn_edit"
          variant="#0077B6"
          font-color="#0077B6"
          ><b-icon-pencil-square
            class="btn mr-4"
            style="width: 23px; height: 23px"
        /></b-button>
        <b-button id="remove" class="btn mr-4"
          ><b-icon-trash-fill style="width: 23px; height: 23px" />
        </b-button>
      </b-td>
    </b-tr>
  </b-table-simple>
  </div>
</template>
<script>
// import cardProjeto from "../components/cardProjeto.vue";
// import warning from "../components/warning.vue";
// //import cardEstagio from '../components/cardEstagio.vue'
// export default {
//   name: "MinhasPropostas.vue",
//   components: {
//     cardProjeto,
//     //cardEstagio,
//     warning,
//   },
//   data() {
//     return {
//       selectedOption: "all",
//       selectedState: "all",
//       stateText: "Todas Propostas",
//       filterText: "",
//       search: "",
//     };
//   },
//   methods: {
//     filterProjeto() {
//       this.selectedOption = "projeto";
//       this.filterText = "Projeto";
//     },
//     filterEstagio() {
//       this.selectedOption = "estagio";
//       this.filterText = "Estágio";
//     },
//     allProposals() {
//       this.selectedOption = "all";
//       this.selectedState = "all";
//     },

//     filterAprovado() {
//       this.selectedState = "aprovado";
//       this.stateText = "Aprovadas";
//     },
//     filterAnalise() {
//       this.selectedState = "analise";
//       this.stateText = "Análise";
//     },
//     filterRevisao() {
//       this.selectedState = "revisao";
//       this.stateText = "Revisão";
//     },
//     async getMyProposals() {
//         try {
//           await this.$store.dispatch("fetchMyProposals");
//         } catch (error) {
//           console.log(error);
//           this.content =
//             (error.response && error.response.data) ||
//             error.message ||
//             error.toString();
//         } finally {
//           // calls getter getMessage and result is put inside content component data
//           this.content = this.getMessage;
//         }
//       },
//   },
//   computed: {
//     getProposals() {
//       return this.$store.getters
//         .getFilterdProposals(this.selectedOption, this.search);
//     },
//   },
//   created() {
//       this.getMyProposals();
//     },
// };
</script>
<style scoped>
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
b-td{
    text-align: center; 
    vertical-align: middle;

}
</style>
