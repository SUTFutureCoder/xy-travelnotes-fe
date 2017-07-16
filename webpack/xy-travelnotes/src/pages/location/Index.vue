<template>
    <div id="map">
        <BaiduMap></BaiduMap>

        <mu-float-button icon="add" mini id="location-float-button"/>
        <mu-icon-menu
                id="location-menu"
                :anchorOrigin="rightTop"
                :targetOrigin="rightTop"
        >
            <mu-menu-item title="停止记录" />
            <mu-menu-item title="添加路书" @click="openPopup"/>
        </mu-icon-menu>

        <mu-popup position="bottom" popupClass="popup-record-location" :open="popup" @close="closePopup()">
            <mu-appbar title="添加路书">
                <mu-flat-button slot="right" label="关闭" color="white" @click="closePopup()"/>
            </mu-appbar>
            <mu-content-block>
                <mu-row gutter>
                    <mu-text-field hintText="天気がいいから、散歩しましょう" multiLine :rows="3" :rowsMax="6" fullWidth/>
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
                    <mu-raised-button label="发送ヽ(✿ﾟ▽ﾟ)ノ" primary fullWidth/>
                </mu-row>
            </mu-content-block>
        </mu-popup>
    </div>
</template>
<script>
    import BaiduMap from './components/BaiduMap'
    export default {
        data () {
            return {
                rightTop: {horizontal: 'right', vertical: 'top'},
                popup: false,
                locationPicList: [],
            }
        },
        methods: {
            popupRecordLocation: function (){

            },
            openPopup () {
                this['popup'] = true
            },
            closePopup () {
                this['popup'] = false
            },
            //相机相关
            setOptions(srcType) {
                var options = {
                    // Some common settings are 20, 50, and 100
                    quality: 100,   //后期可配置
                    destinationType: Camera.DestinationType.FILE_URI,
                    // In this app, dynamically set the picture source, Camera or photo gallery
                    sourceType: srcType,
                    encodingType: Camera.EncodingType.JPEG,
                    mediaType: Camera.MediaType.PICTURE,
                    allowEdit: false,
                    correctOrientation: true  //Corrects Android orientation quirks
                }
                return options;
            },
            openCamera(selection) {

                var srcType = Camera.PictureSourceType.CAMERA;
                var options = this.setOptions(srcType);
//                var func = createNewFileEntry;
                let vue = this
                navigator.camera.getPicture(function cameraSuccess(imageUri) {
                    //添加图片
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
    .mu-grid-tile img {
        
    }
    .mu-grid-tile-titlebar {
        background-color: transparent;
    }
</style>
