<template>
    <div class="log-reg z-depth-2">
        <div class="menu">
            <button v-bind:class="{'active': menu.UserList}" v-on:click="menu.UserList = true; menu.MessageList = false">Users</button>
            <button v-bind:class="{'active': menu.MessageList}" v-on:click="menu.MessageList = true; menu.UserList = false">Messages</button>
        </div>
        <div class="padd-20">
            <div v-if="menu.UserList" class="d-flex flex-wrap justify-content-around">
                <span class="small text-center mb-2 w-75 mx-auto">Click a user to send him a message, if you click on his username it will send by username, else by id.</span>
                <div class="user-card mb-3 border-1 z-depth-1" v-for="user in users">
                    <div class="user-card_header" v-on:click="sendMessage(user.username)">
                        <span class="main-color main-font" style="font-size: 1.25rem">{{user.username}}</span>
                    </div>
                    <div class="padd-10" v-on:click="sendMessage(user._id)">
                        <span class="small main-color">User ID: </span><span>{{user._id}}</span><br/><hr>
                        <span class="small main-color">First Name: </span><span>{{user.firstName || '--'}}</span><br/>
                        <span class="small main-color">Last Name: </span><span>{{user.lastName || '--'}}</span>
                    </div>
                </div>
            </div>
            <div v-if="menu.MessageList" class="d-flex flex-column flex-wrap">
                <div class="message-card list mb-3 border-1 z-depth-1" v-for="msg in messages" v-on:click="viewProfile(msg._id)">
                    <div class="message-card_header padd-10">
                        <span v-bind:class="{'small': msg.read}" class="main-font">SENDER: </span><span class="main-color main-font">{{msg.senderId}}</span>
                    </div>
                    <div class="padd-10" :class="[{'unread': !msg.read}, 'read']">
                        <span v-bind:class="{'small': msg.read}" class="main-color">Title: </span><span >{{msg.title}}</span><br/>
                        <span v-bind:class="{'small': msg.read}" class="main-color">Send date: </span><span>{{msg.creationDate | moment}} ({{msg.creationDate | momentFromNow}})</span>
                        <span v-bind:class="{'small': msg.read}" class="main-color" v-if="msg.read">Read Date: </span><span v-if="msg.read">{{msg.readDate | moment}} ({{msg.readDate | momentFromNow}})</span>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-wrap justify-content-center" v-if="!menu.UserList && !menu.MessageList">
                <span class="small text-center mb-2 w-75 mx-auto">Click above to get started.</span>
                <img class="img-fluid mb-2" src="../../assets/img/poutine-here.jpg"/>
            </div>

            <button class="btn btn-block w-50 mx-auto main-color-bg " v-on:click="logout">Logout</button>

            <!-- PRIMARY ALERTS -->
            <div :class="{'alert alert-danger': !success}" v-if="success == false">
                {{message}}
            </div>
            <div :class="{'alert alert-success': success}" v-if="success == true">
                {{message}}
            </div>

            <!-- Messages Alerts -->
            <div :class="{'alert alert-danger': !successMessages}" v-if="successMessages == false">
                {{messageMessages}}
            </div>
            <!-- Users Alert -->
            <div :class="{'alert alert-danger': !successUsers}" v-if="successUsers == false">
                {{messageUsers}}
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Home',
  data () {
    return {
      messages: [],
      users: [],
      menu: {
          UserList: false,
          MessageList: false
      },
      counter: 0,
      success: null,
      message: 'An error has occured..',
      successMessages: true,
      messageMessages: 'An error has occured..',
      successUsers: true,
      messageUsers: 'An error has occured..'
    }
  },
  methods: {
      logout() {
          localStorage.removeItem('token')
          this.$router.push({ name: 'Login' })
      },
      getMessages() {
        this.$http.get('/messages')
            .then(
                res => {
                    this.messages = res.data.content;
                }
            )
            .catch(
                err => {
                    this.successMessages = err.response.data.success;
                    this.messageMessages = err.response.data.message;
                }
            )
      },
      getUsers() {
          this.$http.get('/users')
            .then(
                res => {
                    this.users = res.data.content
                }
            )
            .catch(
                err => {
                    this.successUsers = err.response.data.success;
                    this.messageUsers = err.response.data.message;
                }
            )
      },
      sendMessage(arg) {
          this.$router.push({ name: 'Send', params: { sendingTo: arg } })
      },
      viewProfile(arg) {
          this.$router.push({ name: 'MessageDetails', params: { msgId: arg } })
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
    this.getMessages(),
    this.getUsers()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>