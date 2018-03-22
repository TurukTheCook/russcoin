<template>
    <form class="form-group log-reg z-depth-2">
        <h3>REGISTER</h3>
        <div class="padd-10">
            <input class="form-control" v-model="newUser.username" type="text" placeholder="Username" required><br>
            <input class="form-control" v-model="newUser.firstName" type="text" placeholder="First Name"><br>
            <input class="form-control" v-model="newUser.lastName" type="text" placeholder="Last Name"><br>
            <input class="form-control" v-model="newUser.password" type="password" placeholder="Password" required><br>
            <input class="form-control" v-model="newUser.passwordVerif" type="password" placeholder="Confirm Password" required><br>
            <button class="btn btn-teal btn-block" v-on:click="register">Accept</button><br>
            <p id="param">Already have an account ? 
            <!-- <a href="#" v-on:click="authSwitchClick">Sign in</a> -->
            <router-link :to="{ name: 'Login' }">Sign in</router-link>
            </p>
            <div :class="{'alert alert-danger': !success}" v-if="success == false">
                {{message}}
            </div>
            <div :class="{'alert alert-success': success}" v-if="success == true">
                {{message}}
            </div>
        </div>
    </form>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      newUser: {},
      success: null,
      message: 'An error has occured..'
    }
  },
  methods: {
      authSwitchClick: function() {
          this.$emit('authSwitchEvent');
      },
      register: function(e) {
        e.preventDefault();
        if (this.newUser.password == this.newUser.passwordVerif) {
            this.$http.post('/auth/signup', this.newUser)
                .then(
                    res => {
                        //   console.log(res.data)
                        //   this.$router.push({ path: '/' })
                        this.success = res.data.success;
                        this.message = res.data.message;
                        setTimeout(()=>{
                            this.authSwitchClick();
                        },500);
                    }
                )
                .catch(
                    err => {
                        this.success = err.response.data.success;
                        this.message = err.response.data.message;
                    }
                )
        } else {
          this.success = false;
          this.message = "Passwords don't match..";
        }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>
