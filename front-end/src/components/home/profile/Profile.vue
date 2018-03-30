<template>
<div>
    <md-app>
    <md-app-drawer md-permanent="clipped" style="width: 200px">
            <md-list class="cursor-pointer">
                <router-link :to="{ name: 'home.profile' }">
                <md-list-item>
                    <md-icon>account_circle</md-icon>
                    <span class="md-list-item-text">Edit Profile</span>
                </md-list-item>
                </router-link>
                <router-link :to="{ name: 'home.profile.listOfProducts' }">
                <md-list-item>
                    <md-icon>select_all</md-icon>
                    <span class="md-list-item-text">List of Products</span>
                </md-list-item>
                </router-link>
                <router-link :to="{ name: 'home.profile.addProduct' }">
                <md-list-item>
                    <md-icon>add</md-icon>
                    <span class="md-list-item-text">Add a Product</span>
                </md-list-item>
                </router-link>
            </md-list>
      </md-app-drawer>
      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
</div>
</template>

<script>
import http from '@/helpers/http'
export default {
  name: 'Profile'
}
</script>

