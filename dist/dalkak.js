var t=function(){function t(n){this.name=n||t.randomize()}return t.randomize=function(){for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n="",r=0;r<5;r++)n+=t.charAt(Math.floor(Math.random()*t.length));return n},t}();function n(t){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function r(t,n){return(r=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function e(t,n,o){return(e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}()?Reflect.construct:function(t,n,e){var o=[null];o.push.apply(o,n);var i=new(Function.bind.apply(t,o));return e&&r(i,e.prototype),i}).apply(null,arguments)}function o(t){var i="function"==typeof Map?new Map:void 0;return(o=function(t){if(null===t||-1===Function.toString.call(t).indexOf("[native code]"))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==i){if(i.has(t))return i.get(t);i.set(t,o)}function o(){return e(t,arguments,n(this).constructor)}return o.prototype=Object.create(t.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),r(o,t)})(t)}function i(t,n){i=function(t,n){return new s(t,n)};var e=o(RegExp),u=RegExp.prototype,c=new WeakMap;function s(t,n){var r=e.call(this,t);return c.set(r,n),r}function a(t,n){var r=c.get(n);return Object.keys(r).reduce(function(n,e){return n[e]=t[r[e]],n},Object.create(null))}return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&r(t,n)}(s,e),s.prototype.exec=function(t){var n=u.exec.call(this,t);return n&&(n.groups=a(n,this)),n},s.prototype[Symbol.replace]=function(t,n){if("string"==typeof n){var r=c.get(this);return u[Symbol.replace].call(this,t,n.replace(/\$<([^>]+)>/g,function(t,n){return"$"+r[n]}))}if("function"==typeof n){var e=this;return u[Symbol.replace].call(this,t,function(){var t=[];return t.push.apply(t,arguments),"object"!=typeof t[t.length-1]&&t.push(a(t,e)),n.apply(this,t)})}return u[Symbol.replace].call(this,t,n)},i.apply(this,arguments)}var u=function(){function t(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];this.poses=n||[],this.dimension=this.poses.length}var n=t.prototype;return n.rotate=function(n){return void 0===n&&(n=0),n=n*Math.PI/180,new t(this.poses[0]*Math.cos(n)-this.poses[1]*Math.sin(n),this.poses[0]*Math.sin(n)+this.poses[1]*Math.cos(n))},n.round=function(n){return void 0===n&&(n=0),e(t,this.poses.map(function(t){return Math.round(t*Math.pow(10,n))/Math.pow(10,n)}))},t}(),c=function(){function n(n,r){this.name=n||t.randomize(),this.blockGroups=[]}var r=n.prototype;return r.link=function(t){return this.blockGroups.push(t),this},r.fire=function(t){for(var n in this.blockGroups)this.blockGroups[n].start(t);return this},n}(),s=function(){function n(n,r,e,o){this.name=n||t.randomize(),this.template=r||"",i(/<<(.+?)>>|\(\((.+?)\)\)|{{(.+?)}}/g,{boolean:1,string:2,block:3}),this.params=this.genParams(),this.func=e||new Function}var r=n.prototype;return r.setParams=function(t){return this.params=Object.assign(this.params,t),this},r.run=function(t){this.func(this.params)},r.genParams=function(){var t=i(/<<(.+?)>>|\(\((.+?)\)\)|{{(.+?)}}/g,{boolean:1,string:2,block:3}),r={};return(this.template.match(t)||[]).forEach(function(e){t.lastIndex=0;var o=t.exec(e).groups;o.boolean?r[o.boolean]=!1:o.string?r[o.string]="":o.block&&(r[o.block]=new n)}),r},n.fromBlock=function(t){return Object.assign(new n,t)},n}(),a=function(){function t(t,n){this.event=t||new c,this.blocks=n||[]}var n=t.prototype;return n.ready=function(){return this.event.link(this),this},n.start=function(t){for(var n in this.blocks)this.blocks[n].run(t);return this},n.attach=function(n){return new t(this.event,this.blocks.concat(n.blocks))},t.fromBlock=function(n,r){return new t(r,[n])},t}(),f=function(){function n(n,r,e){this.name=n||t.randomize(),this.pos=r||new u,this.blocks=e||[]}var r=n.prototype;return r.addBlock=function(t){return this.blocks.push(t),this},r.ready=function(){return this.blocks.forEach(function(t){return t.ready()}),this},n.fromBlock=function(t,r){return new n(void 0,void 0,[a.fromBlock(t,r)])},n}(),h=function(t){var n,r;function e(n,r,e,o){var i;return(i=t.call(this,n,r,e)||this).children=o||[],i}r=t,(n=e).prototype=Object.create(r.prototype),n.prototype.constructor=n,n.__proto__=r;var o=e.prototype;return o.addThing=function(t){return this.children.push(t),this},o.ready=function(){return this.children.forEach(function(t){return t.ready()}),this},e}(f),p=function(){function n(n,r,e){this.name=n||t.randomize(),this.things=r||new h("Global"),this.blockSets=e||[]}var r=n.prototype;return r.addThing=function(t){return this.things.addThing(t),this},r.ready=function(){return this.things.ready(),this},n}();module.exports={Name:t,Vector:u,Event:c,BlockSet:function(t,n,r){this.infos=n||[],this.events=r||[]},Block:s,BlockGroup:a,Thing:f,ThingGroup:h,Project:p};
