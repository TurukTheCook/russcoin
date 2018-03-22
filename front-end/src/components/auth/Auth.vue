<template>
<div>
  <transition name="door" mode="out-in">
    <router-view class="log-reg z-depth-2"/>
  </transition>
</div>
</template>

<script>

export default {
  name: 'Auth'
}
</script>

<style>

</style>