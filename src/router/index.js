import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import Perfil from '../views/Perfil.vue'
import Entrevistas from '../views/Entrevistas.vue'
import AprovarPropostas from '../views/AprovarPropostas.vue'
import CriarProposta from '../views/CriarProposta.vue'
import DetalhesProposta from '../views/DetalhesProposta.vue'
import EditarCandidatura from '../views/EditarCandidatura.vue'
import EditarUser from '../views/EditarUser.vue'
import LandingPage from '../views/LandingPage.vue'
import MinhasPropostas from '../views/MinhasPropostas.vue'
import Register from '../views/Register.vue'
import Forum from '../views/Forum.vue'
import Store from '../store'
import Dashboard from '../views/DashBoard.vue'
import EditarPerfil from '../views/EditarPerfil.vue'
import Forum_assunto from '../views/Forum_assunto.vue'
import MinhasCandidaturas from '../views/MinhasCandidaturas.vue'
import Respostas from '../views/Respostas.vue'
import EditarProposta from '../views/EditarProposta.vue'


Vue.use(VueRouter)

const routes = [
  {

    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Login',
    name: 'login',
    component: Login
  },
  {
    path: '/Perfil',
    name: 'profile',
    component: Perfil,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Entrevistas',
    name: 'interview',
    component: Entrevistas,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/AprovarPropostas',
    name: 'aproveProposals',
    component: AprovarPropostas,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/CriarProposta/:type',
    name: 'createProposal',
    component: CriarProposta,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/DetalhesProposta',
    name: 'proposalDetails',
    component: DetalhesProposta,
    props:true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/EditarUser',
    name: 'userEdit',
    component: EditarUser,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/LandingPage',
    name: 'landingpage',
    component: LandingPage
  },
  {
    path: '/EditarCandidatura',
    name: 'editarCandidatura',
    component: EditarCandidatura,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/MinhasPropostas',
    name: 'myProposals',
    component: MinhasPropostas,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/registar',
    name: 'register',
    component: Register
  },
  {
    path: '/Forum',
    name: 'forum',
    component: Forum,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Forum_detalhes',
    name: 'forum_detalhes',
    props:true,
    component: Forum_assunto
  },
  {
    path: '/EditarPerfil',
    name: 'editarPerfil',
    component: EditarPerfil,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/MinhasCandidaturas',
    name: 'minhasCandidaturas',
    component: MinhasCandidaturas,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Respostas',
    name: 'respostas',
    component: Respostas,
    props:true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/EditarProposta',
    name: 'editarPropostas',
    component: EditarProposta,
    props:true,
    meta: {
      requiresAuth: true
    }
  }
]

 const router = new VueRouter({
   routes
 })
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !Store.getters.isLoggedUser) {
    next({ name: 'login' })
  } else {
    next();
  }

});

 export default router
