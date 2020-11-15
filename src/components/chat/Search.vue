<template>
    <section>
        <input type="text" v-model="texto" class="form-control" placeholder="Filtrar conversa">
    </section>
</template>
<script>
export default {
    data(){
        return{
            texto:''
        }
    },
    watch:{
        texto:function(){
            let texto = this.texto.toLowerCase()
            this.$store.commit('setFiltro', texto)
        }
    }
}
</script>
<style lang="scss" scoped>
section{
    margin-top: 10px;
    box-shadow: 1px 1px 5px 2px rgba(45,45,45,.15);
    input{
        border: 1px solid rgba(0, 93, 143, 0.418) !important;
    }
}
</style>