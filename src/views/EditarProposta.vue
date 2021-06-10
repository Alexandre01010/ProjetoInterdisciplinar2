<template>
  <div>
    <b-col md="12">
      <p id="title">{{ propostaProp.titulo }} - Detalhes</p>
      <!-- <input class="editEscolhaOrdem" min="1" max="5" v-model="change" type="number"> -->
      <b-card class="proposalDetails">
        <b-card-text>
          <p v-if="propostaProp.nome_entidade == null" class="type">Projeto ESMAD</p>
          <p v-else class="type">Estágio ESMAD</p>
          <input maxlength="50" class="text mb-3" type="text" v-model="edit.titulo">
          <br>
          <p class="header">Autor:</p>
          <p class="textNotEditable">{{ getName }}</p>
          <p class="header">Objetivos:</p>
          <br>
          <textarea rows="4" cols="99" class="text mb-3" type="text" v-model="edit.objetivos"></textarea>
          <br>
          <p class="header">Plano Provisório de Trabalho:</p>
          <br>
          <textarea rows="4" cols="99" class="text mb-3" type="text" v-model="edit.planoTrabalho"></textarea>
          <br>
          <p class="header">Recursos necessários:</p>
          <br>
          <textarea rows="4" cols="99" class="text mb-3" type="text" v-model="edit.recursosNecessarios"></textarea>
          <br>
          <p class="header">Perfil do candidato desejado:</p>
          <br>
          <textarea rows="4" cols="99" class="text mb-3" type="text" v-model="edit.perfilCandidato"></textarea>
          <br>
          <p class="header">Resultados Esperados:</p>
          <br>
          <textarea rows="4" cols="99" class="text mb-3" type="text" v-model="edit.resultadosEsperados"></textarea>
          <br>
          <p class="header">Outros Dados:</p>
          <br>
          <textarea rows="4" cols="99" class="text mb-3" type="text" v-model="edit.outrosDados"></textarea>
          <br>
          <p v-if="propostaProp.id_tipo_estado == 3" class="header">Professor orientador:</p>
          <p v-if="propostaProp.id_tipo_estado == 3" class="text">{{ getProfessores }}</p>
          <p v-if="propostaProp.nome_entidade != null" class="header">Tutor:</p>
          <br>
          <input v-if="propostaProp.nome_entidade != null" class="text mb-3" type="text" v-model="edit.tutor">
          <br>
          <p v-if="propostaProp.nome_entidade != null" class="header">Cargo do tutor:</p>
          <br>
          <input v-if="propostaProp.nome_entidade != null" class="text mb-3" type="text" v-model="edit.cargoTutor">
          <br>
          <p v-if="propostaProp.nome_entidade != null" class="header">Contacto entidade:</p>
          <br>
          <input v-if="propostaProp.nome_entidade != null" class="text mb-3" type="text" v-model="edit.contatoEntidade">
          <br>
          <p v-if="propostaProp.nome_entidade != null" class="header">Nome entidade:</p>
          <br>
          <input v-if="propostaProp.nome_entidade != null" class="text mb-3" type="text" v-model="edit.nomeEntidade">
          <br>
          <p v-if="propostaProp.nome_entidade != null" class="header">Morada da entidade:</p>
          <br>
          <input v-if="propostaProp.nome_entidade != null" class="text mb-3" type="text" v-model="edit.moradaEntidade">
          <br>
          <p v-if="propostaProp.nome_entidade != null" class="header">Email entidade:</p>
          <br>
          <input v-if="propostaProp.nome_entidade != null" class="text mb-3" type="text" v-model="edit.emailEntidade">
          <br>
        </b-card-text>
      </b-card>
      <b-button @click="updateProposal" v-if="userAutorId == propostaProp.id_user_autor && (propostaProp.id_tipo_estado == 1 || propostaProp.id_tipo_estado == 2)" id="btnOpenForum" class="btnOpenForum ml-3 mb-4 mt-4" variant="light">Editar</b-button>
      <router-link class="menuItems" :to="{ name: 'proposalDetails', params: { proposta: propostaProp } }"><b-button id="btnOpenForum" class="btnOpenForum ml-3 mb-4 mt-4" variant="light">Voltar</b-button></router-link>
    </b-col>
  </div>
