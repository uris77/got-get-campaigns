/*
 AngularJS v1.2.9
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(){var f=this,a=f._,c={},e=Array.prototype,m=Object.prototype,k=e.push,g=e.slice,h=e.concat,s=m.toString,M=m.hasOwnProperty,n=e.forEach,p=e.map,w=e.reduce,z=e.reduceRight,A=e.filter,u=e.every,t=e.some,v=e.indexOf,B=e.lastIndexOf,m=Array.isArray,C=Object.keys,x=Function.prototype.bind,b=function(d){if(d instanceof b)return d;if(!(this instanceof b))return new b(d);this._wrapped=d};"undefined"!==typeof exports?("undefined"!==typeof module&&module.exports&&(exports=module.exports=b),exports._=
b):f._=b;b.VERSION="1.5.2";var q=b.each=b.forEach=function(d,l,a){if(null!=d)if(n&&d.forEach===n)d.forEach(l,a);else if(d.length===+d.length)for(var r=0,e=d.length;r<e&&l.call(a,d[r],r,d)!==c;r++);else for(var g=b.keys(d),r=0,e=g.length;r<e&&l.call(a,d[g[r]],g[r],d)!==c;r++);};b.map=b.collect=function(d,l,b){var a=[];if(null==d)return a;if(p&&d.map===p)return d.map(l,b);q(d,function(d,c,e){a.push(l.call(b,d,c,e))});return a};b.reduce=b.foldl=b.inject=function(d,l,a,r){var c=2<arguments.length;null==
d&&(d=[]);if(w&&d.reduce===w)return r&&(l=b.bind(l,r)),c?d.reduce(l,a):d.reduce(l);q(d,function(d,b,e){c?a=l.call(r,a,d,b,e):(a=d,c=!0)});if(!c)throw new TypeError("Reduce of empty array with no initial value");return a};b.reduceRight=b.foldr=function(d,l,a,c){var e=2<arguments.length;null==d&&(d=[]);if(z&&d.reduceRight===z)return c&&(l=b.bind(l,c)),e?d.reduceRight(l,a):d.reduceRight(l);var g=d.length;if(g!==+g)var E=b.keys(d),g=E.length;q(d,function(b,h,f){h=E?E[--g]:--g;e?a=l.call(c,a,d[h],h,f):
(a=d[h],e=!0)});if(!e)throw new TypeError("Reduce of empty array with no initial value");return a};b.find=b.detect=function(d,b,a){var c;K(d,function(d,e,g){if(b.call(a,d,e,g))return c=d,!0});return c};b.filter=b.select=function(d,b,a){var c=[];if(null==d)return c;if(A&&d.filter===A)return d.filter(b,a);q(d,function(d,e,g){b.call(a,d,e,g)&&c.push(d)});return c};b.reject=function(d,l,a){return b.filter(d,function(d,b,c){return!l.call(a,d,b,c)},a)};b.every=b.all=function(d,l,a){l||(l=b.identity);var r=
!0;if(null==d)return r;if(u&&d.every===u)return d.every(l,a);q(d,function(d,b,e){if(!(r=r&&l.call(a,d,b,e)))return c});return!!r};var K=b.some=b.any=function(d,l,a){l||(l=b.identity);var e=!1;if(null==d)return e;if(t&&d.some===t)return d.some(l,a);q(d,function(d,b,g){if(e||(e=l.call(a,d,b,g)))return c});return!!e};b.contains=b.include=function(d,b){return null==d?!1:v&&d.indexOf===v?-1!=d.indexOf(b):K(d,function(d){return d===b})};b.invoke=function(d,l){var a=g.call(arguments,2),c=b.isFunction(l);
return b.map(d,function(d){return(c?l:d[l]).apply(d,a)})};b.pluck=function(d,a){return b.map(d,function(d){return d[a]})};b.where=function(d,a,y){return b.isEmpty(a)?y?void 0:[]:b[y?"find":"filter"](d,function(d){for(var b in a)if(a[b]!==d[b])return!1;return!0})};b.findWhere=function(d,a){return b.where(d,a,!0)};b.max=function(d,a,y){if(!a&&b.isArray(d)&&d[0]===+d[0]&&65535>d.length)return Math.max.apply(Math,d);if(!a&&b.isEmpty(d))return-Infinity;var c={computed:-Infinity,value:-Infinity};q(d,function(d,
b,e){b=a?a.call(y,d,b,e):d;b>c.computed&&(c={value:d,computed:b})});return c.value};b.min=function(d,a,y){if(!a&&b.isArray(d)&&d[0]===+d[0]&&65535>d.length)return Math.min.apply(Math,d);if(!a&&b.isEmpty(d))return Infinity;var c={computed:Infinity,value:Infinity};q(d,function(d,b,e){b=a?a.call(y,d,b,e):d;b<c.computed&&(c={value:d,computed:b})});return c.value};b.shuffle=function(d){var a,c=0,e=[];q(d,function(d){a=b.random(c++);e[c-1]=e[a];e[a]=d});return e};b.sample=function(d,a,c){return 2>arguments.length||
c?d[b.random(d.length-1)]:b.shuffle(d).slice(0,Math.max(0,a))};var F=function(d){return b.isFunction(d)?d:function(b){return b[d]}};b.sortBy=function(d,a,c){var e=F(a);return b.pluck(b.map(d,function(d,b,a){return{value:d,index:b,criteria:e.call(c,d,b,a)}}).sort(function(d,b){var a=d.criteria,l=b.criteria;if(a!==l){if(a>l||void 0===a)return 1;if(a<l||void 0===l)return-1}return d.index-b.index}),"value")};var G=function(d){return function(a,c,e){var g={},h=null==c?b.identity:F(c);q(a,function(b,c){var y=
h.call(e,b,c,a);d(g,y,b)});return g}};b.groupBy=G(function(d,a,c){(b.has(d,a)?d[a]:d[a]=[]).push(c)});b.indexBy=G(function(d,b,a){d[b]=a});b.countBy=G(function(d,a){b.has(d,a)?d[a]++:d[a]=1});b.sortedIndex=function(d,a,c,e){c=null==c?b.identity:F(c);a=c.call(e,a);for(var g=0,h=d.length;g<h;){var f=g+h>>>1;c.call(e,d[f])<a?g=f+1:h=f}return g};b.toArray=function(d){return d?b.isArray(d)?g.call(d):d.length===+d.length?b.map(d,b.identity):b.values(d):[]};b.size=function(d){return null==d?0:d.length===
+d.length?d.length:b.keys(d).length};b.first=b.head=b.take=function(d,a,b){return null==d?void 0:null==a||b?d[0]:g.call(d,0,a)};b.initial=function(d,a,b){return g.call(d,0,d.length-(null==a||b?1:a))};b.last=function(d,a,b){return null==d?void 0:null==a||b?d[d.length-1]:g.call(d,Math.max(d.length-a,0))};b.rest=b.tail=b.drop=function(d,a,b){return g.call(d,null==a||b?1:a)};b.compact=function(d){return b.filter(d,b.identity)};var L=function(d,a,c){if(a&&b.every(d,b.isArray))return h.apply(c,d);q(d,function(d){b.isArray(d)||
b.isArguments(d)?a?k.apply(c,d):L(d,a,c):c.push(d)});return c};b.flatten=function(d,a){return L(d,a,[])};b.without=function(d){return b.difference(d,g.call(arguments,1))};b.uniq=b.unique=function(d,a,c,e){b.isFunction(a)&&(e=c,c=a,a=!1);c=c?b.map(d,c,e):d;var g=[],h=[];q(c,function(c,e){(a?e&&h[h.length-1]===c:b.contains(h,c))||(h.push(c),g.push(d[e]))});return g};b.union=function(){return b.uniq(b.flatten(arguments,!0))};b.intersection=function(d){var a=g.call(arguments,1);return b.filter(b.uniq(d),
function(d){return b.every(a,function(a){return 0<=b.indexOf(a,d)})})};b.difference=function(d){var a=h.apply(e,g.call(arguments,1));return b.filter(d,function(d){return!b.contains(a,d)})};b.zip=function(){for(var d=b.max(b.pluck(arguments,"length").concat(0)),a=Array(d),c=0;c<d;c++)a[c]=b.pluck(arguments,""+c);return a};b.object=function(d,a){if(null==d)return{};for(var b={},c=0,e=d.length;c<e;c++)a?b[d[c]]=a[c]:b[d[c][0]]=d[c][1];return b};b.indexOf=function(d,a,c){if(null==d)return-1;var e=0,g=
d.length;if(c)if("number"==typeof c)e=0>c?Math.max(0,g+c):c;else return e=b.sortedIndex(d,a),d[e]===a?e:-1;if(v&&d.indexOf===v)return d.indexOf(a,c);for(;e<g;e++)if(d[e]===a)return e;return-1};b.lastIndexOf=function(d,a,b){if(null==d)return-1;var c=null!=b;if(B&&d.lastIndexOf===B)return c?d.lastIndexOf(a,b):d.lastIndexOf(a);for(b=c?b:d.length;b--;)if(d[b]===a)return b;return-1};b.range=function(d,a,b){1>=arguments.length&&(a=d||0,d=0);b=arguments[2]||1;for(var c=Math.max(Math.ceil((a-d)/b),0),e=0,
g=Array(c);e<c;)g[e++]=d,d+=b;return g};var H=function(){};b.bind=function(d,a){var c,e;if(x&&d.bind===x)return x.apply(d,g.call(arguments,1));if(!b.isFunction(d))throw new TypeError;c=g.call(arguments,2);return e=function(){if(!(this instanceof e))return d.apply(a,c.concat(g.call(arguments)));H.prototype=d.prototype;var b=new H;H.prototype=null;var h=d.apply(b,c.concat(g.call(arguments)));return Object(h)===h?h:b}};b.partial=function(d){var a=g.call(arguments,1);return function(){return d.apply(this,
a.concat(g.call(arguments)))}};b.bindAll=function(d){var a=g.call(arguments,1);if(0===a.length)throw Error("bindAll must be passed function names");q(a,function(a){d[a]=b.bind(d[a],d)});return d};b.memoize=function(d,a){var c={};a||(a=b.identity);return function(){var e=a.apply(this,arguments);return b.has(c,e)?c[e]:c[e]=d.apply(this,arguments)}};b.delay=function(d,a){var b=g.call(arguments,2);return setTimeout(function(){return d.apply(null,b)},a)};b.defer=function(d){return b.delay.apply(b,[d,1].concat(g.call(arguments,
1)))};b.throttle=function(d,a,b){var c,e,g,h=null,f=0;b||(b={});var k=function(){f=!1===b.leading?0:new Date;h=null;g=d.apply(c,e)};return function(){var m=new Date;f||!1!==b.leading||(f=m);var s=a-(m-f);c=this;e=arguments;0>=s?(clearTimeout(h),h=null,f=m,g=d.apply(c,e)):h||!1===b.trailing||(h=setTimeout(k,s));return g}};b.debounce=function(d,a,b){var c,e,g,h,f;return function(){g=this;e=arguments;h=new Date;var m=function(){var k=new Date-h;k<a?c=setTimeout(m,a-k):(c=null,b||(f=d.apply(g,e)))},k=
b&&!c;c||(c=setTimeout(m,a));k&&(f=d.apply(g,e));return f}};b.once=function(d){var a=!1,b;return function(){if(a)return b;a=!0;b=d.apply(this,arguments);d=null;return b}};b.wrap=function(d,a){return function(){var b=[d];k.apply(b,arguments);return a.apply(this,b)}};b.compose=function(){var d=arguments;return function(){for(var a=arguments,b=d.length-1;0<=b;b--)a=[d[b].apply(this,a)];return a[0]}};b.after=function(d,a){return function(){if(1>--d)return a.apply(this,arguments)}};b.keys=C||function(d){if(d!==
Object(d))throw new TypeError("Invalid object");var a=[],c;for(c in d)b.has(d,c)&&a.push(c);return a};b.values=function(d){for(var a=b.keys(d),c=a.length,e=Array(c),g=0;g<c;g++)e[g]=d[a[g]];return e};b.pairs=function(d){for(var a=b.keys(d),c=a.length,e=Array(c),g=0;g<c;g++)e[g]=[a[g],d[a[g]]];return e};b.invert=function(d){for(var a={},c=b.keys(d),e=0,g=c.length;e<g;e++)a[d[c[e]]]=c[e];return a};b.functions=b.methods=function(d){var a=[],c;for(c in d)b.isFunction(d[c])&&a.push(c);return a.sort()};
b.extend=function(d){q(g.call(arguments,1),function(a){if(a)for(var b in a)d[b]=a[b]});return d};b.pick=function(d){var a={},b=h.apply(e,g.call(arguments,1));q(b,function(b){b in d&&(a[b]=d[b])});return a};b.omit=function(d){var a={},c=h.apply(e,g.call(arguments,1)),f;for(f in d)b.contains(c,f)||(a[f]=d[f]);return a};b.defaults=function(d){q(g.call(arguments,1),function(a){if(a)for(var b in a)void 0===d[b]&&(d[b]=a[b])});return d};b.clone=function(d){return b.isObject(d)?b.isArray(d)?d.slice():b.extend({},
d):d};b.tap=function(d,a){a(d);return d};var I=function(d,a,c,e){if(d===a)return 0!==d||1/d==1/a;if(null==d||null==a)return d===a;d instanceof b&&(d=d._wrapped);a instanceof b&&(a=a._wrapped);var g=s.call(d);if(g!=s.call(a))return!1;switch(g){case "[object String]":return d==String(a);case "[object Number]":return d!=+d?a!=+a:0==d?1/d==1/a:d==+a;case "[object Date]":case "[object Boolean]":return+d==+a;case "[object RegExp]":return d.source==a.source&&d.global==a.global&&d.multiline==a.multiline&&
d.ignoreCase==a.ignoreCase}if("object"!=typeof d||"object"!=typeof a)return!1;for(var h=c.length;h--;)if(c[h]==d)return e[h]==a;var h=d.constructor,f=a.constructor;if(h!==f&&!(b.isFunction(h)&&h instanceof h&&b.isFunction(f)&&f instanceof f))return!1;c.push(d);e.push(a);h=0;f=!0;if("[object Array]"==g){if(h=d.length,f=h==a.length)for(;h--&&(f=I(d[h],a[h],c,e)););}else{for(var k in d)if(b.has(d,k)&&(h++,!(f=b.has(a,k)&&I(d[k],a[k],c,e))))break;if(f){for(k in a)if(b.has(a,k)&&!h--)break;f=!h}}c.pop();
e.pop();return f};b.isEqual=function(a,b){return I(a,b,[],[])};b.isEmpty=function(a){if(null==a)return!0;if(b.isArray(a)||b.isString(a))return 0===a.length;for(var c in a)if(b.has(a,c))return!1;return!0};b.isElement=function(a){return!(!a||1!==a.nodeType)};b.isArray=m||function(a){return"[object Array]"==s.call(a)};b.isObject=function(a){return a===Object(a)};q("Arguments Function String Number Date RegExp".split(" "),function(a){b["is"+a]=function(b){return s.call(b)=="[object "+a+"]"}});b.isArguments(arguments)||
(b.isArguments=function(a){return!(!a||!b.has(a,"callee"))});"function"!==typeof/./&&(b.isFunction=function(a){return"function"===typeof a});b.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))};b.isNaN=function(a){return b.isNumber(a)&&a!=+a};b.isBoolean=function(a){return!0===a||!1===a||"[object Boolean]"==s.call(a)};b.isNull=function(a){return null===a};b.isUndefined=function(a){return void 0===a};b.has=function(a,b){return M.call(a,b)};b.noConflict=function(){f._=a;return this};b.identity=
function(a){return a};b.times=function(a,b,c){for(var e=Array(Math.max(0,a)),g=0;g<a;g++)e[g]=b.call(c,g);return e};b.random=function(a,b){null==b&&(b=a,a=0);return a+Math.floor(Math.random()*(b-a+1))};var D={escape:{"\x26":"\x26amp;","\x3c":"\x26lt;","\x3e":"\x26gt;",'"':"\x26quot;","'":"\x26#x27;"}};D.unescape=b.invert(D.escape);var N={escape:RegExp("["+b.keys(D.escape).join("")+"]","g"),unescape:RegExp("("+b.keys(D.unescape).join("|")+")","g")};b.each(["escape","unescape"],function(a){b[a]=function(b){return null==
b?"":(""+b).replace(N[a],function(b){return D[a][b]})}});b.result=function(a,c){if(null!=a){var e=a[c];return b.isFunction(e)?e.call(a):e}};b.mixin=function(a){q(b.functions(a),function(c){var e=b[c]=a[c];b.prototype[c]=function(){var a=[this._wrapped];k.apply(a,arguments);a=e.apply(b,a);return this._chain?b(a).chain():a}})};var O=0;b.uniqueId=function(a){var b=++O+"";return a?a+b:b};b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var J=/(.)^/,
P={"'":"'","\\":"\\","\r":"r","\n":"n","\t":"t","\u2028":"u2028","\u2029":"u2029"},Q=/\\|'|\r|\n|\t|\u2028|\u2029/g;b.template=function(a,c,e){var g;e=b.defaults({},e,b.templateSettings);var h=RegExp([(e.escape||J).source,(e.interpolate||J).source,(e.evaluate||J).source].join("|")+"|$","g"),f=0,k="__p+\x3d'";a.replace(h,function(b,c,e,g,h){k+=a.slice(f,h).replace(Q,function(a){return"\\"+P[a]});c&&(k+="'+\n((__t\x3d("+c+"))\x3d\x3dnull?'':_.escape(__t))+\n'");e&&(k+="'+\n((__t\x3d("+e+"))\x3d\x3dnull?'':__t)+\n'");
g&&(k+="';\n"+g+"\n__p+\x3d'");f=h+b.length;return b});k+="';\n";e.variable||(k="with(obj||{}){\n"+k+"}\n");k="var __t,__p\x3d'',__j\x3dArray.prototype.join,print\x3dfunction(){__p+\x3d__j.call(arguments,'');};\n"+k+"return __p;\n";try{g=new Function(e.variable||"obj","_",k)}catch(m){throw m.source=k,m;}if(c)return g(c,b);c=function(a){return g.call(this,a,b)};c.source="function("+(e.variable||"obj")+"){\n"+k+"}";return c};b.chain=function(a){return b(a).chain()};b.mixin(b);q("pop push reverse shift sort splice unshift".split(" "),
function(a){var c=e[a];b.prototype[a]=function(){var e=this._wrapped;c.apply(e,arguments);"shift"!=a&&"splice"!=a||0!==e.length||delete e[0];return this._chain?b(e).chain():e}});q(["concat","join","slice"],function(a){var c=e[a];b.prototype[a]=function(){var a=c.apply(this._wrapped,arguments);return this._chain?b(a).chain():a}});b.extend(b.prototype,{chain:function(){this._chain=!0;return this},value:function(){return this._wrapped}})}).call(this);
(function(f,a,c){function e(c,e,h){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(f,m,n,p,w){function z(){u&&(u.$destroy(),u=null);t&&(h.leave(t),t=null)}function A(){var n=c.current&&c.current.locals;if(a.isDefined(n&&n.$template)){var n=f.$new(),p=c.current;t=w(n,function(b){h.enter(b,null,t||m,function(){!a.isDefined(v)||v&&!f.$eval(v)||e()});z()});u=p.scope=n;u.$emit("$viewContentLoaded");u.$eval(B)}else z()}var u,t,v=n.autoscroll,B=n.onload||"";f.$on("$routeChangeSuccess",
A);A()}}}function m(a,c,e){return{restrict:"ECA",priority:-400,link:function(f,m){var n=e.current,p=n.locals;m.html(p.$template);var w=a(m.contents());n.controller&&(p.$scope=f,p=c(n.controller,p),n.controllerAs&&(f[n.controllerAs]=p),m.data("$ngControllerController",p),m.children().data("$ngControllerController",p));w(f)}}}f=a.module("ngRoute",["ng"]).provider("$route",function(){function c(e,g){return a.extend(new (a.extend(function(){},{prototype:e})),g)}function e(a,c){var g=c.caseInsensitiveMatch,
h={originalPath:a,regexp:a},f=h.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?|\*])?/g,function(a,c,e,g){a="?"===g?g:null;g="*"===g?g:null;f.push({name:e,optional:!!a});c=c||"";return""+(a?"":c)+"(?:"+(a?c:"")+(g&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");h.regexp=RegExp("^"+a+"$",g?"i":"");return h}var h={};this.when=function(c,f){h[c]=a.extend({reloadOnSearch:!0},f,c&&e(c,f));if(c){var k="/"==c[c.length-1]?c.substr(0,c.length-1):c+"/";h[k]=a.extend({redirectTo:c},
e(k,f))}return this};this.otherwise=function(a){this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$http","$templateCache","$sce",function(e,g,f,m,w,z,A,u){function t(){var b=v(),c=x.current;if(b&&c&&b.$$route===c.$$route&&a.equals(b.pathParams,c.pathParams)&&!b.reloadOnSearch&&!C)c.params=b.params,a.copy(c.params,f),e.$broadcast("$routeUpdate",c);else if(b||c)C=!1,e.$broadcast("$routeChangeStart",b,c),(x.current=b)&&b.redirectTo&&(a.isString(b.redirectTo)?
g.path(B(b.redirectTo,b.params)).search(b.params).replace():g.url(b.redirectTo(b.pathParams,g.path(),g.search())).replace()),m.when(b).then(function(){if(b){var c=a.extend({},b.resolve),e,g;a.forEach(c,function(b,e){c[e]=a.isString(b)?w.get(b):w.invoke(b)});a.isDefined(e=b.template)?a.isFunction(e)&&(e=e(b.params)):a.isDefined(g=b.templateUrl)&&(a.isFunction(g)&&(g=g(b.params)),g=u.getTrustedResourceUrl(g),a.isDefined(g)&&(b.loadedTemplateUrl=g,e=z.get(g,{cache:A}).then(function(a){return a.data})));
a.isDefined(e)&&(c.$template=e);return m.all(c)}}).then(function(g){b==x.current&&(b&&(b.locals=g,a.copy(b.params,f)),e.$broadcast("$routeChangeSuccess",b,c))},function(a){b==x.current&&e.$broadcast("$routeChangeError",b,c,a)})}function v(){var b,e;a.forEach(h,function(h,f){var m;if(m=!e){var s=g.path();m=h.keys;var n={};if(h.regexp)if(s=h.regexp.exec(s)){for(var p=1,u=s.length;p<u;++p){var t=m[p-1],v="string"==typeof s[p]?decodeURIComponent(s[p]):s[p];t&&v&&(n[t.name]=v)}m=n}else m=null;else m=null;
m=b=m}m&&(e=c(h,{params:a.extend({},g.search(),b),pathParams:b}),e.$$route=h)});return e||h[null]&&c(h[null],{params:{},pathParams:{}})}function B(b,c){var e=[];a.forEach((b||"").split(":"),function(a,b){if(0===b)e.push(a);else{var g=a.match(/(\w+)(.*)/),h=g[1];e.push(c[h]);e.push(g[2]||"");delete c[h]}});return e.join("")}var C=!1,x={routes:h,reload:function(){C=!0;e.$evalAsync(t)}};e.$on("$locationChangeSuccess",t);return x}]});f.provider("$routeParams",function(){this.$get=function(){return{}}});
f.directive("ngView",e);f.directive("ngView",m);e.$inject=["$route","$anchorScroll","$animate"];m.$inject=["$compile","$controller","$route"]})(window,window.angular);(function(f){f.module("url_utils",[]).factory("urlUtils",["$window","$location",function(a,c){return{redirectHome:function(){a.location.href="http://"+c.host()+":"+c.port()}}}])})(angular);utils={isNumber:function(f){var a=parseInt(f.trim());return!_.isUndefined(f)&&!_.isEmpty(f.trim())&&(0<a||0>a)&&_.isNumber(a)}};
(function(f){f.module("OutletSurveyService",[]).factory("OutletSurveyService",["$http",function(a){return{fetchSurveys:function(c){return a.get("/api/outletSurveys/"+c+"/hotspot")},createSurvey:function(c,e){return a.post("/api/outletSurveys/"+c,e)}}}])})(angular);
(function(f){var a={create:"/api/surveys",list:"/api/surveys",getById:function(a){return"/api/surveys/"+a}};f.module("surveys.list",[]).config(["$stateProvider",function(a){a.state("surveys",{url:"surveys",templateUrl:"/surveys/index.html"}).state("surveys.list",{url:"/list",templateUrl:"/surveys/list.html",controller:"SurveysListController"}).state("surveys.show",{url:"/:id",templateUrl:"/surveys/show.html",controller:"SurveyShowController"})}]).factory("SurveyRepositoryService",["$http",function(c){return{list:function(){return c.get(a.list)},
fetch:function(e){return c.get(a.getById(e))}}}]).controller("SurveysListController",["$scope","urlUtils","SurveyRepositoryService",function(a,e,f){console.log("List Controller");f.list().success(function(e){a.surveys=e}).error(function(a,c,h){401==c&&e.redirectHome();console.error("ERROR: ",a)})}]).controller("SurveyShowController",["$scope","$stateParams","urlUtils","SurveyRepositoryService",function(a,e,f,k){k.fetch(e.id).success(function(e){a.survey=e.survey;a.locations=e.locations}).error(function(a,
c,e){console.error("ERROR: ",a);401==c&&f.redirectHome()})}])})(angular);
(function(f){var a={apiUrls:{create:"/api/surveys",list:"/api/surveys",getById:function(a){return"/api/surveys/"+a}},isYear:function(a){return utils.isNumber(a)&&2010<parseInt(a)&&2030>parseInt(a)},validateSurveyForm:function(c,e){var f=[];a.isYear(e)||f.push("Year: Provide a valid year! (E.g. 2014)");_.isUndefined(c)&&f.push("Month: Select a month.");return f}};f.module("surveys.create",[]).config(["$stateProvider",function(a){a.state("surveysCreate",{url:"/surveys/create",templateUrl:"/surveys/create.html",
controller:"SurveysCreateController"})}]).factory("CreateSurveyService",["$http",function(c){return{create:function(e){return c.post(a.apiUrls.create,e)}}}]).controller("SurveysCreateController",["$scope","$state","urlUtils","CreateSurveyService",function(c,e,f,k){c.months=[{name:"January"},{name:"February"},{name:"March"},{name:"April"},{name:"May"},{name:"June"},{name:"July"},{name:"August"},{name:"September"},{name:"October"},{name:"November"},{name:"December"}];c.submit=function(){var g=a.validateSurveyForm(c.month,
c.year);0<g.length?c.errors=g:k.create({month:c.month.name,year:c.year}).success(function(){e.transitionTo("surveys.list")}).error(function(a,e){c.errors=a.errors;401==e&&f.redirectHome()})}}])})(angular);(function(f){angular.module("surveys",["surveys.list","surveys.create"])})(angular);
(function(f){function a(a){var e=[];(_.isUndefined(a.name)||_.isEmpty(a.name.trim()))&&e.push("Name: provide a name for the location.");_.isUndefined(a.district)&&e.push("District: select a district.");_.isUndefined(a.locationType)&&e.push("Type of location: select what type of outlet this location is.");_.isUndefined(a.loc)?(e.push("Latitude: specify the latitude."),e.push("Longitude: specify the longitude.")):(!_.isUndefined(a.loc.lon)&&utils.isNumber(a.loc.lon)||e.push("Longitude: specify a valid longitude"),
!_.isUndefined(a.loc.lat)&&utils.isNumber(a.loc.lat)||e.push("Latitude: specify a valid latitude."));return e}f.module("location.create",[]).factory("LocationCreateService",["$http",function(a){return{create:function(e){return a.post("/api/locations",e)}}}]).controller("LocationCreateController",["$scope","$state","urlUtils","LocationCreateService",function(c,e,f,k){c.districts=[{name:"Corozal"},{name:"Orange Walk"},{name:"Belize"},{name:"Cayo"},{name:"Stann Creek"},{name:"Toledo"}];c.locationTypes=
[{name:"Traditional"},{name:"Non-Traditional"},{name:"Hotspot"}];c.submit=function(){var g={name:c.name,district:c.district?c.district.name:void 0,locationType:c.locationType?c.locationType.name:void 0,loc:{lon:c.longitude,lat:c.latitude}},h=a(g);0<h.length?c.errors=h:k.create(g).success(function(){e.transitionTo("locations.list")}).error(function(a,e){c.errors=a.errors;401==e&&f.redirectHome()})}}])})(angular);
(function(f){f.module("locations.list",[]).factory("LocationListService",["$http",function(a){return{list:function(){return a.get("/api/locations")},search:function(c){return a.get("/api/locations/search?locationName\x3d"+c)}}}]).controller("LocationListController",["$scope","urlUtils","LocationListService",function(a,c,e){e.list().success(function(c){a.locations=c}).error(function(a,e){console.error("ERROR: ",a);401==e&&c.redirectHome()});a.search=function(f){e.search(f).success(function(c){a.locations=
c}).error(function(a,e){console.error("Error executing search: ",a);401==e&&c.redirectHome()})}}])})(angular);
(function(f){f.module("locations.details",[]).factory("LocationSurveysGateway",["$http",function(a){return{fetchDetails:function(c){return a.get("/api/locations/"+c)}}}]).controller("LocationDetailsController",["$scope","$stateParams","urlUtils","LocationSurveysGateway",function(a,c,e,f){a.summary=!0;a.locationId=c.locationId;f.fetchDetails(a.locationId).success(function(c){a.surveys=c.surveys;a.location=c.location}).error(function(a,c){401==c?e.redirectHome():(alert("An error occurred fetching the data from the server!"),
console.error("ERROR fetching data: ",a))});a.showMore=function(c){a.summary=!1;a.survey=c};a.showLess=function(){a.summary=!0}}])})(angular);
(function(f){function a(a){var e=[];(_.isUndefined(a.name)||_.isEmpty(a.name.trim()))&&e.push("Name: provide a name for the location.");_.isUndefined(a.district)&&e.push("District: select a district.");_.isUndefined(a.locationType)&&e.push("Type of location: select what type of outlet this location is.");_.isUndefined(a.loc)?(e.push("Latitude: specify the latitude."),e.push("Longitude: specify the longitude.")):(!_.isUndefined(a.loc.lon)&&utils.isNumber(a.loc.lon)||e.push("Longitude: specify a valid longitude"),
!_.isUndefined(a.loc.lat)&&utils.isNumber(a.loc.lat)||e.push("Latitude: specify a valid latitude."));return e}f.module("location.edit",[]).factory("LocationUpdateService",["$http",function(a){return{update:function(e,f){return a.update("/api/locations/"+e,f)},fetch:function(e){return a.get("/api/locations"+e)}}}]).controller("LocationEditController",["$scope","$state","urlUtils","LocationUpdateService",function(c,e,f,k){c.districts=[{name:"Corozal"},{name:"Orange Walk"},{name:"Belize"},{name:"Cayo"},
{name:"Stann Creek"},{name:"Toledo"}];c.locationTypes=[{name:"Traditional"},{name:"Non-Traditional"},{name:"Hotspot"}];k.fetch($stateParams.locationId).success(function(a){c.location=a}).error(function(a,c){console.error("Error fetching location: ",a);401==c&&f.redirectHome()});c.submit=function(){var g={name:c.name,district:c.district?c.district.name:void 0,locationType:c.locationType?c.locationType.name:void 0,loc:{lon:c.longitude,lat:c.latitude}},h=a(g);0<h.length?c.errors=h:LocationCreateService.create(g).success(function(){e.transitionTo("locations.list")}).error(function(a,
e){c.errors=a.errors;401==e&&f.redirectHome()})}}])})(angular);
(function(f){f.module("PasmoLocation",["location.create","locations.list","locations.details"]).config(["$stateProvider",function(a){a.state("locations",{url:"locations",templateUrl:"/locations/index.html"}).state("locations.list",{url:"/list",templateUrl:"/locations/list.html",controller:"LocationListController"}).state("locations.create",{url:"/create",templateUrl:"/locations/create.html",controller:"LocationCreateController"}).state("locations.summary",{url:"/:locationId/summary",templateUrl:"/locations/surveys_summary.html",
controller:"LocationDetailsController"})}])})(angular);
(function(f){f.module("NonTraditionalOutletSurvey.gatewayService",[]).factory("NonTraditionalSurveyGatewayService",["$http",function(a){return{fetchOutlets:function(){return a.get("/api/locations/byType/non_traditional")},fetchSurveys:function(c){return a.get("/api/outletSurveys/"+c+"/non-traditional")},createSurvey:function(c,e){return a.post("/api/outletSurveys/"+c,e)},fetchSurvey:function(c,e){return a.get("/api/outletSurveys/"+e)},editSurvey:function(c,e,f){return a.put("/api/outletSurveys/"+
e,f)}}}])})(angular);(function(f){f.module("NonTraditionalOutletSurvey.list",[]).controller("NonTraditionalOutletSurveyListController",["$scope","$state","$stateParams","urlUtils","NonTraditionalSurveyGatewayService",function(a,c,e,f,k){a.surveyId=e.id;k.fetchSurveys(e.id).success(function(c){a.surveys=c}).error(function(a,c){console.error("Error retrieving surveys: ",a);401==c&&f.redirectHome()})}])})(angular);
(function(f){f.module("NonTraditionalOutletSurvey.create",[]).controller("NonTraditionalOutletSurveyCreateController",["$scope","$state","$stateParams","urlUtils","NonTraditionalSurveyGatewayService",function(a,c,e,f,k){a.outlet_types=[{name:"Restaurant"},{name:"Pharmacy"}];k.fetchOutlets().success(function(c){a.locations=c;0==a.locations.length&&(a.noLocatons=!0)}).error(function(a,c){console.error("Error retreiving outlets: ",a);401==c&&f.redirectHome()});a.cancel=function(){c.transitionTo("listNonTraditionalOutlets",
{id:e.id})};a.submit=function(){a.errors=[];a.location||(a.errors=["Please chose a location!"]);a.outlet_type||a.errors.push("Please select an outlet type!");if(0==a.errors.length){var g={outreach:a.outreach,outletType:"non-traditional",locationType:a.outlet_type.name,targetPopulations:a.target_populations,condomsAvailable:_.isBoolean(a.condoms_available)?a.condoms_available:!1,lubesAvailable:_.isBoolean(a.lube_available)?a.lube_available:!1,gigi:_.isBoolean(a.gigi)?a.gigi:!1,location:{id:a.location.id,
name:a.location.name,district:a.location.district,loc:a.location.loc}};k.createSurvey(e.id,g).success(function(a){c.transitionTo("listNonTraditionalOutlets",{id:e.id})}).error(function(a,c){401==c?f.redirectHome():(console.error("ERROR: ",a),alert("An error occurred!"))})}}}])})(angular);
(function(f){f.module("NonTraditionalOutletSurvey.edit",[]).controller("NonTraditionalOutletSurveyEditController",["$scope","$state","$stateParams","urlUtils","NonTraditionalSurveyGatewayService",function(a,c,e,f,k){a.survey_id=e.survey_id;a.outlet_survey_id=e.outlet_survey_id;k.fetchSurvey(a.survey_id,a.outlet_survey_id).success(function(c){a.survey=c;a.survey.outletType=JSON.parse(c.outletType).name}).error(function(a){console.error("Error fetching survey data: ",a);401==status&&f.redirectHome()});
a.cancel=function(){c.transitionTo("listNonTraditionalOutlets",{id:a.survey_id})};a.submit=function(){var c={outreach:a.survey.outreach,targetPopulations:a.survey.targetPopulations,condomsAvailable:_.isBoolean(a.survey.condomsAvailable)?a.survey.condomsAvailable:!1,lubesAvailable:_.isBoolean(a.survey.lubesAvailable)?a.survey.lubesAvailable:!1,gigi:_.isBoolean(a.survey.gigi)?a.survey.gigi:!1};k.editSurvey(a.survey_id,a.outlet_survey_id,c).success(function(c){a.cancel()}).error(function(a,c){401==c?
f.redirectHome():(console.error("ERROR: ",a),alert("An error occurred!"))})}}])})(angular);
(function(){angular.module("NonTraditionalOutletSurvey",["NonTraditionalOutletSurvey.gatewayService","NonTraditionalOutletSurvey.list","NonTraditionalOutletSurvey.create","NonTraditionalOutletSurvey.edit"]).config(["$stateProvider",function(f){f.state("listNonTraditionalOutlets",{url:"/surveys/:id/non_traditional_outlet/list",templateUrl:"/surveys/non_traditional_outlets/list.html",controller:"NonTraditionalOutletSurveyListController"}).state("createNonTraditionalOutlets",{url:"/surveys/:id/non_traditional_outlet/create",
templateUrl:"/surveys/non_traditional_outlets/create_form.html",controller:"NonTraditionalOutletSurveyCreateController"}).state("editNonTraditionalOutlets",{url:"/surveys/:survey_id/non_traditional_outlet/:outlet_survey_id/edit",templateUrl:"/surveys/non_traditional_outlets/edit.html",controller:"NonTraditionalOutletSurveyEditController"})}])})(angular);
(function(f){f.module("Hotspots.gateway",[]).factory("GatewayService",["$http",function(a){return{fetchOutlets:function(){return a.get("/api/locations/byType/hotspot")},fetchSurveys:function(c){return a.get("/api/outletSurveys/"+c+"/hotspot")},createSurvey:function(c,e){return a.post("/api/outletSurveys/"+c,e)},fetchHotspotSurvey:function(c,e){return a.get("/api/outletSurveys/"+e)},editHotspotSurvey:function(c,e,f){return a.put("/api/outletSurveys/"+e,f)}}}])})(angular);
(function(f){f.module("Hotspots.list",[]).controller("ListController",["$scope","$state","$stateParams","urlUtils","OutletSurveyService",function(a,c,e,f,k){a.surveyId=e.id;k.fetchSurveys(e.id).success(function(c){a.surveys=c}).error(function(a,c){console.error("Error retrieving surveys: ",a);401==c&&f.redirectHome()})}])})(angular);
(function(f){f.module("Hotspots.create",[]).controller("CreateController",["$scope","$state","$stateParams","urlUtils","GatewayService",function(a,c,e,f,k){k.fetchOutlets().success(function(c){a.locations=c;0==a.locations.length&&(a.noLocatons=!0)}).error(function(a,c){console.error("Error retreiving outlets: ",a);401==c&&f.redirectHome()});a.cancel=function(){c.transitionTo("hotspotsList",{id:e.id})};a.submit=function(){a.errors=[];a.location||(a.errors=["Please chose a location!"]);if(0==a.errors.length){var g=
{outletType:"hotspot",outreach:a.outreach,targetPopulations:a.target_populations,condomsAvailable:_.isBoolean(a.condoms_available)?a.condoms_available:!1,lubesAvailable:_.isBoolean(a.lube_available)?a.lube_available:!1,gigi:_.isBoolean(a.gigi)?a.gigi:!1,location:{id:a.location.id,name:a.location.name,district:a.location.district,loc:a.location.loc}};k.createSurvey(e.id,g).success(function(a){c.transitionTo("hotspotsList",{id:e.id})}).error(function(a,c){401==c?f.redirectHome():(console.error("ERROR: ",
a),alert("An error occurred!"))})}}}])})(angular);
(function(f){f.module("Hotspots.edit",[]).controller("HotspotSurveyEditController",["$scope","$state","$stateParams","urlUtils","GatewayService",function(a,c,e,f,k){a.surveyId=e.survey_id;a.hotspotSurveyId=e.hotspot_survey_id;k.fetchHotspotSurvey(a.surveyId,a.hotspotSurveyId).success(function(c){a.survey=c}).error(function(a,c){console.error("Error fetching hotspot survey: ",a);401==c&&f.redirectHome()});a.cancel=function(){c.transitionTo("hotspotsList",{id:a.surveyId})};a.submit=function(){var c=
{outreach:a.survey.outreach,targetPopulations:a.survey.targetPopulations,condomsAvailable:_.isBoolean(a.survey.condomsAvailable)?a.survey.condomsAvailable:!1,lubesAvailable:_.isBoolean(a.survey.lubesAvailable)?a.survey.lubesAvailable:!1,gigi:_.isBoolean(a.survey.gigi)?a.survey.gigi:!1};k.editHotspotSurvey(a.surveyId,a.hotspotSurveyId,c).success(function(c){a.cancel()}).error(function(a,c){401==c?f.redirectHome():(console.error("ERROR: ",a),alert("An error occurred!"))})}}])})(angular);
(function(f){f.module("Hotspots",["Hotspots.gateway","Hotspots.list","Hotspots.create","Hotspots.edit"]).config(["$stateProvider",function(a){a.state("hotspotsList",{url:"/surveys/:id/hotspots/list",templateUrl:"/surveys/hotspots/list.html",controller:"ListController"}).state("hotspotsCreate",{url:"/surveys/:id/hotspots/create",templateUrl:"/surveys/hotspots/create_form.html",controller:"CreateController"}).state("hotspotsEdit",{url:"/surveys/:survey_id/hotspots/:hotspot_survey_id/edit",templateUrl:"/surveys/hotspots/edit.html",
controller:"HotspotSurveyEditController"})}])})(angular);
(function(f){f.module("TraditionalOutletSurvey.gatewayService",[]).factory("TraditionalOutletGatewayService",["$http",function(a){return{fetchTraditionalOutlets:function(){return a.get("/api/locations/byType/traditional")},createTraditonalOutlet:function(c,e){return a.post("/api/outletSurveys/"+c,e)},fetchTraditionalOutletsSurvey:function(c){return a.get("/api/outletSurveys/"+c+"/traditional")},fetchSurvey:function(c){return a.get("/api/outletSurveys/"+c)},updateSurvey:function(c,e){return a.put("/api/outletSurveys/"+
c,e)}}}])})(angular);(function(f){f.module("TraditionalOutletSurvey.list",[]).controller("TraditionalOutletSurveyListController",["$scope","$state","$stateParams","urlUtils","TraditionalOutletGatewayService",function(a,c,e,f,k){a.id=e.id;k.fetchTraditionalOutletsSurvey(e.id).success(function(c){a.surveys=c}).error(function(a,c){console.error("ERROR: ",a);401==c&&f.redirectHome()})}])})(angular);
(function(f){f.module("TraditionalOutletSurvey.create",[]).controller("TraditionalOutletSurveyCreateController",["$scope","$state","$stateParams","urlUtils","TraditionalOutletGatewayService",function(a,c,e,f,k){k.fetchTraditionalOutlets().success(function(c){a.locations=c;0==c.length&&(a.noLocations=!0,console.log("No Locations: ",a.noLocations))}).error(function(a,c){console.error("ERROR: ",a);401==c&&f.redirectHome()});a.submit=function(){var g={outletType:"traditional",condomsAvailable:_.isBoolean(a.condoms_available)?
a.condoms_available:!1,lubesAvailable:_.isBoolean(a.lube_available)?a.lube_available:!1,gigi:_.isBoolean(a.gigi)?a.gigi:!1,location:{id:a.location.id,name:a.location.name,district:a.location.district,loc:a.location.loc}};k.createTraditonalOutlet(e.id,g).success(function(a){c.transitionTo("surveys.listTraditionalOutlets",{id:e.id})}).error(function(a,c){401==c?f.redirectHome():console.error("ERROR: ",a)})};a.cancel=function(){c.transitionTo("surveys.listTraditionalOutlets",{id:e.id})}}])})(angular);
(function(f){f.module("TraditionalOutletSurvey.edit",[]).controller("TraditionalOutletSurveyEditController",["$scope","$state","$stateParams","urlUtils","TraditionalOutletGatewayService",function(a,c,e,f,k){a.surveyId=e.survey_id;console.log("In Edit Controller::: ",e);k.fetchSurvey(e.traditional_outlet_survey_id).success(function(c){a.survey=c;console.log("survey: ",a.survey)}).error(function(a,c){401==c?f.redirectHome():(alert("Could not retrieve survey from server!"),console.log("Error retrieving traditonal outlet from server: ",
a))});a.submit=function(){var g={condomsAvailable:_.isBoolean(a.survey.condomsAvailable)?a.survey.condomsAvailable:!1,lubesAvailable:_.isBoolean(a.survey.lubesAvailable)?a.survey.lubesAvailable:!1,gigi:_.isBoolean(a.survey.gigi)?a.survey.gigi:!1};k.updateSurvey(e.traditional_outlet_survey_id,g).success(function(a){c.transitionTo("surveys.listTraditionalOutlets",{id:e.survey_id})}).error(function(a,c){console.error("ERROR: ",a);401==c&&f.redirectHome()})};a.cancel=function(){c.transitionTo("surveys.listTraditionalOutlets",
{id:e.survey_id})}}])})(angular);
(function(f){f.module("TraditionaOutletSurvey",["TraditionalOutletSurvey.gatewayService","TraditionalOutletSurvey.list","TraditionalOutletSurvey.create","TraditionalOutletSurvey.edit"]).config(["$stateProvider",function(a){a.state("surveys.traditionalOutlet",{url:"/:id/traditional_outlet/create",templateUrl:"/surveys/traditional_outlets/create_form.html",controller:"TraditionalOutletSurveyCreateController"}).state("surveys.listTraditionalOutlets",{url:"/:id/traditional_outlet/list",templateUrl:"/surveys/traditional_outlets/list.html",
controller:"TraditionalOutletSurveyListController"}).state("surveys.editTraditionalOutlet",{url:"/surveys/:survey_id/traditional_outlet/:traditional_outlet_survey_id",templateUrl:"/surveys/traditional_outlets/edit.html",controller:"TraditionalOutletSurveyEditController"})}])})(angular);var PasmoApp={apiUrls:{}};
angular.module("PasmoApp","ui.router url_utils OutletSurveyService surveys PasmoLocation TraditionaOutletSurvey NonTraditionalOutletSurvey Hotspots".split(" ")).run(["$rootScope","$http","$state",function(f,a,c){console.info("Starting Pasmo App......")}]);