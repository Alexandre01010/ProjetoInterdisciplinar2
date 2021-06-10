<template>
    <b-tr id="tabelaCandidaturas" class="text-center tabledata">
        <b-td class="candTd">{{tableTr.mensagem}}</b-td>
        <b-td class="candTd"><b-button>Candidaturas</b-button></b-td>
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
      change:"",
      titulo:""
    };
  },
  methods: {
      async getCandidaturasByProposal() {
          try{
              await this.$store.dispatch("getCandidaturasByProposal")
          }catch(error){
            console.log(error);
            this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          }
      }
  },
  computed:{
  },
  created(){
      this.getCandidaturasByProposal()
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
.editEscolhaOrdem{
    font-weight: lighter;
    /* border-top: 0 none;
    border-left: 0 none;
    border-right: 0 none; */
    border: 1px solid #c94514;
    outline: 0;
    text-align: right;
}
</style>