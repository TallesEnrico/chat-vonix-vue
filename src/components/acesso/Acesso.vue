<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <form @submit.prevent="entrarNaSala()">
                <h1>Chat Vonix</h1>
                <label>Informe seu nome</label>
                <input class="form-control" required type="text" v-model="nome" placeholder="Nome:">
                
                <label>Informe seu CPF</label>
                <input v-mask="'###-###-###.##'" class="form-control" required type="text" v-model="cpf" placeholder="CPF:">
                
                <div class="botao">
                    <button :class="loading?'loading':''" class="btn btn-primary">Entrar no Chat</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            nome:'',
            cpf:'',
            loading:false,
        }
    },
    methods:{
        entrarNaSala(){
            if(!this.$f.testaCPF(this.cpf)){
                this.$alert.sweetNotification('Por favor, insira um CPF válido')
                return
            }
            this.loading = true
            this.$http.post(`http://localhost:3000/logar?cpf=${this.cpf}&nome=${this.nome}`).then(res=>{
                this.loading = false
                if(res.body.acesso != 'liberado'){
                    this.$alert.sweetNotification('<h4>Este usuário já está logado no Chat</h4>')
                    return
                }
                this.$store.commit('setNome', this.nome)
                this.$store.commit('setCPF', this.cpf)
                sessionStorage.setItem('vonix-cpf',this.cpf)
                sessionStorage.setItem('vonix-nome',this.nome)
                let mensagem = this.$f.montaMensagem(this.cpf,this.nome,'Entrou na sala')
                this.$socket.emit('chat', mensagem);
                this.$router.push({name:'Chat'})
            }).catch(e=>{
                console.log(e)
            })
            setTimeout(() => {
            }, 1500);
        }
    }
}
</script>
<style lang="scss" scoped>
form{
    margin-top: 100%;
    transform: translateY(-65%);
    border-radius: 5px;
    padding: 15px;
    background-color: #fdfdfd;
    box-shadow: 1px 1px 8px 2px rgba(45,45,45,.15);
    .loading{
        position: relative;
        overflow: hidden;
        border:none;
        &::after{
            border-radius: 5px;
            position: absolute;
            content: '';
            width: calc(100% + 2px);
            height: 5px;
            top:-1px;
            background-color: rgb(248, 184, 45);
            animation: loader 1500ms infinite;
        }
        @keyframes loader {
            0%{
                left: -10px;
                width: 0px;
            }
            100%{
                left: 100%;
                width: 150%;
            }
        }
    }
    h1{
        text-align: center;
        margin-bottom: 25px;
        color:#005E8F;
        text-shadow: 3px 3px 5px rgba(45,45,45,.15)
    }
    label{
        margin-bottom: 0;
        font-weight: 600;
    }
    input{
        margin-bottom: 10px;
        border: 1px solid rgba(0, 93, 143, 0.418) !important;
    }
    .botao{
        width: 100%;
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 25px;
    }
}

</style>