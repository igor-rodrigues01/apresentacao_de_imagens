function Main(){
	
	this.map             = L.map('map').setView([-15.77, -47.92], 5);
	this.layerOSMBaseMap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});
	this.thunderforest = L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
		maxZoom: 18
	});

	this.controlSwitch = function(layerRio,layerCatalogo,LayerViaturas){

		/*var baseLayer = {
			'<span style="font-size:12pt"><b>Osm</b></span>':this.layerOSMBaseMap,
			'<span style="font-size:12pt"><b>Thunder Forest</b></span>':this.thunderforest
		}
		var layers  = {
			'<span style="font-size:12pt"><b>Rio</b></span>':layerRio,
			'<span style="font-size:12pt"><b>Catalogo</b></span>':layerCatalogo,
			'<span style="font-size:12pt"><b>Viaturas</b></span>':LayerViaturas
		}
		L.control.layers(baseLayer,layers).addTo(this.map)
		*/

		// E necessario ter instalado o bootstrap-switch-master e leaflet-switchcontrol
		var control = new L.control.switch(
			{
			 	"OSM": {layer: this.layerOSMBaseMap},
			  	"Thunder": {layer: this.thunderforest}
			},
			{
				"Rio":{layer:layerRio},
				"Catalogo":{layer:layerCatalogo},
				"Viaturas":{layer:LayerViaturas}
			},{},{
			  removable: false,
			}
		).addTo(this.map)

	}

	this.generateMap = function(){

		this.layerOSMBaseMap.addTo(this.map)

		// settings data to wms request
		var dataRequestRio = {
			layers:'publica:img_foto_rio_doce_p',
			format: "image/png",
			transparent:true
		}
		var dataRequestImageCatalogo = {
			layers:'publica:img_catalogo_landsat_a',
			format:'image/png',
			transparent:true
		}
		var dataRequestViaturas = {
			layers:'publica:adm_edif_pub_civil_ibama_p',
			format: "image/png",
			transparent:true
		}

		// get data by wms
		var viaturas =  L.tileLayer.wms(
			'http://siscom.ibama.gov.br/geoserver/publica/wms', 
			dataRequestViaturas
		)

		var rio = L.tileLayer.wms(
			'http://siscom.ibama.gov.br/geoserver/publica/wms', 
			dataRequestRio
		)

		var imageCatalogo = L.tileLayer.wms(
			'http://siscom.ibama.gov.br/geoserver/publica/wms', 
			dataRequestImageCatalogo
		)

		this.controlSwitch(rio,imageCatalogo,viaturas)
	}
}

main = new Main()
main.generateMap()





