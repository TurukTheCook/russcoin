<template>
<div>
    <form novalidate class="md-layout" @submit.prevent="send">
        <md-card class="md-layout-item flex flex-column no-box-shadow">
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
                        <label>Title</label>
                        <md-input v-model="sendProduct.title" required></md-input>
                    </md-field>
                    <md-field>
                        <label>Description</label>
                        <md-textarea v-model="sendProduct.description" required></md-textarea>
                    </md-field>
                    <md-field>
                        <label>Price</label>
                        <md-input v-model="sendProduct.price" required></md-input>
                    </md-field>
                </div>
            <md-subheader class="main-color">Address</md-subheader>
            <div class="w-75 mx-auto">
                <md-field>
                    <label>Country</label>
                    <md-input v-model="sendProduct.address.country"></md-input>
                </md-field>
                <md-field>
                    <label>Region</label>
                    <md-input v-model="sendProduct.address.region"></md-input>
                </md-field>
                <md-field>
                    <label>City</label>
                    <md-input v-model="sendProduct.address.city"></md-input>
                </md-field>
                <md-field>
                    <label>Street</label>
                    <md-input v-model="sendProduct.address.street"></md-input>
                </md-field>
            </div>
            </md-card-content>
            <md-card-actions>
                <md-button type="submit" class="main-color-bg" :disabled="sending">Send</md-button>
            </md-card-actions>
        </md-card>
    </form >
</div>
</template>

<script>
import http from '@/helpers/http'
export default {
  name: 'AddProduct',
  data () {
    return {
      success: null,
      message: 'An error has occured..',
      sending: false,
      sendProduct: {
          address: {}
      }
    }
  },
  methods: {
      send() {
          this.sending = true
          http.post('products', this.sendProduct)
                .then(
                    res => {
                        this.sending = false
                        this.success = res.data.success;
                        this.message = res.data.message;
                        // this.$emit('increment');
                        setTimeout(()=>{
                            this.$router.push({ name: 'home.profile' })
                        },500);
                    }
                )
                .catch(
                    err => {
                        this.sending = false
                        this.success = err.response.data.success;
                        this.message = err.response.data.message;
                    }
                )
      },
        getProfile() {
          http.get('profile')
            .then(
                res => {
                    this.sendProduct.address = res.data.content.address
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