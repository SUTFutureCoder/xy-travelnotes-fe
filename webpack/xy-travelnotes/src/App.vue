<template>
  <div id="app">
    <keep-alive><router-view></router-view></keep-alive>
    <bottom id="bottom" v-if="showbottom"></bottom>
  </div>
</template>

<script>
import Bottom from './pages/common/Bottom'
import Bus from './assets/EventBus'
export default {
    name: 'app',
    data () {
        return {
            showbottom: true, //是否显示底端按钮
        }
    },
    mounted() {
        let vue = this
        Bus.$on("showbottom", function (boolBottom) {
            vue['showbottom'] = boolBottom
        })
    },
    components: {
        Bottom
    }
}

</script>

<style>
  html,body,dl,ul,ol,menu,li,div,p,img,h1,h2,h3,h4,h5,h6 {
    margin: 0;
    padding: 0;
    border: none;
  }
  html, body{ margin:0; height:100%; }
  #app {
    height: 100%
  }
  #bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
