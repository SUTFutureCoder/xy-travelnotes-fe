/**
 * 位置服务
 *
 * Created by lin on 17-7-18.
 */
import Bus from '../../assets/EventBus'

export default {
    currentLocation: {},
    locationPointList: [],
    locationPointRecSwitch: false,

    addLocationLinstener: function(){
        let ls = this
        Bus.$on('switch_location_point_rec', function(toggle){
            console.log(toggle)
            ls.locationPointRecSwitch = toggle
        })
        Bus.$on('current_gps_location', function(jsonObject){
            ls.currentLocation = jsonObject
            console.log(jsonObject)
            console.log(ls.locationPointRecSwitch)
            if (ls.locationPointRecSwitch){
                ls.pointListPush(jsonObject)
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
        Bus.$http.post('baidu.com', this.locationPointList, {
            emulateJSON: true
        })
            .then((response) => {
                var ret = response.body
                if (ret['error_no'] != 0) {
                    alert(ret['error_msg'])
                    this.reg_phone_captcha_send = false
                }
            })
            .catch(function (response) {
                console.log(response)
            })
    }        

}