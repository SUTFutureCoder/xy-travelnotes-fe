webpackJsonp([0],[,,function(t,e,o){"use strict";o.d(e,"a",function(){return n}),o.d(e,"c",function(){return i}),o.d(e,"b",function(){return a}),o.d(e,"d",function(){return r}),o.d(e,"f",function(){return s}),o.d(e,"g",function(){return c}),o.d(e,"h",function(){return u}),o.d(e,"j",function(){return l}),o.d(e,"k",function(){return d}),o.d(e,"e",function(){return m}),o.d(e,"i",function(){return p});var n="AaXe3HZ8ouvnNXwQKTeaVWGB7zao07C6",i="AIzaSyB-A4qZ_GNOpVZpa1Bb-GLQXXRZoylQRM4",a="baidu",r="google",s="yo:recording_id",c="yo:start_end_addr:",u="yo:location_rec:",l="yo:road_note:",d="yo:record_uuid_list",m="recording_id",p="road_map_id"},function(t,e,o){"use strict";var n=o(1);e.a=new n.default},function(t,e,o){"use strict";o.d(e,"a",function(){return n}),o.d(e,"b",function(){return i}),o.d(e,"c",function(){return a});var n="/",i="/memory",a="/me"},function(t,e,o){"use strict";var n=o(22),i=o.n(n),a=o(3),r=o(2),s=o(20),c=a.a,u=window.localStorage;e.a={currentLocation:{},locationPointList:[],locationPointRecSwitch:!1,addLocationLinstener:function(){var t=this;a.a.$on("switch_location_point_rec",function(e){t.locationPointRecSwitch=e}),a.a.$on("current_gps_location",function(e){t.currentLocation=e,t.locationPointRecSwitch&&t.pointListPush(e)}),a.a.$on("format_location",function(e,o,n){var i=t.parseStartEndAddress(e,o);t.storageSetStartEndAddress(i,n)})},getCurrentLocation:function(){return this.currentLocation},pointListInit:function(){this.locationPointList=[]},pointListPush:function(t){if(this.locationPointList.length){var e=this.pointListGet(),o=e[e.length-1].latitude,n=e[e.length-1].longitude;(0!=t.latitude&&0!=t.longitude&&(Math.abs(t.latitude-o)>1e-5||Math.abs(t.longitude-n)>1e-5)||""!=t.type)&&this.locationPointList.push(t)}else this.locationPointList.push(t)},pointListGet:function(){return this.locationPointList},pointListSend:function(){},initRecLocation:function(){var t=this,e=this.getCurrentLocation();void 0!=e.latitude&&void 0!=e.longitude?0==c.GLOBAL.default.oversea?this.getFormatLocationBd(e.latitude,e.longitude,"start"):this.getFormatLocationGoogle(e.latitude,e.longitude,"start"):setTimeout(function(){t.initRecLocation()},1e3)},getFormatLocationBd:function(t,e,o){var n=this;a.a.$http.get("http://api.map.baidu.com/geocoder/v2/?ak="+r.a+"&location="+t+","+e+"&output=json").then(function(t){a.a.$emit("format_location",t.body.result,r.b,o)}).catch(function(i){setTimeout(function(){n.getFormatLocationBd(t,e,o)},1e3)})},getFormatLocationGoogle:function(t,e,o){var n=this;a.a.$http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+t+","+e+"&key="+r.c).then(function(t){a.a.$emit("format_location",t.body.results,r.d,o)}).catch(function(i){setTimeout(function(){n.getFormatLocationGoogle(t,e,o)},1e3)})},stopRecLocation:function(){var t=this,e=this.getCurrentLocation();void 0!=e.latitude&&void 0!=e.longitude?0==c.GLOBAL.default.oversea?this.getFormatLocationBd(e.latitude,e.longitude,"stop"):this.getFormatLocationGoogle(e.latitude,e.longitude,"stop"):setTimeout(function(){t.stopRecLocation()},1e3)},pauseRecLocation:function(){},storageSetCurrentRecId:function(t){return this.storageGetCurrentRecId()||(""==t&&(t=s.a(r.e)),u.setItem(r.f,t)),this.storageGetCurrentRecId()},storageResetCurrentRecId:function(){u.setItem(r.f,"")},storageGetCurrentRecId:function(){return u.getItem(r.f)},parseStartEndAddress:function(t,e){var o={};switch(e){case r.b:o.formatted_address=t.formatted_address,o.addressComponent=t.addressComponent,o.source=r.b;break;case r.d:o.formatted_address=t[0].formatted_address,o.addressComponent=t[0].address_components,o.source=r.d}return o},storageSetStartEndAddress:function(t,e){var o=this.storageGetCurrentRecId();null==o&&(o=this.storageSetCurrentRecId(""));var n=u.getItem(r.g+o),a=[];null==n?a=[{data:t,type:e}]:(a=JSON.parse(n),a.push({data:t,type:e})),u.setItem(r.g+o,i()(a))},storageSetLocationRec:function(){var t=this.storageGetCurrentRecId(),e=this.pointListGet(),o=u.getItem(r.h+t);if(null!=o){var n=JSON.parse(o);if(n.length){var a=n[n.length-1].timestamp;for(var s in e)e[s].timestamp>a&&n.push(e[s]);u.setItem(r.h+t,i()(n))}else u.setItem(r.h+t,i()(e))}else u.setItem(r.h+t,i()(e))},storageSetRoadNote:function(t,e){var o=s.a(r.i),n=this.storageGetCurrentRecId(),a=(new Date).getTime(),c=this.getCurrentLocation();c.type="roadmap",c.roadmap_uuid=o,this.pointListPush(c);var l={text:t,piclist:e,timestamp:a,currentlocation:c},d=u.getItem(r.j+n);if(null!=d){var m=JSON.parse(d);m.length?(m.push(l),u.setItem(r.j+n,i()(m))):u.setItem(r.j+n,i()([l]))}else u.setItem(r.j+n,i()([l]))},storagePushUuidList:function(t){var e=(new Date).getTime(),o=u.getItem(r.k),n={uuid:t,timestamp:e};if(null!=o){var a=JSON.parse(o);for(var s in a)if(a[s]==t)return!1;a.push(n),u.setItem(r.k,i()(a))}else u.setItem(r.k,i()([n]))},storageGetLocationRecList:function(){var t=u.getItem(r.k),e=[];if(null!=t){var o=JSON.parse(t);for(var n in o){var i=0,a=u.getItem(r.h+o[n].uuid);if(null!=a){i=JSON.parse(a).length}var s=0,c="",l="",d=u.getItem(r.j+o[n].uuid);if(null!=d){var m=JSON.parse(d);for(var p in m)void 0!=m[p].piclist&&m[p].piclist.length&&(c=m[p].piclist[0].uri),l=m[p].text;s=m.length}var f="",h=u.getItem(r.g+o[n].uuid);if(null!=h){var v=JSON.parse(h);for(var g in v)"start"==v[g].type&&(f=v[g].data.formatted_address)}var _=new Date(o[n].timestamp),L=_.getFullYear()+"-",b=(_.getMonth()+1<10?"0"+(_.getMonth()+1):_.getMonth()+1)+"-",R=_.getDate()+" ",y=_.getHours()+":",C=_.getMinutes()+":",S=_.getSeconds();e.push({address:f,uuid:o[n].uuid,timestamp:L+b+R+y+C+S,location:i,roadnote:s,roadnote_pic:c,roadnote_text:l})}return e}return e}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={oversea:0}},function(t,e,o){"use strict";var n=o(1),i=o(41),a=o(4),r=o(31),s=o.n(r),c=o(34),u=o.n(c),l=o(33),d=o.n(l);n.default.use(i.a),e.a=new i.a({routes:[{path:a.a,component:s.a},{path:a.b,component:u.a},{path:a.c,component:d.a}]})},function(t,e){},function(t,e){},,,function(t,e,o){function n(t){o(26)}var i=o(0)(o(14),o(37),n,null,null);t.exports=i.exports},,function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(30),i=o.n(n);e.default={name:"app",data:function(){return{}},components:{Bottom:i.a}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(4);e.default={data:function(){return{locationNav:n.a,memoryNav:n.b,bottomNav:"",bottomNavColor:""}},mounted:function(){this.handleChange(n.a)},methods:{handleChange:function(t){this.bottomNav!=t&&(this.bottomNav=t,this.bottomNavColor=t,this.$router.push({path:t}))}}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(32),i=o.n(n),a=o(5),r=o(3);o(2);e.default={data:function(){return{locationRecSwitch:!1,rightTop:{horizontal:"right",vertical:"top"},popup:!1,roadNoteText:"",locationPicList:[],intervalSetLocationRec:0}},mounted:function(){a.a.addLocationLinstener()},methods:{startRecLocation:function(){this.locationRecSwitch=!0,r.a.$emit("switch_location_point_rec",!0),a.a.initRecLocation(),a.a.storageSetCurrentRecId(""),a.a.storagePushUuidList(a.a.storageGetCurrentRecId()),this.intervalSetLocationRec=setInterval(function(){a.a.storageSetLocationRec()},1e3)},stopRecLocation:function(){this.locationRecSwitch=!1,r.a.$emit("switch_location_point_rec",!1),a.a.stopRecLocation(),clearInterval(this.intervalSetLocationRec),a.a.storageSetLocationRec(),a.a.storageResetCurrentRecId()},openPopup:function(){this.popup=!0},sendLocateNote:function(){var t=[];if(this.locationPicList.length)for(var e in this.locationPicList)t.push({image:this.locationPicList[e].image,uri:this.locationPicList[e].uri});a.a.storageSetRoadNote(this.roadNoteText,this.locationPicList),this.closePopup()},closePopup:function(){this.roadNoteText="",this.locationPicList=[],this.popup=!1},setOptions:function(t){return{quality:100,destinationType:Camera.DestinationType.FILE_URI,sourceType:t,encodingType:Camera.EncodingType.JPEG,mediaType:Camera.MediaType.ALLMEDIA,allowEdit:!1,correctOrientation:!0}},openCamera:function(t){var e=Camera.PictureSourceType.CAMERA,o=this.setOptions(e),n=this;navigator.camera.getPicture(function(t){n.$data.locationPicList.push({image:t,uri:t})},function(t){console.debug("Unable to obtain picture: "+t,"app")},o)}},components:{BaiduMap:i.a}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(3);e.default={data:function(){return{center:{lng:0,lat:0},zoom:19,centerLocateSwitch:1,centerLocateTimeoutId:0,transRetry:0}},mounted:function(){setInterval(this.location,1e4);var t=this;document.addEventListener("deviceready",function(){cordova.plugins.backgroundMode.setDefaults({text:"星柚游记正在后台努力运行中～"}),cordova.plugins.backgroundMode.enable(),cordova.plugins.backgroundMode.onactivate=function(){},t.location()},!1)},methods:{syncCenterAndZoom:function(t){1==this.$data.centerLocateSwitch&&(this.$data.centerLocateSwitch=0,this.resetCenterLocate())},resetCenterLocate:function(){var t=this;0==this.$data.centerLocateSwitch&&(0!=this.$data.centerLocateTimeoutId&&clearTimeout(this.$data.centerLocateTimeoutId),this.$data.centerLocateTimeoutId=setTimeout(function(){t.$data.centerLocateSwitch=1},1e4))},setCenterLocate:function(t,e){(1==this.$data.centerLocateSwitch||0==this.$data.center.lat&&0==this.$data.center.lng)&&(this.$data.center.lat=t,this.$data.center.lng=e)},location:function(){var t=this;AdvancedGeolocation.start(function(e){try{var o=JSON.parse(e);switch(n.a.$emit("current_location",o),o.provider){case"gps":var i=new BMap.Point(o.longitude,o.latitude),a=new BMap.Convertor,r=[];r.push(i),0==t.GLOBAL.default.oversea?a.translate(r,1,5,function(e){0===e.status?(t.setCenterLocate(e.points[0].lat,e.points[0].lng),o.latitude=e.points[0].lat,o.longitude=e.points[0].lng,t.transRetry=0):(t.transRetry>=1&&(t.GLOBAL.default.oversea=1),t.transRetry++,t.setCenterLocate(o.latitude,o.longitude)),n.a.$emit("current_gps_location",o)}):(t.setCenterLocate(o.latitude,o.longitude),n.a.$emit("current_gps_location",o));break;case"network":var i=new BMap.Point(o.longitude,o.latitude),a=new BMap.Convertor,r=[];r.push(i),0==t.GLOBAL.default.oversea?a.translate(r,1,5,function(e){0===e.status?(t.setCenterLocate(e.points[0].lat,e.points[0].lng),o.latitude=e.points[0].lat,o.longitude=e.points[0].lng,t.transRetry=0):(t.transRetry++,t.transRetry>=2&&(t.GLOBAL.default.oversea=1),t.setCenterLocate(o.latitude,o.longitude)),n.a.$emit("current_network_location",o)}):(t.setCenterLocate(o.latitude,o.longitude),n.a.$emit("current_network_location",o))}return o}catch(t){}},function(t){},{minTime:0,minDistance:0,noWarn:!1,providers:"all",useCache:!0,satelliteData:!0,buffer:!0,bufferSize:10,signalStrength:!1})}}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(5);e.default={data:function(){return{locationRecList:null,refreshing:!1,trigger:null}},mounted:function(){this.trigger=this.$el,this.locationRecList=n.a.storageGetLocationRecList()},methods:{refreshMemory:function(){this.locationRecList=n.a.storageGetLocationRecList()},refresh:function(){var t=this;this.refreshing=!0,this.locationRecList=n.a.storageGetLocationRecList(),setTimeout(function(){t.refreshing=!1},500)}}}},function(t,e,o){"use strict";function n(t){return a[t]=i(16,16),a[t]}function i(t,e){var o="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),n=[],i=void 0;if(e=e||o.length,t)for(i=0;i<t;i++)n[i]=o[0|Math.random()*e];else{var a=void 0;for(n[8]=n[13]=n[18]=n[23]="-",n[14]="4",i=0;i<36;i++)n[i]||(a=0|16*Math.random(),n[i]=o[19==i?3&a|8:a])}return n.join("")}e.a=n;var a=[]},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(1),i=o(13),a=o(11),r=o.n(a),s=o(10),c=o.n(s),u=o(8),l=(o.n(u),o(9)),d=(o.n(l),o(12)),m=o.n(d),p=o(7),f=o(2),h=o(6);n.default.config.productionTip=!1,n.default.prototype.GLOBAL=h,n.default.use(c.a),n.default.use(i.a),n.default.use(r.a,{ak:f.a}),new n.default({el:"#app",router:p.a,template:"<App/>",components:{App:m.a}}),n.default.http.interceptors.push(function(t,e){t.credentials=!0,e()})},,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,o){var n=o(0)(o(15),o(36),null,null,null);t.exports=n.exports},function(t,e,o){function n(t){o(29)}var i=o(0)(o(16),o(40),n,null,null);t.exports=i.exports},function(t,e,o){function n(t){o(25)}var i=o(0)(o(17),o(35),n,null,null);t.exports=i.exports},function(t,e,o){function n(t){o(28)}var i=o(0)(o(18),o(39),n,null,null);t.exports=i.exports},function(t,e,o){function n(t){o(27)}var i=o(0)(o(19),o(38),n,null,null);t.exports=i.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("baidu-map",{attrs:{id:"map","scroll-wheel-zoom":!0,center:t.center,zoom:t.zoom},on:{moving:t.syncCenterAndZoom,moveend:t.syncCenterAndZoom,zoomend:t.syncCenterAndZoom}},[o("bm-marker",{attrs:{position:t.center,dragging:!0}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("mu-paper",[o("mu-bottom-nav",{attrs:{value:t.bottomNav,shift:""},on:{change:t.handleChange}},[o("mu-bottom-nav-item",{attrs:{value:t.locationNav,title:"路书",icon:"location_on"}}),t._v(" "),o("mu-bottom-nav-item",{attrs:{value:t.memoryNav,title:"记录",icon:"restore"}}),t._v(" "),o("mu-bottom-nav-item",{attrs:{value:"me",title:"我",icon:"favorite"}})],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("keep-alive",[o("router-view")],1),t._v(" "),o("bottom",{attrs:{id:"bottom"}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("mu-list",[o("mu-refresh-control",{attrs:{refreshing:t.refreshing,trigger:t.trigger},on:{refresh:t.refresh}}),t._v(" "),t._l(t.locationRecList,function(e,n){return o("div",[o("mu-list-item",{attrs:{title:e.address}},[""!=e.roadnote_pic?o("mu-avatar",{attrs:{src:e.roadnote_pic},slot:"leftAvatar"}):t._e(),t._v(" "),o("p",[t._v(t._s(e.roadnote_text)+" ")]),t._v(" "),o("span",{slot:"describe"},[o("span",[t._v("uuid - "+t._s(e.uuid))]),o("br"),t._v(" "),o("span",[t._v("time - "+t._s(e.timestamp)+" ")]),o("br"),t._v(" "),o("span",[t._v("路径点数量 - "+t._s(e.location)+" ")]),o("br"),t._v(" "),o("span",[t._v("路书数量 - "+t._s(e.roadnote)+" ")]),o("br")]),t._v(" "),o("mu-icon-menu",{attrs:{icon:"more_vert",tooltip:"操作"},slot:"right"},[o("mu-menu-item",{attrs:{title:"回复"}}),t._v(" "),o("mu-menu-item",{attrs:{title:"标记"}}),t._v(" "),o("mu-menu-item",{attrs:{title:"删除"}})],1)],1),t._v(" "),o("mu-divider",{attrs:{inset:""}})],1)}),t._v(" "),o("br"),o("br"),o("br"),o("br"),o("br"),o("br")],2)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"me"}},[o("mobile-tear-sheet",{attrs:{id:"me-info"}},[o("mu-list",[o("mu-list-item",{attrs:{title:"星辰"}},[o("mu-avatar",{attrs:{src:"./static/temp/8316449.jpg"},slot:"leftAvatar"}),t._v(" "),o("mu-icon",{attrs:{value:"chat_bubble"},slot:"right"})],1)],1)],1),t._v(" "),o("mu-divider"),t._v(" "),o("mobile-tear-sheet",[o("mu-list",[o("mu-list-item",{attrs:{title:"邀约"}},[o("mu-icon",{attrs:{value:"inbox"},slot:"left"})],1),t._v(" "),o("mu-list-item",{attrs:{title:"隐私"}},[o("mu-icon",{attrs:{value:"grade"},slot:"left"})],1),t._v(" "),o("mu-list-item",{attrs:{title:"设置"}},[o("mu-icon",{attrs:{value:"send"},slot:"left"})],1),t._v(" "),o("mu-list-item",{attrs:{title:"关于"}},[o("mu-icon",{attrs:{value:"drafts"},slot:"left"})],1)],1)],1),t._v(" "),o("mu-raised-button",{attrs:{id:"copyright",label:"©星柚游记 星辰 & 西柚 ALPHA",fullWidth:""}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"map"}},[o("BaiduMap"),t._v(" "),o("mu-float-button",{attrs:{icon:"add",mini:"",id:"location-float-button"}}),t._v(" "),o("mu-icon-menu",{attrs:{id:"location-menu",anchorOrigin:t.rightTop,targetOrigin:t.rightTop}},[t.locationRecSwitch?t._e():o("mu-menu-item",{attrs:{title:"开始记录"},on:{click:t.startRecLocation}}),t._v(" "),t.locationRecSwitch?o("mu-menu-item",{attrs:{title:"添加路书"},on:{click:t.openPopup}}):t._e(),t._v(" "),t.locationRecSwitch?o("mu-menu-item",{attrs:{title:"停止记录"},on:{click:t.stopRecLocation}}):t._e()],1),t._v(" "),t.locationRecSwitch?o("mu-popup",{attrs:{position:"bottom",popupClass:"popup-record-location",open:t.popup},on:{close:function(e){t.closePopup()}}},[o("mu-appbar",{attrs:{title:"添加路书"}},[o("mu-flat-button",{attrs:{label:"关闭",color:"white"},on:{click:function(e){t.closePopup()}},slot:"right"})],1),t._v(" "),o("mu-content-block",[o("mu-row",{attrs:{gutter:""}},[o("mu-text-field",{attrs:{hintText:"天気がいいから、散歩しましょう",multiLine:"",rows:3,rowsMax:6,fullWidth:""},model:{value:t.roadNoteText,callback:function(e){t.roadNoteText=e},expression:"roadNoteText"}})],1),t._v(" "),o("mu-row",{attrs:{gutter:""}},[o("mu-icon-button",{attrs:{id:"camera-icon",icon:"photo_camera"},on:{click:function(e){t.openCamera("")}}})],1),t._v(" "),o("div",{staticClass:"gridlist-location-pic"},[o("mu-grid-list",{staticClass:"gridlist-location-pic-list"},t._l(t.locationPicList,function(t,e){return o("mu-grid-tile",{key:e},[o("img",{attrs:{src:t.image,index:e,uri:t.uri}})])}))],1),t._v(" "),o("br"),t._v(" "),o("mu-row",{attrs:{gutter:""}},[o("mu-raised-button",{attrs:{label:"发送ヽ(✿ﾟ▽ﾟ)ノ",primary:"",fullWidth:""},on:{click:t.sendLocateNote}})],1)],1)],1):t._e()],1)},staticRenderFns:[]}},,,,function(t,e){}],[21]);
//# sourceMappingURL=app.7b75f786f5c238b6d447.js.map