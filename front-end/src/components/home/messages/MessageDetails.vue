<template>
    <div>
        <div class="message-card">
            <div v-if="msg._id" class="message-card_header p-2 main-font main-color-bg">
                <span class="md-caption">SENDER: </span>{{msg.senderId}}
            </div>
            <div class="p-1">
                <div v-if="msg._id">
                    <p class="m-1"><span class="md-caption main-color">Title: </span><span>{{msg.title}}</span></p><md-divider/>
                    <p class="m-1"><span class="md-caption main-color">Content: </span><span>{{msg.content}}</span></p><md-divider/>
                    <p class="m-1"><span class="md-caption main-color">Send date: </span><span v-if="msg.read">{{msg.creationDate | moment}} ({{msg.creationDate | momentFromNow}})</span><br/>
                    <span class="md-caption main-color">Read Date: </span><span v-if="msg.read">{{msg.readDate | moment}} ({{msg.creationDate | momentFromNow}})</span></p>
                </div>
    
                <div :class="{'alert alert-danger': !success}" v-if="success == false">
                    {{message}}
                </div>
            </div>
        </div>
        <div class="flex cursor-pointer m-2" v-on:click="goBack">
            <img class="mr-2" src="../../../assets/img/chevron_left.png"/>previous
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'MessageDetails',
  data() {
      return {
          msg: {},
          success: true,
          message: 'An error has occured..'
      }
  },
  filters: {
      moment: function(date) {
          return moment(date).format('MMMM Do YYYY [at] HH:mm:ss')
      },
      momentFromNow: function(date) {
          return moment(date).fromNow()
      }
  },
  methods: {
      goBack() {
          this.$router.go(-1)
      },
      updateMessage() {
        this.$http.put('/messages/' + this.$route.params.msgId)
            .then(
                res => {
                    this.msg = res.data.content;
                    this.success = res.data.success;
                    this.message = res.data.message;
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
  beforeMount(){
    this.updateMessage()
  }
}
</script>

<style>

</style>