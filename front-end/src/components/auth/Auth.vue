<template>
  <div class="flex-center">
    
    <transition name="door" mode="out-in">
      <Login v-on:authSwitchEvent="authSwitchMethod" v-if="!authSwitch"/>
      <Register v-on:authSwitchEvent="authSwitchMethod" v-else/>
    </transition>
    
  </div>
</template>

<script>
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
export default {
  name: 'Auth',
  components: {
    Login,
    Register
  },
  data () {
    return {
      authSwitch: false
    }
  },
  methods: {
    authSwitchMethod: function() {
      this.authSwitch = !this.authSwitch
    }
  }
}
</script>

<style>

</style>