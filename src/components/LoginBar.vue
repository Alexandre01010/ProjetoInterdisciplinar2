<template>
  <div class="wrapper">
    <nav id="sidebar">
      <div class="sidebar-header">
        <b-col md="12">
          <img
            alt="IPP Logo"
            src="../assets/pporto.webp"
            width="219px"
            height="49px"
          />
          <p class="welcomeText mt-3">
            Licenciatura em Tecnologias e Sistemas de Informação para Web <br />
            Gestão de submissão de projetos
          </p>
          <img
            class="mt-3"
            alt="Welcome Image"
            src="../assets/LoginWelcomeImageOptimized.webp"
            width="299px"
            height="199px"
          />
          <p class="welcomeText mt-3">Não tem conta?</p>
          <router-link class="menuItems" :to="{ name: 'register' }"
            ><button class="registerBtn">Registar-me</button></router-link
          >
        </b-col>
      </div>
      <div id="menuItemsInteract"></div>
    </nav>

    <div id="content">
      <TopBar v-if="!isLoginRegister" />
      <router-view />
    </div>
  </div>
</template>
<script>
import TopBar from "./TopBar.vue";
export default {
  name: "SideBar",
  components: {
    TopBar,
  },
  data() {
    return {
      isLogin: false,
    };
  },
  computed: {
    isLoginRegister() {
      if (this.$route.name == "login" || this.$route.name == "register") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style scoped>
body {
  font-family: Rubik, sans-serif;
  background: #fafafa;
}
p {
  font-family: Poppins, sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}
.menuItems,
.menuItems:focus,
.menuItems:hover {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
  color: #747883;
  margin-left: 9px;
}
.welcomeText {
  font-family: Rubik, sans-serif;
  color: #707070;
}
.registerBtn {
  border: none;
  border-radius: 9px;
  background-color: #0077b6;
  color: #fff;
  height: 29px;
  width: 199px;
  font-family: Rubik, sans-serif;
  font-weight: lighter;
}
.wrapper {
  display: flex;
  text-decoration: none;
  transition: all 0.3s;
}
#sidebar {
  width: 599px;
  background: #fff;
  color: #c94514;
  font-family: Rubik, sans-serif;
  font-weight: lighter;
  transition: all 0.3s;
  text-align: center;
}
#menuItemsInteract {
  padding: 59px 0;
  margin-left: 9px;
}
#sidebar .sidebar-header {
  min-height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
#content {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
  background-color: #f5f5f5;
}
@media (max-width: 768px) {
  #sidebar {
    margin-left: -599px;
  }
}
</style>