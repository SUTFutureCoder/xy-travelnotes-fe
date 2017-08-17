/**
 * 位置服务
 *
 * Created by lin on 17-7-18.
 */
import Bus from '../../assets/EventBus'
import * as Const from '../../constants/Const'
import * as Uuid from '../../assets/Uuid'
let Vue = Bus
let storage = window.localStorage
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
        Bus.$on('format_location', function (jsonObject, from, type) {
            let objAddress = ls.parseStartEndAddress(jsonObject, from)
            ls.storageSetStartEndAddress(objAddress, type)
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
            if ((locationData.latitude != 0 && locationData.longitude != 0
                    && (Math.abs(locationData.latitude  - oldLat) > 0.0001
                    || Math.abs(locationData.longitude - oldLng) > 0.0001))
                || '' != locationData.type){    //排除特别的类型
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
                this.getFormatLocationBd(currentLocation.latitude, currentLocation.longitude, 'start')
            } else {
                //海外
                this.getFormatLocationGoogle(currentLocation.latitude, currentLocation.longitude, 'start')
            }
        } else {
            //进行重试
            setTimeout(() => {
                this.initRecLocation()
            }, 1000)
        }
    },
    getFormatLocationBd: function (lat, lng, type) {
        let tmpThis = this
        Bus.$http.get('http://api.map.baidu.com/geocoder/v2/?ak=' + Const.ak + '&location=' + lat + ',' + lng + '&output=json')
            .then((response) => {
                Bus.$emit('format_location', response.body.result, Const.Baidu, type)
            })
            .catch(function (response) {
                //进行重试操作
                setTimeout(function (){
                    tmpThis.getFormatLocationBd(lat, lng, type)
                }, 1000)
            })
    },
    getFormatLocationGoogle: function (lat, lng, type) {
        let tmpThis = this
        Bus.$http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + Const.gak)
            .then((response) => {
                Bus.$emit('format_location', response.body["results"], Const.GOOGLE, type)
            })
            .catch(function (response) {
                setTimeout(function (){
                    tmpThis.getFormatLocationGoogle(lat, lng, type)
                }, 1000)
            })
    },
    //停止记录操作
    stopRecLocation: function () {
        //获取当前点坐标
        let currentLocation = this.getCurrentLocation()
        if (undefined != currentLocation.latitude && undefined != currentLocation.longitude){
            if (0 == Vue.GLOBAL.default.oversea){
                //国内
                this.getFormatLocationBd(currentLocation.latitude, currentLocation.longitude, 'stop')
            } else {
                //海外
                this.getFormatLocationGoogle(currentLocation.latitude, currentLocation.longitude, 'stop')
            }
        } else {
            //进行重试
            setTimeout(() => {
                this.stopRecLocation()
            }, 1000)
        }
    },
    //暂停记录操作
    pauseRecLocation: function () {

    },

    //存储操作
    //当前正在记录uuid 能够实现暂停
    storageSetCurrentRecId: function (currentId) {
        if (!this.storageGetCurrentRecId()){
            //进行记录
            if ('' == currentId){
                currentId = Uuid.resetUuid(Const.UUID_CURRENT_REC)
            }
            storage.setItem(Const.STORAGE_CURRENT_REC, currentId)
        } else {
            //进行提示是否覆盖 或 默认继续记录
            //先继续记录
            // currentId = Uuid.resetUuid(Const.UUID_CURRENT_REC)
            // storage.setItem(Const.STORAGE_CURRENT_REC, currentId)
        }
        return this.storageGetCurrentRecId()
    },
    storageResetCurrentRecId: function () {
        storage.setItem(Const.STORAGE_CURRENT_REC, '')
    },
    storageGetCurrentRecId: function () {
        return storage.getItem(Const.STORAGE_CURRENT_REC)
    },

    //开始结束格式化地址
    parseStartEndAddress: function (jsonRet, from) {
        let address = {}
        switch (from){
            case Const.Baidu:
                address.formatted_address = jsonRet.formatted_address
                address.addressComponent  = jsonRet.addressComponent
                address.source            = Const.Baidu
                break;

            case Const.GOOGLE:
                address.formatted_address = jsonRet[0].formatted_address
                address.addressComponent  = jsonRet[0].address_components
                address.source            = Const.GOOGLE
                break;
        }
        return address
    },
    storageSetStartEndAddress: function (objAddress, type) {
        let currentUuid = this.storageGetCurrentRecId()
        if (null == currentUuid){
            currentUuid = this.storageSetCurrentRecId('')
        }
        let tmpCurrentAddressRecord = storage.getItem(Const.STORAGE_START_END_ADDR + currentUuid)
        let tmpObj = []
        if (null == tmpCurrentAddressRecord){
            //之前没有设置过
            tmpObj      = [{
                data: objAddress,
                type: type
            }]
        } else {
            tmpObj = JSON.parse(tmpCurrentAddressRecord)
            tmpObj.push({
                data: objAddress,
                type: type
            })
        }
        storage.setItem(Const.STORAGE_START_END_ADDR + currentUuid, JSON.stringify(tmpObj))
    },

    //点记录表 点记录
    storageSetLocationRec: function () {
        let currentUuid = this.storageGetCurrentRecId()
        let locationRec = this.pointListGet()
        //先读取已有的点
        let storageLocationRec = storage.getItem(Const.STORAGE_LOCATION_REC + currentUuid)
        if (null != storageLocationRec){
            let tmpArrStorageLocationRec = JSON.parse(storageLocationRec)
            if (tmpArrStorageLocationRec.length){
                //最后一个应该是时间戳最大的
                let maxOldLocationTimestamp = tmpArrStorageLocationRec[tmpArrStorageLocationRec.length - 1].timestamp
                //循环查找比时间戳更大的
                for (let x in locationRec){
                    if (locationRec[x].timestamp > maxOldLocationTimestamp){
                        tmpArrStorageLocationRec.push(locationRec[x])
                    }
                }
                //合并并取代现在的点集
                storage.setItem(Const.STORAGE_LOCATION_REC + currentUuid, JSON.stringify(tmpArrStorageLocationRec))
            } else {
                storage.setItem(Const.STORAGE_LOCATION_REC + currentUuid, JSON.stringify(locationRec))
            }
        } else {
            storage.setItem(Const.STORAGE_LOCATION_REC + currentUuid, JSON.stringify(locationRec))
        }
    },

    //路书记录
    storageSetRoadNote: function (roadNoteText, locationPicList) {
        let roadNoteUuid = Uuid.resetUuid(Const.UUID_ROAD_MAP)
        let currentRecid = this.storageGetCurrentRecId()
        let timestamp = new Date().getTime()
        //打标记到路径集中
        let roadNoteLocation = this.getCurrentLocation()
        roadNoteLocation.type = 'roadmap'
        roadNoteLocation.roadmap_uuid = roadNoteUuid
        this.pointListPush(roadNoteLocation)

        let tmpRoadMap = {
            'text' : roadNoteText,
            'piclist' : locationPicList,
            'timestamp' : timestamp,
            'currentlocation' : roadNoteLocation
        }

        //获取localstorage中数据
        let storageRoadNote = storage.getItem(Const.STORAGE_ROAD_NOTE + currentRecid)
        if (null != storageRoadNote){
            let tmpArrRoadNote = JSON.parse(storageRoadNote)
            if (tmpArrRoadNote.length){
                //继续插入
                tmpArrRoadNote.push(tmpRoadMap)
                storage.setItem(Const.STORAGE_ROAD_NOTE + currentRecid, JSON.stringify(tmpArrRoadNote))
            } else {
                storage.setItem(Const.STORAGE_ROAD_NOTE + currentRecid, JSON.stringify([tmpRoadMap]))
            }
        } else {
            storage.setItem(Const.STORAGE_ROAD_NOTE + currentRecid, JSON.stringify([tmpRoadMap]))
        }
    },

    //点记录uuid列表 注意队列形式
    storagePushUuidList: function (uuid) {
        //时间戳
        let timestamp = new Date().getTime()
        //先读取已有的uuid列表
        let storageUuid = storage.getItem(Const.STORAGE_RECORD_UUID_LIST)
        let tmpUuid = {
            "uuid" : uuid,
            "timestamp" : timestamp
        }
        if (null != storageUuid){
            let tmpStorageUuid = JSON.parse(storageUuid)
            //如果uuid已经存在则不操作
            for (let x in tmpStorageUuid){
                if (tmpStorageUuid[x].uuid == uuid){
                    return false
                }
            }
            tmpStorageUuid.push(tmpUuid)
            storage.setItem(Const.STORAGE_RECORD_UUID_LIST, JSON.stringify(tmpStorageUuid))
        } else {
            storage.setItem(Const.STORAGE_RECORD_UUID_LIST, JSON.stringify([tmpUuid]))
        }
    },
    
    //获取已经记录的列表
    storageGetLocationRecList: function () {
        //先获取uuid列表
        let historyUuidList = storage.getItem(Const.STORAGE_RECORD_UUID_LIST)
        let locationRecList = []
        if (null != historyUuidList){
            let tmpStorageUuid = JSON.parse(historyUuidList)
            for (let uuid in tmpStorageUuid){
                //根据uuid去各个地方捞数据

                //路径点数据
                let storageLocationRecLength = 0
                let tmpStorageLocationRec = storage.getItem(Const.STORAGE_LOCATION_REC + tmpStorageUuid[uuid].uuid)
                if (null != tmpStorageLocationRec){
                    let tmpArrStorageLocationRec = JSON.parse(tmpStorageLocationRec)
                    storageLocationRecLength = tmpArrStorageLocationRec.length
                }

                //路书数据
                let storageRoadNoteLength = 0
                let storageRoadNotePic    = ''
                let storageRoadNoteText   = ''
                let tmpStorageRoadNoteRec = storage.getItem(Const.STORAGE_ROAD_NOTE + tmpStorageUuid[uuid].uuid)
                if (null != tmpStorageRoadNoteRec){
                    let tmpArrStorageRoadNoteRec = JSON.parse(tmpStorageRoadNoteRec)
                    for (let roadnote in tmpArrStorageRoadNoteRec){
                        if (tmpArrStorageRoadNoteRec[roadnote]['piclist'] != undefined && tmpArrStorageRoadNoteRec[roadnote]['piclist'].length){
                            storageRoadNotePic = tmpArrStorageRoadNoteRec[roadnote]['piclist'][0].uri
                        }
                        storageRoadNoteText = tmpArrStorageRoadNoteRec[roadnote]['text']
                    }
                    storageRoadNoteLength = tmpArrStorageRoadNoteRec.length
                }

                //起始点作为标题
                let startAddress = ''
                let tmpStorageAddress = storage.getItem(Const.STORAGE_START_END_ADDR + tmpStorageUuid[uuid].uuid)
                if (null != tmpStorageAddress){
                    let tmpArrStorageAddress = JSON.parse(tmpStorageAddress)
                    for (let addr in tmpArrStorageAddress){
                        if (tmpArrStorageAddress[addr].type == 'start'){
                            startAddress = tmpArrStorageAddress[addr].data.formatted_address
                        }
                    }
                }

                let date = new Date(tmpStorageUuid[uuid].timestamp);
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                let D = date.getDate() + ' ';
                let h = date.getHours() + ':';
                let m = date.getMinutes() + ':';
                let s = date.getSeconds();


                locationRecList.push({
                    'address' : startAddress,
                    'uuid'    : tmpStorageUuid[uuid].uuid,
                    'timestamp' : Y+M+D+h+m+s,
                    'location' : storageLocationRecLength,
                    'roadnote' : storageRoadNoteLength,
                    'roadnote_pic': storageRoadNotePic,
                    'roadnote_text': storageRoadNoteText,
                })

            }
            return locationRecList
        }
        return locationRecList
    }
}