<template>
    <form class="center flex-center">
        <div class="form-group">
            <h4>LOG IN</h4>
            <input v-model="logUser.email" class="form-control" type="email" placeholder="Email"><br>
            <input v-model="logUser.password" class="form-control" type="password" placeholder="Password"><br>
            <button class="btn btn-sucess btn-block" v-on:click="login">Log in</button><br>
            <p id="param">Don't have an account ? 
            <router-link to="/register">Sign up</router-link>
            </p>
        </div>
    </form >
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      logUser: {}
    }
  },
  methods: {
      // la méthode login est appelée avec 'v-on:click="login" ' dans le template plus haut
      login: function(e) {
          // e.preventDefault() permet d'empecher le comportement classique du button dans le form
          // et seulement executer le code qui suit
        e.preventDefault();
          // data est  notre req.body  qu'on envoi au back-end
        let data = {
            email: this.logUser.email,
            password: this.logUser.password
        };
        // pour les requetes http avec vue-resource on doit mettre this.$http.METHOD( ... )
        // ici avec l'url et la data
        this.$http.post('http://localhost:1407/auth/login', data)
            .then(
                res => {
                    // en cas de success, on recupere le token depuis la reponse
                    // et on l'assigne au localstorage 'token'
                    localStorage.setItem('token', res.data.content.token)
                    this.$router.push({ path: '/profile' })
                },
                res => {
                    console.log(res.data)
                }
            )
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
