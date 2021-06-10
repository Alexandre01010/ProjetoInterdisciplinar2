<template>
  <div>
    <b-col md="12">
      <p id="title">Criar a sua Conta</p>
      <b-form @submit="register">
        <b-col md="12">
          <b-avatar
            class="mt-3"
            size="120"
            icon="person-fill"
            :src="img"
          ></b-avatar>
        </b-col>
        <b-col md="12">
          <b-row class="">
            <b-col class="mt-3" md="6">
              <p class="mt-4">Nome</p>
              <b-input
                id="inputNome"
                class="input"
                placeholder="Primeiro e ultimo"
                v-model="nome"
                type="text"
                required
              ></b-input>
            </b-col>
            <!--Teste de commitsdfsdfdsdfsd-->
            <b-col class="mt-3" md="6">
              <!--dsasdasasdsfd-->
              <p class="mt-4">Email</p>
              <b-input
                id="inputEmail"
                class="input"
                placeholder="example@example.com"
                v-model="email"
                type="email"
                required
              ></b-input>
            </b-col>
            <b-col class="mt-3" md="6">
              <p class="mt-4">Password</p>
              <b-input
                id="inputPassword"
                class="input"
                v-model="password"
                type="password"
                required
              ></b-input>
            </b-col>
            <b-col class="mt-3" md="6">
              <p class="mt-4">Confirmar Password</p>
              <b-input
                id="inputConfirmPassword"
                class="input"
                v-model="confirm_password"
                type="password"
                required
              ></b-input>
            </b-col>
            <b-col md="12">
              <b-form-group id="tipo" class="col-8 mt-5">
                <b-row>
                  <b-form-radio
                    v-model="selected"
                    name="some-radios"
                    class="opt1 ml-4"
                    value="2"
                    >Docente</b-form-radio
                  >
                  <b-form-radio
                    v-model="selected"
                    name="some-radios"
                    class="opt2 ml-4"
                    value="3"
                    >Não Docente</b-form-radio
                  >
                  <b-form-radio
                    v-model="selected"
                    name="some-radios"
                    class="opt3 ml-4"
                    value="4"
                    >Entidade Externa</b-form-radio
                  >
                </b-row>
              </b-form-group>
            </b-col>
            <b-col class="mt-4" md="6">
              <div v-if="catchAlert.alert" class="mt-1">
                <b-alert id="alertMessage" show variant="danger">{{
                  catchAlert.alert
                }}</b-alert>
              </div>
              <b-button id="sumbitBtnRegister" type="submit">Registar</b-button>
            </b-col>
          </b-row>
        </b-col>
        <b-col class="mt-5 ml-4" md="12">
          <!-- <p class="mt-4">Descrição</p><b-textarea id="textarea" v-model="descricao" placeholder="" rows="4" max-rows="7"></b-textarea>-->
        </b-col>
      </b-form>
    </b-col>
  </div>
</template>
<style scoped>
#title {
  color: #707070;
  display: inline-block;
  font-size: 30px;
  font-weight: lighter;
  border-bottom: 1px solid #c94514;
  padding-bottom: 2px;
}
.input {
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  border: none;
}
.opt1,
.opt2,
.opt3 {
  padding: 1px;
  font-size: 17px;
}
.opt2,
.opt3 {
  padding-left: 17px;
}
#tipo {
  font-size: 30px;
}
#alertMessage {
  background-color: #f5f5f5;
  color: red;
  border: none;
  font-size: 19px;
}
#sumbitBtnRegister {
  background-color: #0077b6;
  width: 269px;
  height: 39px;
  border-radius: 18px;
  font-weight: lighter;
  font-size: 19px;
  border: none;
}
@media only screen and (max-width: 992px) {
  .opt2,
  .opt3 {
    padding-left: 0;
  }
}
</style>
<script>
export default {
  name: "user-form",
  data() {
    return {
      icon: "upload",
      email: "",
      password: "",
      selected: 3,
      nome: "",
      img: "",
      descricao: "",
      cv:"",
      confirm_password: "",
      catchAlert: {
        alert: "",
      },
    };
  },
  methods: {
    register() {
      try {
        if(this.password != this.confirm_password){
          throw "As passwords não combinam"
        }else{
          this.$store.dispatch("register", this.$data);
          this.$router.push({ name: "login" });
        }
      } catch (error) {
        this.catchAlert.alert = error;
      }
    },
  },
};
</script>
