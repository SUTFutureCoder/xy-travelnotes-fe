<template>
    <div id="memory-roadnote">
        <!-- 头部 -->
        <!-- 返回按钮 -->
        <!-- 地图正文 -->
        <baidu-map :scroll-wheel-zoom="true"
                   :center="center"
                   :zoom="zoom"
        >
        </baidu-map>
    </div>
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
            this['roadNoteUuid'] = this.$route.params.uuid
        },
        methods: {
        }
    }
</script>