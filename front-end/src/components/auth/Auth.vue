<template>
<transition name="door" mode="out-in">
  <router-view :key="$route.path"/>
</transition>
</template>

<script>

export default {
  name: 'Auth'
}
</script>

<style>

</style>