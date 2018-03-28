<template>
<div>
    <div v-if="$route.name == 'home.users'" class="my-2 md-layout justify-content-around">
        <span class="md-layout-item md-caption text-center mb-2 md-size-100 mx-auto">Click a user to send him a message, if you click on his username it will send by username, else by id.</span>
        <div class="cursor-pointer md-layout-item user-card mb-2 mx-1 border-1" v-for="user in usersSorted">
            <div class="user-card_header p-1" v-on:click="sendMessage(user.username)">
                <span class="main-color main-font" style="font-size: 1.25rem">{{user.username}}</span>
            </div>
            <div class="p-1" v-on:click="sendMessage(user._id)">
                <span class="md-caption main-color">User ID: </span><span>{{user._id}}</span><br/><hr>
                <span class="md-caption main-color">First Name: </span><span>{{user.firstName || '--'}}</span><br/>
                <span class="md-caption main-color">Last Name: </span><span>{{user.lastName || '--'}}</span>
            </div>
        </div>
        <!-- PRIMARY ALERTS -->
        <div class="md-layout-item md-size-100 mx-auto" :class="{'alert alert-danger': !success}" v-if="success == false">
            {{message}}
        </div>
    </div>
    <router-view/>
</div>
</template>

<script>
import http from '@/helpers/http'
export default {
  name: 'Users',
  data () {
    return {
      users: [],
      success: true,
      message: 'An error has occured..'
    }
  },
  computed: {
      usersSorted() {
          return this.users.sort((a, b) => {
              return a.username.localeCompare(b.username)
          })
      }
  },
  methods: {
      getUsers() {
          http.get('users')
            .then(
                res => {
                    this.users = res.data.content
                }
            )
            .catch(
                err => {
                    this.success = err.response.data.success;
                    this.message = err.response.data.message;
                }
            )
      },
      sendMessage(arg) {
          this.$router.push({ name: 'home.users.sendMessage', params: { sendingTo: arg } })
      }
  },
  created(){
    this.getUsers()
  }
}
</script>

