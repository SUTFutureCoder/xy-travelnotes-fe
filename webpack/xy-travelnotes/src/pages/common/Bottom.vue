<template>
    <mu-paper>
        <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
            <mu-bottom-nav-item value="nearby" title="路书" icon="location_on" />
            <mu-bottom-nav-item value="recents" title="记录" icon="restore" />
            <mu-bottom-nav-item value="favorites" title="我" icon="favorite" />
        </mu-bottom-nav>
    </mu-paper>
</template>

<script>
    export default {
        data () {
            return {
                bottomNav: 'nearby',
                bottomNavColor: 'nearby'
            }
        },
        methods: {
            handleChange (val) {
                this.bottomNav = val
            }
        }
    }
</script>
