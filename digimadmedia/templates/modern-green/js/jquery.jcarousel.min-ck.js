/*! jCarousel - v0.3.1 - 2014-05-26
* http://sorgalla.com/jcarousel
* Copyright (c) 2014 Jan Sorgalla; Licensed MIT */(function(e){"use strict";var t=e.jCarousel={};t.version="0.3.1";var n=/^([+\-]=)?(.+)$/;t.parseTarget=function(e){var t=!1,r="object"!=typeof e?n.exec(e):null;return r?(e=parseInt(r[2],10)||0,r[1]&&(t=!0,"-="===r[1]&&(e*=-1))):"object"!=typeof e&&(e=parseInt(e,10)||0),{target:e,relative:t}},t.detectCarousel=function(e){for(var t;e.length>0;){if(t=e.filter("[data-jcarousel]"),t.length>0)return t;if(t=e.find("[data-jcarousel]"),t.length>0)return t;e=e.parent()}return null},t.base=function(n){return{version:t.version,_options:{},_element:null,_carousel:null,_init:e.noop,_create:e.noop,_destroy:e.noop,_reload:e.noop,create:function(){return this._element.attr("data-"+n.toLowerCase(),!0).data(n,this),!1===this._trigger("create")?this:(this._create(),this._trigger("createend"),this)},destroy:function(){return!1===this._trigger("destroy")?this:(this._destroy(),this._trigger("destroyend"),this._element.removeData(n).removeAttr("data-"+n.toLowerCase()),this)},reload:function(e){return!1===this._trigger("reload")?this:(e&&this.options(e),this._reload(),this._trigger("reloadend"),this)},element:function(){return this._element},options:function(t,n){if(0===arguments.length)return e.extend({},this._options);if("string"==typeof t){if(n===void 0)return this._options[t]===void 0?null:this._options[t];this._options[t]=n}else this._options=e.extend({},this._options,t);return this},carousel:function(){return this._carousel||(this._carousel=t.detectCarousel(this.options("carousel")||this._element),this._carousel||e.error('Could not detect carousel for plugin "'+n+'"')),this._carousel},_trigger:function(t,r,i){var o,u=!1;return i=[this].concat(i||[]),(r||this._element).each(function(){o=e.Event((n+":"+t).toLowerCase()),e(this).trigger(o,i),o.isDefaultPrevented()&&(u=!0)}),!u}}},t.plugin=function(n,r){var s=e[n]=function(t,n){this._element=e(t),this.options(n),this._init(),this.create()};return s.fn=s.prototype=e.extend({},t.base(n),r),e.fn[n]=function(t){var r=Array.prototype.slice.call(arguments,1),i=this;return"string"==typeof t?this.each(function(){var s=e(this).data(n);if(!s)return e.error("Cannot call methods on "+n+" prior to initialization; "+'attempted to call method "'+t+'"');if(!e.isFunction(s[t])||"_"===t.charAt(0))return e.error('No such method "'+t+'" for '+n+" instance");var o=s[t].apply(s,r);return o!==s&&o!==void 0?(i=o,!1):void 0}):this.each(function(){var r=e(this).data(n);r instanceof s?r.reload(t):new s(this,t)}),i},s}})(jQuery),function(e,t){"use strict";var n=function(e){return parseFloat(e)||0};e.jCarousel.plugin("jcarousel",{animating:!1,tail:0,inTail:!1,resizeTimer:null,lt:null,vertical:!1,rtl:!1,circular:!1,underflow:!1,relative:!1,_options:{list:function(){return this.element().children().eq(0)},items:function(){return this.list().children()},animation:400,transitions:!1,wrap:null,vertical:null,rtl:null,center:!1},_list:null,_items:null,_target:e(),_first:e(),_last:e(),_visible:e(),_fullyvisible:e(),_init:function(){var e=this;return this.onWindowResize=function(){e.resizeTimer&&clearTimeout(e.resizeTimer),e.resizeTimer=setTimeout(function(){e.reload()},100)},this},_create:function(){this._reload(),e(t).on("resize.jcarousel",this.onWindowResize)},_destroy:function(){e(t).off("resize.jcarousel",this.onWindowResize)},_reload:function(){this.vertical=this.options("vertical"),null==this.vertical&&(this.vertical=this.list().height()>this.list().width()),this.rtl=this.options("rtl"),null==this.rtl&&(this.rtl=function(t){if("rtl"===(""+t.attr("dir")).toLowerCase())return!0;var n=!1;return t.parents("[dir]").each(function(){return/rtl/i.test(e(this).attr("dir"))?(n=!0,!1):void 0}),n}(this._element)),this.lt=this.vertical?"top":"left",this.relative="relative"===this.list().css("position"),this._list=null,this._items=null;var t=this.index(this._target)>=0?this._target:this.closest();this.circular="circular"===this.options("wrap"),this.underflow=!1;var n={left:0,top:0};return t.length>0&&(this._prepare(t),this.list().find("[data-jcarousel-clone]").remove(),this._items=null,this.underflow=this._fullyvisible.length>=this.items().length,this.circular=this.circular&&!this.underflow,n[this.lt]=this._position(t)+"px"),this.move(n),this},list:function(){if(null===this._list){var t=this.options("list");this._list=e.isFunction(t)?t.call(this):this._element.find(t)}return this._list},items:function(){if(null===this._items){var t=this.options("items");this._items=(e.isFunction(t)?t.call(this):this.list().find(t)).not("[data-jcarousel-clone]")}return this._items},index:function(e){return this.items().index(e)},closest:function(){var t,r=this,i=this.list().position()[this.lt],o=e(),u=!1,a=this.vertical?"bottom":this.rtl&&!this.relative?"left":"right";return this.rtl&&this.relative&&!this.vertical&&(i+=this.list().width()-this.clipping()),this.items().each(function(){if(o=e(this),u)return!1;var f=r.dimension(o);if(i+=f,i>=0){if(t=f-n(o.css("margin-"+a)),!(0>=Math.abs(i)-f+t/2))return!1;u=!0}}),o},target:function(){return this._target},first:function(){return this._first},last:function(){return this._last},visible:function(){return this._visible},fullyvisible:function(){return this._fullyvisible},hasNext:function(){if(!1===this._trigger("hasnext"))return!0;var e=this.options("wrap"),t=this.items().length-1;return t>=0&&!this.underflow&&(e&&"first"!==e||t>this.index(this._last)||this.tail&&!this.inTail)?!0:!1},hasPrev:function(){if(!1===this._trigger("hasprev"))return!0;var e=this.options("wrap");return this.items().length>0&&!this.underflow&&(e&&"last"!==e||this.index(this._first)>0||this.tail&&this.inTail)?!0:!1},clipping:function(){return this._element["inner"+(this.vertical?"Height":"Width")]()},dimension:function(e){return e["outer"+(this.vertical?"Height":"Width")](!0)},scroll:function(t,n,r){if(this.animating)return this;if(!1===this._trigger("scroll",null,[t,n]))return this;e.isFunction(n)&&(r=n,n=!0);var i=e.jCarousel.parseTarget(t);if(i.relative){var s,o,u,a,f,l,c,h,p=this.items().length-1,d=Math.abs(i.target),v=this.options("wrap");if(i.target>0){var m=this.index(this._last);if(m>=p&&this.tail)this.inTail?"both"===v||"last"===v?this._scroll(0,n,r):e.isFunction(r)&&r.call(this,!1):this._scrollTail(n,r);else if(s=this.index(this._target),this.underflow&&s===p&&("circular"===v||"both"===v||"last"===v)||!this.underflow&&m===p&&("both"===v||"last"===v))this._scroll(0,n,r);else if(u=s+d,this.circular&&u>p){for(h=p,f=this.items().get(-1);u>h++;)f=this.items().eq(0),l=this._visible.index(f)>=0,l&&f.after(f.clone(!0).attr("data-jcarousel-clone",!0)),this.list().append(f),l||(c={},c[this.lt]=this.dimension(f),this.moveBy(c)),this._items=null;this._scroll(f,n,r)}else this._scroll(Math.min(u,p),n,r)}else if(this.inTail)this._scroll(Math.max(this.index(this._first)-d+1,0),n,r);else if(o=this.index(this._first),s=this.index(this._target),a=this.underflow?s:o,u=a-d,0>=a&&(this.underflow&&"circular"===v||"both"===v||"first"===v))this._scroll(p,n,r);else if(this.circular&&0>u){for(h=u,f=this.items().get(0);0>h++;){f=this.items().eq(-1),l=this._visible.index(f)>=0,l&&f.after(f.clone(!0).attr("data-jcarousel-clone",!0)),this.list().prepend(f),this._items=null;var g=this.dimension(f);c={},c[this.lt]=-g,this.moveBy(c)}this._scroll(f,n,r)}else this._scroll(Math.max(u,0),n,r)}else this._scroll(i.target,n,r);return this._trigger("scrollend"),this},moveBy:function(e,t){var r=this.list().position(),i=1,o=0;return this.rtl&&!this.vertical&&(i=-1,this.relative&&(o=this.list().width()-this.clipping())),e.left&&(e.left=r.left+o+n(e.left)*i+"px"),e.top&&(e.top=r.top+o+n(e.top)*i+"px"),this.move(e,t)},move:function(t,n){n=n||{};var r=this.options("transitions"),i=!!r,s=!!r.transforms,o=!!r.transforms3d,u=n.duration||0,a=this.list();if(!i&&u>0)return a.animate(t,n),void 0;var f=n.complete||e.noop,l={};if(i){var c={transitionDuration:a.css("transitionDuration"),transitionTimingFunction:a.css("transitionTimingFunction"),transitionProperty:a.css("transitionProperty")},h=f;f=function(){e(this).css(c),h.call(this)},l={transitionDuration:(u>0?u/1e3:0)+"s",transitionTimingFunction:r.easing||n.easing,transitionProperty:u>0?function(){return s||o?"all":t.left?"left":"top"}():"none",transform:"none"}}o?l.transform="translate3d("+(t.left||0)+","+(t.top||0)+",0)":s?l.transform="translate("+(t.left||0)+","+(t.top||0)+")":e.extend(l,t),i&&u>0&&a.one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",f),a.css(l),0>=u&&a.each(function(){f.call(this)})},_scroll:function(t,n,r){if(this.animating)return e.isFunction(r)&&r.call(this,!1),this;if("object"!=typeof t?t=this.items().eq(t):t.jquery===void 0&&(t=e(t)),0===t.length)return e.isFunction(r)&&r.call(this,!1),this;this.inTail=!1,this._prepare(t);var i=this._position(t),s=this.list().position()[this.lt];if(i===s)return e.isFunction(r)&&r.call(this,!1),this;var o={};return o[this.lt]=i+"px",this._animate(o,n,r),this},_scrollTail:function(t,n){if(this.animating||!this.tail)return e.isFunction(n)&&n.call(this,!1),this;var r=this.list().position()[this.lt];this.rtl&&this.relative&&!this.vertical&&(r+=this.list().width()-this.clipping()),this.rtl&&!this.vertical?r+=this.tail:r-=this.tail,this.inTail=!0;var i={};return i[this.lt]=r+"px",this._update({target:this._target.next(),fullyvisible:this._fullyvisible.slice(1).add(this._visible.last())}),this._animate(i,t,n),this},_animate:function(t,n,r){if(r=r||e.noop,!1===this._trigger("animate"))return r.call(this,!1),this;this.animating=!0;var i=this.options("animation"),s=e.proxy(function(){this.animating=!1;var e=this.list().find("[data-jcarousel-clone]");e.length>0&&(e.remove(),this._reload()),this._trigger("animateend"),r.call(this,!0)},this),o="object"==typeof i?e.extend({},i):{duration:i},u=o.complete||e.noop;return n===!1?o.duration=0:e.fx.speeds[o.duration]!==void 0&&(o.duration=e.fx.speeds[o.duration]),o.complete=function(){s(),u.call(this)},this.move(t,o),this},_prepare:function(t){var r,i,o,u,a=this.index(t),f=a,l=this.dimension(t),c=this.clipping(),h=this.vertical?"bottom":this.rtl?"left":"right",p=this.options("center"),d={target:t,first:t,last:t,visible:t,fullyvisible:c>=l?t:e()};if(p&&(l/=2,c/=2),c>l)for(;;){if(r=this.items().eq(++f),0===r.length){if(!this.circular)break;if(r=this.items().eq(0),t.get(0)===r.get(0))break;if(i=this._visible.index(r)>=0,i&&r.after(r.clone(!0).attr("data-jcarousel-clone",!0)),this.list().append(r),!i){var v={};v[this.lt]=this.dimension(r),this.moveBy(v)}this._items=null}if(u=this.dimension(r),0===u)break;if(l+=u,d.last=r,d.visible=d.visible.add(r),o=n(r.css("margin-"+h)),c>=l-o&&(d.fullyvisible=d.fullyvisible.add(r)),l>=c)break}if(!this.circular&&!p&&c>l)for(f=a;;){if(0>--f)break;if(r=this.items().eq(f),0===r.length)break;if(u=this.dimension(r),0===u)break;if(l+=u,d.first=r,d.visible=d.visible.add(r),o=n(r.css("margin-"+h)),c>=l-o&&(d.fullyvisible=d.fullyvisible.add(r)),l>=c)break}return this._update(d),this.tail=0,p||"circular"===this.options("wrap")||"custom"===this.options("wrap")||this.index(d.last)!==this.items().length-1||(l-=n(d.last.css("margin-"+h)),l>c&&(this.tail=l-c)),this},_position:function(e){var t=this._first,n=t.position()[this.lt],r=this.options("center"),i=r?this.clipping()/2-this.dimension(t)/2:0;return this.rtl&&!this.vertical?(n-=this.relative?this.list().width()-this.dimension(t):this.clipping()-this.dimension(t),n+=i):n-=i,!r&&(this.index(e)>this.index(t)||this.inTail)&&this.tail?(n=this.rtl&&!this.vertical?n-this.tail:n+this.tail,this.inTail=!0):this.inTail=!1,-n},_update:function(t){var n,r=this,i={target:this._target,first:this._first,last:this._last,visible:this._visible,fullyvisible:this._fullyvisible},s=this.index(t.first||i.first)<this.index(i.first),o=function(n){var o=[],u=[];t[n].each(function(){0>i[n].index(this)&&o.push(this)}),i[n].each(function(){0>t[n].index(this)&&u.push(this)}),s?o=o.reverse():u=u.reverse(),r._trigger(n+"in",e(o)),r._trigger(n+"out",e(u)),r["_"+n]=t[n]};for(n in t)o(n);return this}})}(jQuery,window),function(e){"use strict";e.jcarousel.fn.scrollIntoView=function(n,r,i){var s,o=e.jCarousel.parseTarget(n),u=this.index(this._fullyvisible.first()),a=this.index(this._fullyvisible.last());if(s=o.relative?0>o.target?Math.max(0,u+o.target):a+o.target:"object"!=typeof o.target?o.target:this.index(o.target),u>s)return this.scroll(s,r,i);if(s>=u&&a>=s)return e.isFunction(i)&&i.call(this,!1),this;for(var f,l=this.items(),c=this.clipping(),h=this.vertical?"bottom":this.rtl?"left":"right",p=0;;){if(f=l.eq(s),0===f.length)break;if(p+=this.dimension(f),p>=c){var d=parseFloat(f.css("margin-"+h))||0;p-d!==c&&s++;break}if(0>=s)break;s--}return this.scroll(s,r,i)}}(jQuery),function(e){"use strict";e.jCarousel.plugin("jcarouselControl",{_options:{target:"+=1",event:"click",method:"scroll"},_active:null,_init:function(){this.onDestroy=e.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",e.proxy(this._create,this))},this),this.onReload=e.proxy(this._reload,this),this.onEvent=e.proxy(function(n){n.preventDefault();var r=this.options("method");e.isFunction(r)?r.call(this):this.carousel().jcarousel(this.options("method"),this.options("target"))},this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy).on("jcarousel:reloadend jcarousel:scrollend",this.onReload),this._element.on(this.options("event")+".jcarouselcontrol",this.onEvent),this._reload()},_destroy:function(){this._element.off(".jcarouselcontrol",this.onEvent),this.carousel().off("jcarousel:destroy",this.onDestroy).off("jcarousel:reloadend jcarousel:scrollend",this.onReload)},_reload:function(){var n,r=e.jCarousel.parseTarget(this.options("target")),i=this.carousel();if(r.relative)n=i.jcarousel(r.target>0?"hasNext":"hasPrev");else{var s="object"!=typeof r.target?i.jcarousel("items").eq(r.target):r.target;n=i.jcarousel("target").index(s)>=0}return this._active!==n&&(this._trigger(n?"active":"inactive"),this._active=n),this}})}(jQuery),function(e){"use strict";e.jCarousel.plugin("jcarouselPagination",{_options:{perPage:null,item:function(e){return'<a href="#'+e+'">'+e+"</a>"},event:"click",method:"scroll"},_carouselItems:null,_pages:{},_items:{},_currentPage:null,_init:function(){this.onDestroy=e.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",e.proxy(this._create,this))},this),this.onReload=e.proxy(this._reload,this),this.onScroll=e.proxy(this._update,this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy).on("jcarousel:reloadend",this.onReload).on("jcarousel:scrollend",this.onScroll),this._reload()},_destroy:function(){this._clear(),this.carousel().off("jcarousel:destroy",this.onDestroy).off("jcarousel:reloadend",this.onReload).off("jcarousel:scrollend",this.onScroll),this._carouselItems=null},_reload:function(){var n=this.options("perPage");if(this._pages={},this._items={},e.isFunction(n)&&(n=n.call(this)),null==n)this._pages=this._calculatePages();else for(var r,i=parseInt(n,10)||0,s=this._getCarouselItems(),o=1,u=0;;){if(r=s.eq(u++),0===r.length)break;this._pages[o]=this._pages[o]?this._pages[o].add(r):r,0===u%i&&o++}this._clear();var a=this,f=this.carousel().data("jcarousel"),l=this._element,c=this.options("item"),h=this._getCarouselItems().length;e.each(this._pages,function(n,r){var i=a._items[n]=e(c.call(a,n,r));i.on(a.options("event")+".jcarouselpagination",e.proxy(function(){var e=r.eq(0);if(f.circular){var t=f.index(f.target()),i=f.index(e);parseFloat(n)>parseFloat(a._currentPage)?t>i&&(e="+="+(h-t+i)):i>t&&(e="-="+(t+(h-i)))}f[this.options("method")](e)},a)),l.append(i)}),this._update()},_update:function(){var n,r=this.carousel().jcarousel("target");e.each(this._pages,function(e,t){return t.each(function(){return r.is(this)?(n=e,!1):void 0}),n?!1:void 0}),this._currentPage!==n&&(this._trigger("inactive",this._items[this._currentPage]),this._trigger("active",this._items[n])),this._currentPage=n},items:function(){return this._items},reloadCarouselItems:function(){return this._carouselItems=null,this},_clear:function(){this._element.empty(),this._currentPage=null},_calculatePages:function(){for(var e,t=this.carousel().data("jcarousel"),n=this._getCarouselItems(),r=t.clipping(),i=0,s=0,o=1,u={};;){if(e=n.eq(s++),0===e.length)break;u[o]=u[o]?u[o].add(e):e,i+=t.dimension(e),i>=r&&(o++,i=0)}return u},_getCarouselItems:function(){return this._carouselItems||(this._carouselItems=this.carousel().jcarousel("items")),this._carouselItems}})}(jQuery),function(e){"use strict";e.jCarousel.plugin("jcarouselAutoscroll",{_options:{target:"+=1",interval:3e3,autostart:!0},_timer:null,_init:function(){this.onDestroy=e.proxy(function(){this._destroy(),this.carousel().one("jcarousel:createend",e.proxy(this._create,this))},this),this.onAnimateEnd=e.proxy(this.start,this)},_create:function(){this.carousel().one("jcarousel:destroy",this.onDestroy),this.options("autostart")&&this.start()},_destroy:function(){this.stop(),this.carousel().off("jcarousel:destroy",this.onDestroy)},start:function(){return this.stop(),this.carousel().one("jcarousel:animateend",this.onAnimateEnd),this._timer=setTimeout(e.proxy(function(){this.carousel().jcarousel("scroll",this.options("target"))},this),this.options("interval")),this},stop:function(){return this._timer&&(this._timer=clearTimeout(this._timer)),this.carousel().off("jcarousel:animateend",this.onAnimateEnd),this}})}(jQuery);