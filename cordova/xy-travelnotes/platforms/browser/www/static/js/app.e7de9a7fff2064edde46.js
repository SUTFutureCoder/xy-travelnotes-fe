webpackJsonp([0],[,,function(t,e,n){"use strict";var o=n(0),r=n(21),a=n(12),u=n(17),c=n.n(u);o.default.use(r.a),e.a=new r.a({routes:[{path:a.a,component:c.a}]})},function(t,e){},function(t,e){},,,function(t,e,n){function o(t){n(14)}var r=n(1)(n(9),n(19),o,null,null);t.exports=r.exports},,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(16),r=n.n(o);e.default={name:"app",data:function(){return{}},components:{Bottom:r.a}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{bottomNav:"nearby",bottomNavColor:"nearby"}},methods:{handleChange:function(t){this.bottomNav=t}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{center:{lng:116.318859,lat:40.041067},zoom:19}},mounted:function(){navigator.geolocation.getCurrentPosition(this.geoOnSuccess,this.geoOnError)},methods:{syncCenterAndZoom:function(t){var e=t.target.getCenter(),n=e.lng,o=e.lat;console.log(n),console.log(o),console.log(t.target.getZoom()),navigator.geolocation.getCurrentPosition(this.geoOnSuccess,this.geoOnError,{enableHighAccuracy:!0,timeout:1e3,maximumAge:3e3})},geoOnSuccess:function(t){alert("Latitude: "+t.coords.latitude+"\nLongitude: "+t.coords.longitude+"\nAltitude: "+t.coords.altitude+"\nAccuracy: "+t.coords.accuracy+"\nAltitude Accuracy: "+t.coords.altitudeAccuracy+"\nHeading: "+t.coords.heading+"\nSpeed: "+t.coords.speed+"\nTimestamp: "+t.timestamp+"\n")},geoOnError:function(t){alert("code: "+t.code+"\nmessage: "+t.message+"\n")}}}},function(t,e,n){"use strict";n.d(e,"a",function(){return o});var o="/"},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=n(8),a=n(6),u=n.n(a),c=n(5),i=n.n(c),s=n(3),l=(n.n(s),n(4)),d=(n.n(l),n(7)),m=n.n(d),f=n(2);o.default.config.productionTip=!1,o.default.use(i.a),o.default.use(r.a),o.default.use(u.a,{ak:"AaXe3HZ8ouvnNXwQKTeaVWGB7zao07C6"}),new o.default({el:"#app",router:f.a,template:"<App/>",components:{App:m.a}}),o.default.http.interceptors.push(function(t,e){t.credentials=!0,e()})},function(t,e){},function(t,e){},function(t,e,n){var o=n(1)(n(10),n(18),null,null,null);t.exports=o.exports},function(t,e,n){function o(t){n(15)}var r=n(1)(n(11),n(20),o,null,null);t.exports=r.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("mu-paper",[n("mu-bottom-nav",{attrs:{value:t.bottomNav,shift:""},on:{change:t.handleChange}},[n("mu-bottom-nav-item",{attrs:{value:"recents",title:"Recents",icon:"restore"}}),t._v(" "),n("mu-bottom-nav-item",{attrs:{value:"favorites",title:"Favorites",icon:"favorite"}}),t._v(" "),n("mu-bottom-nav-item",{attrs:{value:"nearby",title:"Nearby",icon:"location_on"}})],1)],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view"),t._v(" "),n("bottom",{attrs:{id:"bottom"}})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("baidu-map",{attrs:{id:"map","scroll-wheel-zoom":!0,center:t.center,zoom:t.zoom},on:{moving:t.syncCenterAndZoom,moveend:t.syncCenterAndZoom,zoomend:t.syncCenterAndZoom}})},staticRenderFns:[]}},,,,function(t,e){}],[13]);
//# sourceMappingURL=app.e7de9a7fff2064edde46.js.map