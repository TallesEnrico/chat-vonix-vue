<template>
    <form @submit.prevent="sair()">
        <button type="submit" class="btn btn-dark">Sair do Chat</button>
    </form>
</template>
<script>
export default {
    methods:{
        sair(){
            sessionStorage.removeItem('vonix-cpf')
            sessionStorage.removeItem('vonix-nome')
            let mensagem = this.$f.montaMensagem(
                this.$store.getters.getCPF,
                this.$store.getters.getNome,
                'Saiu da sala'
            )
            this.$socket.emit('logout', mensagem);
            this.$router.push({name:'Acesso'})
        }
    }
}
</script>
<style lang="scss" scoped>
.btn{
    padding-bottom: 0px !important;
    padding-top: 0px !important;
    margin-top: 25px;
    width: 100%;
}
</style>