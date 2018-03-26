<template>
  <div id="app">
      <div id="inner">
        <div class="blyat-chat flex flex-center">
          <img class="speaker" v-if="!playing" @click="togglePlayback" src="./assets/img/volume_off.png"/>
          <img class="speaker" v-if="playing" @click="togglePlayback" src="./assets/img/volume_up.png"/>
          <router-link :to="{ name: 'login' }">
            <img src="./assets/img/blyat.png"/>
          </router-link>
          <router-link class="flex flex-center" :to="{ name: 'login' }">
            <h1 class="text-center" style="color: #EF5350">BLYAT-MAILER</h1>
          </router-link>
        </div>
        <div class="pb-3 mx-auto flex justify-content-center">
          <img class="doors" src="./assets/img/hammer-left.png"/>
          <transition name="door" mode="out-in">
            <router-view class="container"/>
          </transition>
          <img class="doors" src="./assets/img/hammer-right.png"/>
        </div>
      </div>
      <vue-progress-bar></vue-progress-bar>
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

<!-- 
Ici on defini un component global qui contiendra nos vues
qui viennent du router (voir /router/index.js), qui seront liées
à d'autres components (voir components login/profile/register)

 -->