webpackJsonp([0],[,,function(t,e,n){"use strict";var o=n(1),a=n(28),r=n(13),i=n(22),u=n.n(i);o.default.use(a.a),e.a=new a.a({routes:[{path:r.a,component:u.a}]})},function(t,e){},function(t,e){},,,function(t,e,n){function o(t){n(19)}var a=n(0)(n(9),n(26),o,null,null);t.exports=a.exports},,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(21),a=n.n(o);e.default={name:"app",data:function(){return{}},components:{Bottom:a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{bottomNav:"nearby",bottomNavColor:"nearby"}},methods:{handleChange:function(t){this.bottomNav=t}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(23),a=n.n(o);e.default={data:function(){return{rightTop:{horizontal:"right",vertical:"top"},popup:!1}},methods:{popupRecordLocation:function(){},openPopup:function(){this.popup=!0},closePopup:function(){this.popup=!1},setOptions:function(t){return{quality:100,destinationType:Camera.DestinationType.FILE_URI,sourceType:t,encodingType:Camera.EncodingType.JPEG,mediaType:Camera.MediaType.PICTURE,allowEdit:!0,correctOrientation:!0}},openCamera:function(t){var e=Camera.PictureSourceType.CAMERA,n=this.setOptions(e);"camera-thmb"==t&&(n.targetHeight=100,n.targetWidth=100),navigator.camera.getPicture(function(t){alert(t)},function(t){console.debug("Unable to obtain picture: "+t,"app")},n)}},components:{BaiduMap:a.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(15),a=n.n(o);e.default={data:function(){return{center:{lng:0,lat:0},zoom:19}},mounted:function(){setInterval(this.location,1e4);var t=this;document.addEventListener("deviceready",function(){cordova.plugins.backgroundMode.setDefaults({text:"星柚游记正在后台努力运行中～"}),cordova.plugins.backgroundMode.enable(),cordova.plugins.backgroundMode.onactivate=function(){},t.location()},!1)},methods:{syncCenterAndZoom:function(t){},location:function(){var t=this;AdvancedGeolocation.start(function(e){try{var n=JSON.parse(e);switch(n.provider){case"gps":case"network":var o=new BMap.Point(n.longitude,n.latitude),a=new BMap.Convertor,r=[];r.push(o),a.translate(r,1,5,function(e){0===e.status&&(t.$data.center.lat=e.points[0].lat,t.$data.center.lng=e.points[0].lng)})}return n}catch(t){console.log("Invalid JSON: "+t)}},function(t){console.log("Error JSON: "+a()(t));var e=JSON.parse(t);console.log("Error no.: "+e.error+", Message: "+e.msg+", Provider: "+e.provider)},{minTime:0,minDistance:0,noWarn:!1,providers:"all",useCache:!0,satelliteData:!0,buffer:!0,bufferSize:10,signalStrength:!1})}}}},function(t,e,n){"use strict";n.d(e,"a",function(){return o});var o="/"},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),a=n(8),r=n(6),i=n.n(r),u=n(5),c=n.n(u),s=n(3),l=(n.n(s),n(4)),p=(n.n(l),n(7)),d=n.n(p),m=n(2);o.default.config.productionTip=!1,o.default.use(c.a),o.default.use(a.a),o.default.use(i.a,{ak:"AaXe3HZ8ouvnNXwQKTeaVWGB7zao07C6"}),new o.default({el:"#app",router:m.a,template:"<App/>",components:{App:d.a}}),o.default.http.interceptors.push(function(t,e){t.credentials=!0,e()})},,,,function(t,e){},function(t,e){},function(t,e){},function(t,e,n){var o=n(0)(n(10),n(25),null,null,null);t.exports=o.exports},function(t,e,n){function o(t){n(20)}var a=n(0)(n(11),n(27),o,null,null);t.exports=a.exports},function(t,e,n){function o(t){n(18)}var a=n(0)(n(12),n(24),o,null,null);t.exports=a.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("baidu-map",{attrs:{id:"map","scroll-wheel-zoom":!0,center:t.center,zoom:t.zoom},on:{moving:t.syncCenterAndZoom,moveend:t.syncCenterAndZoom,zoomend:t.syncCenterAndZoom}},[n("bm-marker",{attrs:{position:t.center,dragging:!0}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("mu-paper",[n("mu-bottom-nav",{attrs:{value:t.bottomNav,shift:""},on:{change:t.handleChange}},[n("mu-bottom-nav-item",{attrs:{value:"nearby",title:"路书",icon:"location_on"}}),t._v(" "),n("mu-bottom-nav-item",{attrs:{value:"recents",title:"记录",icon:"restore"}}),t._v(" "),n("mu-bottom-nav-item",{attrs:{value:"favorites",title:"我",icon:"favorite"}})],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view"),t._v(" "),n("bottom",{attrs:{id:"bottom"}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"map"}},[n("BaiduMap"),t._v(" "),n("mu-float-button",{attrs:{icon:"add",mini:"",id:"location-float-button"}}),t._v(" "),n("mu-icon-menu",{attrs:{id:"location-menu",anchorOrigin:t.rightTop,targetOrigin:t.rightTop}},[n("mu-menu-item",{attrs:{title:"停止记录"}}),t._v(" "),n("mu-menu-item",{attrs:{title:"添加路书"},on:{click:t.openPopup}})],1),t._v(" "),n("mu-popup",{attrs:{position:"bottom",popupClass:"popup-record-location",open:t.popup},on:{close:function(e){t.closePopup()}}},[n("mu-appbar",{attrs:{title:"添加路书"}},[n("mu-flat-button",{attrs:{label:"关闭",color:"white"},on:{click:function(e){t.closePopup()}},slot:"right"})],1),t._v(" "),n("mu-content-block",[n("mu-row",{attrs:{gutter:""}},[n("mu-text-field",{attrs:{hintText:"天気がいいから、散歩しましょう",multiLine:"",rows:3,rowsMax:6,fullWidth:""}})],1),t._v(" "),n("mu-row",{attrs:{gutter:""}},[n("mu-icon-button",{attrs:{id:"camera-icon",icon:"photo_camera"},on:{click:function(e){t.openCamera("")}}})],1),t._v(" "),n("mu-row",{attrs:{gutter:""}},[n("mu-raised-button",{attrs:{label:"发送ヽ(✿ﾟ▽ﾟ)ノ",primary:"",fullWidth:""}})],1)],1)],1)],1)},staticRenderFns:[]}},,,,function(t,e){}],[14]);
//# sourceMappingURL=app.7813d9120a1abe4dc7e9.js.map