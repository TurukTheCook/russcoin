<template>
    <div>
        <md-card class="no-box-shadow">
            <md-card-header v-if="msg._id" class="message-card_header p-2 mb-2 main-font main-color-bg">
                <div class="md-title">
                    <span class="md-caption">SENDER:</span> {{msg.senderId}}
                </div>
            </md-card-header>
            <md-card-content class="p-1">
                <div v-if="msg._id" class="p-1" style="position: relative">
                    <p class="md-caption main-color" style="position: absolute; left: 5px;">Title: </p><p style="padding-left: 100px">{{msg.title}}</p><md-divider class="my-2"/>
                    <p class="md-caption main-color" style="position: absolute; left: 5px;">Content: </p><p style="padding-left: 100px">{{msg.content}}</p><md-divider class="my-2"/>
                    <p class=""><span class="md-caption main-color" style="position: absolute; left: 5px;">Send date: </span><span style="padding-left: 100px" v-if="msg.read">{{msg.creationDate | moment}} ({{msg.creationDate | momentFromNow}})</span><br/>
                    <span class="md-caption main-color" style="position: absolute; left: 5px;">Read Date: </span><span style="padding-left: 100px" v-if="msg.read">{{msg.readDate | moment}} ({{msg.readDate | momentFromNow}})</span></p>
                </div>
    
                <div :class="{'alert alert-danger': !success}" v-if="success == false">
                    {{message}}
                </div>
            </md-card-content>
        </md-card>
        <div class="flex cursor-pointer m-2" v-on:click="goBack">
            <img class="mr-2" src="../../../assets/img/chevron_left.png"/>previous
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import http from '@/helpers/http'
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
        let _data = {
            read: true,
            readDate: Date.now()
        }
        http.put('messages/' + this.$route.params.msgId, _data)
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