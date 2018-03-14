<template>
    <div class="container center">
        <div v-for="message in messages">
          {{message.message}}
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Register',
  data () {
    return {
      messages: []
    }
  },
  methods: {
      getMessages: function() {
        this.$http.get('http://localhost:1407/messages/user')
            .then(
                res => {
                    this.messages = res.data.content
                },
                res => {
                    console.log(res.data)
                }
            )
      }
  },
  beforeMount(){
    this.getMessages()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>