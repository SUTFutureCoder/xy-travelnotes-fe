<template>
    <baidu-map id="map"
               :scroll-wheel-zoom="true"
               :center="center"
               :zoom="zoom"
               @moving="syncCenterAndZoom"
               @moveend="syncCenterAndZoom"
               @zoomend="syncCenterAndZoom"
    >
        <bm-marker :position="center" :dragging="true"></bm-marker>
    </baidu-map>
</template>

<script>
    import Bus from '../../../assets/EventBus'
    export default {
        data () {
            return {
                center: {
                    lng: 0,
                    lat: 0
                },
                zoom: 19,

                centerLocateSwitch: 1,  //针对居中定位的计时器
                centerLocateTimeoutId: 0,
            }
        },
        mounted() {
            setInterval(
                this.location,
                10000   //每10秒定位一次
            );
            let vue = this;
            document.addEventListener('deviceready', function () {
                // Android customization
                cordova.plugins.backgroundMode.setDefaults({ text:'星柚游记正在后台努力运行中～'});
                // Enable background mode
                cordova.plugins.backgroundMode.enable();

                // Called when background mode has been activated
                cordova.plugins.backgroundMode.onactivate = function () {
//                    setTimeout(function () {
                    // Modify the currently displayed notification
//                        vue.location()
//                        cordova.plugins.backgroundMode.configure({
//                            text:'Esperando novos clientes'
//                        });
//                    }, 500);
                }

                vue.location()
            }, false);
        },
        methods: {
            syncCenterAndZoom(e) {
                //移动后清除定时器
                if (this.$data.centerLocateSwitch == 1){
                    this.$data.centerLocateSwitch = 0
                    this.resetCenterLocate()
                }
            },
            resetCenterLocate() {
                //重新居中
                let vue = this
                if (this.$data.centerLocateSwitch == 0) {
                    if (this.$data.centerLocateTimeoutId != 0){
                        clearTimeout(this.$data.centerLocateTimeoutId)
                    }
                    this.$data.centerLocateTimeoutId = setTimeout(function (){
                        vue.$data.centerLocateSwitch = 1
                    }, 10000);   //十秒恢复
                }
            },
            setCenterLocate(lat, lng) {
                if (this.$data.centerLocateSwitch == 1
                        || (this.$data.center.lat == 0 && this.$data.center.lng == 0)) {
                    this.$data.center.lat = lat
                    this.$data.center.lng = lng
                }
            },
            location() {
                let vue = this
                AdvancedGeolocation.start(function(data){
                        try{
                            var jsonObject = JSON.parse(data);
                            Bus.$emit('current_location', jsonObject);
                            switch(jsonObject.provider){
                                case "gps":
//                                    if(jsonObject.latitude != "0.0"){
//                                        console.log("GPS location detected - lat:" +
//                                            jsonObject.latitude + ", lon: " + jsonObject.longitude +
//                                            ", accuracy: " + jsonObject.accuracy);
//                                    }
//                                    //设置中心点
                                    var GpsPoint = new BMap.Point(jsonObject.longitude, jsonObject.latitude);
                                    var convertor = new BMap.Convertor();
                                    var pointArr = [];
                                    pointArr.push(GpsPoint);

                                    convertor.translate(pointArr, 1, 5, function (data){
                                        if(data.status === 0) {
                                            vue.setCenterLocate(data.points[0].lat, data.points[0].lng)
                                            jsonObject.latitude  = data.points[0].lat
                                            jsonObject.longitude = data.points[0].lng
                                        }
                                        Bus.$emit('current_gps_location', jsonObject);
                                    })
                                    break;

                                case "network":
//                                    if(jsonObject.latitude != "0.0"){
//                                        console.log("Network location detected - lat:" +
//                                            jsonObject.latitude + ", lon: " + jsonObject.longitude +
//                                            ", accuracy: " + jsonObject.accuracy);
//                                    }
                                    var GpsPoint = new BMap.Point(jsonObject.longitude, jsonObject.latitude);
                                    var convertor = new BMap.Convertor();
                                    var pointArr = [];
                                    pointArr.push(GpsPoint);

                                    convertor.translate(pointArr, 1, 5, function (data){
                                        if(data.status === 0) {
                                            vue.setCenterLocate(data.points[0].lat, data.points[0].lng)
                                            jsonObject.latitude  = data.points[0].lat
                                            jsonObject.longitude = data.points[0].lng
                                        }
                                        Bus.$emit('current_network_location', jsonObject);
                                    })
                                    break;

                                case "satellite":
//                                    console.log("Satellites detected " + (Object.keys(jsonObject).length - 1));
//                                    console.log("Satellite meta-data: " + data);
                                    break;

                                case "cell_info":
//                                    console.log("cell_info JSON: " + data);
                                    break;

                                case "cell_location":
//                                    console.log("cell_location JSON: " + data);
                                    break;

                                case "signal_strength":
//                                    console.log("Signal strength JSON: " + data);
                                    break;
                            }
                            return jsonObject
                        }
                        catch(exc){
                            console.log("Invalid JSON: " + exc);
                        }
                    },
                    function(error){
                        console.log("Error JSON: " + JSON.stringify(error));
                        var e = JSON.parse(error);
                        console.log("Error no.: " + e.error + ", Message: " + e.msg + ", Provider: " + e.provider);
                    },
                    /////////////////////////////////////////
                    //
                    // These are the required plugin options!
                    // README has API details
                    //
                    /////////////////////////////////////////
                    {
                        "minTime":0,
                        "minDistance":0,
                        "noWarn":false,
                        "providers":"all",
                        "useCache":true,
                        "satelliteData":true,
                        "buffer":true,
                        "bufferSize":10,
                        "signalStrength":false
                    });
            }
        }
    }
</script>
<style>
    #map {
        width: 100%;
        height: 100%;
    }
</style>
