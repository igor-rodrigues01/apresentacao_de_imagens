function Main(){
	
	this.map             = L.map('map')
	this.layerOSMBaseMap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});
	this.thunderforest = L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
		maxZoom: 18
	});

	this.controlSwitch = function(LayerAlvos,layerRodovia,layerBuffer,layerBR_070){

		// E necessario ter instalado o bootstrap-switch-master e leaflet-switchcontrol
		var control = new L.control.switch(
			{
			 	"OSM": {layer: this.layerOSMBaseMap},
			  	// "Thunder": {layer: this.thunderforest}
			},
			{
				"Alvos":{layer:LayerAlvos},
				"Rodovia":{layer:layerRodovia},
				"Rodovias Buffer":{layer:layerBuffer},
				"BR 070":{layer:layerBR_070},
				// "BR 101":{layer:layerBR_101},
				// "BR 116":{layer:layerBR_116}
			},{},{
			  removable: false,
			}
		).addTo(this.map)

		if (this.map._leaflet_id != 3){
			this.map.setView([-15.77, -47.92], 10);
		}
	}

	this.processGeojson = function(){

		//var geojson = L.geoJson()
		//alert(geojson)

	}

	this.getByWMS = function(layerName){
		var url = 'http://10.1.8.95:8080/geoserver/hex/wms/'
		var dataRequest = {
			layers:layerName,
			format: "image/png",
			transparent:true
		}
		return L.tileLayer.wms(url,dataRequest)
	}

	this.generateMap = function(){
		this.map.setView([-15.77, -47.92], 5);
		this.layerOSMBaseMap.addTo(this.map)

		var layerAlvos   = this.getByWMS('hex:alvos')
		var layerRodovia = this.getByWMS('hex:rodovias')
		var layerBuffer  = this.getByWMS('hex:rodovias_buffer')
		var layerBR_070  = this.getByWMS('hex:BR 070')

		this.controlSwitch(layerAlvos,layerRodovia,layerBuffer,layerBR_070)
		this.processGeojson()
	}
}

main = new Main()
main.generateMap()





