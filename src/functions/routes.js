import Acesso from '../components/acesso/Acesso'
import Chat from '../components/chat/ConteudoChat'

export const routes = [
    //Login em 2 passos
    { path: '/', component: Acesso, name:'Acesso' },
    { path: '/chat', component: Chat, name:'Chat' },
]