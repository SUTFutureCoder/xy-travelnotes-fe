webpackJsonp([0],[,,function(t,e,n){"use strict";var o=n(1);e.a=new o.default},function(t,e,n){"use strict";n.d(e,"a",function(){return o}),n.d(e,"c",function(){return i}),n.d(e,"b",function(){return a}),n.d(e,"d",function(){return r}),n.d(e,"f",function(){return c}),n.d(e,"g",function(){return s}),n.d(e,"h",function(){return u}),n.d(e,"i",function(){return l}),n.d(e,"e",function(){return d});var o="AaXe3HZ8ouvnNXwQKTeaVWGB7zao07C6",i="AIzaSyB-A4qZ_GNOpVZpa1Bb-GLQXXRZoylQRM4",a="baidu",r="google",c="yo:recording_id",s="yo:start_end_addr:",u="yo:location_rec:",l="yo:record_uuid_list",d="recording_id"},function(t,e,n){"use strict";n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i});var o="/",i="/memory"},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={oversea:0}},function(t,e,n){"use strict";var o=n(1),i=n(37),a=n(4),r=n(29),c=n.n(r),s=n(31),u=n.n(s);o.default.use(i.a),e.a=new i.a({routes:[{path:a.a,component:c.a},{path:a.b,component:u.a}]})},function(t,e){},function(t,e){},,,function(t,e,n){function o(t){n(25)}var i=n(0)(n(13),n(34),o,null,null);t.exports=i.exports},,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(28),i=n.n(o);e.default={name:"app",data:function(){return{}},components:{Bottom:i.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(4);e.default={data:function(){return{locationNav:o.a,memoryNav:o.b,bottomNav:"",bottomNavColor:""}},mounted:function(){this.handleChange(o.a)},methods:{handleChange:function(t){this.bottomNav!=t&&(this.bottomNav=t,this.bottomNavColor=t,this.$router.push({path:t}))}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(30),i=n.n(o),a=n(20),r=n(2);e.default={data:function(){return{locationRecSwitch:!1,rightTop:{horizontal:"right",vertical:"top"},popup:!1,locationPicList:[],intervalSetLocationRec:0}},mounted:function(){a.a.addLocationLinstener()},methods:{startRecLocation:function(){this.locationRecSwitch=!0,r.a.$emit("switch_location_point_rec",!0),a.a.initRecLocation(),a.a.storageSetCurrentRecId(""),a.a.storagePushUuidList(a.a.storageGetCurrentRecId()),this.intervalSetLocationRec=setInterval(function(){a.a.storageSetLocationRec()},1e3)},stopRecLocation:function(){this.locationRecSwitch=!1,r.a.$emit("switch_location_point_rec",!1),a.a.stopRecLocation(),clearInterval(this.intervalSetLocationRec),a.a.storageSetLocationRec(),a.a.storageResetCurrentRecId()},openPopup:function(){this.popup=!0},sendLocateNote:function(){a.a.pointListGet();this.closePopup()},closePopup:function(){this.locationPicList=[],this.popup=!1},setOptions:function(t){return{quality:100,destinationType:Camera.DestinationType.FILE_URI,sourceType:t,encodingType:Camera.EncodingType.JPEG,mediaType:Camera.MediaType.ALLMEDIA,allowEdit:!1,correctOrientation:!0}},openCamera:function(t){var e=Camera.PictureSourceType.CAMERA,n=this.setOptions(e),o=this;navigator.camera.getPicture(function(t){o.$data.locationPicList.push({image:t,uri:t})},function(t){console.debug("Unable to obtain picture: "+t,"app")},n)}},components:{BaiduMap:i.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(2);e.default={data:function(){return{center:{lng:0,lat:0},zoom:19,centerLocateSwitch:1,centerLocateTimeoutId:0,transRetry:0}},mounted:function(){setInterval(this.location,1e4);var t=this;document.addEventListener("deviceready",function(){cordova.plugins.backgroundMode.setDefaults({text:"星柚游记正在后台努力运行中～"}),cordova.plugins.backgroundMode.enable(),cordova.plugins.backgroundMode.onactivate=function(){},t.location()},!1)},methods:{syncCenterAndZoom:function(t){1==this.$data.centerLocateSwitch&&(this.$data.centerLocateSwitch=0,this.resetCenterLocate())},resetCenterLocate:function(){var t=this;0==this.$data.centerLocateSwitch&&(0!=this.$data.centerLocateTimeoutId&&clearTimeout(this.$data.centerLocateTimeoutId),this.$data.centerLocateTimeoutId=setTimeout(function(){t.$data.centerLocateSwitch=1},1e4))},setCenterLocate:function(t,e){(1==this.$data.centerLocateSwitch||0==this.$data.center.lat&&0==this.$data.center.lng)&&(this.$data.center.lat=t,this.$data.center.lng=e)},location:function(){var t=this;AdvancedGeolocation.start(function(e){try{var n=JSON.parse(e);switch(o.a.$emit("current_location",n),n.provider){case"gps":var i=new BMap.Point(n.longitude,n.latitude),a=new BMap.Convertor,r=[];r.push(i),0==t.GLOBAL.default.oversea?a.translate(r,1,5,function(e){0===e.status?(t.setCenterLocate(e.points[0].lat,e.points[0].lng),n.latitude=e.points[0].lat,n.longitude=e.points[0].lng,t.transRetry=0):(t.transRetry>=1&&(t.GLOBAL.default.oversea=1),t.transRetry++,t.setCenterLocate(n.latitude,n.longitude)),o.a.$emit("current_gps_location",n)}):(t.setCenterLocate(n.latitude,n.longitude),o.a.$emit("current_gps_location",n));break;case"network":var i=new BMap.Point(n.longitude,n.latitude),a=new BMap.Convertor,r=[];r.push(i),0==t.GLOBAL.default.oversea?a.translate(r,1,5,function(e){0===e.status?(t.setCenterLocate(e.points[0].lat,e.points[0].lng),n.latitude=e.points[0].lat,n.longitude=e.points[0].lng,t.transRetry=0):(t.transRetry++,t.transRetry>=2&&(t.GLOBAL.default.oversea=1),t.setCenterLocate(n.latitude,n.longitude)),o.a.$emit("current_network_location",n)}):(t.setCenterLocate(n.latitude,n.longitude),o.a.$emit("current_network_location",n))}return n}catch(t){}},function(t){},{minTime:0,minDistance:0,noWarn:!1,providers:"all",useCache:!0,satelliteData:!0,buffer:!0,bufferSize:10,signalStrength:!1})}}}},function(t,e){},function(t,e,n){"use strict";function o(t){return a[t]=i(16,16),a[t]}function i(t,e){var n="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),o=[],i=void 0;if(e=e||n.length,t)for(i=0;i<t;i++)o[i]=n[0|Math.random()*e];else{var a=void 0;for(o[8]=o[13]=o[18]=o[23]="-",o[14]="4",i=0;i<36;i++)o[i]||(a=0|16*Math.random(),o[i]=n[19==i?3&a|8:a])}return o.join("")}e.a=o;var a=[]},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(1),i=n(12),a=n(10),r=n.n(a),c=n(9),s=n.n(c),u=n(7),l=(n.n(u),n(8)),d=(n.n(l),n(11)),m=n.n(d),p=n(6),f=n(3),v=n(5);o.default.config.productionTip=!1,o.default.prototype.GLOBAL=v,o.default.use(s.a),o.default.use(i.a),o.default.use(r.a,{ak:f.a}),new o.default({el:"#app",router:p.a,template:"<App/>",components:{App:m.a}}),o.default.http.interceptors.push(function(t,e){t.credentials=!0,e()})},function(t,e,n){"use strict";var o=n(21),i=n.n(o),a=n(2),r=n(3),c=n(18),s=a.a,u=window.localStorage;e.a={currentLocation:{},locationPointList:[],locationPointRecSwitch:!1,addLocationLinstener:function(){var t=this;a.a.$on("switch_location_point_rec",function(e){t.locationPointRecSwitch=e}),a.a.$on("current_gps_location",function(e){t.currentLocation=e,t.locationPointRecSwitch&&t.pointListPush(e)}),a.a.$on("format_location",function(e,n,o){var i=t.parseStartEndAddress(e,n);t.storageSetStartEndAddress(i,o)})},getCurrentLocation:function(){return this.currentLocation},pointListInit:function(){this.locationPointList=[]},pointListPush:function(t){if(this.locationPointList.length){var e=this.pointListGet(),n=e[e.length-1].latitude,o=e[e.length-1].longitude;0!=t.latitude&&0!=t.longitude&&(Math.abs(t.latitude-n)>1e-5||Math.abs(t.longitude-o)>1e-5)&&this.locationPointList.push(t)}else this.locationPointList.push(t)},pointListGet:function(){return this.locationPointList},pointListSend:function(){},initRecLocation:function(){var t=this,e=this.getCurrentLocation();void 0!=e.latitude&&void 0!=e.longitude?0==s.GLOBAL.default.oversea?this.getFormatLocationBd(e.latitude,e.longitude,"start"):this.getFormatLocationGoogle(e.latitude,e.longitude,"start"):setTimeout(function(){t.initRecLocation()},1e3)},getFormatLocationBd:function(t,e,n){var o=this;a.a.$http.get("http://api.map.baidu.com/geocoder/v2/?ak="+r.a+"&location="+t+","+e+"&output=json").then(function(t){a.a.$emit("format_location",t.body.result,r.b,n)}).catch(function(i){setTimeout(function(){o.getFormatLocationBd(t,e,n)},1e3)})},getFormatLocationGoogle:function(t,e,n){var o=this;a.a.$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+t+","+e+"&key="+r.c).then(function(t){a.a.$emit("format_location",t.body.results,r.d,n)}).catch(function(i){setTimeout(function(){o.getFormatLocationGoogle(t,e,n)},1e3)})},stopRecLocation:function(){var t=this,e=this.getCurrentLocation();void 0!=e.latitude&&void 0!=e.longitude?0==s.GLOBAL.default.oversea?this.getFormatLocationBd(e.latitude,e.longitude,"stop"):this.getFormatLocationGoogle(e.latitude,e.longitude,"stop"):setTimeout(function(){t.stopRecLocation()},1e3)},pauseRecLocation:function(){},storageSetCurrentRecId:function(t){return this.storageGetCurrentRecId()?(t=c.a(r.e),u.setItem(r.f,t)):(""==t&&(t=c.a(r.e)),u.setItem(r.f,t)),this.storageGetCurrentRecId()},storageResetCurrentRecId:function(){u.setItem(r.f,"")},storageGetCurrentRecId:function(){return u.getItem(r.f)},parseStartEndAddress:function(t,e){var n={};switch(e){case r.b:n.formatted_address=t.formatted_address,n.addressComponent=t.addressComponent,n.source=r.b;break;case r.d:n.formatted_address=t[0].formatted_address,n.addressComponent=t[0].address_components,n.source=r.d}return n},storageSetStartEndAddress:function(t,e){var n=this.storageGetCurrentRecId();null==n&&(n=this.storageSetCurrentRecId(""));var o=u.getItem(r.g+n),a=[];null==o?a=[{data:t,type:e}]:(a=JSON.parse(o),a.push({data:t,type:e})),u.setItem(r.g+n,i()(a))},storageSetLocationRec:function(){var t=this.storageGetCurrentRecId(),e=this.pointListGet(),n=u.getItem(r.h+t);if(null!=n){var o=JSON.parse(n);if(o.length){var a=o[o.length-1].timestamp;for(var c in e)e[c].timestamp>a&&o.push(e[c]);u.setItem(r.h+t,i()(o))}else u.setItem(r.h+t,i()(e))}else u.setItem(r.h+t,i()(e))},storagePushUuidList:function(t){var e=(new Date).getTime(),n=u.getItem(r.i),o={uuid:t,timestamp:e};if(null!=n){var a=JSON.parse(n);a.push(o),u.setItem(r.i,i()(a))}else u.setItem(r.i,i()([o]))}}},,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){var o=n(0)(n(14),n(33),null,null,null);t.exports=o.exports},function(t,e,n){function o(t){n(27)}var i=n(0)(n(15),n(36),o,null,null);t.exports=i.exports},function(t,e,n){function o(t){n(24)}var i=n(0)(n(16),n(32),o,null,null);t.exports=i.exports},function(t,e,n){function o(t){n(26)}var i=n(0)(n(17),n(35),o,null,null);t.exports=i.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("baidu-map",{attrs:{id:"map","scroll-wheel-zoom":!0,center:t.center,zoom:t.zoom},on:{moving:t.syncCenterAndZoom,moveend:t.syncCenterAndZoom,zoomend:t.syncCenterAndZoom}},[n("bm-marker",{attrs:{position:t.center,dragging:!0}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("mu-paper",[n("mu-bottom-nav",{attrs:{value:t.bottomNav,shift:""},on:{change:t.handleChange}},[n("mu-bottom-nav-item",{attrs:{value:t.locationNav,title:"路书",icon:"location_on"}}),t._v(" "),n("mu-bottom-nav-item",{attrs:{value:t.memoryNav,title:"记录",icon:"restore"}}),t._v(" "),n("mu-bottom-nav-item",{attrs:{value:"me",title:"我",icon:"favorite"}})],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("keep-alive",[n("router-view")],1),t._v(" "),n("bottom",{attrs:{id:"bottom"}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("mu-list",[n("mu-sub-header",[t._v("今天")]),t._v(" "),n("mu-list-item",{attrs:{title:"这个周末一起吃饭么?"}},[n("mu-avatar",{attrs:{src:"/images/avatar1.jpg"},slot:"leftAvatar"}),t._v(" "),n("span",{slot:"describe"},[n("span",{staticStyle:{color:"rgba(0, 0, 0, .87)"}},[t._v("Myron Liu -")]),t._v(" 周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈\n          ")]),t._v(" "),n("mu-icon-menu",{attrs:{icon:"more_vert",tooltip:"操作"},slot:"right"},[n("mu-menu-item",{attrs:{title:"回复"}}),t._v(" "),n("mu-menu-item",{attrs:{title:"标记"}}),t._v(" "),n("mu-menu-item",{attrs:{title:"删除"}})],1)],1),t._v(" "),n("mu-divider",{attrs:{inset:""}}),t._v(" "),n("mu-list-item",{attrs:{title:"Alex Qin"}},[n("mu-avatar",{attrs:{src:"/images/avatar2.jpg"},slot:"leftAvatar"}),t._v(" "),n("span",{slot:"describe"},[n("span",{staticStyle:{color:"rgba(0, 0, 0, .87)"}},[t._v("看电影啊")]),t._v(" "),n("br"),t._v("\n              我们去看电影，最近有部烂片上映，又有吐槽的了\n          ")]),t._v(" "),n("mu-icon-menu",{attrs:{icon:"more_vert",tooltip:"操作"},slot:"right"},[n("mu-menu-item",{attrs:{title:"回复"}}),t._v(" "),n("mu-menu-item",{attrs:{title:"标记"}}),t._v(" "),n("mu-menu-item",{attrs:{title:"删除"}})],1)],1),t._v(" "),n("mu-divider",{attrs:{inset:""}}),t._v(" "),n("mu-list-item",{attrs:{title:"LOL"}},[n("mu-avatar",{attrs:{src:"/images/avatar3.jpg"},slot:"leftAvatar"}),t._v(" "),n("span",{slot:"describe"},[n("span",{staticStyle:{color:"rgba(0, 0, 0, .87)"}},[t._v("去打游戏啊")]),n("br"),t._v("\n  周末一起 LOL\n")]),t._v(" "),n("mu-icon-menu",{attrs:{icon:"more_vert",tooltip:"操作"},slot:"right"},[n("mu-menu-item",{attrs:{title:"回复"}}),t._v(" "),n("mu-menu-item",{attrs:{title:"标记"}}),t._v(" "),n("mu-menu-item",{attrs:{title:"删除"}})],1)],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"map"}},[n("BaiduMap"),t._v(" "),n("mu-float-button",{attrs:{icon:"add",mini:"",id:"location-float-button"}}),t._v(" "),n("mu-icon-menu",{attrs:{id:"location-menu",anchorOrigin:t.rightTop,targetOrigin:t.rightTop}},[t.locationRecSwitch?t._e():n("mu-menu-item",{attrs:{title:"开始记录"},on:{click:t.startRecLocation}}),t._v(" "),t.locationRecSwitch?n("mu-menu-item",{attrs:{title:"添加路书"},on:{click:t.openPopup}}):t._e(),t._v(" "),t.locationRecSwitch?n("mu-menu-item",{attrs:{title:"停止记录"},on:{click:t.stopRecLocation}}):t._e()],1),t._v(" "),t.locationRecSwitch?n("mu-popup",{attrs:{position:"bottom",popupClass:"popup-record-location",open:t.popup},on:{close:function(e){t.closePopup()}}},[n("mu-appbar",{attrs:{title:"添加路书"}},[n("mu-flat-button",{attrs:{label:"关闭",color:"white"},on:{click:function(e){t.closePopup()}},slot:"right"})],1),t._v(" "),n("mu-content-block",[n("mu-row",{attrs:{gutter:""}},[n("mu-text-field",{attrs:{hintText:"天気がいいから、散歩しましょう",multiLine:"",rows:3,rowsMax:6,fullWidth:""}})],1),t._v(" "),n("mu-row",{attrs:{gutter:""}},[n("mu-icon-button",{attrs:{id:"camera-icon",icon:"photo_camera"},on:{click:function(e){t.openCamera("")}}})],1),t._v(" "),n("div",{staticClass:"gridlist-location-pic"},[n("mu-grid-list",{staticClass:"gridlist-location-pic-list"},t._l(t.locationPicList,function(t,e){return n("mu-grid-tile",{key:e},[n("img",{attrs:{src:t.image,index:e,uri:t.uri}})])}))],1),t._v(" "),n("br"),t._v(" "),n("mu-row",{attrs:{gutter:""}},[n("mu-raised-button",{attrs:{label:"发送ヽ(✿ﾟ▽ﾟ)ノ",primary:"",fullWidth:""},on:{click:t.sendLocateNote}})],1)],1)],1):t._e()],1)},staticRenderFns:[]}},,,,function(t,e){}],[19]);
//# sourceMappingURL=app.92ada1c10579193f3323.js.map