!function(factory){"function"==typeof define&&define.amd?define(["jquery","../keycode","../position","../safe-active-element","../unique-id","../version","../widget"],factory):factory(jQuery)}(function($){return $.widget("ui.menu",{version:"1.12.0",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().attr({role:this.options.role,tabIndex:0}),this._addClass("ui-menu","ui-widget ui-widget-content"),this._on({"mousedown .ui-menu-item":function(event){event.preventDefault()},"click .ui-menu-item":function(event){var target=$(event.target),active=$($.ui.safeActiveElement(this.document[0]));!this.mouseHandled&&target.not(".ui-state-disabled").length&&(this.select(event),event.isPropagationStopped()||(this.mouseHandled=!0),target.has(".ui-menu").length?this.expand(event):!this.element.is(":focus")&&active.closest(".ui-menu").length&&(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(event){if(!this.previousFilter){var actualTarget=$(event.target).closest(".ui-menu-item"),target=$(event.currentTarget);actualTarget[0]===target[0]&&(this._removeClass(target.siblings().children(".ui-state-active"),null,"ui-state-active"),this.focus(event,target))}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(event,keepActiveItem){var item=this.active||this.element.find(this.options.items).eq(0);keepActiveItem||this.focus(event,item)},blur:function(event){this._delay(function(){var notContained=!$.contains(this.element[0],$.ui.safeActiveElement(this.document[0]));notContained&&this.collapseAll(event)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(event){this._closeOnDocumentClick(event)&&this.collapseAll(event),this.mouseHandled=!1}})},_destroy:function(){var items=this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),submenus=items.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),submenus.children().each(function(){var elem=$(this);elem.data("ui-menu-submenu-caret")&&elem.remove()})},_keydown:function(event){var match,prev,character,skip,preventDefault=!0;switch(event.keyCode){case $.ui.keyCode.PAGE_UP:this.previousPage(event);break;case $.ui.keyCode.PAGE_DOWN:this.nextPage(event);break;case $.ui.keyCode.HOME:this._move("first","first",event);break;case $.ui.keyCode.END:this._move("last","last",event);break;case $.ui.keyCode.UP:this.previous(event);break;case $.ui.keyCode.DOWN:this.next(event);break;case $.ui.keyCode.LEFT:this.collapse(event);break;case $.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(event);break;case $.ui.keyCode.ENTER:case $.ui.keyCode.SPACE:this._activate(event);break;case $.ui.keyCode.ESCAPE:this.collapse(event);break;default:preventDefault=!1,prev=this.previousFilter||"",character=String.fromCharCode(event.keyCode),skip=!1,clearTimeout(this.filterTimer),character===prev?skip=!0:character=prev+character,match=this._filterMenuItems(character),match=skip&&match.index(this.active.next())!==-1?this.active.nextAll(".ui-menu-item"):match,match.length||(character=String.fromCharCode(event.keyCode),match=this._filterMenuItems(character)),match.length?(this.focus(event,match),this.previousFilter=character,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}preventDefault&&event.preventDefault()},_activate:function(event){this.active&&!this.active.is(".ui-state-disabled")&&(this.active.children("[aria-haspopup='true']").length?this.expand(event):this.select(event))},refresh:function(){var menus,items,newSubmenus,newItems,newWrappers,that=this,icon=this.options.icons.submenu,submenus=this.element.find(this.options.menus);this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length),newSubmenus=submenus.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var menu=$(this),item=menu.prev(),submenuCaret=$("<span>").data("ui-menu-submenu-caret",!0);that._addClass(submenuCaret,"ui-menu-icon","ui-icon "+icon),item.attr("aria-haspopup","true").prepend(submenuCaret),menu.attr("aria-labelledby",item.attr("id"))}),this._addClass(newSubmenus,"ui-menu","ui-widget ui-widget-content ui-front"),menus=submenus.add(this.element),items=menus.find(this.options.items),items.not(".ui-menu-item").each(function(){var item=$(this);that._isDivider(item)&&that._addClass(item,"ui-menu-divider","ui-widget-content")}),newItems=items.not(".ui-menu-item, .ui-menu-divider"),newWrappers=newItems.children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),this._addClass(newItems,"ui-menu-item")._addClass(newWrappers,"ui-menu-item-wrapper"),items.filter(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!$.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(key,value){if("icons"===key){var icons=this.element.find(".ui-menu-icon");this._removeClass(icons,null,this.options.icons.submenu)._addClass(icons,null,value.submenu)}this._super(key,value)},_setOptionDisabled:function(value){this._super(value),this.element.attr("aria-disabled",String(value)),this._toggleClass(null,"ui-state-disabled",!!value)},focus:function(event,item){var nested,focused,activeParent;this.blur(event,event&&"focus"===event.type),this._scrollIntoView(item),this.active=item.first(),focused=this.active.children(".ui-menu-item-wrapper"),this._addClass(focused,null,"ui-state-active"),this.options.role&&this.element.attr("aria-activedescendant",focused.attr("id")),activeParent=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),this._addClass(activeParent,null,"ui-state-active"),event&&"keydown"===event.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),nested=item.children(".ui-menu"),nested.length&&event&&/^mouse/.test(event.type)&&this._startOpening(nested),this.activeMenu=item.parent(),this._trigger("focus",event,{item:item})},_scrollIntoView:function(item){var borderTop,paddingTop,offset,scroll,elementHeight,itemHeight;this._hasScroll()&&(borderTop=parseFloat($.css(this.activeMenu[0],"borderTopWidth"))||0,paddingTop=parseFloat($.css(this.activeMenu[0],"paddingTop"))||0,offset=item.offset().top-this.activeMenu.offset().top-borderTop-paddingTop,scroll=this.activeMenu.scrollTop(),elementHeight=this.activeMenu.height(),itemHeight=item.outerHeight(),offset<0?this.activeMenu.scrollTop(scroll+offset):offset+itemHeight>elementHeight&&this.activeMenu.scrollTop(scroll+offset-elementHeight+itemHeight))},blur:function(event,fromFocus){fromFocus||clearTimeout(this.timer),this.active&&(this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active"),this._trigger("blur",event,{item:this.active}),this.active=null)},_startOpening:function(submenu){clearTimeout(this.timer),"true"===submenu.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(submenu)},this.delay))},_open:function(submenu){var position=$.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(submenu.parents(".ui-menu")).hide().attr("aria-hidden","true"),submenu.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(position)},collapseAll:function(event,all){clearTimeout(this.timer),this.timer=this._delay(function(){var currentMenu=all?this.element:$(event&&event.target).closest(this.element.find(".ui-menu"));currentMenu.length||(currentMenu=this.element),this._close(currentMenu),this.blur(event),this._removeClass(currentMenu.find(".ui-state-active"),null,"ui-state-active"),this.activeMenu=currentMenu},this.delay)},_close:function(startMenu){startMenu||(startMenu=this.active?this.active.parent():this.element),startMenu.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")},_closeOnDocumentClick:function(event){return!$(event.target).closest(".ui-menu").length},_isDivider:function(item){return!/[^\-\u2014\u2013\s]/.test(item.text())},collapse:function(event){var newItem=this.active&&this.active.parent().closest(".ui-menu-item",this.element);newItem&&newItem.length&&(this._close(),this.focus(event,newItem))},expand:function(event){var newItem=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();newItem&&newItem.length&&(this._open(newItem.parent()),this._delay(function(){this.focus(event,newItem)}))},next:function(event){this._move("next","first",event)},previous:function(event){this._move("prev","last",event)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(direction,filter,event){var next;this.active&&(next="first"===direction||"last"===direction?this.active["first"===direction?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[direction+"All"](".ui-menu-item").eq(0)),next&&next.length&&this.active||(next=this.activeMenu.find(this.options.items)[filter]()),this.focus(event,next)},nextPage:function(event){var item,base,height;return this.active?void(this.isLastItem()||(this._hasScroll()?(base=this.active.offset().top,height=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return item=$(this),item.offset().top-base-height<0}),this.focus(event,item)):this.focus(event,this.activeMenu.find(this.options.items)[this.active?"last":"first"]()))):void this.next(event)},previousPage:function(event){var item,base,height;return this.active?void(this.isFirstItem()||(this._hasScroll()?(base=this.active.offset().top,height=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return item=$(this),item.offset().top-base+height>0}),this.focus(event,item)):this.focus(event,this.activeMenu.find(this.options.items).first()))):void this.next(event)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(event){this.active=this.active||$(event.target).closest(".ui-menu-item");var ui={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(event,!0),this._trigger("select",event,ui)},_filterMenuItems:function(character){var escapedCharacter=character.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),regex=new RegExp("^"+escapedCharacter,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return regex.test($.trim($(this).children(".ui-menu-item-wrapper").text()))})}})});