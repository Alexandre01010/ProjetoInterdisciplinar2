<template>
  <b-card class="mt-3" id="listCard">
    <b-col md="12">
      <p v-if="propCard.id_tipo_estado == 3" class="cardIdentification">
       Proposta {{ propCard.nome_entidade == null ? "Projeto" : "Estágio" }}
        <b-badge class="proposalState ml-2" variant="success">Aprovado</b-badge>
      </p>
      <p v-if="propCard.id_tipo_estado == 2" class="cardIdentification">
       Proposta {{ propCard.nome_entidade == null ? "Projeto" : "Estágio" }}
        <b-badge class="proposalState ml-2" variant="danger">Para revisão</b-badge>
      </p>
      <p v-if="propCard.id_tipo_estado == 1" class="cardIdentification">
       Proposta {{ propCard.nome_entidade == null ? "Projeto" : "Estágio" }}
        <b-badge class="proposalState ml-2" variant="warning">Em Análise</b-badge>
      </p>
    </b-col>
    <b-col md="12">
      <b-row>
        <b-col class="cardInformation" md="8">
          {{ propCard.titulo }}
          <b-col class="text-muted mt-2" md="12">
            <p class="participants">
              9 candidaturas efetuadas
            </p>
          </b-col>
        </b-col>
        <b-col md="4">
          <div class="d-flex justify-content-center">
            <router-link class="menuItems" :to="{ name: 'proposalDetails', params: { proposta: propCard } }"><b-button id="btnDetails" variant="primary">Detalhes</b-button></router-link>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-card>
</template>
<script>
export default {
  name: "CardProjeto",
  props: {
    propCard: Object,
  },
  data() {
    return {
      username:""
    };
  },
  computed:{
    AssignUserName(){
      
      return this.$store.getters.getPretendedUserName.nome
    }
  },
  created(){
    try {
      console.log(this.propCard.id_prof_orientador)
      this.$store.dispatch("fetchUserById",this.propCard.id_prof_orientador);
    } catch (error) {
        console.log(error);
        this.content =(error.response && error.response.data) ||  error.message || error.toString();
      }
    }
  }



</script>
<style scoped>
#listCard {
  background-color: #fff;
  font-size: 17px;
  font-family: Rubik, sans-serif;
  border: none;
  border-radius: 36px;
  box-shadow: 2px 3px #d9d9d9;
  width: 99%;
}
#btnDetails {
  background-color: #0077b6;
  color: #fff;
  border: none;
  border-radius: 19px;
  width: 159px;
  font-size: 14px;
  font-family: Rubik, sans-serif;
  font-weight: lighter;
}
.proposalState {
  color: #fff;
  font-size: 12px;
  font-family: Rubik, sans-serif;
  font-weight: lighter;
}
.profOrientador {
  font-size: 14px;
}
</style>
