<template>
<div id="main-bg">
  <div id="app">
      <div id="inner">
        <div class="blyat-chat flex-center">
          <img v-if="!playing" @click="togglePlayback" src="./assets/img/volume_off.png"/>
          <img v-if="playing" @click="togglePlayback" src="./assets/img/volume_up.png"/>
          <router-link :to="{ name: 'Login' }">
            <img src="./assets/img/blyat.png"/>
          </router-link>
          <router-link :to="{ name: 'Login' }">
            <h1 class="text-center" style="color: #EF5350">BLYAT-MAILER</h1>
          </router-link>
        </div>
        <div class="center container d-flex justify-content-center">
          <img class="doors" src="./assets/img/hammer-left.png"/>
          <transition name="door" mode="out-in">
            <router-view/>
          </transition>
          <img class="doors" src="./assets/img/hammer-right.png"/>
        </div>
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
    /* height: 300px; */
  }
  30% {
    min-width: 0px;
    width: 0px;
    opacity: 0;
    /* height: 300px; */
  }
  55% {
    opacity: 0
  }
  70% {
    min-width: 500px;
    opacity: 1
  }
  100% {
    min-width: 500px;
    opacity: 1
  }
}

</style>

<!-- 
Ici on defini un component global qui contiendra nos vues
qui viennent du router (voir /router/index.js), qui seront liées
à d'autres components (voir components login/profile/register)

 -->