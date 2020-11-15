<template>
    <section>
        <div v-if="$route.name!='Acesso'" class="fundo-chat"></div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <slot></slot>
                </div>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.container{
    padding-top: 50px;
    padding-bottom: 50px;
    max-height: 100vh;
}
.fundo-chat{
    position: fixed;
    width: 100%;
    height: 100vh;
    background-size: contain;
    filter: opacity(0.3);
    background-image: url('https://www.papeiseparede.com.br/3260-thickbox_default/papel-de-parede-emojis-chat-cinza.jpg');
}
</style>