</template>
<script>
export default {
  props: {
        propostaProp: Object,
    },
  data() {
    return {
      admin: this.$store.getters.getLoggedUser.name == "CCA" ? true : false,
      form: {
        orientador: null,
        revisao: "",
        candidatura: "",
        ordem: 1,
        user: this.$store.getters.getLoggedUser.name,
      },
      edit: {
          titulo: "",
          objetivos:"",
          planoTrabalho:"",
          recursosNecessarios:"",
          perfilCandidato:"",
          resultadosEsperados:"",
          outrosDados:"",
          cargoTutor:"",
          contatoEntidade:"",
          nomeEntidade:"",
          moradaEntidade:"",
          emailEntidade:"",
          tutor:""
      },
      notification: {
        id: this.$store.getters.getNextnotificationId,
        message: "",
        username: "",
        userSend: "",
        userSendPhoto: "",
      },
      catchAlert: {
        alert: "",
      },

      userAutor:"",
      roleUser:"",
      userAutorId:""
    };
  },
  methods: {
    editar() {},
    getRole(){
      this.roleUser = JSON.parse(localStorage.getItem('user')).role
    },
    getUserId(){
      this.userAutorId = JSON.parse(localStorage.getItem('user')).id
    },
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

    async updateProposalState(){
      try{
        await this.$store.dispatch("putAproveProposal", {id_proposta: this.proposta.id_proposta, id_tipo_estado: 3, id_prof_orientador: this.getAllProfs.filter(prof => prof.nome == this.form.orientador)[0].id_user })
        this.$router.push({ name: "aproveProposals" });
      }catch(error){
        this.catchAlert.alert = error;
      }
    },

    async updateProposalStateRevisao(){
      try{
        await this.$store.dispatch("putAproveProposal", {id_proposta: this.proposta.id_proposta, id_tipo_estado: 2, msgRevisao: this.form.revisao})
        this.$router.push({ name: "aproveProposals" });
      }catch(error){
        console.log(error)
      }
    },

    async getProfNames(){
      try {
        await this.$store.dispatch("fetchUserByType", 2)
      } catch (error) {
        console.log(error);
        this.content =
          (error.response && error.response.data) ||  error.message || error.toString();
      } finally {
        // calls getter getMessage and result is put inside content component data
        this.content = this.getMessage;
      }
    },
    async updateProposal(){
        this.propostaProp.titulo = this.edit.titulo
        this.propostaProp.objetivos = this.edit.objetivos
        this.propostaProp.plano_provisorio_trabalho = this.edit.planoTrabalho
        this.propostaProp.recursos_necessarios = this.edit.recursosNecessarios
        this.propostaProp.perfil_candidato_desejado = this.edit.perfilCandidato
        this.propostaProp.resultados_esperados = this.edit.resultadosEsperados
        this.propostaProp.outros_dados = this.edit.outrosDados
        this.propostaProp.cargo_tutor = this.edit.cargoTutor
        this.propostaProp.contato = this.edit.contatoEntidade
        this.propostaProp.nome_entidade = this.edit.nomeEntidade
        this.propostaProp.morada_entidade = this.edit.moradaEntidade
        this.propostaProp.email = this.edit.emailEntidade
        this.propostaProp.nome_tutor = this.edit.tutor

        try{
            if(this.propostaProp.id_tipo_estado == 2){
                this.propostaProp.id_tipo_estado = 1
            }
            await this.$store.dispatch('putUpdateProposal', this.propostaProp)
            this.$router.push({ name: "myProposals" });
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
    getName(){
      return this.$store.getters.getPretendedUserName.nome
    },

    getAllProfs(){
      return this.$store.getters.getUsers
    },

    getProfessores(){
      try{
        return this.$store.getters.getUsers.filter(prof => prof.id_user == this.proposta.id_prof_orientador)[0].nome
      }catch(error){
        return {nome: "vazio"}
      }

    }
  },

  created(){
    this.getAuthorUser();

    this.getRole()

    this.getProfNames()

    this.getUserId()
    try {
      this.$store.dispatch("fetchUserById",this.propCard.id_prof_orientador);
    } catch (error) {
        console.log(error);
        this.content =(error.response && error.response.data) ||  error.message || error.toString();
    }

    this.edit.titulo = this.propostaProp.titulo
    this.edit.objetivos = this.propostaProp.objetivos
    this.edit.planoTrabalho = this.propostaProp.plano_provisorio_trabalho
    this.edit.recursosNecessarios = this.propostaProp.recursos_necessarios
    this.edit.perfilCandidato = this.propostaProp.perfil_candidato_desejado
    this.edit.resultadosEsperados = this.propostaProp.resultados_esperados
    this.edit.outrosDados = this.propostaProp.outros_dados
    this.edit.cargoTutor = this.propostaProp.cargo_tutor
    this.edit.contatoEntidade = this.propostaProp.contato
    this.edit.nomeEntidade = this.propostaProp.nome_entidade
    this.edit.moradaEntidade = this.propostaProp.morada_entidade
    this.edit.emailEntidade = this.propostaProp.email
    this.edit.tutor = this.propostaProp.nome_tutor
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
.textNotEditable{
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
#alertMessage {
  background-color: white;
  color: red;
  border: none;
  font-size: 19px;
}
.closeModal {
  background-color: #fff;
  border: none;
  border-radius: 99px;
  width: 39px;
  height: 39px;
  color: #757070;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  margin-left:auto;
}
.btnSubmitValues{
  border-radius: 19px;
  background-color: #0077b6;
  width: 30%;
  border: none;
  font-weight: lighter;
}
#input-3 {
  background-color: white;
  border-radius: 15px !important;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  border: none;
}
.text{
    font-weight: lighter;
    border-top: 0 none;
    border-left: 1px solid #c94514;
    border-right: 0 none;
    border-bottom: 0 none;
    outline: 0;
    background-color: #f5f5f5;
    border-radius: 3px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    max-width: 100%;
}
</style>