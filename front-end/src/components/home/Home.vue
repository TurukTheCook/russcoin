<template>
    <div class="log-reg z-depth-2">
        <div class="menu">
            <button v-bind:class="{'active': menu.UserList}" v-on:click="menu.UserList = true; menu.MessageList = false">Users</button>
            <button v-bind:class="{'active': menu.MessageList}" v-on:click="menu.MessageList = true; menu.UserList = false">Messages</button>
        </div>
        <div class="padd-20">
            <div v-if="menu.UserList" class="flex-row-wrap">
                <span class="small text-center mb-2 w-75 mx-auto">Click a user to send him a message, if you click on his username it will send by username, else by id.</span>
                <div class="user-card border-1 z-depth-1" v-for="user in users">
                    <div class="user-card_header" v-on:click="sendMessage(user.username)">
                        <span style="color: #00B285; text-transform: uppercase">{{user.username}}</span>
                    </div>
                    <div class="padd-10" v-on:click="sendMessage(user._id)">
                        <span class="small">User ID: </span><span style="color: #00B285">{{user._id}}</span><br/><hr>
                        <span class="small">First Name: </span><span style="color: #00B285">{{user.firstName}}</span><br/>
                        <span class="small">Last Name: </span><span style="color: #00B285">{{user.lastName}}</span>
                    </div>
                </div>
            </div>
            <div v-if="menu.MessageList" class="flex-row-wrap">
                <div class="message-card border-1 z-depth-1" v-for="msg in messages" v-on:click="viewProfile(msg._id)">
                    <div class="message-card_header padd-10">
                        <span class="small">SENDER: </span><span style="color: #00B285">{{msg.senderId}}</span>
                    </div>
                    <div class="padd-10">
                        <span class="small">Title: </span><span style="color: #00B285">{{msg.title}}</span><br/>
                        <span class="small">Send date: </span><span style="color: #00B285">{{msg.creationDate | moment}}</span>
                        <span class="small" v-if="msg.readDate">Read Date: </span><span style="color: #00B285">{{msg.readDate | moment}}</span><br/>
                    </div>
                </div>
            </div>
            <div v-if="!menu.UserList && !menu.MessageList">
                <h3>CLICK ABOVE</h3>
                <img class="img-fluid" src="../../../static/img/poutine.jpg"/>
            </div>

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
          return moment(date).format('MM/DD/YYYY, hh:mm:ss')
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