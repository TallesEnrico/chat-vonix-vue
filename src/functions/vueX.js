import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    //VARIÁVEIS
    state: {
        nome:'',
        cpf:'',
        usuarios:[],
        mensagens:[],
        filtro:'',
        volume:0,
    },

    //GETTERS
    getters: {
        getNome: state => {
            return state.nome
        },
        getCPF: state => {
            return state.cpf
        },
        getUsuarios: state =>{
            return state.usuarios
        },
        getVolume: state =>{
            return state.volume
        },
        getMensagens: state =>{
            return state.mensagens.filter(mensagem=>{return mensagem.toLowerCase().indexOf(`${state.filtro}`)>-1})
        },
    },

    //SETTERS
    mutations: {
        setNome(state, value) {
            state.nome = value
        },
        setCPF(state, value) {
            state.cpf = value
        },
        setUsuarios(state, value) {
            state.usuarios.push(value)
        },
        setFiltro(state, value) {
            state.filtro = value
        },
        setMensagens(state, value) {
            state.mensagens = value
        },
        setVolume(state, value) {
            state.volume = value
        },
    }
})