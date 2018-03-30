<template>
<div>
    <form novalidate class="md-layout" @submit.prevent="send">
        <md-card class="md-layout-item flex flex-column no-box-shadow">
            <md-card-header class="main-color-bg">
                <div class="md-title text-center text-white">SEND A MESSAGE</div>
            </md-card-header>
            <md-card-content class="flex-grow">
                <div class="md-layout flex-column md-gutter">
                    <div class="md-layout-item">
                        <md-field>
                            <label for="usernameID">Username or ID</label>
                            <md-input name="usernameID" id="usernameID" v-model="sendMessage.userID"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                        <md-field>
                            <label for="title">Title</label>
                            <md-input name="title" id="title" v-model="sendMessage.title"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                        <md-field>
                            <label for="content">Content</label>
                            <md-textarea name="content" id="content" v-model="sendMessage.content"></md-textarea>
                        </md-field>
                    </div>
                </div>
            </md-card-content>
            <md-card-actions>
                <md-button type="submit" class="main-color-bg" :disabled="sending">Send</md-button>
            </md-card-actions>
            <div class="p-1" :class="{'alert alert-danger': !success}" v-if="success == false">
                {{message}}
            </div>
            <div class="p-1" :class="{'alert alert-success': success}" v-if="success == true">
                {{message}}
            </div>
            <div class="m-2 cursor-pointer" v-on:click="goBack">
                <img class="mr-2" src="../../../assets/img/chevron_left.png"/>previous
            </div>
        </md-card>
    </form >
</div>
</template>

<script>
import http from '@/helpers/http'
export default {
  name: 'SendMessage',
  data () {
    return {
      success: null,
      message: 'An error has occured..',
      sending: false,
      sendMessage: {}
    }
  },
  methods: {
      goBack() {
          this.$router.go(-1)
      },
      send() {
          this.sending = true
          http.post('messages', this.sendMessage)
                .then(
                    res => {
                        this.sending = false
                        this.success = res.data.success;
                        this.message = res.data.message;
                        // this.$emit('increment');
                        setTimeout(()=>{
                            this.$router.push({ name: 'home' })
                        },500);
                    }
                )
                .catch(
                    err => {
                        this.sending = false
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