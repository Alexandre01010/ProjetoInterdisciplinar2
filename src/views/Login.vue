<template>
  <div class="page">
    <b-col md="12">
      <p id="title">Login</p>
      <div class="d-flex justify-content-center">
        <b-col class="align-content-center" xl="6">
          <div id="form" class="mt-5">
            <b-form @submit.prevent="login">
              <div class="text-center mb-4">
                <b-avatar size="139" icon="person-fill"></b-avatar>
              </div>

              <b-form-group
                id="input-group-1"
                label="Email"
                label-for="input-1"
              >
                <b-form-input
                  id="inputEmail"
                  class="input"
                  v-model="email"
                  type="email"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Password"
                label-for="input-2"
              >
                <b-form-input
                  id="inputPassword"
                  class="input"
                  type="password"
                  v-model="password"
                  required
                ></b-form-input>
              </b-form-group>
              <div
                v-if="catchAlert.alert"
                class="d-flex justify-content-center mt-5"
              >
                <b-alert id="alertMessage" show variant="danger">{{
                  catchAlert.alert
                }}</b-alert>
              </div>
              <div class="d-flex justify-content-center mt-5">
                <b-button id="entrarBtn" type="submit">Entrar</b-button>
              </div>
            </b-form>
            <router-link
              v-if="windSize <= 772"
              class="menuItems"
              :to="{ name: 'register' }"
              ><a class="d-flex justify-content-center mt-3 mobileVersion"
                >Criar Conta</a
              ></router-link
            >
          </div>
        </b-col>
      </div>
    </b-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      catchAlert: {
        alert: "",
      },
      windSize: window.innerWidth,
    };
  },
  created() {
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    async login() {
      try {
        // Chamar a ação login que está na Store
        //this.$store.dispatch('login',{username: this.username, password: this.password})
        let response =await this.$store.dispatch("login", this.$data);
        //console.log(response.message)
        if (response) {
          throw response.message
        }
        // Saltar para a view Home
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        
        this.catchAlert.alert = error;
      }
    },
    myEventHandler() {
      this.windSize = window.innerWidth;
    },
  },
};
</script>


<style scoped>
.page {
  background-color: #f5f5f5;
}
.mobileVersion {
  color: #707070;
  font-weight: lighter;
}
#entrarBtn {
  background-color: #0077b6;
  width: 269px;
  height: 39px;
  border-radius: 18px;
  font-weight: lighter;
  font-size: 19px;
  border: none;
}
#alertMessage {
  background-color: #f5f5f5;
  color: red;
  border: none;
  font-size: 19px;
}
.input {
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  border: none;
}
.b-avatar {
  background-color: #eaeaea;
  color: #b3b3b3;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
}
#title {
  color: #707070;
  display: inline-block;
  font-size: 30px;
  font-weight: lighter;
  border-bottom: 1px solid #c94514;
  padding-bottom: 2px;
}
</style>