<template>
    <mu-paper>
        <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
            <mu-bottom-nav-item :value="locationNav" title="路书" icon="location_on" />
            <mu-bottom-nav-item :value="memoryNav" title="记录" icon="restore" />
            <mu-bottom-nav-item value="me" title="我" icon="favorite" />
        </mu-bottom-nav>
    </mu-paper>
</template>

<script>
    import * as RouterPath from './../../constants/RouterPaths'
    export default {
        data () {
            return {
                locationNav: RouterPath.PAGES_LOCATION,
                memoryNav: RouterPath.PAGES_MEMORY,

                bottomNav: "",
                bottomNavColor: "",
            }
        },
        mounted(){
            //默认路由
            this.handleChange(RouterPath.PAGES_LOCATION)
        },
        methods: {
            handleChange (val) {
                if (this.bottomNav != val){
                    this.bottomNav = val
                    this.bottomNavColor = val
                    this.$router.push({path: val})
                }
            }
        }
    }
</script>
