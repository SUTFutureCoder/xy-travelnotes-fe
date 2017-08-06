<template>
    <mu-list>
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
        <div v-for="record, index in locationRecList">
            <mu-list-item   :title="record.address">
                <mu-avatar  v-if="record.roadnote_pic != ''" :src="record.roadnote_pic" slot="leftAvatar"/>
                <p>{{record.roadnote_text}} </p>
                <span slot="describe">
                <span>uuid - {{record.uuid}}</span><br/>
                <span>time - {{record.timestamp}} </span><br/>
                <span>路径点数量 - {{record.location}} </span><br/>
                <span>路书数量 - {{record.roadnote}} </span><br/>
            </span>
                <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
                    <mu-menu-item title="回复" />
                    <mu-menu-item title="标记" />
                    <mu-menu-item title="删除" />
                </mu-icon-menu>
            </mu-list-item>
            <mu-divider inset/>
        </div>
        <br/><br/><br/><br/><br/><br/>
    </mu-list>
</template>
<script>
    import LocationService from './../location/LocationService'
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
            }
        },
    }
</script>
<style>
#memory-container{

}
</style>