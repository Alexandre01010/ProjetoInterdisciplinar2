<template>
  <div>
    <p id="title" v-if="comp == 'estagio'" class="ml-5">Criar Proposta Estágio</p>
    <p id="title" v-else class="ml-5">Criar Proposta Projeto</p>

    <step_one v-if="steps == 1" />
    <step_two v-if="steps == 2"></step_two>
    <step_three v-if="steps == 3">step3</step_three>
  </div>
</template>

<script>
import step_one from "../components/proposta_form/step_one.vue";
import step_two from "../components/proposta_form/step_two.vue";
import step_three from "../components/proposta_form/step_three.vue";
export default {
  components: {
    step_one,
    step_two,
    step_three,
  },

  data() {
    return {
      steps: 1,
      form_proposta: {
        estado: 2,
        titulo: "",
        objetivos: "",
        resultados_esperados: "",
        outros_dados: "",
        recursos_necessarios: "",
        plano_provisorio_trabalho: "",
        nome_entidade: null,
        nome_tutor: "",
        email: "",
        cargo_tutor: "",
        contato: "",
        perfil_candidato_desejado:"harcoded",
        id_prof_orientador:0,
        id_tipo_estado:1,
        morada_entidade:"hardcoded",
        codigo_postal:"hardcoded",
        id_user_autor:1 //COLOCAR BUSCAR USER LOGADO,
      },
    };
  },
  methods: {},
  computed: {
    comp() {
      return this.$route.params.type;
    },
  },
};
</script>

<style>
.input {
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px #e6e6e6;
  border: none;
}
</style>