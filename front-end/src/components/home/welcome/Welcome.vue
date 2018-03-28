<template>
    <div class="mt-2 flex flex-column flex-center flex-wrap">
        <span class="small text-center mb-2 md-size-75 mx-auto">Click above to get started.</span>
        <div id="mapid"  style="width: 500px; height: 500px"></div>
        <md-button class="md-raised md-primary" style="align-self: flex-end" v-on:click="logout">Logout</md-button>
    </div>
</template>


<script>
    import leaflet from 'leaflet'
    import locatecontrol from 'leaflet.locatecontrol'

    export default {
        name: 'Welcome',
        methods: {
        logout() {
            localStorage.removeItem('token')
            this.$router.push({ name: 'login' })
            }
        },
        mounted (){
            var mymap = L.map('mapid').setView([55.755 , 37.625], 10);
        
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoicnVxdWllciIsImEiOiJjamY5bzFlMXczZDl5Mnlwbng2eG93MGJpIn0.92FKS3iPN-MnKXylw-7yvA'
            }).addTo(mymap);

            var marker = L.marker([55.755 , 37.625]).addTo(mymap);
            marker.bindPopup("<b>Вы здесь блять</b><br>You are<br>here blyat.").openPopup();
           var lc = L.control.locate({
                position: 'topright',
                strings: {
                    title: `Покажи мне, где я. 
Show me where I am`
                }
            }).addTo(mymap);
        }
    }
</script>

<style>
    #mapid { height: 180px; }

    .leaflet-popup-content {
        text-align: center;
    }
</style>
