!function(factory){"function"==typeof define&&define.amd?define(["jquery","../escape-selector","../keycode","../safe-active-element","../unique-id","../version","../widget"],factory):factory(jQuery)}(function($){return $.widget("ui.tabs",{version:"1.12.0",delay:300,options:{active:null,classes:{"ui-tabs":"ui-corner-all","ui-tabs-nav":"ui-corner-all","ui-tabs-panel":"ui-corner-bottom","ui-tabs-tab":"ui-corner-top"},collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var rhash=/#.*$/;return function(anchor){var anchorUrl,locationUrl;anchorUrl=anchor.href.replace(rhash,""),locationUrl=location.href.replace(rhash,"");try{anchorUrl=decodeURIComponent(anchorUrl)}catch(error){}try{locationUrl=decodeURIComponent(locationUrl)}catch(error){}return anchor.hash.length>1&&anchorUrl===locationUrl}}(),_create:function(){var that=this,options=this.options;this.running=!1,this._addClass("ui-tabs","ui-widget ui-widget-content"),this._toggleClass("ui-tabs-collapsible",null,options.collapsible),this._processTabs(),options.active=this._initialActive(),$.isArray(options.disabled)&&(options.disabled=$.unique(options.disabled.concat($.map(this.tabs.filter(".ui-state-disabled"),function(li){return that.tabs.index(li)}))).sort()),this.options.active!==!1&&this.anchors.length?this.active=this._findActive(options.active):this.active=$(),this._refresh(),this.active.length&&this.load(options.active)},_initialActive:function(){var active=this.options.active,collapsible=this.options.collapsible,locationHash=location.hash.substring(1);return null===active&&(locationHash&&this.tabs.each(function(i,tab){if($(tab).attr("aria-controls")===locationHash)return active=i,!1}),null===active&&(active=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),null!==active&&active!==-1||(active=!!this.tabs.length&&0)),active!==!1&&(active=this.tabs.index(this.tabs.eq(active)),active===-1&&(active=!collapsible&&0)),!collapsible&&active===!1&&this.anchors.length&&(active=0),active},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):$()}},_tabKeydown:function(event){var focusedTab=$($.ui.safeActiveElement(this.document[0])).closest("li"),selectedIndex=this.tabs.index(focusedTab),goingForward=!0;if(!this._handlePageNav(event)){switch(event.keyCode){case $.ui.keyCode.RIGHT:case $.ui.keyCode.DOWN:selectedIndex++;break;case $.ui.keyCode.UP:case $.ui.keyCode.LEFT:goingForward=!1,selectedIndex--;break;case $.ui.keyCode.END:selectedIndex=this.anchors.length-1;break;case $.ui.keyCode.HOME:selectedIndex=0;break;case $.ui.keyCode.SPACE:return event.preventDefault(),clearTimeout(this.activating),void this._activate(selectedIndex);case $.ui.keyCode.ENTER:return event.preventDefault(),clearTimeout(this.activating),void this._activate(selectedIndex!==this.options.active&&selectedIndex);default:return}event.preventDefault(),clearTimeout(this.activating),selectedIndex=this._focusNextTab(selectedIndex,goingForward),event.ctrlKey||event.metaKey||(focusedTab.attr("aria-selected","false"),this.tabs.eq(selectedIndex).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",selectedIndex)},this.delay))}},_panelKeydown:function(event){this._handlePageNav(event)||event.ctrlKey&&event.keyCode===$.ui.keyCode.UP&&(event.preventDefault(),this.active.trigger("focus"))},_handlePageNav:function(event){return event.altKey&&event.keyCode===$.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):event.altKey&&event.keyCode===$.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(index,goingForward){function constrain(){return index>lastTabIndex&&(index=0),index<0&&(index=lastTabIndex),index}for(var lastTabIndex=this.tabs.length-1;$.inArray(constrain(),this.options.disabled)!==-1;)index=goingForward?index+1:index-1;return index},_focusNextTab:function(index,goingForward){return index=this._findNextTab(index,goingForward),this.tabs.eq(index).trigger("focus"),index},_setOption:function(key,value){return"active"===key?void this._activate(value):(this._super(key,value),"collapsible"===key&&(this._toggleClass("ui-tabs-collapsible",null,value),value||this.options.active!==!1||this._activate(0)),"event"===key&&this._setupEvents(value),void("heightStyle"===key&&this._setupHeightStyle(value)))},_sanitizeSelector:function(hash){return hash?hash.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var options=this.options,lis=this.tablist.children(":has(a[href])");options.disabled=$.map(lis.filter(".ui-state-disabled"),function(tab){return lis.index(tab)}),this._processTabs(),options.active!==!1&&this.anchors.length?this.active.length&&!$.contains(this.tablist[0],this.active[0])?this.tabs.length===options.disabled.length?(options.active=!1,this.active=$()):this._activate(this._findNextTab(Math.max(0,options.active-1),!1)):options.active=this.tabs.index(this.active):(options.active=!1,this.active=$()),this._refresh()},_refresh:function(){this._setOptionDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),this.active.length?(this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._addClass(this.active,"ui-tabs-active","ui-state-active"),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var that=this,prevTabs=this.tabs,prevAnchors=this.anchors,prevPanels=this.panels;this.tablist=this._getList().attr("role","tablist"),this._addClass(this.tablist,"ui-tabs-nav","ui-helper-reset ui-helper-clearfix ui-widget-header"),this.tablist.on("mousedown"+this.eventNamespace,"> li",function(event){$(this).is(".ui-state-disabled")&&event.preventDefault()}).on("focus"+this.eventNamespace,".ui-tabs-anchor",function(){$(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").attr({role:"tab",tabIndex:-1}),this._addClass(this.tabs,"ui-tabs-tab","ui-state-default"),this.anchors=this.tabs.map(function(){return $("a",this)[0]}).attr({role:"presentation",tabIndex:-1}),this._addClass(this.anchors,"ui-tabs-anchor"),this.panels=$(),this.anchors.each(function(i,anchor){var selector,panel,panelId,anchorId=$(anchor).uniqueId().attr("id"),tab=$(anchor).closest("li"),originalAriaControls=tab.attr("aria-controls");that._isLocal(anchor)?(selector=anchor.hash,panelId=selector.substring(1),panel=that.element.find(that._sanitizeSelector(selector))):(panelId=tab.attr("aria-controls")||$({}).uniqueId()[0].id,selector="#"+panelId,panel=that.element.find(selector),panel.length||(panel=that._createPanel(panelId),panel.insertAfter(that.panels[i-1]||that.tablist)),panel.attr("aria-live","polite")),panel.length&&(that.panels=that.panels.add(panel)),originalAriaControls&&tab.data("ui-tabs-aria-controls",originalAriaControls),tab.attr({"aria-controls":panelId,"aria-labelledby":anchorId}),panel.attr("aria-labelledby",anchorId)}),this.panels.attr("role","tabpanel"),this._addClass(this.panels,"ui-tabs-panel","ui-widget-content"),prevTabs&&(this._off(prevTabs.not(this.tabs)),this._off(prevAnchors.not(this.anchors)),this._off(prevPanels.not(this.panels)))},_getList:function(){return this.tablist||this.element.find("ol, ul").eq(0)},_createPanel:function(id){return $("<div>").attr("id",id).data("ui-tabs-destroy",!0)},_setOptionDisabled:function(disabled){var currentItem,li,i;for($.isArray(disabled)&&(disabled.length?disabled.length===this.anchors.length&&(disabled=!0):disabled=!1),i=0;li=this.tabs[i];i++)currentItem=$(li),disabled===!0||$.inArray(i,disabled)!==-1?(currentItem.attr("aria-disabled","true"),this._addClass(currentItem,null,"ui-state-disabled")):(currentItem.removeAttr("aria-disabled"),this._removeClass(currentItem,null,"ui-state-disabled"));this.options.disabled=disabled,this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,disabled===!0)},_setupEvents:function(event){var events={};event&&$.each(event.split(" "),function(index,eventName){events[eventName]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(!0,this.anchors,{click:function(event){event.preventDefault()}}),this._on(this.anchors,events),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(heightStyle){var maxHeight,parent=this.element.parent();"fill"===heightStyle?(maxHeight=parent.height(),maxHeight-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var elem=$(this),position=elem.css("position");"absolute"!==position&&"fixed"!==position&&(maxHeight-=elem.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){maxHeight-=$(this).outerHeight(!0)}),this.panels.each(function(){$(this).height(Math.max(0,maxHeight-$(this).innerHeight()+$(this).height()))}).css("overflow","auto")):"auto"===heightStyle&&(maxHeight=0,this.panels.each(function(){maxHeight=Math.max(maxHeight,$(this).height("").height())}).height(maxHeight))},_eventHandler:function(event){var options=this.options,active=this.active,anchor=$(event.currentTarget),tab=anchor.closest("li"),clickedIsActive=tab[0]===active[0],collapsing=clickedIsActive&&options.collapsible,toShow=collapsing?$():this._getPanelForTab(tab),toHide=active.length?this._getPanelForTab(active):$(),eventData={oldTab:active,oldPanel:toHide,newTab:collapsing?$():tab,newPanel:toShow};event.preventDefault(),tab.hasClass("ui-state-disabled")||tab.hasClass("ui-tabs-loading")||this.running||clickedIsActive&&!options.collapsible||this._trigger("beforeActivate",event,eventData)===!1||(options.active=!collapsing&&this.tabs.index(tab),this.active=clickedIsActive?$():tab,this.xhr&&this.xhr.abort(),toHide.length||toShow.length||$.error("jQuery UI Tabs: Mismatching fragment identifier."),toShow.length&&this.load(this.tabs.index(tab),event),this._toggle(event,eventData))},_toggle:function(event,eventData){function complete(){that.running=!1,that._trigger("activate",event,eventData)}function show(){that._addClass(eventData.newTab.closest("li"),"ui-tabs-active","ui-state-active"),toShow.length&&that.options.show?that._show(toShow,that.options.show,complete):(toShow.show(),complete())}var that=this,toShow=eventData.newPanel,toHide=eventData.oldPanel;this.running=!0,toHide.length&&this.options.hide?this._hide(toHide,this.options.hide,function(){that._removeClass(eventData.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),show()}):(this._removeClass(eventData.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),toHide.hide(),show()),toHide.attr("aria-hidden","true"),eventData.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),toShow.length&&toHide.length?eventData.oldTab.attr("tabIndex",-1):toShow.length&&this.tabs.filter(function(){return 0===$(this).attr("tabIndex")}).attr("tabIndex",-1),toShow.attr("aria-hidden","false"),eventData.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(index){var anchor,active=this._findActive(index);active[0]!==this.active[0]&&(active.length||(active=this.active),anchor=active.find(".ui-tabs-anchor")[0],this._eventHandler({target:anchor,currentTarget:anchor,preventDefault:$.noop}))},_findActive:function(index){return index===!1?$():this.tabs.eq(index)},_getIndex:function(index){return"string"==typeof index&&(index=this.anchors.index(this.anchors.filter("[href$='"+$.ui.escapeSelector(index)+"']"))),index},_destroy:function(){this.xhr&&this.xhr.abort(),this.tablist.removeAttr("role").off(this.eventNamespace),this.anchors.removeAttr("role tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){$.data(this,"ui-tabs-destroy")?$(this).remove():$(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")}),this.tabs.each(function(){var li=$(this),prev=li.data("ui-tabs-aria-controls");prev?li.attr("aria-controls",prev).removeData("ui-tabs-aria-controls"):li.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(index){var disabled=this.options.disabled;disabled!==!1&&(void 0===index?disabled=!1:(index=this._getIndex(index),disabled=$.isArray(disabled)?$.map(disabled,function(num){return num!==index?num:null}):$.map(this.tabs,function(li,num){return num!==index?num:null})),this._setOptionDisabled(disabled))},disable:function(index){var disabled=this.options.disabled;if(disabled!==!0){if(void 0===index)disabled=!0;else{if(index=this._getIndex(index),$.inArray(index,disabled)!==-1)return;disabled=$.isArray(disabled)?$.merge([index],disabled).sort():[index]}this._setOptionDisabled(disabled)}},load:function(index,event){index=this._getIndex(index);var that=this,tab=this.tabs.eq(index),anchor=tab.find(".ui-tabs-anchor"),panel=this._getPanelForTab(tab),eventData={tab:tab,panel:panel},complete=function(jqXHR,status){"abort"===status&&that.panels.stop(!1,!0),that._removeClass(tab,"ui-tabs-loading"),panel.removeAttr("aria-busy"),jqXHR===that.xhr&&delete that.xhr};this._isLocal(anchor[0])||(this.xhr=$.ajax(this._ajaxSettings(anchor,event,eventData)),this.xhr&&"canceled"!==this.xhr.statusText&&(this._addClass(tab,"ui-tabs-loading"),panel.attr("aria-busy","true"),this.xhr.done(function(response,status,jqXHR){setTimeout(function(){panel.html(response),that._trigger("load",event,eventData),complete(jqXHR,status)},1)}).fail(function(jqXHR,status){setTimeout(function(){complete(jqXHR,status)},1)})))},_ajaxSettings:function(anchor,event,eventData){var that=this;return{url:anchor.attr("href"),beforeSend:function(jqXHR,settings){return that._trigger("beforeLoad",event,$.extend({jqXHR:jqXHR,ajaxSettings:settings},eventData))}}},_getPanelForTab:function(tab){var id=$(tab).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+id))}}),$.uiBackCompat!==!1&&$.widget("ui.tabs",$.ui.tabs,{_processTabs:function(){this._superApply(arguments),this._addClass(this.tabs,"ui-tab")}}),$.ui.tabs});