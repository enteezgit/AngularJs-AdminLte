!function(factory){"function"==typeof define&&define.amd?define(["jquery","./mouse","../data","../ie","../scroll-parent","../version","../widget"],factory):factory(jQuery)}(function($){return $.widget("ui.sortable",$.ui.mouse,{version:"1.12.0",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(x,reference,size){return x>=reference&&x<reference+size},_isFloating:function(item){return/left|right/.test(item.css("float"))||/inline|table-cell/.test(item.css("display"))},_create:function(){this.containerCache={},this._addClass("ui-sortable"),this.refresh(),this.offset=this.element.offset(),this._mouseInit(),this._setHandleClassName(),this.ready=!0},_setOption:function(key,value){this._super(key,value),"handle"===key&&this._setHandleClassName()},_setHandleClassName:function(){var that=this;this._removeClass(this.element.find(".ui-sortable-handle"),"ui-sortable-handle"),$.each(this.items,function(){that._addClass(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item,"ui-sortable-handle")})},_destroy:function(){this._mouseDestroy();for(var i=this.items.length-1;i>=0;i--)this.items[i].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(event,overrideHandle){var currentItem=null,validHandle=!1,that=this;return!this.reverting&&(!this.options.disabled&&"static"!==this.options.type&&(this._refreshItems(event),$(event.target).parents().each(function(){if($.data(this,that.widgetName+"-item")===that)return currentItem=$(this),!1}),$.data(event.target,that.widgetName+"-item")===that&&(currentItem=$(event.target)),!!currentItem&&(!(this.options.handle&&!overrideHandle&&($(this.options.handle,currentItem).find("*").addBack().each(function(){this===event.target&&(validHandle=!0)}),!validHandle))&&(this.currentItem=currentItem,this._removeCurrentsFromItems(),!0))))},_mouseStart:function(event,overrideHandle,noActivation){var i,body,o=this.options;if(this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(event),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},$.extend(this.offset,{click:{left:event.pageX-this.offset.left,top:event.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(event),this.originalPageX=event.pageX,this.originalPageY=event.pageY,o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),o.containment&&this._setContainment(),o.cursor&&"auto"!==o.cursor&&(body=this.document.find("body"),this.storedCursor=body.css("cursor"),body.css("cursor",o.cursor),this.storedStylesheet=$("<style>*{ cursor: "+o.cursor+" !important; }</style>").appendTo(body)),o.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",o.opacity)),o.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",o.zIndex)),this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",event,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions(),!noActivation)for(i=this.containers.length-1;i>=0;i--)this.containers[i]._trigger("activate",event,this._uiHash(this));return $.ui.ddmanager&&($.ui.ddmanager.current=this),$.ui.ddmanager&&!o.dropBehaviour&&$.ui.ddmanager.prepareOffsets(this,event),this.dragging=!0,this._addClass(this.helper,"ui-sortable-helper"),this._mouseDrag(event),!0},_mouseDrag:function(event){var i,item,itemElement,intersection,o=this.options,scrolled=!1;for(this.position=this._generatePosition(event),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-event.pageY<o.scrollSensitivity?this.scrollParent[0].scrollTop=scrolled=this.scrollParent[0].scrollTop+o.scrollSpeed:event.pageY-this.overflowOffset.top<o.scrollSensitivity&&(this.scrollParent[0].scrollTop=scrolled=this.scrollParent[0].scrollTop-o.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-event.pageX<o.scrollSensitivity?this.scrollParent[0].scrollLeft=scrolled=this.scrollParent[0].scrollLeft+o.scrollSpeed:event.pageX-this.overflowOffset.left<o.scrollSensitivity&&(this.scrollParent[0].scrollLeft=scrolled=this.scrollParent[0].scrollLeft-o.scrollSpeed)):(event.pageY-this.document.scrollTop()<o.scrollSensitivity?scrolled=this.document.scrollTop(this.document.scrollTop()-o.scrollSpeed):this.window.height()-(event.pageY-this.document.scrollTop())<o.scrollSensitivity&&(scrolled=this.document.scrollTop(this.document.scrollTop()+o.scrollSpeed)),event.pageX-this.document.scrollLeft()<o.scrollSensitivity?scrolled=this.document.scrollLeft(this.document.scrollLeft()-o.scrollSpeed):this.window.width()-(event.pageX-this.document.scrollLeft())<o.scrollSensitivity&&(scrolled=this.document.scrollLeft(this.document.scrollLeft()+o.scrollSpeed))),scrolled!==!1&&$.ui.ddmanager&&!o.dropBehaviour&&$.ui.ddmanager.prepareOffsets(this,event)),this.positionAbs=this._convertPositionTo("absolute"),this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(item=this.items[i],itemElement=item.item[0],intersection=this._intersectsWithPointer(item),intersection&&item.instance===this.currentContainer&&!(itemElement===this.currentItem[0]||this.placeholder[1===intersection?"next":"prev"]()[0]===itemElement||$.contains(this.placeholder[0],itemElement)||"semi-dynamic"===this.options.type&&$.contains(this.element[0],itemElement))){if(this.direction=1===intersection?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(item))break;this._rearrange(event,item),this._trigger("change",event,this._uiHash());break}return this._contactContainers(event),$.ui.ddmanager&&$.ui.ddmanager.drag(this,event),this._trigger("sort",event,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(event,noPropagation){if(event){if($.ui.ddmanager&&!this.options.dropBehaviour&&$.ui.ddmanager.drop(this,event),this.options.revert){var that=this,cur=this.placeholder.offset(),axis=this.options.axis,animation={};axis&&"x"!==axis||(animation.left=cur.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),axis&&"y"!==axis||(animation.top=cur.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,$(this.helper).animate(animation,parseInt(this.options.revert,10)||500,function(){that._clear(event)})}else this._clear(event,noPropagation);return!1}},cancel:function(){if(this.dragging){this._mouseUp({target:null}),"original"===this.options.helper?(this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")):this.currentItem.show();for(var i=this.containers.length-1;i>=0;i--)this.containers[i]._trigger("deactivate",null,this._uiHash(this)),this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",null,this._uiHash(this)),this.containers[i].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),$.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?$(this.domPosition.prev).after(this.currentItem):$(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(o){var items=this._getItemsAsjQuery(o&&o.connected),str=[];return o=o||{},$(items).each(function(){var res=($(o.item||this).attr(o.attribute||"id")||"").match(o.expression||/(.+)[\-=_](.+)/);res&&str.push((o.key||res[1]+"[]")+"="+(o.key&&o.expression?res[1]:res[2]))}),!str.length&&o.key&&str.push(o.key+"="),str.join("&")},toArray:function(o){var items=this._getItemsAsjQuery(o&&o.connected),ret=[];return o=o||{},items.each(function(){ret.push($(o.item||this).attr(o.attribute||"id")||"")}),ret},_intersectsWith:function(item){var x1=this.positionAbs.left,x2=x1+this.helperProportions.width,y1=this.positionAbs.top,y2=y1+this.helperProportions.height,l=item.left,r=l+item.width,t=item.top,b=t+item.height,dyClick=this.offset.click.top,dxClick=this.offset.click.left,isOverElementHeight="x"===this.options.axis||y1+dyClick>t&&y1+dyClick<b,isOverElementWidth="y"===this.options.axis||x1+dxClick>l&&x1+dxClick<r,isOverElement=isOverElementHeight&&isOverElementWidth;return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>item[this.floating?"width":"height"]?isOverElement:l<x1+this.helperProportions.width/2&&x2-this.helperProportions.width/2<r&&t<y1+this.helperProportions.height/2&&y2-this.helperProportions.height/2<b},_intersectsWithPointer:function(item){var verticalDirection,horizontalDirection,isOverElementHeight="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,item.top,item.height),isOverElementWidth="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,item.left,item.width),isOverElement=isOverElementHeight&&isOverElementWidth;return!!isOverElement&&(verticalDirection=this._getDragVerticalDirection(),horizontalDirection=this._getDragHorizontalDirection(),this.floating?"right"===horizontalDirection||"down"===verticalDirection?2:1:verticalDirection&&("down"===verticalDirection?2:1))},_intersectsWithSides:function(item){var isOverBottomHalf=this._isOverAxis(this.positionAbs.top+this.offset.click.top,item.top+item.height/2,item.height),isOverRightHalf=this._isOverAxis(this.positionAbs.left+this.offset.click.left,item.left+item.width/2,item.width),verticalDirection=this._getDragVerticalDirection(),horizontalDirection=this._getDragHorizontalDirection();return this.floating&&horizontalDirection?"right"===horizontalDirection&&isOverRightHalf||"left"===horizontalDirection&&!isOverRightHalf:verticalDirection&&("down"===verticalDirection&&isOverBottomHalf||"up"===verticalDirection&&!isOverBottomHalf)},_getDragVerticalDirection:function(){var delta=this.positionAbs.top-this.lastPositionAbs.top;return 0!==delta&&(delta>0?"down":"up")},_getDragHorizontalDirection:function(){var delta=this.positionAbs.left-this.lastPositionAbs.left;return 0!==delta&&(delta>0?"right":"left")},refresh:function(event){return this._refreshItems(event),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var options=this.options;return options.connectWith.constructor===String?[options.connectWith]:options.connectWith},_getItemsAsjQuery:function(connected){function addItems(){items.push(this)}var i,j,cur,inst,items=[],queries=[],connectWith=this._connectWith();if(connectWith&&connected)for(i=connectWith.length-1;i>=0;i--)for(cur=$(connectWith[i],this.document[0]),j=cur.length-1;j>=0;j--)inst=$.data(cur[j],this.widgetFullName),inst&&inst!==this&&!inst.options.disabled&&queries.push([$.isFunction(inst.options.items)?inst.options.items.call(inst.element):$(inst.options.items,inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),inst]);for(queries.push([$.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):$(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),i=queries.length-1;i>=0;i--)queries[i][0].each(addItems);return $(items)},_removeCurrentsFromItems:function(){var list=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=$.grep(this.items,function(item){for(var j=0;j<list.length;j++)if(list[j]===item.item[0])return!1;return!0})},_refreshItems:function(event){this.items=[],this.containers=[this];var i,j,cur,inst,targetData,_queries,item,queriesLength,items=this.items,queries=[[$.isFunction(this.options.items)?this.options.items.call(this.element[0],event,{item:this.currentItem}):$(this.options.items,this.element),this]],connectWith=this._connectWith();if(connectWith&&this.ready)for(i=connectWith.length-1;i>=0;i--)for(cur=$(connectWith[i],this.document[0]),j=cur.length-1;j>=0;j--)inst=$.data(cur[j],this.widgetFullName),inst&&inst!==this&&!inst.options.disabled&&(queries.push([$.isFunction(inst.options.items)?inst.options.items.call(inst.element[0],event,{item:this.currentItem}):$(inst.options.items,inst.element),inst]),this.containers.push(inst));for(i=queries.length-1;i>=0;i--)for(targetData=queries[i][1],_queries=queries[i][0],j=0,queriesLength=_queries.length;j<queriesLength;j++)item=$(_queries[j]),item.data(this.widgetName+"-item",targetData),items.push({item:item,instance:targetData,width:0,height:0,left:0,top:0})},refreshPositions:function(fast){this.floating=!!this.items.length&&("x"===this.options.axis||this._isFloating(this.items[0].item)),this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,item,t,p;for(i=this.items.length-1;i>=0;i--)item=this.items[i],item.instance!==this.currentContainer&&this.currentContainer&&item.item[0]!==this.currentItem[0]||(t=this.options.toleranceElement?$(this.options.toleranceElement,item.item):item.item,fast||(item.width=t.outerWidth(),item.height=t.outerHeight()),p=t.offset(),item.left=p.left,item.top=p.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)p=this.containers[i].element.offset(),this.containers[i].containerCache.left=p.left,this.containers[i].containerCache.top=p.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(that){that=that||this;var className,o=that.options;o.placeholder&&o.placeholder.constructor!==String||(className=o.placeholder,o.placeholder={element:function(){var nodeName=that.currentItem[0].nodeName.toLowerCase(),element=$("<"+nodeName+">",that.document[0]);return that._addClass(element,"ui-sortable-placeholder",className||that.currentItem[0].className)._removeClass(element,"ui-sortable-helper"),"tbody"===nodeName?that._createTrPlaceholder(that.currentItem.find("tr").eq(0),$("<tr>",that.document[0]).appendTo(element)):"tr"===nodeName?that._createTrPlaceholder(that.currentItem,element):"img"===nodeName&&element.attr("src",that.currentItem.attr("src")),className||element.css("visibility","hidden"),element},update:function(container,p){className&&!o.forcePlaceholderSize||(p.height()||p.height(that.currentItem.innerHeight()-parseInt(that.currentItem.css("paddingTop")||0,10)-parseInt(that.currentItem.css("paddingBottom")||0,10)),p.width()||p.width(that.currentItem.innerWidth()-parseInt(that.currentItem.css("paddingLeft")||0,10)-parseInt(that.currentItem.css("paddingRight")||0,10)))}}),that.placeholder=$(o.placeholder.element.call(that.element,that.currentItem)),that.currentItem.after(that.placeholder),o.placeholder.update(that,that.placeholder)},_createTrPlaceholder:function(sourceTr,targetTr){var that=this;sourceTr.children().each(function(){$("<td>&#160;</td>",that.document[0]).attr("colspan",$(this).attr("colspan")||1).appendTo(targetTr)})},_contactContainers:function(event){var i,j,dist,itemWithLeastDistance,posProperty,sizeProperty,cur,nearBottom,floating,axis,innermostContainer=null,innermostIndex=null;for(i=this.containers.length-1;i>=0;i--)if(!$.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){if(innermostContainer&&$.contains(this.containers[i].element[0],innermostContainer.element[0]))continue;innermostContainer=this.containers[i],innermostIndex=i}else this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",event,this._uiHash(this)),this.containers[i].containerCache.over=0);if(innermostContainer)if(1===this.containers.length)this.containers[innermostIndex].containerCache.over||(this.containers[innermostIndex]._trigger("over",event,this._uiHash(this)),this.containers[innermostIndex].containerCache.over=1);else{for(dist=1e4,itemWithLeastDistance=null,floating=innermostContainer.floating||this._isFloating(this.currentItem),posProperty=floating?"left":"top",sizeProperty=floating?"width":"height",axis=floating?"pageX":"pageY",j=this.items.length-1;j>=0;j--)$.contains(this.containers[innermostIndex].element[0],this.items[j].item[0])&&this.items[j].item[0]!==this.currentItem[0]&&(cur=this.items[j].item.offset()[posProperty],nearBottom=!1,event[axis]-cur>this.items[j][sizeProperty]/2&&(nearBottom=!0),Math.abs(event[axis]-cur)<dist&&(dist=Math.abs(event[axis]-cur),itemWithLeastDistance=this.items[j],this.direction=nearBottom?"up":"down"));if(!itemWithLeastDistance&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[innermostIndex])return void(this.currentContainer.containerCache.over||(this.containers[innermostIndex]._trigger("over",event,this._uiHash()),this.currentContainer.containerCache.over=1));itemWithLeastDistance?this._rearrange(event,itemWithLeastDistance,null,!0):this._rearrange(event,null,this.containers[innermostIndex].element,!0),this._trigger("change",event,this._uiHash()),this.containers[innermostIndex]._trigger("change",event,this._uiHash(this)),this.currentContainer=this.containers[innermostIndex],this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[innermostIndex]._trigger("over",event,this._uiHash(this)),this.containers[innermostIndex].containerCache.over=1}},_createHelper:function(event){var o=this.options,helper=$.isFunction(o.helper)?$(o.helper.apply(this.element[0],[event,this.currentItem])):"clone"===o.helper?this.currentItem.clone():this.currentItem;return helper.parents("body").length||$("parent"!==o.appendTo?o.appendTo:this.currentItem[0].parentNode)[0].appendChild(helper[0]),helper[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),helper[0].style.width&&!o.forceHelperSize||helper.width(this.currentItem.width()),helper[0].style.height&&!o.forceHelperSize||helper.height(this.currentItem.height()),helper},_adjustOffsetFromHelper:function(obj){"string"==typeof obj&&(obj=obj.split(" ")),$.isArray(obj)&&(obj={left:+obj[0],top:+obj[1]||0}),"left"in obj&&(this.offset.click.left=obj.left+this.margins.left),"right"in obj&&(this.offset.click.left=this.helperProportions.width-obj.right+this.margins.left),"top"in obj&&(this.offset.click.top=obj.top+this.margins.top),"bottom"in obj&&(this.offset.click.top=this.helperProportions.height-obj.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var po=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&$.contains(this.scrollParent[0],this.offsetParent[0])&&(po.left+=this.scrollParent.scrollLeft(),po.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&$.ui.ie)&&(po={top:0,left:0}),{top:po.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:po.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var p=this.currentItem.position();return{top:p.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:p.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var ce,co,over,o=this.options;"parent"===o.containment&&(o.containment=this.helper[0].parentNode),"document"!==o.containment&&"window"!==o.containment||(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===o.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===o.containment?this.document.height()||document.body.parentNode.scrollHeight:this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(o.containment)||(ce=$(o.containment)[0],co=$(o.containment).offset(),over="hidden"!==$(ce).css("overflow"),this.containment=[co.left+(parseInt($(ce).css("borderLeftWidth"),10)||0)+(parseInt($(ce).css("paddingLeft"),10)||0)-this.margins.left,co.top+(parseInt($(ce).css("borderTopWidth"),10)||0)+(parseInt($(ce).css("paddingTop"),10)||0)-this.margins.top,co.left+(over?Math.max(ce.scrollWidth,ce.offsetWidth):ce.offsetWidth)-(parseInt($(ce).css("borderLeftWidth"),10)||0)-(parseInt($(ce).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,co.top+(over?Math.max(ce.scrollHeight,ce.offsetHeight):ce.offsetHeight)-(parseInt($(ce).css("borderTopWidth"),10)||0)-(parseInt($(ce).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(d,pos){pos||(pos=this.position);var mod="absolute"===d?1:-1,scroll="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&$.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,scrollIsRootNode=/(html|body)/i.test(scroll[0].tagName);return{top:pos.top+this.offset.relative.top*mod+this.offset.parent.top*mod-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():scrollIsRootNode?0:scroll.scrollTop())*mod,left:pos.left+this.offset.relative.left*mod+this.offset.parent.left*mod-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():scrollIsRootNode?0:scroll.scrollLeft())*mod}},_generatePosition:function(event){var top,left,o=this.options,pageX=event.pageX,pageY=event.pageY,scroll="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&$.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,scrollIsRootNode=/(html|body)/i.test(scroll[0].tagName);return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(event.pageX-this.offset.click.left<this.containment[0]&&(pageX=this.containment[0]+this.offset.click.left),event.pageY-this.offset.click.top<this.containment[1]&&(pageY=this.containment[1]+this.offset.click.top),event.pageX-this.offset.click.left>this.containment[2]&&(pageX=this.containment[2]+this.offset.click.left),event.pageY-this.offset.click.top>this.containment[3]&&(pageY=this.containment[3]+this.offset.click.top)),o.grid&&(top=this.originalPageY+Math.round((pageY-this.originalPageY)/o.grid[1])*o.grid[1],pageY=this.containment?top-this.offset.click.top>=this.containment[1]&&top-this.offset.click.top<=this.containment[3]?top:top-this.offset.click.top>=this.containment[1]?top-o.grid[1]:top+o.grid[1]:top,left=this.originalPageX+Math.round((pageX-this.originalPageX)/o.grid[0])*o.grid[0],pageX=this.containment?left-this.offset.click.left>=this.containment[0]&&left-this.offset.click.left<=this.containment[2]?left:left-this.offset.click.left>=this.containment[0]?left-o.grid[0]:left+o.grid[0]:left)),{top:pageY-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():scrollIsRootNode?0:scroll.scrollTop()),left:pageX-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():scrollIsRootNode?0:scroll.scrollLeft())}},_rearrange:function(event,i,a,hardRefresh){a?a[0].appendChild(this.placeholder[0]):i.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?i.item[0]:i.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var counter=this.counter;this._delay(function(){counter===this.counter&&this.refreshPositions(!hardRefresh)})},_clear:function(event,noPropagation){function delayEvent(type,instance,container){return function(event){container._trigger(type,event,instance._uiHash(instance))}}this.reverting=!1;var i,delayedTriggers=[];if(!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(i in this._storedCSS)"auto"!==this._storedCSS[i]&&"static"!==this._storedCSS[i]||(this._storedCSS[i]="");this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!noPropagation&&delayedTriggers.push(function(event){this._trigger("receive",event,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||noPropagation||delayedTriggers.push(function(event){this._trigger("update",event,this._uiHash())}),this!==this.currentContainer&&(noPropagation||(delayedTriggers.push(function(event){this._trigger("remove",event,this._uiHash())}),delayedTriggers.push(function(c){return function(event){c._trigger("receive",event,this._uiHash(this))}}.call(this,this.currentContainer)),delayedTriggers.push(function(c){return function(event){c._trigger("update",event,this._uiHash(this))}}.call(this,this.currentContainer)))),i=this.containers.length-1;i>=0;i--)noPropagation||delayedTriggers.push(delayEvent("deactivate",this,this.containers[i])),this.containers[i].containerCache.over&&(delayedTriggers.push(delayEvent("out",this,this.containers[i])),this.containers[i].containerCache.over=0);if(this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,noPropagation||this._trigger("beforeStop",event,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!noPropagation){for(i=0;i<delayedTriggers.length;i++)delayedTriggers[i].call(this,event);this._trigger("stop",event,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){$.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(_inst){var inst=_inst||this;return{helper:inst.helper,placeholder:inst.placeholder||$([]),position:inst.position,originalPosition:inst.originalPosition,offset:inst.positionAbs,item:inst.currentItem,sender:_inst?_inst.element:null}}})});