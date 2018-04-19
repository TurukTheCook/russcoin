<template>
<div class="container logreg-div md-elevation-10">
	<form novalidate class="md-layout" @submit.prevent="register">
		<md-card class="md-layout-item flex flex-column no-box-shadow">
			<md-card-header class="main-color-bg">
				<div class="md-title text-center">REGISTER</div>
			</md-card-header>
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
						<label>Username</label>
						<md-input v-model="newUser.username" required></md-input>
					</md-field>
					<md-field>
						<label>First Name</label>
						<md-input v-model="newUser.firstName"></md-input>
					</md-field>
					<md-field>
						<label>Last Name</label>
						<md-input v-model="newUser.lastName"></md-input>
					</md-field>
					<md-field>
						<label>Password</label>
						<md-input v-model="newUser.password" type="password" required></md-input>
					</md-field>
					<md-field>
						<label>Confirm Password</label>
						<md-input v-model="newUser.passwordVerif" type="password" required></md-input>
					</md-field>
				</div>
				<md-subheader class="main-color">Address</md-subheader>
				<div class="w-75 mx-auto">
					<md-field>
						<label>Country</label>
						<md-input v-model="newUser.address.country"></md-input>
					</md-field>
					<md-field>
						<label>Region</label>
						<md-input v-model="newUser.address.region"></md-input>
					</md-field>
					<md-field>
						<label>City</label>
						<md-input v-model="newUser.address.city"></md-input>
					</md-field>
					<md-field>
						<label>Street</label>
						<md-input v-model="newUser.address.street"></md-input>
					</md-field>
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
      newUser: {
          address: {}
      },
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
					.then(res => {
						this.sending = false
						this.success = res.data.success
						this.message = res.data.message

						setTimeout(()=>{
							this.$router.push({ name: 'login' })
						},500);
					})
					.catch(err => {
						this.sending = false
						this.success = err.response.data.success
						this.message = err.response.data.message
					})
			} else {
				this.sending = false
				this.success = false
				this.message = "Пароли не совпадают.. Passwords don't match.."
			}
		}
  }
}
</script>
