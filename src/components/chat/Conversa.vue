<template>
    <section>
        <div class="header">Chat Vonix</div>
        <div id="chat" class="chat">
            <ul>
                <li v-for="(mensagem,indMensagem) in $store.getters.getMensagens" :key="indMensagem"
                    :class="mensagem.split('&%')[1] == $store.getters.getNome?'right':''"
                    :id="'li-'+indMensagem"
                >
                    <p>
                        <span class="nome">{{mensagem.split('&%')[1]}}</span>: 
                        <span class="horario">{{mensagem.split('&%')[3]}}</span>
                    </p>
                    <p></p>
                    <p>{{mensagem.split('&%')[2]}}</p>
                </li>
            </ul>
        </div>
        <video class="hidden" id="mensagem"><source src="https://camesms.com.br/audios/mensagem.mp3" type="audio/mpeg"></video>
    </section>
</template>
<script>
export default {
    data(){
        return{
            mensagens:[],
        }
    },
    created(){
        this.$socket.on('chat', function(msg){
            this.$store.commit('setMensagens', msg)
            try {
                setTimeout(() => {    
                    var elmnt = document.getElementById("li-" + (`${this.$store.getters.getMensagens.length -1}`));
                    elmnt.scrollIntoView(); 
                }, 200); 
            } catch (error) {}
            if(msg[msg.length-1].indexOf(`${this.$store.getters.getNome}`)>-1)return
            let audio = document.getElementById('mensagem')
            audio.volume = (this.$store.getters.getVolume/100)
            audio.play()
        }.bind(this));
    },
}
</script>
<style lang="scss" scoped>
section{
    box-shadow: 1px 1px 5px 2px rgba(45,45,45,.15);
}
.header{
    border-top-left-radius: 5px !important;
    border-top-right-radius: 5px !important;
    padding:5px;
}
.right{
    text-align: right;
}
.chat{
    border-bottom-left-radius: 5px !important;
    border-bottom-right-radius: 5px !important;
    max-height: 65vh;
    overflow: auto;
    background-color: #fff;
    ul {
        list-style-type: none;
        width: 100%;
        padding: 0;
        margin: 0;
        li { 
            padding: 5px 10px; 
            p{
                margin: 0;
            }
            .nome{
                font-weight: 600;
            }
            .horario{
                font-weight: 400;
                font-size: 13px;
                color: rgb(9, 81, 129);
            }
            .nome{
                color: rgb(4, 75, 156);
            }
        }
        li:nth-child(odd) {
            background-color: #eee
        }
    }
}

</style>