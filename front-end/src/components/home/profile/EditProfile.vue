<template>
<div>
    <form novalidate @submit.prevent="send">
        <md-card class="no-box-shadow">
            <!-- PRIMARY ALERTS -->
            <div class="p-1" :class="{'alert alert-danger': !success}" v-if="success == false">
                {{message}}
            </div>
            <div class="p-1" :class="{'alert alert-success': success}" v-if="success == true">
                {{message}}
            </div>
            <md-card-content class="flex-grow">
                    <md-subheader class="main-color">Basics</md-subheader>
                    <div class="w-75 mx-auto">
                        <md-field>
                            <label>First Name</label>
                            <md-input v-model="editProfile.firstName"></md-input>
                        </md-field>
                        <md-field>
                            <label>Last Name</label>
                            <md-input v-model="editProfile.lastName"></md-input>
                        </md-field>
                        <md-field>
                            <label>Password</label>
                            <md-input type="password" v-model="editProfile.password"></md-input>
                        </md-field>
                        <md-field>
                            <label>Confirm Password</label>
                            <md-input type="password" v-model="verifyPassword"></md-input>
                        </md-field>
                    </div>
                    <md-divider class="my-2"></md-divider>
                    <md-subheader class="main-color">Address</md-subheader>
                    <div class="w-75 mx-auto">
                        <md-field>
                            <label>Country</label>
                            <md-input v-model="editProfile.address.country"></md-input>
                        </md-field>
                        <md-field>
                            <label>Region</label>
                            <md-input v-model="editProfile.address.region"></md-input>
                        </md-field>
                        <md-field>
                            <label>City</label>
                            <md-input v-model="editProfile.address.city"></md-input>
                        </md-field>
                        <md-field>
                            <label>Street</label>
                            <md-input v-model="editProfile.address.street"></md-input>
                        </md-field>
                    </div>
            </md-card-content>
            <md-card-actions>
                <md-button type="submit" class="main-color-bg" :disabled="sending">Send</md-button>
            </md-card-actions>
        </md-card>
    </form>
</div>
</template>

<script>
import http from '@/helpers/http'
export default {
  name: 'EditProfile',
  data () {
    return {
      success: null,
      message: 'An error has occured..',
      sending: false,
      editProfile: {
          address: {}
      },
      verifyPassword: null
    }
  },
  methods: {
      send() {
          this.sending = true
          if (this.editProfile.password && (this.editProfile.password != this.verifyPassword)) {
              this.sending = false
              this.success = false
              this.message = "Пароли не совпадают.. Passwords don't match.."
          } else {
              http.put('profile', this.editProfile)
                    .then(
                        res => {
                            this.sending = false
                            this.success = res.data.success
                            this.message = res.data.message
                            // this.$emit('increment');
                            setTimeout(()=>{
                                // this.$router.push({ name: 'home' })
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
          }
      },
      getProfile() {
          http.get('profile')
            .then(
                res => {
                    this.editProfile = res.data.content
                }
            )
            .catch(
                err => {
                    this.success = err.response.data.success
                    this.message = err.response.data.message
                }
            )
      }
  },
  created() {
      this.getProfile()
  }
}
</script>

