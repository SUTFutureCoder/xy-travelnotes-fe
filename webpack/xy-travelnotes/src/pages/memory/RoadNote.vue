<template>
    <div id="memory-road-note">
        <RoadNoteBaiduMap></RoadNoteBaiduMap>
    </div>
</template>
<script>
    import RoadNoteBaiduMap from './components/RoadNoteBaiduMap'
    export default {
        data () {
            return {
            }
        },
        mounted() {
            this['roadNoteUuid'] = this.$route.params.uuid
        },
        methods: {
        },
        components: {
            RoadNoteBaiduMap
        }
    }
</script>
<style>
    #memory-road-note {
        width: 100%;
        height: 100%;
    }
</style>