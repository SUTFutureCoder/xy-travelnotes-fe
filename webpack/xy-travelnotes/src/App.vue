<template>
  <div id="app">
    <router-view></router-view>
    <bottom></bottom>
  </div>
</template>

<script>
import Bottom from './pages/common/Bottom'

export default {
    name: 'app',
    data () {
        return {

        }
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
  .bottom {
  }
</style>
