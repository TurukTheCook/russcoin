<template>
<div>
    <div v-if="$route.name == 'home.messages'" class="m-1 flex flex-column flex-wrap">
        <div class="message-card list mb-1 border-1 md-elevation-3" v-for="msg in messages" v-on:click="viewMessage(msg._id)">
            <div class="message-card_header p-1">
                <span v-bind:class="{'md-caption': msg.read}" class="main-font text-white">SENDER: </span><span class="main-color main-font">{{msg.senderId}}</span>
            </div>
            <div class="p-1" :class="[{'unread': !msg.read}, 'read']">
                <span v-bind:class="{'md-caption': msg.read}" class="main-color">Title: </span><span >{{msg.title}}</span><br/>
                <span v-bind:class="{'md-caption': msg.read}" class="main-color">Send date: </span><span>{{msg.creationDate | moment}} ({{msg.creationDate | momentFromNow}})</span>
                <span v-bind:class="{'md-caption': msg.read}" class="main-color" v-if="msg.read">Read Date: </span><span v-if="msg.read">{{msg.readDate | moment}} ({{msg.readDate | momentFromNow}})</span>
            </div>
        </div>
        <!-- PRIMARY ALERTS -->
        <div class="mx-auto" :class="{'alert alert-danger': !success}" v-if="success == false">
            {{message}}
        </div>
    </div>
    <router-view/>
</div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Messages',
  data () {
    return {
      messages: [],
      success: true,
      message: 'An error has occured..'
    }
  },
  methods: {
      getMessages() {
        this.$http.get('/messages')
            .then(
                res => {
                    this.messages = res.data.content;
                }
            )
            .catch(
                err => {
                    this.success = err.response.data.success;
                    this.message = err.response.data.message;
                }
            )
      },
      viewMessage(arg) {
          this.$router.push({ name: 'home.messages.messageDetails', params: { msgId: arg } })
      }
  },
  filters: {
      moment: function(date) {
          return moment(date).format('MM/DD/YYYY [at] HH:mm:ss')
      },
      momentFromNow: function(date) {
          return moment(date).fromNow()
      }
  },
  beforeMount(){
    this.getMessages()
  }
}
</script>
