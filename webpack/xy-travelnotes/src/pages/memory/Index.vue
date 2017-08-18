<template>
    <div id="memory-container">
        <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
        <mu-list>
            <template  v-for="record, index in locationRecList">
                <mu-list-item disableRipple :title="record.address">
                    <mu-avatar v-if="record.roadnote_pic != ''" :src="record.roadnote_pic" slot="leftAvatar"/>
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
                <mu-divider/>
            </template>
        </mu-list>
        <br/><br/><br/>
    </div>
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
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    border: 1px solid #d9d9d9;
    position: relative;
    user-select: none;
}
</style>