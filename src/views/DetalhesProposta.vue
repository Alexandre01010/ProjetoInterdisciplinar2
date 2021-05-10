<template>
  <div>
    <b-col md="12">
      <p id="title">{{ proposta.titulo }} - Detalhes</p>
      <b-card class="proposalDetails">
        <b-card-text>
          <p v-if="proposta.tipo != 'estagio'" class="type">Projeto ESMAD</p>
          <p v-else class="type">Estágio ESMAD</p>
          <p class="title">{{ proposta.titulo }}</p>
          <p class="header">Autor:</p>
          <p class="text">{{ proposta.user }}</p>
          <p class="header">Objetivos:</p>
          <p class="text">{{ proposta.objetivos }}</p>
          <p class="header">Plano Provisório de Trabalho:</p>
          <p class="text">{{ proposta.plano }}</p>
          <p class="header">Perfil do candidato desejado:</p>
          <p class="text">{{ proposta.perfil }}</p>
          <p class="header">Resultados Esperados:</p>
          <p class="text">{{ proposta.resultados }}</p>
        </b-card-text>
      </b-card>
    </b-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      admin: this.$store.getters.getLoggedUser.name == "CCA" ? true : false,
      form: {
        orientador: "",
        revisao: "",
        candidatura: "",
        ordem: 1,
        user: this.$store.getters.getLoggedUser.name,
      },
      notification: {
        id: this.$store.getters.getNextnotificationId,
        message: "",
        username: "",
        userSend: "",
        userSendPhoto: "",
      },

      users: this.$store.getters.getUsers.filter(
        (user) => user.selected == "docente"
      ),
      proposta: this.$store.getters.getProposals.filter(
        (proposal) => proposal.id == this.$route.params.id
      )[0],
    };
  },
  methods: {
    editar() {},
    eliminar() {
      this.$store.dispatch("eliminar", this.$route.params.id);
      this.$router.go(-1);
    },
    aprovar() {
      this.notification.message =
        "A tua proposta '" + this.proposta.titulo + "' foi aprovada";
      this.notification.username = this.proposta.user;
      this.notification.userSend = this.$store.getters.getLoggedUser.name;
      this.notification.userSendPhoto = this.$store.getters.getLoggedUser.img;
      this.$store.dispatch("registerNotification", this.$data.notification);
      this.$store.dispatch("aprovar", this.$data);
    },
    revisao() {
      this.notification.message =
        "A tua proposta '" +
        this.proposta.titulo +
        "' foi enviada para revisão. Para mais informações consulte a proposta";
      console.log(this.proposta);
      this.notification.username = this.proposta.user;
      this.notification.userSend = this.$store.getters.getLoggedUser.name;
      this.notification.userSendPhoto = this.$store.getters.getLoggedUser.img;
      this.$store.dispatch("registerNotification", this.$data.notification);
      this.$store.dispatch("revisao", this.$data);
      //let user=this.proposal.user;
      //console.log(user)
    },
    candidatar() {
      this.$store.dispatch("candidatar", this.$data);
    },
  },
};
</script>
<style scoped>
.proposalDetails {
  background-color: #f5f5f5;
  border-radius: none;
  box-shadow: none;
  border: none;
}
.text {
  font-weight: lighter;
  font-size: 17px;
  color: #767676;
  word-wrap: break-word;
}
.header {
  font-weight: 700;
  color: #707070;
  font-size: 20px;
  border-bottom: 1px solid #c94514;
  padding-bottom: 1px;
  display: inline-block;
}
.title {
  font-weight: 700;
  color: #000;
  font-size: 23px;
  text-overflow: ellipsis;
}
.type {
  font-weight: 700;
  color: #767676;
  font-size: 15px;
}
</style>