<template>
<div>
    <div v-if="$route.name == 'home.messages'" class="flex flex-column flex-wrap">
        <!-- PRIMARY ALERTS -->
        <div class="mx-auto" :class="{'alert alert-danger': !success}" v-if="success == false">
            {{message}}
        </div>
        <md-content class="p-2">
            <div class="message-card cursor-pointer mb-1 border-1 md-elevation-3" v-for="msg in messagesReverse" v-on:click="viewMessage(msg._id)">
                <div class="p-1 flex messages-list" :class="[{'unread': !msg.read}, 'read']">
                    <p class="min-max-100 main-font">{{msg.senderId}}</p>
                    <p class="min-max-100">{{msg.title}}</p>
                    <p class="flex-grow" style="color: grey">{{msg.content}}</p>
                    <p class="min-max-180 text-center">{{moment(msg.creationDate)}} ({{momentFromNow(msg.creationDate)}})</p>
                    <!-- <p class="px-1" style="min-width: 100px; max-width: 100px; height: 1.5em; overflow: hidden" v-if="msg.read">{{msg.readDate | moment}} ({{msg.readDate | momentFromNow}})</p> -->
                </div>
            </div>
        </md-content>
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
  computed: {
      messagesReverse() {
          return this.messages.slice().reverse()
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
      },
      moment: function(date) {
          return moment(date).format('Do MMMM')
      },
      momentFromNow: function(date) {
          return moment(date).fromNow()
      }
  },
  created(){
    this.getMessages()
  }
}
</script>
