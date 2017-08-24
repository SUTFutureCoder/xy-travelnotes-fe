<template>
    <baidu-map id="map"
               :scroll-wheel-zoom="true"
               :center="center"
               :zoom="zoom"
    >
        <bm-polyline :path="polylinePath" stroke-color="red" :stroke-weight="5"></bm-polyline>
        <!--<bm-marker :position="center" :dragging="true"></bm-marker>-->
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

                debugloop: 10,

                roadNoteUuid: 0,
            }
        },
        mounted() {

        },
        activated(){
            this['roadNoteUuid'] = this.$route.params.uuid
            this['polylinePath'] = []
            //获取该uuid下信息
            let locationRec = LocationService.storageGetLocationRec(this.$route.params.uuid)
            if (false != locationRec){
                this.showLocationRec(locationRec)
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
            }
        }
    }
</script>