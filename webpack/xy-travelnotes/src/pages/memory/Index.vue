<template>
    <div id="memory-container">
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
        <mu-list>
            <template  v-for="record, index in locationRecList">
                <mu-list-item :title="record.address" @click="showRoadNote(record.uuid)">
                    <mu-avatar v-if="record.roadnote_pic != ''" :src="record.roadnote_pic" slot="leftAvatar"/>
                    <p>{{record.roadnote_text}} </p>
                    <span slot="describe">
                    <span>time - {{record.timestamp}} </span><br/>
                </span>
                    <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
                        <mu-menu-item title="回复" />
                        <mu-menu-item title="标记" />
                        <mu-menu-item title="删除" />
                    </mu-icon-menu>
                </mu-list-item>
                <mu-divider/>
            </template>
        </mu-list>
        <br/><br/><br/>
    </div>
</template>
<script>
    import LocationService from './../location/LocationService'
    import * as RouterPath from './../../constants/RouterPaths'
    import Bus from './../../assets/EventBus'
    export default {
        data(){
            return {
                locationRecList: null,
                refreshing: false,
                trigger: null
            }
        },
        mounted() {
            //获取记录列表
            this.trigger = this.$el
            this['locationRecList'] = LocationService.storageGetLocationRecList()
        },
        methods: {
            refreshMemory: function (){
                this['locationRecList'] = LocationService.storageGetLocationRecList()
            },
            refresh () {
                this.refreshing = true
                this['locationRecList'] = LocationService.storageGetLocationRecList()
                setTimeout(() => {
                    this.refreshing = false
                }, 500)
            },
            showRoadNote(roadNoteUuid) {
                //展示路书
                //关闭底边导航
                Bus.$emit('showbottom', false)
                //跳转到详情页
                this.$router.push({path: '/memory/roadnote/' + roadNoteUuid })

            },
        },
    }
</script>
<style>
#memory-container{
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
    user-select: none;
}
</style>