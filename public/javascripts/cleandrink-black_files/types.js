(function(){var t=function(t,e){function r(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},n={}.hasOwnProperty;define(["external/underscore"],function(n){var e,r,i;return e=function(){function t(t,n){this.type=t,this.value=n}return t.parse=function(t){var n;return n=t[".tag"],2===Object.keys(t).length&&null!=t[n]?new r(n,t[n]):new i(n,t)},t}(),r=function(n){function e(t,n){this.type=t,this.value=null!=n?n:null,this.isScalar=!0}return t(e,n),e.prototype.toJSON=function(){var t;return t={".tag":this.type},null!=this.value&&(t[this.type]=this.value),t},e}(e),i=function(e){function r(t,n){this.type=t,this.value=null!=n?n:{},this.isScalar=!1}return t(r,e),r.prototype.toJSON=function(){var t;return t={".tag":this.type},n.extend(t,this.value),t},r}(e),{Union:e,UnionScalar:r,UnionStruct:i}})}).call(this);