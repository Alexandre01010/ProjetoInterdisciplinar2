<template>
    <b-tr id="tabelaCandidaturas" class="text-center tabledata">
        <b-td class="candTd">{{ u_name }}</b-td>
        <b-td class="candTd">{{ tableTr.n_ordem_escolha }}</b-td>
        <b-td class="candTd">
          <b-button class="btn_edit" variant="#0077B6" font-color="#0077B6"><b-icon-pencil-square class="btn ml-1" style="width: 23px; height: 23px"/></b-button>
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
      change:"",
      titulo:"",
      u_name:""
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
      },
    async getAuthorUser() {
      try {
        await this.$store.dispatch("fetchUserById",this.tableTr.id_user);
        
        this.u_name=this.$store.getters.getPretendedUserName.nome
      } catch (error) {
        console.log(error);
        this.content =
          (error.response && error.response.data) ||  error.message || error.toString();
      } finally {
        // calls getter getMessage and result is put inside content component data
        this.content = this.getMessage;
      }
    },
  },
  computed:{
  },
  created(){
      this.getCandidaturasByProposal()
      this.getAuthorUser()
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