<template>
	<div class="container home-div md-elevation-10">
		<md-tabs class="md-primary" md-alignment="fixed">
			<md-tab id="tab-home" md-label="Home" :to="{name: 'home'}"></md-tab>
			<md-tab id="tab-users" md-label="Users" :to="{name: 'home.users'}"></md-tab>
			<md-tab id="tab-messages" md-label="Messages" :to="{name:'home.messages'}"></md-tab>
			<md-tab id="tab-profile" md-label="Profile" :to="{name:'home.profile'}"></md-tab>
		</md-tabs>
		<!-- <div class="menu">
			<button v-bind:class="{'active': menu.UserList}" v-on:click="menu.UserList = true; menu.MessageList = false">Users</button>
			<button v-bind:class="{'active': menu.MessageList}" v-on:click="menu.MessageList = true; menu.UserList = false">Messages</button>
		</div> -->
		<div class="flex flex-column" style="overflow: hidden">
			<transition name="fadeInOut" mode="out-in">
				<router-view :key="$route.fullPath"/>
			</transition>
		</div>
	</div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'Home',
  methods: {
		goTo(arg) {
			this.$router.push({ name: arg })
		}
  }
}
</script>