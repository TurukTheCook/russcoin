<script>
  import VueHowler from 'vue-howler'

  export default {
    mixins: [VueHowler]
  }
</script>

<template>
    <img @click="togglePlayback" class="z-depth-2" src="../../../static/img/blyat.jpg"/>
</template>