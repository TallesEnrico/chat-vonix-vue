<template>
    <section>
        <div class="row">
            <div class="col-md-8">
                <Conversa/>
                <Form/>
            </div>
            <div class="col-md-4">
                <Usuarios/>
                <Search/>
                <Audio/>
                <Sair/>
            </div>
        </div>
    </section>
</template>
<script>
import Conversa from './Conversa'
import Form from './Form'
import Usuarios from './Usuarios'
import Search from './Search'

export default {
    components:{
        Conversa,
        Form,
        Usuarios,
        Search,
    },
    data(){
        return{
            logOut:false
        }
    },
    created() {
        window.addEventListener('beforeunload', this.onBeforeUnload)
    },
    beforeDestroy() {
        window.removeEventListener('beforeunload', this.onBeforeUnload)
    },
    methods: {
        onBeforeUnload(e) {
            let mensagem = this.$f.montaMensagem(
                this.$store.getters.getCPF,
                this.$store.getters.getNome,
                'Saiu da sala'
            )
            this.$socket.emit('logout', mensagem);
        },
    },
}
</script>