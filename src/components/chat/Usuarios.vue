<template>
    <div class="usuarios">
        <div class="header" @click="collapse=!collapse" data-toggle="collapse" data-target="#collapse-usuario">
            Usuários
            <span :class="collapse?'ver-mais':'ver-menos'">
                <i class="fas fa-chevron-right"></i>
            </span>
        </div>
        <div class="collapse show" id="collapse-usuario" aria-expanded="true">
            <div v-for="(usuario,indUsuario) in usuarios" :key="indUsuario">
                <p :class="$store.getters.getNome == usuario.nome?'bold you':''">
                    <i :class="usuario.status=='online'?'online':'desconected'" class="fas fa-circle"></i> 
                    {{usuario.nome}}
                </p>
            </div>
        </div>
        <video class="hidden" id="login"><source src="https://camesms.com.br/audios/login.mp3" type="audio/mpeg"></video>
    </div>
</template>
<script>
export default {
    data(){
        return{
            usuarios:[],
            collapse:false,
        }
    },
    created(){
        let mensagem = this.$f.montaMensagem(
            this.$store.getters.getCPF,
            this.$store.getters.getNome,
            'Entrou na sala'
        )
        this.$socket.emit('usuarios', mensagem);

        this.$socket.on('usuarios', function(usuario){
            this.usuarios = usuario
        }.bind(this));
    },
    
}
</script>
<style lang="scss" scoped>
span{
    font-size: 12px;
    margin-left: 5px;
}
.you{
    font-size: 15px;
    padding-left: 5px;
    color: black !important;
    text-transform: uppercase;
}
.ver-mais{
    padding-top: 3px;
    transition: all .25s;
    float: right;
    i{
        transition: all .25s;
        transform: rotate(0);
    }
}
.ver-menos{
    padding-top: 3px;
    i{
        transition: all .25s;
        transform: rotate(90deg);
    }
    float: right;
    transition: all .25s;
}
.usuarios {
    box-shadow: 1px 1px 5px 2px rgba(45,45,45,.15);
    background-color: rgb(253, 253, 253);
    border-radius: 5px;
    .header{
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .collapse{
        padding: 0 !important; 
        max-height: 65vh;
        overflow: auto;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    div{ 
        padding: 5px 10px; 
        p{
            margin: 0;
            i{
                font-size: 8px;
            }
            .online{
                color: green;
            }
            .desconected{
                color: #777;
            }
        }
        .nome{
            font-weight: 600;
        }
        .horario{
            font-weight: 400;
            font-size: 13px;
        }
    }
    div:nth-child(odd) {
        background-color: #eee
    }
}
</style>