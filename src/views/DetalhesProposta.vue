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
          <p class="text">{{ getName }}</p>
          <p class="header">Objetivos:</p>
          <p class="text">{{ proposta.objetivos }}</p>
          <p class="header">Plano Provisório de Trabalho:</p>
          <p class="text">{{ proposta.plano_provisorio_trabalho }}</p>
          <p class="header">Perfil do candidato desejado:</p>
          <p class="text">{{ proposta.perfil_candidato_desejado }}</p>
          <p class="header">Resultados Esperados:</p>
          <p class="text">{{ proposta.resultados_esperados }}</p>
        </b-card-text>
      </b-card>
    </b-col>
  </div>
</template>
<script>
export default {
  props: {
        proposta: Object,
    },
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

      userAutor:""
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
    async getAuthorUser() {
      try {
        await this.$store.dispatch("fetchUserById",this.proposta.id_user_autor);
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
    getName(){
      return this.$store.getters.getPretendedUserName
    }
  },

  created(){
    this.getAuthorUser();
  }
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