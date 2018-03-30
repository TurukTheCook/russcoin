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
                            <label for="firstName">First Name</label>
                            <md-input name="firstName" id="firstName" v-model="editProfile.firstName"></md-input>
                        </md-field>
                        <md-field>
                            <label for="lastName">Last Name</label>
                            <md-input name="lastName" id="lastName" v-model="editProfile.lastName"></md-input>
                        </md-field>
                        <md-field>
                            <label for="password">Password</label>
                            <md-input name="password" id="password" type="password" v-model="editProfile.password"></md-input>
                        </md-field>
                        <md-field>
                            <label for="confirm">Confirm Password</label>
                            <md-input name="confirm" id="confirm" type="password" v-model="verifyPassword"></md-input>
                        </md-field>
                    </div>
                    <md-divider class="my-2"></md-divider>
                    <md-subheader class="main-color">Address</md-subheader>
                    <div class="w-75 mx-auto">
                        <md-field>
                            <label for="country">Country</label>
                            <md-input name="country" id="country" v-model="editProfile.address.country"></md-input>
                        </md-field>
                        <md-field>
                            <label for="region">Region</label>
                            <md-input name="region" id="region" v-model="editProfile.address.region"></md-input>
                        </md-field>
                        <md-field>
                            <label for="city">City</label>
                            <md-input name="city" id="city" v-model="editProfile.address.city"></md-input>
                        </md-field>
                        <md-field>
                            <label for="street">Street</label>
                            <md-input name="street" id="street" v-model="editProfile.address.street"></md-input>
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
      }
  }
}
</script>

