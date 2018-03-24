<template>
    <div class="mt-2 flex flex-column flex-center flex-wrap">
        <span class="small text-center mb-2 md-size-75 mx-auto">Click above to get started.</span>
        <img class="img-fluid mb-2" src="../../../assets/img/poutine-here.jpg"/>
        <md-button class="md-raised md-primary" style="align-self: flex-end" v-on:click="logout">Logout</md-button>
    </div>
</template>

<script>
export default {
  name: 'Welcome',
  methods: {
      logout() {
          localStorage.removeItem('token')
          this.$router.push({ name: 'login' })
      }
  }
}
</script>
