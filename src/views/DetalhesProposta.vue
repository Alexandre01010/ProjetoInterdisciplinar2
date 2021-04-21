<template>
  <div>
    <b-col md="12">
      <p id="title">{{ proposta.titulo }} - Detalhes</p>
      <b-card class="proposalDetails">
        <b-card-text>
          <p v-if="proposta.tipo != 'estagio'" class="type">
                    Projeto ESMAD
                  </p>
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
      notification:{
        id: this.$store.getters.getNextnotificationId,
        message: "",
        username: "",
        userSend:"",
        userSendPhoto: ""
      },

      users: this.$store.getters.getUsers.filter(user=>user.selected=="docente"),
      proposta: this.$store.getters.getProposals.filter(
        (proposal) => proposal.id == this.$route.params.id
      )[0],
    };
  },
  methods: {
    editar() {},
    eliminar() {
      this.$store.dispatch("eliminar",this.$route.params.id)
      this.$router.go(-1)

    },
    aprovar() {
      
      this.notification.message = "A tua proposta '" + this.proposta.titulo + "' foi aprovada"
      this.notification.username = this.proposta.user
      this.notification.userSend = this.$store.getters.getLoggedUser.name
      this.notification.userSendPhoto = this.$store.getters.getLoggedUser.img
      this.$store.dispatch("registerNotification", this.$data.notification)
      this.$store.dispatch("aprovar", this.$data);

    },
    revisao() {
      this.notification.message = "A tua proposta '" + this.proposta.titulo + "' foi enviada para revisão. Para mais informações consulte a proposta"
      console.log(this.proposta)
      this.notification.username = this.proposta.user
      this.notification.userSend = this.$store.getters.getLoggedUser.name
      this.notification.userSendPhoto = this.$store.getters.getLoggedUser.img
      this.$store.dispatch("registerNotification", this.$data.notification)
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
.range {
  width: 100%;
}
.modal-content{
  background-color: #f5f5f5 !important;
}
.proposalDetails{
  background-color: #f5f5f5;
  border-radius: none;
  box-shadow: none;
  border: none;
}
.subtext {
  font-weight: lighter;
  font-size: 17px;
  color: #767676;
  margin-bottom: 2px;
}
#revisao {
  background-color: #0077b6;
  width: 200px;
  height: 40px;
  border-radius: 18px;
  font-weight: lighter;
  font-size: 17px;
  border: none;
}
#input-3 {
  background-color: white;
  border-radius: 15px !important;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  border: none;
}

#aprovar {
  background-color: #0077b6;
  width: 200px;
  height: 40px;
  border-radius: 18px;
  font-weight: lighter;
  font-size: 17px;
  border: none;
}
#scrollarea-invalid::-webkit-scrollbar-track {
  border-radius: 999px;
  width: 2px;
  margin-top: 50px;
  margin-left: 20px;
  background: white;
  margin-bottom: 20px;
}

#scrollarea-invalid::-webkit-scrollbar {
  width: 12px;
  height: 18px;
}

#scrollarea-invalid::-webkit-scrollbar-thumb {
  height: 6px;
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  -webkit-border-radius: 7px;
  background-color: #c94514;
  -webkit-box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05),
    inset 1px 1px 0px rgba(0, 0, 0, 0.05);
}

.text {
  font-weight: lighter;
  font-size: 17px;
  color: #767676;
  word-wrap:break-word;
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
  font-weight: bold;
  color: black;
  font-size: 23px;
  text-overflow: ellipsis;
}
.type {
  font-weight: bold;
  color: #767676;
  font-size: 15px;
}
#scrollarea-invalid {
  overflow-y: scroll;
  height: 25rem;
  scrollbar-color: #d88363;
}

#scrollarea-content {
  min-height: 101%;
}
.input {
  background-color: white;
  border-radius: 15px !important;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  border: none;
}
#search {
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  border: none;
  height: 38px;
}
#proposalDetail {
  margin-top: 20px;
}

.TitlePage {
  color: #707070;
  font-size: 30px;
  display: inline-block;
  font-weight: lighter;
  border-bottom: 1px solid #c94514;
  padding-bottom: 2px;
}

.btnOpenForum {
  background-color: #0077b6;
  color: white;
  border: none;
  border-radius: 19px;
  width: 159px;
  font-size: 14px;
  height: 38px;
}
#badgeNotification {
  border-radius: 999px;
}
.cardIdentification {
  color: #767676;
  font-size: 12px;
}
.text-muted {
  font-size: 17px;
}
.data{
 width: 163vh;
 height: 100%;
}
@media (max-width: 1090px) {
 .data{
   width: 120vh;
  }
}
@media (max-width: 1200px) {
 .data{
   width: 70vh;
  }
}
@media (max-width: 1200px) {
 .data{
   width: 70vh;
  }
}
</style>