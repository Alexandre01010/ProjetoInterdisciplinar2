<template>
    <b-tr id="tabelaCandidaturas" class="text-center tabledata">
        <b-td class="candTd">{{ userCandName }}</b-td>
        <b-td class="candTd">{{ tableTr.n_ordem_escolha }}</b-td>
        <b-td class="candTd">{{ tableTr.mensagem }}</b-td>
        <b-td class="candTd">
          <b-button v-if="tableTr.id_tipo_estado == 1" @click="aceitar" class="btn_edit" variant="#0077B6" font-color="#0077B6"><b-icon icon="check2-circle" class="btn ml-3" style="width: 23px; height: 23px"/></b-button>
          <b-button v-if="tableTr.id_tipo_estado == 1" id="remove" class="btn ml-3"><b-icon icon="x-circle" style="width: 23px; height: 23px" /></b-button>
          <b-badge v-if="tableTr.id_tipo_estado == 3" class="proposalState" variant="success">Aprovado</b-badge>
          <b-badge v-if="tableTr.id_tipo_estado == 7" class="proposalState" variant="danger">Recusado</b-badge>
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
      userCandName:""
    };
  },
  methods: {

    async aprovar(id_user, id_proposta){
      try{
        let cand = {id_user: id_user, id_proposta: id_proposta, id_tipo_estado: 3}
        await this.$store.dispatch("putUpdateCandidaturaState", cand)

      }catch(error){
        console.log(error)
      }
    },

    async recusar(id_user, id_proposta){
      try{
        let cand = {id_user: id_user, id_proposta: id_proposta, id_tipo_estado: 7}
        await this.$store.dispatch("putUpdateCandidaturaState", cand)
      }catch(error){
        console.log(error)
      }
    },

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
        
        this.userCandName=this.$store.getters.getPretendedUserName.nome
      } catch (error) {
        console.log(error);
        this.content =
          (error.response && error.response.data) ||  error.message || error.toString();
      } finally {
        // calls getter getMessage and result is put inside content component data
        this.content = this.getMessage;
      }
    },

    async aceitar(){
      try{
      let response =  await this.$store.dispatch("fetchCandidaturas")
      console.log("Response: " + response)
      response.data.forEach(element => {
      if(element.id_proposta == this.tableTr.id_proposta){
        if(element.id_user == this.tableTr.id_user){
          console.log(element.id_user, element.id_proposta)
          this.aprovar(element.id_user, element.id_proposta)
        }else{
          console.log(element.id_user, element.id_proposta)
          this.recusar(element.id_user, element.id_proposta)
        }
      }
      });
      response.data.forEach(element => {
        if(element.id_user == this.tableTr.id_user){
          if(element.id_proposta != this.tableTr.id_proposta){
            this.recusar(element.id_user, element.id_proposta)
          }
        }
      })
      this.$router.push({ name: "aprovarCandidaturas" })
      }catch(error){
        console.log(error)
      }
    }
  },
  computed:{
  },
  created(){
      console.log("Em baixo created")
      console.log(this.tableTr)
      this.getAuthorUser()
      this.getCandidaturasByProposal()
  },
  updated(){
    console.log(this.tableTr.id_tipo_estado)
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