<template>
    <form class="form-group log-reg z-depth-2">
        <h3>LOG IN</h3>
        <div class="padd-10">
            <input v-model="logUser.username" class="form-control" type="text" placeholder="Username" required><br>
            <input v-model="logUser.password" class="form-control" type="password" placeholder="Password" required><br>
            <button class="btn btn-teal btn-block" v-on:click="login">Accept</button><br>
            <p id="param">Don't have an account ? 
            <a href="#" v-on:click="authSwitchClick">Sign up</a>
            </p>
            <div :class="{'alert alert-danger': !success}" v-if="success == false">
                {{message}}
            </div>
            <div :class="{'alert alert-success': success}" v-if="success == true">
                {{message}}
            </div>
        </div>
    </form >
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      logUser: {},
      success: null,
      message: 'An error has occured..'
    }
  },
  methods: {
      authSwitchClick: function() {
          this.$emit('authSwitchEvent');
      },
      // la méthode login est appelée avec 'v-on:click="login" ' dans le template plus haut
      login: function(e) {
          // e.preventDefault() permet d'empecher le comportement classique du button dans le form
          // et seulement executer le code qui suit
        e.preventDefault();
        // pour les requetes http avec vue-resource on doit mettre this.$http.METHOD( ... )
        // ici avec l'url et la data
        this.$http.post('/auth/login', this.logUser)
            .then(
                res => {
                    // en cas de success, on recupere le token depuis la reponse
                    // et on l'assigne au localstorage 'token'
                    localStorage.setItem('token', res.data.content.token)
                    this.success = res.data.success;
                    this.message = res.data.message;
                    setTimeout(()=>{
                        this.$router.push({ name: 'Home' })
                    },500);
                }
            )
            .catch(
                err => {
                    this.success = err.response.data.success;
                    this.message = err.response.data.message;
                }
            )
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>
