import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueMask from 'v-mask'
import VueResource from 'vue-resource'

import {funcoes} from './functions/funcoes' 
import {routes} from './functions/routes.js'
import alert from './functions/alerts'
import store from './functions/vueX'

//COMPONENTES GLOBAIS
import Conteudo from './components/compartilhados/Conteudo'
import Sair from './components/compartilhados/Sair'
import Audio from './components/compartilhados/Audio'

Vue.component('Conteudo', Conteudo);
Vue.component('Sair', Sair);
Vue.component('Audio', Audio);

//PROPTYPES
Vue.prototype.$socket         = io.connect('http://localhost:3000');
Vue.prototype.$nome_usuario   = ''
Vue.prototype.$f              = funcoes;
Vue.prototype.$alert          = new alert();

Vue.use(VueRouter);
Vue.use(VueMask);
Vue.use(VueResource);

const router = new VueRouter({
  routes,
  mode: 'history',
  base: '/',
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
