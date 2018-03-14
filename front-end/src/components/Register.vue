<template>
    <form class="center flex-center">
        <div class="form-group">
            <h4>REGISTER</h4>
            <input class="form-control" v-model="newUser.email" type="text" placeholder="Email"><br>
            <input class="form-control" v-model="newUser.password" type="password" placeholder="Password"><br>
            <input class="form-control" v-model="newUser.passwordVerif" type="password" placeholder="Confirm Password"><br>
            <button class="btn btn-sucess btn-block" v-on:click="register">Register</button><br>
            <p id="param">Already have an account ? 
            <router-link to="/">Sign in</router-link>
            </p>
        </div>
    </form>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      newUser: {}
    }
  },
  methods: {
      register: function(e) {
        e.preventDefault();
        if (this.newUser.password == this.newUser.passwordVerif) {
          let data = {
              email: this.newUser.email,
              password: this.newUser.password
          };
          this.$http.post('http://localhost:1407/auth/register', data)
              .then(
                  res => {
                      console.log(res.data)
                      this.$router.push({ path: '/' })
                  },
                  res => {
                      console.log(res.data)
                  }
              )
        } else {
          alert("Passwords don't match..")
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
