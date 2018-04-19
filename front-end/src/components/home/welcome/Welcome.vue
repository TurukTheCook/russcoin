<template>
<div>
	<div class="flex flex-column flex-wrap my-2">
		<span class="small text-center mb-2 md-size-75 mx-auto">List of the last 10 products:</span>
		<!-- PRIMARY ALERTS -->
		<div class="mx-auto w-100 p-1" :class="{'alert alert-danger': !success}" v-if="!success">
				{{message}}
		</div>
		<md-content class="flex flex-wrap justify-content-around">
		<md-card v-for="product in products" :key="product.id" class="mb-1 border-1 product-card product-card-limit">
			<md-card-header>
				<md-card-header-text>
					<div class="md-title" style="white-space: nowrap; text-overflow: ellipsis; max-width: 150px; overflow: hidden">{{product.title}}</div>
					<div class="md-subhead" style="white-space: nowrap; text-overflow: ellipsis; max-width: 150px; overflow: hidden">{{product.userId}}</div>
					<md-divider class="my-1"></md-divider>
					<div style="max-width: 150px">{{descriptionTruncated(product.description)}}</div>
					<div class="mt-1" style="max-width: 150px">{{moment(product.creationDate)}} ({{momentFromNow(product.creationDate)}})</div>
					<div class="mt-1" style="max-width: 150px" v-if="product.address">{{product.address.country}}</div>
				</md-card-header-text>
				<md-card-media class="product-miniature flex flex-center" style="position: relative">
					<img :src="'http://localhost:1407/' + product.picture" v-if="product.picture">
					<img v-else src="http://via.placeholder.com/300x400/ff2c29/fff" alt="People">
					<div class="main-font text-white p-1" style="background-color: rgba(0,0,0, 0.4); position: absolute; bottom: 10px; right: 10px" v-if="product.price">{{'$ ' + product.price}}</div>
				</md-card-media>
			</md-card-header>

			<!-- <md-card-actions>
				<md-button>Action</md-button>
				<md-button>Action</md-button>
			</md-card-actions> -->
		</md-card>
		</md-content>
	</div>
	<div class="mt-2 flex flex-column flex-center flex-wrap">
		<div id="mapid"></div>
		<md-button class="md-raised md-primary" style="align-self: flex-end" v-on:click="logout">Logout</md-button>
	</div>
</div>
</template>


<script>
	import leaflet from 'leaflet'
	import locatecontrol from 'leaflet.locatecontrol'
	import http from '@/helpers/http'
	import moment from 'moment'

	export default {
		name: 'Welcome',
		data () {
			return {
				success: true,
				message: 'An error has occured..',
				products: []
			}
		},
		methods: {
			logout() {
				localStorage.removeItem('token')
				this.$router.push({ name: 'login' })
			},
			descriptionTruncated(arg) {
          if (arg && arg.length > 50) {
              let truncated = arg.substr(0, 50) + '...'
              return truncated
          } else return arg
      },
			getProducts() {
        http.get('products/10')
            .then(
                res => {
                    this.products = res.data.content;
                }
            )
            .catch(
                err => {
                    this.success = err.response.data.success;
                    this.message = err.response.data.message;
                }
            )
      },
      moment: function(date) {
          return moment(date).format('Do MMMM')
      },
      momentFromNow: function(date) {
          return moment(date).fromNow()
      }
		},
		mounted() {
			var mymap = L.map('mapid').setView([55.755 , 37.625], 10);
	
			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox.streets',
				accessToken: 'pk.eyJ1IjoicnVxdWllciIsImEiOiJjamY5bzFlMXczZDl5Mnlwbng2eG93MGJpIn0.92FKS3iPN-MnKXylw-7yvA'
			}).addTo(mymap);

			// TODO: boucle avec les positions des 10 derniers produits à ajouter sur la map
			var marker = L.marker([55.755 , 37.625]).addTo(mymap);
			marker.bindPopup("<b>Вы здесь блять</b><br>You are<br>here blyat.").openPopup();
			var lc = L.control.locate({
				position: 'topright',
				strings: {
						title: `Покажи мне, где я.Show me where I am`
				}
			}).addTo(mymap);
		},
		created() {
			this.getProducts()
		}
	}
</script>

<style>
	#mapid { height: 500px }

	.leaflet-popup-content {
			text-align: center
	}

	.product-card-limit {
		width: 45%
	}

	@media all and (max-width: 1150px) {
		.product-card-limit {
			width: 350px
		}
	}
</style>
