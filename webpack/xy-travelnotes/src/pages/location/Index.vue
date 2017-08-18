<template>
    <div id="map">
        <BaiduMap></BaiduMap>

        <mu-float-button icon="add" mini id="location-float-button"/>
        <mu-icon-menu
                id="location-menu"
                :anchorOrigin="rightTop"
                :targetOrigin="rightTop"
        >
            <mu-menu-item title="开始记录" v-if="!locationRecSwitch" @click="startRecLocation"/>
            <mu-menu-item title="添加路书" v-if="locationRecSwitch" @click="openPopup"/>
            <mu-menu-item title="停止记录" v-if="locationRecSwitch"  @click="stopRecLocation"/>
        </mu-icon-menu>

        <mu-popup position="bottom" popupClass="popup-record-location" v-if="locationRecSwitch" :open="popup" @close="closePopup()">
            <mu-appbar title="添加路书">
                <mu-flat-button slot="right" label="关闭" color="white" @click="closePopup()"/>
            </mu-appbar>
            <mu-content-block>
                <mu-row gutter>
                    <mu-text-field hintText="天気がいいから、散歩しましょう" v-model="roadNoteText" multiLine :rows="3" :rowsMax="6" fullWidth/>
                </mu-row>
                <mu-row gutter>
                    <mu-icon-button id="camera-icon" icon="photo_camera" @click="openCamera('')"/>
                </mu-row>
                <div class="gridlist-location-pic">
                    <mu-grid-list class="gridlist-location-pic-list">
                        <mu-grid-tile v-for="prepic, index in locationPicList" :key="index">
                            <img :src="prepic.image" :index="index" :uri="prepic.uri"/>
                        </mu-grid-tile>
                    </mu-grid-list>
                </div>
                <br/>
                <mu-row gutter>
                    <mu-raised-button label="发送ヽ(✿ﾟ▽ﾟ)ノ" @click="sendLocateNote" primary fullWidth/>
                </mu-row>
            </mu-content-block>
        </mu-popup>
    </div>
</template>
<script>
    import BaiduMap from './components/BaiduMap'
    import LocationService from './LocationService'
    import Bus from '../../assets/EventBus'
    import * as Const from '../../constants/Const'
    export default {
        data () {
            return {
                locationRecSwitch: false,      //记录开关
                rightTop: {horizontal: 'right', vertical: 'top'},
                popup: false,
                roadNoteText:    '',
                locationPicList: [],

                intervalSetLocationRec: 0,
            }
        },
        mounted() {
            LocationService.addLocationLinstener()
        },
        methods: {
            startRecLocation() {
                this['locationRecSwitch'] = true
                //设置当前录制uuid
                LocationService.storageSetCurrentRecId('')
                Bus.$emit('switch_location_point_rec', true);
                //获取当前点名称
                LocationService.initRecLocation();
                //向录制uuid集添加uuid
                LocationService.storagePushUuidList(LocationService.storageGetCurrentRecId())
                //设置定时任务 每5秒同步记录点集到localstorage中
                LocationService.storageSetLocationRec()
                this['intervalSetLocationRec'] = setInterval(() => {
                    LocationService.storageSetLocationRec()
                }, 5 * 1000)
            },
            stopRecLocation() {
                this['locationRecSwitch'] = false
                Bus.$emit('switch_location_point_rec', false);
                //执行停止记录操作
                LocationService.stopRecLocation()
                clearInterval(this['intervalSetLocationRec'])
                //立即执行同步
                LocationService.storageSetLocationRec()
                //清除录制uuid
                LocationService.storageResetCurrentRecId()
            },
            openPopup () {
                this['popup'] = true
            },
            sendLocateNote () {
                //记录路书到localstorage中，生成路书uuid
                let piclist = []
                if (this['locationPicList'].length){
                    for (let x in this['locationPicList']){
                        piclist.push({
                            'image' : this['locationPicList'][x].image,
                            'uri'   : this['locationPicList'][x].uri,
                        })
                    }
                }
                LocationService.storageSetRoadNote(this['roadNoteText'], this['locationPicList'])
                //向服务器发送
                this.closePopup()
            },
            closePopup () {
                //清空数据
                this['roadNoteText'] = ''
                this['locationPicList'] = []
                this['popup'] = false
            },
            //相机相关
            setOptions(srcType) {
                var options = {
                    // Some common settings are 20, 50, and 100
                    quality: 100,   //后期可配置
                    saveToPhotoAlbum: true,
                    destinationType: Camera.DestinationType.FILE_URI,
                    // In this app, dynamically set the picture source, Camera or photo gallery
                    sourceType: srcType,
                    encodingType: Camera.EncodingType.JPEG,
//                    mediaType: Camera.MediaType.PICTURE,
                    mediaType: Camera.MediaType.ALLMEDIA,
                    allowEdit: false,
                    correctOrientation: true  //Corrects Android orientation quirks
                }
                return options;
            },
            openCamera(selection) {
                console.log(selection)
                var srcType = Camera.PictureSourceType.CAMERA;
                var options = this.setOptions(srcType);
//                var func = createNewFileEntry;
                let vue = this
                navigator.camera.getPicture(function cameraSuccess(imageUri) {
                    //添加图片
                    options.targetHeight = 20;
                    options.targetWidth = 20;
                    vue.$data.locationPicList.push({
                        'image': imageUri,
                        'uri':   imageUri,
                    })
                }, function cameraError(error) {
                    console.debug("Unable to obtain picture: " + error, "app");

                }, options);
            }
        },
        components: {
            BaiduMap
        }
    }
</script>
<style>
    #map {
        width: 100%;
        height: 100%;
    }
    #location-float-button {
        position: fixed;
        right: 20px;
        bottom: 100px;
    }
    #location-menu {
        position: fixed;
        right: 16px;
        bottom: 96px;
    }
    .popup-record-location {
        width: 100%;
    }
    #camera-icon .material-icons {
        width: 24px;
    }
    .gridlist-location-pic{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .gridlist-location-pic-list {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
    }
    /* 纠偏 */
    .mu-grid-tile-titlebar {
        background-color: transparent;
    }
</style>
