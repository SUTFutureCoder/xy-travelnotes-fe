import Vue from 'vue'
import Router from 'vue-router'
import * as RouterPath from './../constants/RouterPaths'
import Location from './../pages/location/Index'
import Memory from './../pages/memory/Index'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: RouterPath.PAGES_LOCATION,
            component: Location
        },
        {
            path: RouterPath.PAGES_MEMORY,
            component: Memory
        }
    ]
})
