<template>
    <form @submit.prevent="enviar_menssagem()">
        <div class="row justify-content-end">
            <div class="col-md-12">
                <textarea @keypress.enter="enterMensagem()" required class="form-control" v-model="mensagem" placeholder="Insira sua mensagem aqui!"></textarea>
            </div>
            <button id="enviar" type="submit" class="btn btn-warning">
                <i class="fas fa-paper-plane"></i>
                Enviar mensagem
            </button>
        </div>
    </form>
</template>
<script>
export default {
    data(){
        return{
            mensagem:''
        }
    },
    methods:{
        enterMensagem(){
            document.getElementById('enviar').click()
        },
        enviar_menssagem() {
            let mensagem = this.$f.montaMensagem(
                this.$store.getters.getCPF,
                this.$store.getters.getNome,
                this.mensagem
            )
            this.$socket.emit('chat', mensagem);
            this.mensagem = "";
        }
    },
}
</script>
<style lang="scss" scoped>
form{
    margin-top: 15px;
    textarea, button{
        box-shadow: 1px 1px 5px 2px rgba(45,45,45,.15);
    }
    button{
        margin-right: 15px;
        margin-top: 10px;
        i{
            font-size: 13px;
        }
    }
    textarea{
        border: 1px solid rgba(0, 93, 143, 0.418) !important;
    }
}
</style>