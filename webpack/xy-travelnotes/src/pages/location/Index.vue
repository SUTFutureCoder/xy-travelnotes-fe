<template>
    <div id="map">
        <BaiduMap></BaiduMap>
        <mu-float-button icon="add" mini id="location-float-button"/>
        <mu-icon-menu
                id="location-menu"
                :anchorOrigin="rightTop"
                :targetOrigin="rightTop"
        >
            <mu-menu-item title="Refresh" />
            <mu-menu-item title="Send feedback" />
            <mu-menu-item title="Settings" />
            <mu-menu-item title="Help" />
            <mu-menu-item title="Sign out" />
        </mu-icon-menu>
    </div>
</template>
<script>
    import BaiduMap from './components/BaiduMap'
    export default {
        data () {
            return {
                rightTop: {horizontal: 'right', vertical: 'top'}
            }
        },
        methods: {
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
</style>
