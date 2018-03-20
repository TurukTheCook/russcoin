<template>
    <div class="log-reg z-depth-2">
        <div class="menu">
            <button v-bind:class="{'active': menu.UserList}" v-on:click="menu.UserList = true; menu.MessageList = false">Users</button>
            <button v-bind:class="{'active': menu.MessageList}" v-on:click="menu.MessageList = true; menu.UserList = false">Messages</button>
        </div>
        <div class="padd-20 flex-row-wrap">
            <div v-if="menu.UserList" class="user-card z-depth-1" v-for="user in users">
                <div class="user-card_header">
                    <span style="color: #00B285; text-transform: uppercase">{{user.username}}</span>
                </div>
                <div class="padd-10">
                    <span class="small" v-if:="user.firstName">First Name: </span><span style="color: #00B285">{{user.firstName}}</span><br/>
                    <span class="small" v-if:="user.lastName">Last Name: </span><span style="color: #00B285">{{user.lastName}}</span>
                </div>
            </div>
            <div v-if="menu.MessageList" class="user-card z-depth-1" v-for="message in messages">
                <!-- <div class="user-card_header">
                    <span style="color: #00B285; text-transform: uppercase">{{user.username}}</span>
                </div>
                <div class="padd-10">
                    <span class="small" v-if:="user.firstName">First Name: </span><span style="color: #00B285">{{user.firstName}}</span><br/>
                    <span class="small" v-if:="user.lastName">Last Name: </span><span style="color: #00B285">{{user.lastName}}</span>
                </div> -->
                TEST
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
export default {
  name: 'Home',
  data () {
    return {
      messages: [{}],
      users: [],
      menu: {
          UserList: false,
          MessageList: false
      },
      success: null,
      message: 'An error has occured..',
      successMessages: true,
      messageMessages: 'An error has occured..',
      successUsers: true,
      messageUsers: 'An error has occured..'
    }
  },
  methods: {
      getMessages: function() {
        this.$http.get('http://localhost:1407/messages')
            .then(
                res => {
                    // this.messages = res.data.content
                },
                res => {
                    this.successMessages = res.data.success;
                    this.messageMessages = res.data.message;
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
                    this.successUsers = res.data.success;
                    this.messageUsers = res.data.message;
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