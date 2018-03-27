<template>
<div>
    <div v-if="$route.name == 'home.messages'" class="m-1 flex flex-column flex-wrap">
        <div class="message-card cursor-pointer mb-1 border-1 md-elevation-3" v-for="msg in messages" v-on:click="viewMessage(msg._id)">
            <div class="p-1 flex messages-list" :class="[{'unread': !msg.read}, 'read']">
                <p class="min-max-100 main-font">{{msg.senderId}}</p>
                <p class="min-max-100">{{msg.title}}</p>
                <p class="md-caption flex-grow">{{msg.content}}</p>
                <p class="min-max-180 text-center">{{msg.creationDate | moment}} ({{msg.creationDate | momentFromNow}})</p>
                <!-- <p class="px-1" style="min-width: 100px; max-width: 100px; height: 1.5em; overflow: hidden" v-if="msg.read">{{msg.readDate | moment}} ({{msg.readDate | momentFromNow}})</p> -->
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
import http from '@/helpers/http'
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
        http.get('messages')
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
          return moment(date).format('Do MMMM')
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
