<template>
<div>
    <form novalidate class="md-layout log-reg md-elevation-10" @submit.prevent="register">
        <md-card class="md-layout-item flex flex-column">
            <md-card-header class="main-color-bg">
                <div class="md-title text-center">REGISTER</div>
            </md-card-header>
            <md-card-content class="flex-grow">
                <div class="md-layout flex-column md-gutter">
                    <div class="md-layout-item">
                        <md-field>
                            <label >Username</label>
                            <md-input v-model="newUser.username"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                        <md-field>
                            <label >First Name</label>
                            <md-input v-model="newUser.firstName"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                        <md-field>
                            <label >Last Name</label>
                            <md-input v-model="newUser.lastName"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                        <md-field>
                            <label>Password</label>
                            <md-input v-model="newUser.password" type="password"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item">
                        <md-field>
                            <label>Confirm Password</label>
                            <md-input v-model="newUser.passwordVerif" type="password"></md-input>
                        </md-field>
                    </div>
                </div>
            </md-card-content>
            <md-card-actions>
                <md-button type="submit" class="main-color-bg" :disabled="sending">Sign Up</md-button>
            </md-card-actions>
            <div class="p-1">
                <p class="text-center">Already have an account ? 
                <router-link :to="{ name: 'login' }">Sign in</router-link>
                </p>
            </div>
            <div class="p-1" :class="{'alert alert-danger': !success}" v-if="success == false">
                {{message}}
            </div>
            <div class="p-1" :class="{'alert alert-success': success}" v-if="success == true">
                {{message}}
            </div>
        </md-card>
    </form>
</div>
</template>

<script>
import http from '@/helpers/http'
export default {
  name: 'Register',
  data () {
    return {
      newUser: {},
      sending: false,
      success: null,
      message: 'An error has occured..'
    }
  },
  methods: {
      register() {
        this.sending = true
        if (this.newUser.password == this.newUser.passwordVerif) {
            http.post('auth/signup', this.newUser)
                .then(
                    res => {
                        this.sending = false
                        this.success = res.data.success
                        this.message = res.data.message

                        setTimeout(()=>{
                            this.$router.push({ name: 'login' })
                        },500);
                    }
                )
                .catch(
                    err => {
                        this.sending = false
                        this.success = err.response.data.success
                        this.message = err.response.data.message
                    }
                )
        } else {
          this.sending = false
          this.success = false
          this.message = "Пароли не совпадают.. Passwords don't match.."
        }
      }
  }
}
</script>
