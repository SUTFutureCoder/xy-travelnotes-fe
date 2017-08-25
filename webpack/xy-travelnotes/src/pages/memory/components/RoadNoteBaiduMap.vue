<template>
    <baidu-map id="map"
               :scroll-wheel-zoom="true"
               :center="center"
               :zoom="zoom"
    >
        <bm-polyline :path="polylinePath" stroke-color="red" :stroke-weight="5"></bm-polyline>
        <!-- 对于点集只关注已记录的路书 -->
        <div v-for="roadNoteData, key in roadNote">
            <bm-marker :position="{lng: roadNoteData.currentlocation.longitude, lat: roadNoteData.currentlocation.latitude}" @click="showRoadNote(roadNoteData.currentlocation.roadmap_uuid)"></bm-marker>
        </div>
        <!-- 窗体 -->
        <bm-info-window :position="{lng: roadNoteWindow.location.lng, lat: roadNoteWindow.location.lat}" :title="roadNoteWindow.title" :show="roadNoteWindow.show">
            <p v-text="roadNoteWindow.contents"></p>
        </bm-info-window>
    </baidu-map>
</template>
<script>
    import Bus from './../../../assets/EventBus'
    import LocationService from './../../location/LocationService'
    export default {
        data () {
            return {
                center: {
                    lng: 0,
                    lat: 0
                },
                zoom: 19,
                polylinePath: [],
                roadNote: [],
                roadNoteWindow: {
                    show: false,
                    contents: '',
                    title: '',
                    location: {
                        lng: 0,
                        lat: 0,
                    },
                },

                debugloop: 10,

                roadNoteUuid: 0,
            }
        },
        mounted() {

        },
        activated(){
            this['roadNoteUuid'] = this.$route.params.uuid
            this['polylinePath'] = []
            this['roadNote']     = []
            //获取该uuid下信息
            let locationRec = LocationService.storageGetLocationRec(this.$route.params.uuid)
            if (false != locationRec){
                this.showLocationRec(locationRec)
            }
            //获取该uuid下路书
            let roadNote = LocationService.storageGetRoadNote(this.$route.params.uuid)
            if (false != roadNote){
                this['roadNote'] = roadNote
            }
        },
        deactivated() {
            //恢复底端显示
            Bus.$emit('showbottom', true)
        },
        methods: {
            //处理location记录点
            showLocationRec: function (locationRec) {
                //第一个点作为中心点
                this['center'].lng = locationRec[0].longitude
                this['center'].lat = locationRec[0].latitude

                for (let i in locationRec){
                    if (locationRec[i].cached == false){
                        this['polylinePath'].push({
                            lng: locationRec[i].longitude,
                            lat: locationRec[i].latitude,
                        })
                    }
                }
            },

            //显示路书
            showRoadNote: function(roadNoteUuid){
                //显示路书窗体
                this.roadNoteWindow.show = true
                //获取该路书信息
                for (let i in this.roadNote){
                    if (this.roadNote[i].currentlocation.roadmap_uuid == roadNoteUuid){
                        this.roadNoteWindow.location.lng = this.roadNote[i].currentlocation.longitude
                        this.roadNoteWindow.location.lat = this.roadNote[i].currentlocation.latitude
                        if (undefined != this.roadNote[i].currentlocation.address){
                            this.roadNoteWindow.title = this.roadNote[i].currentlocation.address.formatted_address
                        }
                        this.roadNoteWindow.contents = this.roadNote[i].text
                    }
                }

            },
            roadNoteWindowOpen: function (e) {
                this.roadNoteWindow.show = false
            },
            roadNoteWindowClose: function (e) {
                this.roadNoteWindow.show = true
            }
            
        }
    }
</script>