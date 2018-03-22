<template>
<div>
    <form class="form-group ">
        <h3>SEND A MESSAGE</h3>
        <div class="padd-10 sender">
            <input v-model="sendMessage.userID" class="form-control" type="text" placeholder="Username" required><br>
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
    <div class="d-flex cursor-pointer m-2" v-on:click="goBack">
        <img class="mr-2" src="../../../static/img/chevron_left.png"/>previous
    </div>
</div>
</template>

<script>
export default {
  name: 'Send',
  data () {
    return {
      success: null,
      message: 'An error has occured..',
      sendMessage: {}
    }
  },
  methods: {
      goBack() {
          this.$router.go(-1)
      },
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
  },
  beforeMount() {
      this.sendMessage.userID = this.$route.params.sendingTo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>