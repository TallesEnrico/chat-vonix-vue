<template>
    <section class="controles">
        <span :class="$store.getters.getVolume == 0?'ativo':''" @click="mute()">
            <i class="fas fa-volume-mute"></i>
        </span>

        <span :class="$store.getters.getVolume <= 50 && $store.getters.getVolume != 0?'ativo':''" @click="regularVolume(-10)">
            <i class="fas fa-volume-down"></i>
        </span>

        <span :class="$store.getters.getVolume > 50?'ativo':''" @click="regularVolume(10)">
            <i class="fas fa-volume-up"></i>
        </span>

        <span>
            <p>{{$store.getters.getVolume}}%</p>
        </span>
    </section>
</template>
<script>
export default {
    data(){
        return{
            audio:1
        }
    },
    methods:{
        regularVolume(valor){
            if(this.$store.getters.getVolume + valor < 0 || this.$store.getters.getVolume + valor > 100)return
            this.$store.commit('setVolume', this.$store.getters.getVolume + valor)
        },
        mute(){
            this.$store.commit('setVolume', 0)
        }
    }    
}
</script>
<style lang="scss" scoped>
.controles{
    width: 100%;
    display: inline-flex;
    background-color: #fff;
    padding:3px 10px;
    margin-top: 10px;
    border-radius: 5px;
    justify-content: space-between;
    span{
        cursor: pointer;
        &:hover{
            transition: all .15s;
            color: rgb(0, 144, 211);
            transform: scale(1.05);
        }
        p{
            margin:0
        }
    }
    .ativo{
        color: rgb(0, 102, 150);
        font-size: 16px;
    }
}
</style>