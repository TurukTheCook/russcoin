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
              <div class="w-75 mx-auto">
                    <md-field>
                        <label for="productTitle">Title</label>
                        <md-input name="productTitle" id="productTitle" v-model="sendProduct.title"></md-input>
                    </md-field>
                    <md-field>
                        <label for="productDescription">Description</label>
                        <md-textarea name="productDescription" id="productDescription" v-model="sendProduct.description"></md-textarea>
                    </md-field>
                    <md-field>
                        <label for="productPrice">Price</label>
                        <md-input name="productPrice" id="productPrice" v-model="sendProduct.price"></md-input>
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
      sendProduct: {}
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
      }
  }
}
</script>