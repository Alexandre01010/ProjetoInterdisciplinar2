<template>
  <div id="forumContent" class="d-flex justify-content-center">
    <b-col id="contentContainer" cols="12">
      <div id="forumTitle">
        <b-col cols="12">
          <h3 class="TitlePage">Foruns</h3>
        </b-col>
      </div>
      <div>
        <b-col md="12">
          <b-input
            id="seacrhInput"
            class="mt-5"
            type="text"
            placeholder="Search"
          ></b-input>
          
          <card-forum v-for="forum in getForums"
              :key="forum.titulo"
              :forum="forum" />
      </div>
    </b-col>
  </div>
</template>

<script>
import cardForum from "../components/cardForum.vue";
export default {
  name: "MinhasPropostas.vue",
  components: {
    cardForum,
    //cardEstagio,
    
  },
  data() {
    return {
      
    };
  },
  methods: {
    
    async getMyForuns() {
        try {
          await this.$store.dispatch("fetchMyForuns");
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
      },
  },
  computed: {
    getForums() {
      return this.$store.getters
        .getForuns(this.search);
    },
  },
  created() {
      this.getMyForuns();
    },
};
</script>

<style>
#forumContent {
  margin-top: 20px;
}
.participants {
  font-size: 14px;
}
.TitlePage {
  color: #707070;
  font-size: 30px;
  display: inline-block;
  font-weight: lighter;
  border-bottom: 1px solid #c94514;
  padding-bottom: 2px;
}
#forumCard {
  background-color: #fff;
  font-size: 17px;
  font-family: Rubik, sans-serif;
  border: none;
  border-radius: 36px;
  box-shadow: 2px 3px #d9d9d9;
}
#seacrhInput {
  border: none;
  border-radius: 19px;
  box-shadow: 2px 3px #d9d9d9;
}
#btnOpenForum {
  background-color: #0077b6;
  color: #fff;
  border: none;
  border-radius: 19px;
  width: 159px;
  font-size: 14px;
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
</style>