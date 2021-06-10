import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
//import { UserService } from "@/services/user.service";
import { AuthService } from "@/services/auth.service";

Vue.use(Vuex);
const resource_uri = "http://localhost:8080";

export default new Vuex.Store({
  state: {
    ProposalUser: "",
    users: [],
    loggedUser: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "",
    proposals: [],
    applications: [],
    proposal: "",
    foruns: [],
    temas:[],
    answers:[],
    notifications: localStorage.getItem("notification")
      ? JSON.parse(localStorage.getItem("notification"))
      : [],
  },
  getters: {
    getForuns: (state) =>(search)=> {
      if (search) {
        return state.foruns.filter(forum=>forum.titulo.includes(search));
      }
      return state.foruns;
    },
    getPretendedUserName: (state) => {
      return state.ProposalUser;
    },
    getNextProposalId: (state) => {
      return state.proposals.length > 0
        ? state.proposals[state.proposals.length - 1].id + 1
        : 1;
    },
    getNextnotificationId: (state) => {
      return state.notifications.length > 0
        ? state.notifications[state.notifications.length - 1].id + 1
        : 1;
    },
    getFilterdAnswers:(state)=>(search)=>{
      if(search){
        return state.answers.filter(answer=>answer.texto_resposta.includes(search))
      }
      return state.answers
    },
    getFilterdtemas:(state)=>(search)=>{
      if (search) {
        return state.temas.filter(tema=>tema.titulo.includes(search));
      }
      return state.temas;
    },
    getMyCandidaturas: (state) => {
      return state.applications;
    },
    getProposalTitle: (state) => {
      return state.proposal;
    },
    getUsers: (state) => state.users,
    getLoggedUser: (state) => state.loggedUser.username,
    isLoggedUser: (state) => (state.loggedUser == "" ? false : true),
    getProposals: (state) => {
      return state.proposals;
    },
    getFilterdProposals: (state) => (type, search, stateF) => {
      let type2;
      if (type != "all") {
        type2 = type == "estagio" ? false : true;
      }
      let card_filter = state.proposals.filter(
        (proposal) =>
          ((proposal.nome_entidade == null) == type2 || type == "all") &&
          (proposal.titulo.toUpperCase().includes(search.toUpperCase()) ||
            search == "")
      );
      if (stateF == 1 || stateF == 2 || stateF == 3) {
        card_filter = card_filter.filter(
          (prop) => prop.id_tipo_estado == stateF
        );
      }
      return card_filter;
    },
    getType: (state) => {
      return state.proposals.tipo;
    },
    getNotification: (state) => {
      return state.notifications;
    },
  },
  actions: {
    async createForum(context,payload){
      try{
        
        const response = await axios.post(resource_uri + "/foruns",payload, {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("user"))
              .accessToken,
          },
          
        });
        location.reload()
        
        context.commit("SETRESP", response.data);
      }catch(error){
        context.commit('SETRESP', [])
      }

    },



    async fetchAnswers(context,payload){
      try{
        
        const response = await axios.get(resource_uri + "/foruns/temas/"+payload.id_tema+"/respostas", {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("user"))
              .accessToken,
          },
        });
        
        context.commit("SETRESP", response.data);
      }catch(error){
        context.commit('SETRESP', [])
      }
    },
    async fetchTemasByIdForum(context,payload){
      try{
        const response = await axios.get(resource_uri + "/foruns/"+payload.id_forum+"/temas/", {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("user"))
              .accessToken,
          },
        });
        context.commit("SETTEMAS", response.data);
      }catch(error){
        context.commit('SETTEMAS', [])
      }
    },
    async fetchMyForuns(context){
      const response = await axios.get(resource_uri + "/foruns", {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user"))
            .accessToken,
        },
      });
      context.commit("SETFORUNS", response.data);
    },
    async fetchMyProposals(context) {
      const response = await axios.get(resource_uri + "/propostas/minhas", {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user"))
            .accessToken,
        },
      });
      context.commit("SETPROPOSALS", response.data);
    },
    async putUpdateCandidatura(context, payload) {
        await axios.put(resource_uri + '/propostas/' +  payload.id_proposta + '/candidaturas' , payload, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user"))
            .accessToken,
        },
      })
    },
    async putUpdateProposal(context, payload) {
      await axios.put(resource_uri + '/propostas/' + payload.id_proposta + '/data', payload, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user"))
            .accessToken,
        },
      })
    },
    async putAproveProposal(context, payload) {
      console.log(payload)
      await axios.put(resource_uri + '/propostas/' + payload.id_proposta + '/data', payload, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user"))
            .accessToken,
        },
      })
    },
    async deleteMyCandidatura(context, payload) {
      await axios.delete(resource_uri + '/propostas/' + payload.id_proposta + '/candidaturas', {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user"))
            .accessToken,
        },
      })
    },
    async fetchUserById(context, id) {
      const response = await axios.get(resource_uri + "/users/" + id);
      context.commit("SETUSER", response.data);
      //context.commit("SETUSER", response.data);
    },

    async deleteProposals(context, payload) {
      await axios.delete(resource_uri + '/propostas/' + payload.id_proposta, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user"))
            .accessToken,
        },
      })
    },

     async fetchUserByType(context, id) {
       const response = await axios.get(resource_uri + "/users?idTipoUser=" + id, {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user"))
            .accessToken,
        },
       })
       context.commit("SETUSERTYPE", response.data)
     },
    async fetchProposals(context) {
      const response = await axios.get(resource_uri + "/propostas/approved", {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user"))
            .accessToken,
        },
      });
      context.commit("SETPROPOSALS", response.data);
    },
    async fetchProposalById(context, id) {
      const response = await axios.get(resource_uri + "/propostas/" + id);
      context.commit("SETPROPOSAL", response.data);
    },
    async fetchPorposalForApproval(context){
      const response = await axios.get(resource_uri + "/propostas/pending", {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user"))
            .accessToken,
        },
      })
      context.commit("SETPROPOSALBYSTATE", response.data)
    },
    async fetchMyCandidaturas(context) {
      const response = await axios.get(resource_uri + "/candidaturas/minhas", {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user"))
            .accessToken,
        },
      });
      console.log(response.data);
      context.commit("SETMYCANDIDATURAS", response.data);
    },
    async eliminar(context, id) {
      context.commit("DELETEPROPOSAL", id);
      localStorage.setItem(
        "proposals",
        JSON.stringify(context.state.proposals)
      );
    },
    async login(context, payload) {
      try {
        const loggedUser = await AuthService.login(payload);
        console.log(loggedUser);
        context.commit("LOGIN", loggedUser);
      } catch (error) {
        return error;
      }
      // verificar se este user já existe
      // const user = context.state.users.find(
      //   (user) =>
      //     user.email === payload.email && user.password === payload.password
      // );
      // if (user != undefined) {
      //   // login com sucesso
      //   context.commit("LOGIN", user);
      //   localStorage.setItem("loggedUser", JSON.stringify(user));
      // } else {
      //   throw "O seu email ou password estão incorretos";
      // }
    },
    async logout(context) {
      context.commit("LOGOUT");
      localStorage.removeItem("user");
    },
    async register(context, payload) {
      // verificar se este user já existe
      const user = context.state.users.find(
        (user) => user.email === payload.email
      );
      if (user == undefined) {
        let response = await AuthService.register(payload);

        context.commit("REGISTER", response);
        //localStorage.setItem("users", JSON.stringify(context.state.users));
      } else {
        return "Email já existente";
      }
    },
    async registerProposal(context, payload) {
      const proposal = context.state.proposals.find(
        (proposal) => proposal.titulo == payload.titulo
      );
      if (proposal == undefined) {
        console.log(payload);
        let response = await axios.post(resource_uri + "/propostas", payload, {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("user"))
              .accessToken,
          },
        });
        console.log(response.data);
        //let proposal = payload
        //proposal['id_proposta']=response.
        // console.log(proposal);
        context.commit("REGISTERPROPOSAL", proposal);
        //localStorage.setItem('proposals', JSON.stringify(context.state.proposals))
      } else {
        throw "Proposta já criada! Por favor reveja os campos";
      }
    },

    async registerNotification(context, payload) {
      context.commit("REGISTERNOTIFICATION", payload);
      localStorage.setItem(
        "notification",
        JSON.stringify(context.state.notifications)
      );
    },

    async aprovar(context, data) {
      console.log(data.proposta);
      let edited = context.state.proposals.filter(
        (proposal) => proposal.id == data.proposta.id
      )[0];
      edited.estado = "aprovado";
      edited.orientador = data.form.orientador;
      context.commit("ALTERARPROP", edited);
      localStorage.setItem(
        "proposals",
        JSON.stringify(context.state.proposals)
      );
    },
    async revisao(context, data) {
      let edited = context.state.proposals.filter(
        (proposal) => proposal.id == data.proposta.id
      )[0];
      edited.estado = "revisao";
      edited.msgRevisao = data.form.revisao;
      context.commit("ALTERARPROP", edited);
      localStorage.setItem(
        "proposals",
        JSON.stringify(context.state.proposals)
      );
    },
    async candidatar(context, data) {
      let application = {
        user: data.form.user,
        id_proposta: data.proposta.id,
        mensagem: data.form.candidatura,
      };
      //console.log(application)
      context.commit("CANDIDATURA", application);
      localStorage.setItem(
        "applications",
        JSON.stringify(context.state.applications)
      );
    },
  },
  mutations: {
    SETRESP(state,data){state.answers=data},
    SETTEMAS(state,data){state.temas=data},
    SETFORUNS(state,data){state.foruns=data},
    SETUSER(state, data) {
      state.ProposalUser = data;
    },
    SETUSERTYPE(state, data){
      state.users = data
    },
    SETPROPOSALS(state, data) {
      state.proposals = data;
    },
    SETPROPOSALBYSTATE(state, data) {
      state.proposals = data
    },
    SETPROPOSAL(state, data) {
      state.proposal = data.titulo;
    },
    DELETEPROPOSAL(state, id) {
      state.proposals = state.proposals.filter((proposal) => proposal.id != id);
    },
    CANDIDATURA(state, data) {
      state.applications.push(data);
    },
    ALTERARPROP(state, data) {
      console.log(data);
      state.proposals = state.proposals.map((proposal) =>
        proposal.id == data.id ? data : proposal
      );
    },
    LOGIN(state, user) {
      state.loggedUser = user;
    },
    LOGOUT(state) {
      state.loggedUser = "";
    },
    REGISTER(state, user) {
      state.users.push(user);
    },
    REGISTERPROPOSAL(state, proposal) {
      state.proposals.push(proposal);
    },
    REGISTERNOTIFICATION(state, notif) {
      state.notifications.push(notif);
    },
    SETMYCANDIDATURAS(state, proposals) {
      console.log("Aqui é commit " + proposals);
      state.applications = proposals;
      console.log(proposals);
    },
  },
});
