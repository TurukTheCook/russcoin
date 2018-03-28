<template>
<div>
    <md-app>
    <md-app-drawer md-permanent="clipped" style="width: 200px">
            <md-list class="cursor-pointer">
                <md-list-item>
                    <md-icon>account_circle</md-icon>
                    <span class="md-list-item-text">Edit Profile</span>
                </md-list-item>
                <md-list-item>
                    <md-icon>select_all</md-icon>
                    <span class="md-list-item-text">List of Products</span>
                </md-list-item>
                <md-list-item>
                    <md-icon>add</md-icon>
                    <span class="md-list-item-text">Add a Product</span>
                </md-list-item>
            </md-list>
      </md-app-drawer>
      <md-app-content>
        TODO PROFILE ISSOU
        <router-view/>
      </md-app-content>
    </md-app>
</div>
</template>

<script>
import http from '@/helpers/http'
export default {
  name: 'Profile',
  data () {
    return {
      success: true,
      message: 'An error has occured..'
    }
  }
}
</script>

