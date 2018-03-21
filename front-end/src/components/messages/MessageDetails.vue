<template>
    <div class="log-reg z-depth-2">
        <div class="message-card">
            <div class="message-card_header padd-10">
                <span style="color: #00B285; text-transform: uppercase">SENDER: </span>{{msg.senderId}}
            </div>
            <div class="padd-10">
                <span class="small">Title: </span><span style="color: #00B285">{{msg.title}}</span><br/><hr>
                <span class="small">Content: </span><span style="color: #00B285">{{msg.content}}</span><br/><hr>
                <span class="small">Send date: </span><span style="color: #00B285">{{msg.creationDate | moment}}</span><br/>
                <span class="small">Read: </span><span style="color: #00B285">{{msg.read}}</span><br/>
                <span class="small">Read Date: </span><span style="color: #00B285">{{msg.readDate | moment}}</span><br/>
    
                <div :class="{'alert alert-danger': !success}" v-if="success == false">
                    {{message}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'MessageDetails',
  props: ['msgId'],
  data() {
      return {
          msg: {},
          success: true,
          message: 'An error has occured..'
      }
  },
  filters: {
      moment: function(date) {
          return moment(date).format('MM/DD/YYYY, hh:mm:ss')
      }
  },
  methods: {
      updateMessage() {
        this.$http.put('/messages/' + this.msgId)
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