<template>
  <div>
    <b-col md="12">
      <p id="title">{{ proposta.titulo }} - Detalhes</p>
      <b-card class="proposalDetails">
        <b-card-text>
          <p v-if="proposta.nome_entidade == null" class="type">Projeto ESMAD</p>
          <p v-else class="type">Estágio ESMAD</p>
          <p class="title">{{ proposta.titulo }}</p>
          <p class="header">Autor:</p>
          <p class="text">{{ getName }}</p>
          <p class="header">Objetivos:</p>
          <p class="text">{{ proposta.objetivos }}</p>
          <p class="header">Plano Provisório de Trabalho:</p>
          <p class="text">{{ proposta.plano_provisorio_trabalho }}</p>
          <p class="header">Recursos necessários:</p>
          <p class="text">{{ proposta.recursos_necessarios }}</p>
          <p class="header">Perfil do candidato desejado:</p>
          <p class="text">{{ proposta.perfil_candidato_desejado }}</p>
          <p class="header">Resultados Esperados:</p>
          <p class="text">{{ proposta.resultados_esperados }}</p>
          <p class="header">Outros Dados:</p>
          <p class="text">{{ proposta.outros_dados }}</p>
          <p v-if="proposta.id_tipo_estado == 3" class="header">Professor orientador:</p>
          <p v-if="proposta.id_tipo_estado == 3" class="text">{{ getProfessores }}</p>
          <p v-if="proposta.nome_entidade != null" class="header">Tutor:</p>
          <p v-if="proposta.nome_entidade != null" class="text">{{ proposta.nome_tutor }}</p>
          <p v-if="proposta.nome_entidade != null" class="header">Cargo do tutor:</p>
          <p v-if="proposta.nome_entidade != null" class="text">{{ proposta.cargo_tutor }}</p>
          <p v-if="proposta.nome_entidade != null" class="header">Contacto entidade:</p>
          <p v-if="proposta.nome_entidade != null" class="text">{{ proposta.contato }}</p>
          <p v-if="proposta.nome_entidade != null" class="header">Nome entidade:</p>
          <p v-if="proposta.nome_entidade != null" class="text">{{ proposta.nome_entidade }}</p>
          <p v-if="proposta.nome_entidade != null" class="header">Morada da entidade:</p>
          <p v-if="proposta.nome_entidade != null" class="text">{{ proposta.morada_entidade }}</p>
          <p v-if="proposta.nome_entidade != null" class="header">Email entidade:</p>
          <p v-if="proposta.nome_entidade != null" class="text">{{ proposta.email }}</p>
          <p v-if="proposta.id_tipo_estado == 2" class="header">Mensagem de revisão:</p>
          <p v-if="proposta.id_tipo_estado == 2" class="text">{{ proposta.msgRevisao }}</p>
        </b-card-text>
      </b-card>
      <b-col md="12">
        <p class="acoes ml-1">Ações:</p>
      </b-col>
      <b-button v-if="roleUser == 1 && proposta.id_tipo_estado == 1" id="btnOpenForum" class="btnOpenForum mb-4 mt-1 ml-3" variant="light" @click="$bvModal.show('aprovar_modal')">Aprovar</b-button>
      <b-button v-if="roleUser == 1 && proposta.id_tipo_estado == 1" id="btnOpenForum" class="btnOpenForum ml-3 mb-4 mt-1" variant="light" @click="$bvModal.show('enviar_revisao')">Enviar para Revisão</b-button>
      <b-button @click="$router.push({ name: 'editarPropostas', params: { propostaProp: proposta } })" v-if="userAutorId == proposta.id_user_autor && (proposta.id_tipo_estado == 1 || proposta.id_tipo_estado == 2)" id="btnOpenForum" class="btnOpenForum ml-3 mb-4 mt-1" variant="light">Editar</b-button>
      <b-button @click="$bvModal.show('confirmar_apagar')" v-if="userAutorId == proposta.id_user_autor && (proposta.id_tipo_estado == 1 || proposta.id_tipo_estado == 2)" id="btnOpenForum" class="btnOpenForum ml-3 mb-4 mt-1" variant="light">Eliminar Proposta</b-button>
      <b-button @click="goBack" id="btnOpenForum" class="btnOpenForum ml-3 mb-4 mt-1" variant="light">Voltar</b-button>
      <b-modal id="aprovar_modal" size="lg" hide-header hide-footer>
        <b-col md="12">
          <b-row>
            <b-col class="items" md="12">
            <b-row>
                <p class="ml-3" id="title">Atribuição de Tutor ESMAD</p>
                <b-button @click="$bvModal.hide('aprovar_modal')" variant="light" class="closeModal">X</b-button>
            </b-row>
            </b-col>
            <!-- <b-col class="d-flex justify-content-end" md="6">
              <b-button @click="$bvModal.hide('aprovar_modal')" variant="light" class="closeModal mb-3">X</b-button>
            </b-col> -->
          </b-row>
        </b-col>
        <div class="d-flex justify-content-center"> 
          <b-col md="8" >
            <b-input-group>
              <b-form-input v-model="form.orientador" list="my-list-id" placeholder="Selecione o Docente" class="input"></b-form-input>
            </b-input-group>
            <datalist id="my-list-id">
              <select>
                <option v-for="prof in getAllProfs" :key="prof.id_user">
                  {{prof.nome}}
                </option>
              </select>
            </datalist>
              <div v-if="catchAlert.alert" class="d-flex justify-content-center mt-5">
                <b-alert id="alertMessage" show variant="danger">{{catchAlert.alert}}</b-alert>
              </div>
          </b-col>
        </div>  
        <div class="d-flex justify-content-center">
          <b-button @click="updateProposalState" id="aprovar" class="btnSubmitValues mt-4" type="submit">Aprovar</b-button>
        </div>
        <!--modal de confirmação de delete-->
      </b-modal>
      <b-modal id="confirmar_apagar" size="lg" hide-header hide-footer>
        <b-col md="12">
          <b-row>
            <b-col class="items" md="12">
            <b-row class="d-flex justify-content-center">
                <p class="ml-3" id="title">Tem a certeza que pretende eliminar a proposta?</p>
            </b-row>
            </b-col>
            <!-- <b-col class="d-flex justify-content-end" md="6">
              <b-button @click="$bvModal.hide('aprovar_modal')" variant="light" class="closeModal mb-3">X</b-button>
            </b-col> -->
          </b-row>
        </b-col>
        <div class="d-flex justify-content-center">
            <b-button @click="deleteProposal" id="aprovar" class="btnSubmitValuesConfirmation mt-4" type="submit">Sim</b-button>
            <b-button @click="$bvModal.hide('confirmar_apagar')" id="aprovar" class="btnSubmitValuesConfirmationDenied mt-4 ml-3" variant="danger" type="submit">Não</b-button>
        </div>
      </b-modal>
      <b-modal id="enviar_revisao" size="lg" hide-header hide-footer>
        <b-col md="12">
          <b-row>
            <b-col class="items" md="12">
            <b-row>
               <p class="ml-3" id="title">Motivo da revisão</p>
                <b-button @click="$bvModal.hide('enviar_revisao')" variant="light" class="closeModal">X</b-button>
            </b-row>
            </b-col>
            <!-- <b-col class="d-flex justify-content-end" md="6">
              <b-button @click="$bvModal.hide('aprovar_modal')" variant="light" class="closeModal mb-3">X</b-button>
            </b-col> -->
          </b-row>
        </b-col>
        <div class="d-flex justify-content-center"> 
          <b-col md="8" >
            <b-form-textarea id="input-3" v-model="form.revisao" placeholder="Adicione observações à candidatura" rows="10" max-rows="10" required maxlength="350"></b-form-textarea>
              <div v-if="catchAlert.alert" class="d-flex justify-content-center mt-5">
                <b-alert id="alertMessage" show variant="danger">{{catchAlert.alert}}</b-alert>
              </div>
            </b-col>
        </div>  
        <div class="d-flex justify-content-center">
          <b-button @click="updateProposalStateRevisao" id="aprovar" class="btnSubmitValues mt-4" type="submit">Enviar</b-button>
        </div>
      </b-modal>
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
        orientador: null,
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
      catchAlert: {
        alert: "",
      },

      userAutor:"",
      roleUser:"",
      userAutorId:""
    };
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
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

    async deleteProposal(){
        try{
            await this.$store.dispatch('deleteProposals', this.proposta)
            this.$router.go(-1)
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
    }
    
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
.acoes{
  font-family: rubik, sans-serif;
  font-weight: lighter;
  color: #767676;
}
.btnSubmitValuesConfirmation{
  border-radius: 19px;
  background-color: #0077b6;
  border: none;
  width: 19%;
  font-weight: lighter;
}
.btnSubmitValuesConfirmationDenied{
  border-radius: 19px;
  width: 19%;
  border: none;
  font-weight: lighter;
}
</style>