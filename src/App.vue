<template>
  <div id="app">
    <Conteudo>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </Conteudo>
  </div>
</template>
<script>
export default {
  created(){
    if(!this.$store.getters.getNome && this.$route.name!='Acesso'){
      if(sessionStorage.getItem('vonix-nome') || sessionStorage.getItem('vonix-cpf')){
        this.$http.post(`http://localhost:3000/logar?cpf=${sessionStorage.getItem('vonix-cpf')}&nome=${sessionStorage.getItem('vonix-nome')}`).then(res=>{
          if(res.body.acesso != 'liberado'){
            this.$router.push({name:'Acesso'})
            this.$alert.sweetNotification('<h4>Este usuário já está logado no Chat</h4>')
            return
          }
          this.$store.commit('setNome', sessionStorage.getItem('vonix-nome'))
          this.$store.commit('setCPF', sessionStorage.getItem('vonix-cpf'))
          let mensagem = this.$f.montaMensagem(sessionStorage.getItem('vonix-cpf'),sessionStorage.getItem('vonix-nome'),'Entrou na sala')
          this.$socket.emit('chat', mensagem);
          this.$socket.emit('usuarios', mensagem);
        }).catch(e=>{
            console.log(e)
        })
      }else{
        this.$router.push({name:'Acesso'})
      }
    }
  },
}
</script>
<style lang="scss">
#app{
  background-color: #f6f6f6;
  min-height: 100vh;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
  position: absolute;
  width: 100%;
}
.header{
  font-weight: 600;
  background-color: #005E8F !important;
  color: white;
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 5px;
  border-radius: 5px;
}
::-webkit-scrollbar-track {
  background: #bbb;
}
::-webkit-scrollbar-thumb {
  background: #777;
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.hidden{
  visibility: hidden;
  position: absolute;
}
.bold{
  font-weight: 600;
}
.upper{
  text-transform: uppercase;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
  position: absolute;
  width: 100%;
}
h1,h2,h3,h4,h5,h6,p,label{
  color: #444;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
input{
  max-height: 32px;
}
</style>
