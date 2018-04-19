<template>
<div>
	<form novalidate @submit.prevent="send" enctype="multipart/form-data">
		<md-card class="flex flex-column no-box-shadow">
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
						<label class="md-caption" style="font-size: 1rem">Picture</label><br/>
					<div class="dropbox cursor-pointer mb-2">
						<input  class="input-file cursor-pointer" type="file" accept="image/*" name="picture" @change="filesChange($event.target.name, $event.target.files)">
						<p v-if="!fileSelected">Drag your file(s) here or click to browse</p>
						<!-- <p v-if="fileSelected">You selected {{fileCount}} file(s)...</p> -->
						<p v-if="fileSelected">{{fileName}}...</p>
					</div>
				</div>
				<md-subheader class="main-color">Address</md-subheader>
				<div class="w-75 mx-auto">
					<md-field>
						<label>Country</label>
						<md-input name="country" v-model="sendProduct.address.country"></md-input>
					</md-field>
					<md-field>
						<label>Region</label>
						<md-input name="region" v-model="sendProduct.address.region"></md-input>
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
			fileSelected: false,
			fileName: null,
			// fileCount: null,
			formData: new FormData(),
      sendProduct: {
				address: {}
      }
    }
  },
  methods: {
		send() {
			this.sending = true
			if (!this.formData.get('sendProduct')) {
				this.formData.append('sendProduct', JSON.stringify(this.sendProduct))
			} else {
				this.formData.set('sendProduct', JSON.stringify(this.sendProduct))
			}
			if (this.sendProduct.title && this.sendProduct.description && this.sendProduct.price) {
				http.post('products', this.formData)
					.then(res => {
						this.sending = false
						this.success = res.data.success;
						this.message = res.data.message;
						// this.$emit('increment');
						setTimeout(()=>{
							this.$router.push({ name: 'home.profile' })
						},500);
					})
					.catch(err => {
						this.sending = false
						this.success = err.response.data.success;
						this.message = err.response.data.message;
					})
			} else {
				this.sending = false
				this.success = false;
				this.message = 'Отсутствуют данные. Data is missing.';
			}
		},
		getProfile() {
			http.get('profile')
				.then(res => {
					this.sendProduct.address = res.data.content.address
				})
				.catch(err => {
					this.success = err.response.data.success
					this.message = err.response.data.message
				})
		},
		filesChange(fieldName, fileList) {
			// this.fileCount = fileList.length
			this.fileSelected = true
			// handle file changes
			this.formData = new FormData()

			if (!fileList.length) {
				// this.fileCount = null
				this.fileName = null
				this.fileSelected = false
				return
			}
			// append the files to FormData
			// Array
			// 	.from(Array(fileList.length).keys())
			// 	.map(x => {
			// 		this.formData.append(fieldName, fileList[x], fileList[x].name)
			// 	})
			this.formData.append(fieldName, fileList[0], fileList[0].name)
			this.fileName = fileList[0].name
    }
	},
  created() {
		this.getProfile()
  }
}
</script>

<style lang="scss">
  .dropbox {
    outline: 2px dashed rgb(39, 39, 39); /* the dash box */
    outline-offset: -10px;
    background: #ff4643;
    color: rgb(0, 0, 0);
    padding: 10px 10px;
    min-height: 150px; /* minimum height */
    position: relative
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 150px;
    position: absolute
  }

  .dropbox:hover {
    background-color: #ff2c29; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 37.5px 0;
  }
</style>