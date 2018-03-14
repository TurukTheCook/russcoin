<template>
    <div class="container">
        <div class="center">
            <h4>USERS</h4>
            <div v-for="user in users">
                {{user}}
            <br/>
            </div>
            <h4>MESSAGES</h4>
            <div v-for="message in messages">
                {{message}}
            <br/>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Register',
  data () {
    return {
      messages: [],
      users: []
    }
  },
  methods: {
      getMessages: function() {
        this.$http.get('http://localhost:1407/messages')
            .then(
                res => {
                    this.messages = res.data.content
                },
                res => {
                    console.log(res.data)
                }
            )
      },
      getUsers: function() {
          this.$http.get('http://localhost:1407/users')
            .then(
                res => {
                    this.users = res.data.content
                },
                res => {
                    console.log(res.data)
                }
            )
      }
  },
  beforeMount(){
    this.getMessages(),
    this.getUsers()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>