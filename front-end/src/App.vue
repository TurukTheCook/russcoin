<template>
<div id="app">
  <div id="gradient" class="container-fluid">
    <div class="blyat-chat flex-center">
      <img @click="togglePlayback" class="z-depth-2" src="../static/img/blyat.jpg"/>
      <router-link :to="{ name: 'Login' }">
        <h1 class="text-center z-depth-2">BLYAT-MAILER</h1>
      </router-link>
    </div>
    <div class="center container d-flex justify-content-center">
      <img class="doors" src="../static/img/hammer-left.png"/>
      <transition name="door" mode="out-in">
        <router-view class="log-reg z-depth-2"/>
      </transition>
      <img class="doors" src="../static/img/hammer-right.png"/>
    </div>
  </div>
</div>
</template>

<script>
import {Howl, Howler} from 'howler'

export default {
  name: 'App',
  data () {
    return {
      player: null,
      playing: false
    }
  },
  methods: {
    togglePlayback() {
      if (this.playing) {
        this.player.pause()
        this.playing = false
      }
      else {
        this.player.play()
        this.playing = true
      }
    },
    initPlayer() {
      this.player = new Howl({
        src: ['../static/mp3/hymne-russia.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5
      });
    }
  },
  beforeMount() {
    this.initPlayer()
    this.playing = true
  }
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
    min-width: 600px;
    width: 600px;
    opacity: 1
  }
  100% {
    min-width: 600px;
    width: 600px;
    opacity: 1
  }
}

</style>

<!-- 
Ici on defini un component global qui contiendra nos vues
qui viennent du router (voir /router/index.js), qui seront liées
à d'autres components (voir components login/profile/register)

 -->