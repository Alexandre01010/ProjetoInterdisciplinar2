<template>
    <b-tr class="text-center tabledata">
        <b-td class="candTd">{{getProposal}}</b-td>
        <b-td class="candTd">{{tableTr.n_ordem_escolha}}</b-td>
        <b-td v-if="tableTr.id_tipo_estado == 1" class="candTd">
            <b-badge class="proposalState" variant="warning">Análise</b-badge>
        </b-td>
        <b-td v-if="tableTr.id_tipo_estado == 3" class="candTd">
            <b-badge class="proposalState" variant="success">Aprovado</b-badge>
        </b-td>
        <b-td>
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
      username:""
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
      }
  },
  computed:{
      getProposal(){
          return this.$store.getters.getProposalTitle
      }
  },
  created(){
      this.getProposalById()
  }
}
</script>
<style scoped>
.candTd{
    text-align: center; 
    vertical-align: middle;
}
</style>