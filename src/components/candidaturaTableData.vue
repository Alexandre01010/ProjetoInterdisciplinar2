<template>

    <b-tr id="tabelaCandidaturas" class="text-center tabledata">
        <b-td class="candTd">{{getProposal}}</b-td>
        <b-td class="candTd"><input min="1" max="5" v-model="change" type="number"></b-td>
        <b-td v-if="tableTr.id_tipo_estado == 1" class="candTd">
            <b-badge class="proposalState" variant="warning">Análise</b-badge>
        </b-td>
        <b-td v-if="tableTr.id_tipo_estado == 3" class="candTd">
            <b-badge class="proposalState" variant="success">Aprovado</b-badge>
        </b-td>
        <b-td>
            
            <router-link class="menuItems" :to="{ name: 'editarCandidatura', params: { proposta: tableTr } }"><b-button class="btn_edit" variant="#0077B6" font-color="#0077B6"><b-icon-pencil-square class="btn ml-1" style="width: 23px; height: 23px"/></b-button></router-link>
            <b-button id="remove" class="btn ml-1"><b-icon-trash-fill style="width: 23px; height: 23px" /></b-button>
        </b-td>
    </b-tr>
    
    
</template>
<script>
export default {
  name: "tbltr",
  props: {
    tableTr: Object,
  },
  data() {
    return {
      username:"",
      change:""
    };
  },
  methods: {
      async getProposalById(){
      try {
          await this.$store.dispatch("fetchProposalById", this.tableTr.id_proposta);
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
      changeValues(){
          this.change = this.tableTr.n_ordem_escolha
      }
  },
  computed:{
      getProposal(){
          return this.$store.getters.getProposalTitle
      }
  },
  created(){
      this.change = this.tableTr.n_ordem_escolha
      this.getProposalById()
  }
}
</script>
<style scoped>
#tabelaCandidaturas{
    font-weight: lighter;
    font-family: Rubik, sans-serif;
}
.candTd{
    text-align: center; 
    vertical-align: middle;
}
.btn {
  color: #0077b6;
  background-color: #fff;
  border: none;
  padding: 0;
}
#remove {
  color: #dc3545;
  background-color: #fff;
  border: none;
}
.proposalState{
    font-weight: lighter;
}
</style>