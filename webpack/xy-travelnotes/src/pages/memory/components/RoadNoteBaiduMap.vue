<template>
    <baidu-map id="map"
               :scroll-wheel-zoom="true"
               :center="center"
               :zoom="zoom"
    >
        <bm-marker :position="center" :dragging="true"></bm-marker>
    </baidu-map>
</template>
<script>
    export default {
        data () {
            return {
                center: {
                    lng: 0,
                    lat: 0
                },
                zoom: 19,

                debugloop: 10,

                roadNoteUuid: 0,
            }
        },
        mounted() {
//            this['roadNoteUuid'] = this.$route.params.uuid
        },
        methods: {
        }
    }
</script>