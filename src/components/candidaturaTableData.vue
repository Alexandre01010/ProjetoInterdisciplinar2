<template>

    <b-tr id="tabelaCandidaturas" class="text-center tabledata">
        <b-td class="candTd">{{titulo}}</b-td>
        <b-td v-if="tableTr.id_tipo_estado == 1" class="candTd"><input class="editEscolhaOrdem" min="1" max="5" v-model="change" type="number"></b-td>
        <b-td v-if="tableTr.id_tipo_estado == 3" class="candTd">{{tableTr.n_ordem_escolha}}</b-td>
        <b-td v-if="tableTr.id_tipo_estado == 1" class="candTd">
            <b-badge class="proposalState" variant="warning">Análise</b-badge>
        </b-td>
        <b-td v-if="tableTr.id_tipo_estado == 3" class="candTd">
            <b-badge class="proposalState" variant="success">Aprovado</b-badge>
        </b-td>
        <b-td class="candTd" v-if="tableTr.id_tipo_estado == 1"> 
            <b-button @click="updateCandidatura" class="btn_edit" variant="#0077B6" font-color="#0077B6"><b-icon-pencil-square class="btn ml-1" style="width: 23px; height: 23px"/></b-button>
            <b-button @click="deleteCandidatura" id="remove" class="btn ml-1"><b-icon-trash-fill style="width: 23px; height: 23px" /></b-button>
        </b-td>
        <b-td class="candTd" v-if="tableTr.id_tipo_estado == 3"> 
            <p>Fechado</p>
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
      titulo:""
    };
  },
  methods: {
      async getProposalById(){
      try {
          await this.$store.dispatch("fetchProposalById", this.tableTr.id_proposta);
          this.titulo = this.$store.getters.getProposalTitle
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
      },

      async updateCandidatura(){
          this.tableTr.n_ordem_escolha = +this.change
          try{
            await this.$store.dispatch("putUpdateCandidatura", this.tableTr)
            location.reload()
          }catch(error){
            console.log(error);
            this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          }finally {
          // calls getter getMessage and result is put inside content component data
          this.content = this.getMessage;
        }
      },
      //deleteMyCandidatura
      async deleteCandidatura(){
          try{
            await this.$store.dispatch("deleteMyCandidatura", this.tableTr)
            location.reload()
          }catch(error){
            console.log(error);
            this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          }finally{
            this.content = this.getMessage;
          }
      },
  },
  computed:{
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