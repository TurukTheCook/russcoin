<template>
<div id="app">
  <div id="gradient" class="container-fluid">
    <div class="blyat-chat flex-center">
      <img class="z-depth-2" src="../static/img/blyat.jpg"/>
      <router-link :to="{'path': '/'}">
        <h1 class="text-center z-depth-2">BLYAT-CHAT</h1>
      </router-link>
    </div>
    <div class="center container d-flex justify-content-center">
      <img class="doors" src="../static/img/hammer-left.png"/>
      <transition name="door" mode="out-in">
        <router-view/>
      </transition>
      <img class="doors" src="../static/img/hammer-right.png"/>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Transition effect */ 
.door-enter-active {
  animation: door-in 1.2s;
}
.door-leave-active {
  animation: door-in 1.2s reverse;
}
@keyframes door-in {
  0% {
    min-width: 0px;
    width: 0px;
    opacity: 0;
    padding: 0;
    /* height: 300px; */
  }
  30% {
    min-width: 0px;
    width: 0px;
    opacity: 0;
    padding: 0;
    /* height: 300px; */
  }
  55% {
    opacity: 0
  }
  70% {
    min-width: 450px;
    width: 450px;
    opacity: 1
  }
  100% {
    min-width: 450px;
    width: 450px;
    opacity: 1
  }
}

</style>

<!-- 
Ici on defini un component global qui contiendra nos vues
qui viennent du router (voir /router/index.js), qui seront liées
à d'autres components (voir components login/profile/register)

 -->