function Main(){
	
	this.map             = L.map('map')
	this.layerOSMBaseMap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});
	this.thunderforest = L.tileLayer('http://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
		maxZoom: 18
	});

	this.controlSwitch = function(
			LayerAlvos,layerRodovia,layerBuffer,
			layerBR_070_2231825_2011_07_02,layerBR_070_2231825_2012_05_08,
			layerBR_070_2231825_2014_08_05,layerBR_070_2231826_2011_06_20,
			layerBR_070_2231826_2012_07_13,layerBR_070_2231827_2011_06_20,
			layerBR_070_2231827_2012_08_30,layerBR_070_2231827_2014_04_29,
			layerBR_070_2231828_2011_09_01,layerBR_070_2231828_2012_08_30,
			layerBR_070_2231828_2014_05_30,layerBR_070_231826_2014_04_29,
			layerBR_101_2226023_2011_06_01,layerBR_101_2226023_2012_12_17,
			layerBR_101_2226023_2014_10_07,layerBR_101_2226024_2011_04_06,
			layerBR_101_2226024_2012_12_17,layerBR_101_2226024_2014_10_07,
			layerBR_116_2437317_2011_10_09,layerBR_116_2437317_2012_10_07,
			layerBR_116_2437317_2014_07_10){

		// E necessario ter instalado o bootstrap-switch-master e leaflet-switchcontrol
		var control = new L.control.switch(
			{
			},
			{
				'BR 101 2226024 06/04/2011':{layer:layerBR_101_2226024_2011_04_06},
				'BR 101 2226023 01/06/2011':{layer:layerBR_101_2226023_2011_06_01},
				'BR 070 2231826 20/06/2011':{layer:layerBR_070_2231826_2011_06_20},
				'BR 070 2231827 20/06/2011':{layer:layerBR_070_2231827_2011_06_20},
				'BR 070 2231825 02/07/2011':{layer:layerBR_070_2231825_2011_07_02},
				'BR 070 2231828 01/09/2011':{layer:layerBR_070_2231828_2011_09_01},
				'BR 116 2437317 09/10/2011':{layer:layerBR_116_2437317_2011_10_09},
				'BR 070 2231825 08/05/2012':{layer:layerBR_070_2231825_2012_05_08},
				'BR 070 2231826 13/07/2012':{layer:layerBR_070_2231826_2012_07_13},
				'BR 070 2231827 30/08/2012':{layer:layerBR_070_2231827_2012_08_30},
				'BR 070 2231828 30/08/2012':{layer:layerBR_070_2231828_2012_08_30},
				'BR 116 2437317 07/10/2012':{layer:layerBR_116_2437317_2012_10_07},
				'BR 101 2226023 17/12/2012':{layer:layerBR_101_2226023_2012_12_17},
				'BR 101 2226024 17/12/2012':{layer:layerBR_101_2226024_2012_12_17},
				'BR 070 2231827 29/04/2014':{layer:layerBR_070_2231827_2014_04_29},
				'BR 070 231826 29/04/2014':{layer:layerBR_070_231826_2014_04_29},
				'BR 070 2231828 30/05/2014':{layer:layerBR_070_2231828_2014_05_30},
				'BR 116 2437317 10/07/2014':{layer:layerBR_116_2437317_2014_07_10},
				'BR 070 2231825 05/08/2014':{layer:layerBR_070_2231825_2014_08_05},
				'BR 101 2226023 07/10/2014':{layer:layerBR_101_2226023_2014_10_07},
				'BR 101 2226024 07/10/2014':{layer:layerBR_101_2226024_2014_10_07},
				"Alvos":{layer:LayerAlvos},
				"Rodovia":{layer:layerRodovia},
				"Rodovias Buffer":{layer:layerBuffer}
			},{},{
			  removable: false,
			}
		).addTo(this.map);

	}

	this.getDataRequestLayerName = function(layerName){
		var dataRequest = {
			layers:layerName,
			format: "image/png",
			transparent:true,
		}
		switch(layerName){
			case 'hex:alvos':
				dataRequest.cent = [-15.77, -47.92]; 
				dataRequest.zoom = 5; 
				break;

			case 'hex:rodovias':
				dataRequest.cent = [-15.77, -47.92]; 
				dataRequest.zoom = 5;
				break;

			case 'hex:rodovias_buffer':
				dataRequest.cent = [-15.77, -47.92]; 
				dataRequest.zoom = 5;
				break;
		}
		return dataRequest
	}

	this.getByWMS = function(layerName){
		var url = 'http://10.1.8.95:8080/geoserver/hex/wms/'
		var dataRequest = this.getDataRequestLayerName(layerName)
		return L.tileLayer.wms(url,dataRequest)
	}

	this.generateMap = function(){
		this.map.setView([-15.77, -47.92], 5);
		this.layerOSMBaseMap.addTo(this.map)

		var layerAlvos   = this.getByWMS('hex:alvos')
		var layerRodovia = this.getByWMS('hex:rodovias')
		var layerBuffer  = this.getByWMS('hex:rodovias_buffer')

		var layerBR_070_2231825_2011_07_02 = this.getByWMS('hex:BR 070 - 2231825_2011-07-02')
		var layerBR_070_2231825_2012_05_08 = this.getByWMS('hex:BR 070 - 2231825_2012-05-08')
		var layerBR_070_2231825_2014_08_05 = this.getByWMS('hex:BR 070 - 2231825_2014-08-05')
		var layerBR_070_2231826_2011_06_20 = this.getByWMS('hex:BR 070 - 2231826_2011-06-20')
		var layerBR_070_2231826_2012_07_13 = this.getByWMS('hex:BR 070 - 2231826_2012-07-03')
		var layerBR_070_2231827_2011_06_20 = this.getByWMS('hex:BR 070 - 2231827_2011-06-20')
		var layerBR_070_2231827_2012_08_30 = this.getByWMS('hex:BR 070 - 2231827_2012-08-30')
		var layerBR_070_2231827_2014_04_29 = this.getByWMS('hex:BR 070 - 2231827_2014-04-29')
		var layerBR_070_2231828_2011_09_01 = this.getByWMS('hex:BR 070 - 2231828_2011-09-01')
		var layerBR_070_2231828_2012_08_30 = this.getByWMS('hex:BR 070 - 2231828_2012-08-30')
		var layerBR_070_2231828_2014_05_30 = this.getByWMS('hex:BR 070 - 2231828_2014-05-30')
		var layerBR_070_231826_2014_04_29  = this.getByWMS('hex:BR 070 - 231826_2014-04-29')

		var layerBR_101_2226023_2011_06_01 = this.getByWMS('hex:BR 101 - 2226023_2011-06-01')
		var layerBR_101_2226023_2012_12_17 = this.getByWMS('hex:BR 101 - 2226023_2012-12-17')
		var layerBR_101_2226023_2014_10_07 = this.getByWMS('hex:BR 101 - 2226023_2014-10-07')
		var layerBR_101_2226024_2011_04_06 = this.getByWMS('hex:BR 101 - 2226024_2011-04-06')
		var layerBR_101_2226024_2012_12_17 = this.getByWMS('hex:BR 101 - 2226024_2012-12-17')
		var layerBR_101_2226024_2014_10_07 = this.getByWMS('hex:BR 101 - 2226024_2014-10-07')
		
		var layerBR_116_2437317_2011_10_09 = this.getByWMS('hex:BR 116 - 2437317_2011-10-09')
		var layerBR_116_2437317_2012_10_07 = this.getByWMS('hex:BR 116 - 2437317_2012-10-07')
		var layerBR_116_2437317_2014_07_10 = this.getByWMS('hex:BR 116 - 2437317_2014-07-10')

		this.map.on('layeradd',function(layerDeCima){
			var currentLayerId ;

			this.eachLayer(onEach.bind(this))

			function onEach (layer){
				
				switch(layer._leaflet_id){
					case 104:
						this.setView(layer.wmsParams.cent,layer.wmsParams.zoom);
						break;
					case 105:
						this.setView(layer.wmsParams.cent,layer.wmsParams.zoom);
						break;
					case 106:
						this.setView(layer.wmsParams.cent,layer.wmsParams.zoom);
						break;
				}
			}
		});

		this.controlSwitch(
			layerAlvos,layerRodovia,layerBuffer,
			layerBR_070_2231825_2011_07_02,layerBR_070_2231825_2012_05_08,
			layerBR_070_2231825_2014_08_05,layerBR_070_2231826_2011_06_20,
			layerBR_070_2231826_2012_07_13,layerBR_070_2231827_2011_06_20,
			layerBR_070_2231827_2012_08_30,layerBR_070_2231827_2014_04_29,
			layerBR_070_2231828_2011_09_01,layerBR_070_2231828_2012_08_30,
			layerBR_070_2231828_2014_05_30,layerBR_070_231826_2014_04_29,
			layerBR_101_2226023_2011_06_01,layerBR_101_2226023_2012_12_17,
			layerBR_101_2226023_2014_10_07,layerBR_101_2226024_2011_04_06,
			layerBR_101_2226024_2012_12_17,layerBR_101_2226024_2014_10_07,
			layerBR_116_2437317_2011_10_09,layerBR_116_2437317_2012_10_07,
			layerBR_116_2437317_2014_07_10
		)
	}
}

main = new Main()
main.generateMap()


// 26 - basemap
// 83 - alvos
// 84 - Rodovia
// 85 - Rodovia Buffer
