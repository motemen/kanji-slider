(function(t){function e(e){for(var n,i,s=e[0],u=e[1],c=e[2],h=0,d=[];h<s.length;h++)i=s[h],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&d.push(a[i][0]),a[i]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(t[n]=u[n]);l&&l(e);while(d.length)d.shift()();return o.push.apply(o,c||[]),r()}function r(){for(var t,e=0;e<o.length;e++){for(var r=o[e],n=!0,s=1;s<r.length;s++){var u=r[s];0!==a[u]&&(n=!1)}n&&(o.splice(e--,1),t=i(i.s=r[0]))}return t}var n={},a={app:0},o=[];function i(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=n,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/kanji-slider/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var c=0;c<s.length;c++)e(s[c]);var l=u;o.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("cd49")},"5c0b":function(t,e,r){"use strict";var n=r("9c0c"),a=r.n(n);a.a},"9c0c":function(t,e,r){},cd49:function(t,e,r){"use strict";r.r(e);r("e623"),r("e379"),r("5dc8"),r("37e1");var n=r("2b0e"),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{attrs:{id:"app"}},[r("h1",[t._v("漢字スライダー")]),r("input",{attrs:{id:"input",type:"text","x-model":"text"},domProps:{value:t.$data.displayText},on:{input:function(e){t.text=e.target.value}}}),r("vue-slider",{attrs:{id:"slider",disabled:t.disabled},on:{change:t.updateText},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}),r("div",{attrs:{id:"share"}},[r("a",{attrs:{href:t.$data.shareURL,target:"_blank"}},[t._v("ツイートする")])])],1)])},o=[],i=(r("a4d3"),r("e01a"),r("d28b"),r("99af"),r("4de4"),r("a15b"),r("d81d"),r("a434"),r("d3b7"),r("e25e"),r("ac1f"),r("3ca3"),r("841c"),r("1276"),r("ddb0"),r("3835")),s=(r("96cf"),r("d4ec")),u=r("99de"),c=r("7e84"),l=r("262e"),h=r("9ab4"),d=r("60a3"),f=r("4971"),p=r.n(f),v=(r("8445"),r("4e82"),r("bee2")),m=function(){function t(e){if(Object(s["a"])(this,t),0===e.length)throw"items should no be empty";e=e.sort((function(t,e){return t.strokes-e.strokes})),this.min=e[0].strokes,this.max=e[e.length-1].strokes,this.total=e.length,this.itemsByStrokes={},this.itemByCharacter={};var r=[],n=!0,a=!1,o=void 0;try{for(var i,u=e[Symbol.iterator]();!(n=(i=u.next()).done);n=!0){var c=i.value;this.itemsByStrokes[c.strokes]||(this.itemsByStrokes[c.strokes]=[]),this.itemsByStrokes[c.strokes].push(c),this.itemByCharacter[c.character]=c,0===r.length||r[r.length-1].strokes!=c.strokes?r.push({strokes:c.strokes,count:1}):r[r.length-1].count++}}catch(l){a=!0,o=l}finally{try{n||null==u.return||u.return()}finally{if(a)throw o}}this.buckets=r}return Object(v["a"])(t,[{key:"rank",value:function(t){var e=this.buckets,r=this.min,n=this.max,a=this.total,o=(r+n)/2,i=n-o;t=o+(t-o)*(i+.5)/i;var s=0,u=!0,c=!1,l=void 0;try{for(var h,d=e[Symbol.iterator]();!(u=(h=d.next()).done);u=!0){var f=h.value;f.strokes<t&&(s+=f.count)}}catch(p){c=!0,l=p}finally{try{u||null==d.return||d.return()}finally{if(c)throw l}}return s/a*100}},{key:"strokes",value:function(t){var e=this.buckets,r=this.total;if(t/=100,0===t)return this.min;for(var n=0,a=0;a<e.length;a++){var o=e[a];if(n+=o.count,n/r>=t){var i=o.strokes;return a+1<e.length&&(i+=(e[a+1].strokes-e[a].strokes)/e[a+1].count*(n/r-t)),i}}return this.max}},{key:"strokesOfChar",value:function(t){return this.itemByCharacter[t]&&this.itemByCharacter[t].strokes}},{key:"charsOfStrokes",value:function(t){return this.itemsByStrokes[t].map((function(t){return t.character}))}}]),t}(),y=r("4328"),b=r.n(y),k=function(t){var e=0,r=!0,n=!1,a=void 0;try{for(var o,i=t[Symbol.iterator]();!(r=(o=i.next()).done);r=!0){var s=o.value;e+=s}}catch(u){n=!0,a=u}finally{try{r||null==i.return||i.return()}finally{if(n)throw a}}return e},g=function(t){return k(t)/t.filter((function(t){return null!==t})).length},x=function(t){function e(){return Object(s["a"])(this,e),Object(u["a"])(this,Object(c["a"])(e).apply(this,arguments))}return Object(l["a"])(e,t),e}(d["b"]);x=Object(h["a"])([Object(d["a"])({components:{VueSlider:p.a},data:function(){return{value:null,text:null,originalText:null,inputRanks:null,disabled:!1,histogram:null,shareURL:null}},mounted:function(){var t;return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(fetch("data.tsv").then((function(t){return t.text()})));case 2:t=e.sent,this.$data.histogram=new m(t.split(/\r?\n/).splice(1).filter((function(t){return t.length>0})).map((function(t){var e=t.split(/\t/),r=Object(i["a"])(e,2),n=r[0],a=r[1];return{character:a,strokes:parseInt(n)}}))),this.$data.originalText=this.$data.text=b.a.parse(location.search,{ignoreQueryPrefix:!0}).t||"餃子の王将";case 5:case"end":return e.stop()}}),null,this)},watch:{text:function(t){var e=this;this.$data.originalText=this.$data.displayText=t;var r=t.split(/(?:)/).map((function(t){return e.$data.histogram.strokesOfChar(t)})),n=!1;this.$data.inputRanks=r.map((function(t){return isNaN(t)?null:(n=!0,e.$data.histogram.rank(t))})),this.$data.disabled=!n,this.$data.value=Math.floor(g(this.$data.inputRanks)),this.$data.shareURL="https://twitter.com/intent/tweet?text=".concat(encodeURIComponent("".concat(this.$data.originalText," 👉 ").concat(this.$data.displayText)),"&url=").concat(encodeURIComponent(location.href)),history.replaceState(null,"","?t=".concat(encodeURIComponent(t)))}},methods:{updateText:function(){var t=this,e=this.$data.text.split(/(?:)/).map((function(e,r){var n=t.$data.histogram.strokesOfChar(e);if(!n)return e;var a=g(t.$data.inputRanks),o=t.$data.value,i=o+(t.$data.inputRanks[r]-o)*(o<a?o/a:(100-o)/(100-a)),s=Math.floor(t.$data.histogram.strokes(i)),u=t.$data.histogram.charsOfStrokes(s);return u[Math.floor(Math.random()*u.length)]})).join("");this.$data.displayText=e,this.$data.shareURL="https://twitter.com/intent/tweet?text=".concat(encodeURIComponent("".concat(this.$data.originalText," 👉 ").concat(this.$data.displayText)),"&url=").concat(encodeURIComponent(location.href))}}})],x);var $=x,O=$,w=(r("5c0b"),r("2877")),j=Object(w["a"])(O,a,o,!1,null,null,null),S=j.exports;n["default"].config.productionTip=!1,new n["default"]({render:function(t){return t(S)}}).$mount("#app")}});
//# sourceMappingURL=app.c442a7f2.js.map