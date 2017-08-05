/**
 * 位置服务
 *
 * Created by lin on 17-7-18.
 */
import Bus from '../../assets/EventBus'
import * as Const from '../../constants/Const'
import * as Uuid from '../../assets/Uuid'
let Vue = Bus
export default {
    currentLocation: {},
    locationPointList: [],
    locationPointRecSwitch: false,

    addLocationLinstener: function(){
        let ls = this
        Bus.$on('switch_location_point_rec', function(toggle){
            ls.locationPointRecSwitch = toggle
        })
        Bus.$on('current_gps_location', function(jsonObject){
            ls.currentLocation = jsonObject
            if (ls.locationPointRecSwitch){
                ls.pointListPush(jsonObject)
            }
        })
        Bus.$on('format_location', function (jsonObject, from) {
            switch (from) {
                case Const.Baidu:

                    break;
                case Const.GOOGLE:

                    break;
            }
        })
    },
    getCurrentLocation: function () {
        return this.currentLocation
    },

    //点集处理
    pointListInit: function () {
        this.locationPointList = []
    },
    pointListPush: function (locationData) {
        //判定如果和上一个结果相差距离不长，则不去记录 http://api.map.baidu.com/lbsapi/getpoint/index.html
        //后期也可以优化不去转换火星坐标系
        if (this.locationPointList.length) {
            var currentPointList = this.pointListGet()
            var oldLat = currentPointList[currentPointList.length - 1].latitude
            var oldLng = currentPointList[currentPointList.length - 1].longitude
            if (locationData.latitude != 0 && locationData.longitude != 0
                    && Math.abs(locationData.latitude  - oldLat) > 0.00001
                    && Math.abs(locationData.longitude - oldLng) > 0.00001){
                this.locationPointList.push(locationData)
            }
        } else {
            //写入初始点
            this.locationPointList.push(locationData)
        }
    },
    pointListGet: function () {
        return this.locationPointList
    },
    pointListSend: function () {
    },
    //设置录制路径初始化
    initRecLocation: function () {
        //获取当前点坐标
        let currentLocation = this.getCurrentLocation()
        if (undefined != currentLocation.latitude && undefined != currentLocation.longitude){
            if (0 == Vue.GLOBAL.default.oversea){
                //国内
                this.getFormatLocationBd(currentLocation.latitude, currentLocation.longitude)
            } else {
                //海外
                this.getFormatLocationGoogle(currentLocation.latitude, currentLocation.longitude)
            }
        } else {
            //进行重试
            setTimeout(() => {
                this.initRecLocation()
            }, 1000)
        }
    },
    getFormatLocationBd: function (lat, lng) {
        let tmpThis = this
        Bus.$http.get('http://api.map.baidu.com/geocoder/v2/?ak=' + Const.ak + '&location=' + lat + ',' + lng + '&output=json')
            .then((response) => {
            console.log(response)
                Bus.$emit('format_location', response.body.result, Const.Baidu)
            })
            .catch(function (response) {
                //进行重试操作
                setTimeout(function (){
                    tmpThis.getFormatLocationBd(lat, lng)
                }, 1000)
            })
    },
    getFormatLocationGoogle: function (lat, lng) {
        let tmpThis = this
        Bus.$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + Const.gak)
            .then((response) => {
                Bus.$emit('format_location', response.body["results"], Const.GOOGLE)
            })
            .catch(function (response) {
                setTimeout(function (){
                    tmpThis.getFormatLocationGoogle(lat, lng)
                }, 1000)
            })
    },

    //存储操作
    //开始结束格式化地址

    //点记录表

    //路书记录

    //当前正在记录uuid 能够实现暂停

    //点记录uuid列表 注意队列形式

}