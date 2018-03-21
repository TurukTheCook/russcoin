<template>
    <form class="form-group log-reg z-depth-2">
        <h3>SEND A MESSAGE</h3>
        <div class="padd-10 sender">
            <input v-model="sendMessage.username" class="form-control" type="text" placeholder="Username" required><br>
            <input v-model="sendMessage.title" class="form-control" type="text" placeholder="Title" required><br>
            <textarea v-model="sendMessage.content" class="form-control" rows="5" placeholder="Content" required></textarea><br>
            <button class="btn btn-teal btn-block" v-on:click="send">Accept</button><br>
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
  name: 'Send',
  props: [
      'sendingTo'
  ],
  data () {
    return {
      success: null,
      message: 'An error has occured..',
      sendMessage: {
          userID: this.sendingTo
      }
    }
  },
  methods: {
      send: function(e) {
          e.preventDefault();
          this.$http.post('/messages', this.sendMessage)
                .then(
                    res => {
                        this.success = res.data.success;
                        this.message = res.data.message;
                        // this.$emit('increment');
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