<template>
  <b-col cols="12">
    <b-card class="mt-5 interviewCard">
      <b-col md="3">
        <p class="cardIdentification">
          <b-icon
            style="color: #0077b6"
            icon="mic-fill"
            aria-hidden="true"
          ></b-icon>
          Entrevista
        </p>
      </b-col>
      <b-col md="12">
        <b-row>
          <b-col class="fw-bolder" md="8">
            <div class="title">{{ interview.texto_agenda }}</div>
            <b-col class="text-muted" md="12">
              <p class="participants">Data: {{ interview.data_hora.split('T')[0] }}</p>
            </b-col>
            <b-col class="text-muted" md="12">
              <p class="participants">Hora: {{ interview.data_hora.split('T')[1].replace(':00.000Z','') }}</p>
            </b-col>
            <b-col class="text-muted" md="12">
              <p class="participants">
                Autor: {{ u_name }}
              </p>
            </b-col>
          </b-col>
          <b-col md="4">
            <div class="d-flex justify-content-end">
              <b-button class="btnOpenInt" href="#" variant="primary"
                >Opções</b-button
              >
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-card>
  </b-col>
</template>

<script>
export default {
  name: "CardEntrevista",
  props: {
    interview: Object,
  },
  data() {
    return {
      u_name:"",
      
      
    };
  },
  methods:{

    async getAuthorUser() {
      try {
        await this.$store.dispatch("fetchUserById",this.interview.id_user);
        
        this.u_name=this.$store.getters.getPretendedUserName.nome
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
    
  },
  
  created() {
    this.getAuthorUser()
    
    
  },
  
};
</script>

<style>


.userSel {
  color: #707070;
}
.userSel:hover {
  background-color: #efefef;
}
#plus {
  color: #000;
}
#SelectedUsers {
  color: #707070;
  display: inline-block;
  font-size: 5;
  font-weight: lighter;
  border-bottom: 1px solid #c94514;
}
.label {
  color: #707070;
  text-align: left;
}
.title {
  font-weight: 500;
}
.participants {
  margin: 0;
}
.btnOpenInt {
  background-color: #0077b6 !important;
  color: #fff!important;
  border: none!important;
  border-radius: 19px !important;
  width: 159px!important;
  font-size: 14px!important;
}
.interviewCard {
  background-color: #fff;
  font-size: 17px;
  font-family: Rubik, sans-serif;
  border: none;
  border-radius: 36px;
  box-shadow: 2px 3px #d9d9d9;
}
.page {
  background-color: #f5f5f5;
}
.input {
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  border: none;
}
#agendar {
  background-color: #0077b6;
  width: 100%;
  height: 40px;
  border-radius: 18px;
  font-weight: lighter;
  font-size: 17px;
  border: none;
}

.interviewCard {
  background-color: #fff;
  font-size: 17px;
  font-family: Rubik, sans-serif;
  border: none;
  border-radius: 36px;
  box-shadow: 2px 3px #d9d9d9;
}
</style>
