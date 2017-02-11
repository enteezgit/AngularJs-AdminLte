var KeyTable;!function(window,document,undefined){var factory=function($,DataTable){"use strict";return KeyTable=function(oInit){function _fnEventAddTemplate(sKey){return function(x,y,z){if(null!==x&&"number"!=typeof x||null!==y&&"number"!=typeof y||"function"!=typeof z)if("object"==typeof x&&"function"==typeof y){var aCoords=_fnCoordsFromCell(x);_fnEventAdd(sKey,aCoords[0],aCoords[1],y)}else alert("Unhandable event type was added: x"+x+"  y:"+y+"  z:"+z);else _fnEventAdd(sKey,x,y,z)}}function _fnEventRemoveTemplate(sKey){return function(x,y,z){if(null!==x&&"number"!=typeof arguments[0]||null!==y&&"number"!=typeof arguments[1])if("object"==typeof arguments[0]){var aCoords=_fnCoordsFromCell(x);"function"==typeof arguments[1]?_fnEventRemove(sKey,aCoords[0],aCoords[1],y):_fnEventRemove(sKey,aCoords[0],aCoords[1])}else alert("Unhandable event type was removed: x"+x+"  y:"+y+"  z:"+z);else"function"==typeof arguments[2]?_fnEventRemove(sKey,x,y,z):_fnEventRemove(sKey,x,y)}}function _fnEventAdd(sType,x,y,fn){_oaoEvents[sType].push({x:x,y:y,fn:fn})}function _fnEventRemove(sType,x,y,fn){for(var iCorrector=0,i=0,iLen=_oaoEvents[sType].length;i<iLen-iCorrector;i++)if("undefined"!=typeof fn)_oaoEvents[sType][i-iCorrector].x==x&&_oaoEvents[sType][i-iCorrector].y==y&&_oaoEvents[sType][i-iCorrector].fn==fn&&(_oaoEvents[sType].splice(i-iCorrector,1),iCorrector++);else if(_oaoEvents[sType][i-iCorrector].x==x&&_oaoEvents[sType][i-iCorrector].y==y)return _oaoEvents[sType].splice(i,1),1;return iCorrector}function _fnEventFire(sType,x,y){for(var iFired=0,aEvents=_oaoEvents[sType],i=0;i<aEvents.length;i++)(aEvents[i].x==x&&aEvents[i].y==y||null===aEvents[i].x&&aEvents[i].y==y||aEvents[i].x==x&&null===aEvents[i].y||null===aEvents[i].x&&null===aEvents[i].y)&&(aEvents[i].fn(_fnCellFromCoords(x,y),x,y),iFired++);return iFired}function _fnSetFocus(nTarget,bAutoScroll){if(_nOldFocus!=nTarget){"undefined"==typeof bAutoScroll&&(bAutoScroll=!0),null!==_nOldFocus&&_fnRemoveFocus(_nOldFocus),$(nTarget).addClass(_sFocusClass),$(nTarget).parent().addClass(_sFocusClass);var oSettings;if(_oDatatable){oSettings=_oDatatable;for(var iRow=_fnFindDtCell(nTarget)[1],bKeyCaptureCache=_bKeyCapture;iRow>=oSettings.fnDisplayEnd();)oSettings._iDisplayLength>=0?oSettings._iDisplayStart+oSettings._iDisplayLength<oSettings.fnRecordsDisplay()&&(oSettings._iDisplayStart+=oSettings._iDisplayLength):oSettings._iDisplayStart=0,_oDatatable.oApi._fnCalculateEnd(oSettings);for(;iRow<oSettings._iDisplayStart;)oSettings._iDisplayStart=oSettings._iDisplayLength>=0?oSettings._iDisplayStart-oSettings._iDisplayLength:0,oSettings._iDisplayStart<0&&(oSettings._iDisplayStart=0),_oDatatable.oApi._fnCalculateEnd(oSettings);_oDatatable.oApi._fnDraw(oSettings),_bKeyCapture=bKeyCaptureCache}var aNewPos=_fnCoordsFromCell(nTarget);_nOldFocus=nTarget,_iOldX=aNewPos[0],_iOldY=aNewPos[1];var iViewportHeight,iViewportWidth,iScrollTop,iScrollLeft,iHeight,iWidth,aiPos;if(bAutoScroll&&(iViewportHeight=$(window).height(),iViewportWidth=$(window).width(),iScrollTop=$(document).scrollTop(),iScrollLeft=$(document).scrollLeft(),iHeight=nTarget.offsetHeight,iWidth=nTarget.offsetWidth,aiPos=_fnGetPos(nTarget),!_oDatatable||"undefined"==typeof oSettings.oScroll||""===oSettings.oScroll.sX&&""===oSettings.oScroll.sY||(aiPos[1]-=$(oSettings.nTable.parentNode).scrollTop(),aiPos[0]-=$(oSettings.nTable.parentNode).scrollLeft()),aiPos[1]+iHeight>iScrollTop+iViewportHeight?_fnSetScrollTop(aiPos[1]+iHeight-iViewportHeight):aiPos[1]<iScrollTop&&_fnSetScrollTop(aiPos[1]),aiPos[0]+iWidth>iScrollLeft+iViewportWidth?_fnSetScrollLeft(aiPos[0]+iWidth-iViewportWidth):aiPos[0]<iScrollLeft&&_fnSetScrollLeft(aiPos[0])),_oDatatable&&"undefined"!=typeof oSettings.oScroll&&(""!==oSettings.oScroll.sX||""!==oSettings.oScroll.sY)){var dtScrollBody=oSettings.nTable.parentNode;iViewportHeight=dtScrollBody.clientHeight,iViewportWidth=dtScrollBody.clientWidth,iScrollTop=dtScrollBody.scrollTop,iScrollLeft=dtScrollBody.scrollLeft,iHeight=nTarget.offsetHeight,iWidth=nTarget.offsetWidth,nTarget.offsetTop+iHeight>iViewportHeight+iScrollTop?dtScrollBody.scrollTop=nTarget.offsetTop+iHeight-iViewportHeight:nTarget.offsetTop<iScrollTop&&(dtScrollBody.scrollTop=nTarget.offsetTop),nTarget.offsetLeft+iWidth>iViewportWidth+iScrollLeft?dtScrollBody.scrollLeft=nTarget.offsetLeft+iWidth-iViewportWidth:nTarget.offsetLeft<iScrollLeft&&(dtScrollBody.scrollLeft=nTarget.offsetLeft)}_fnCaptureKeys(),_fnEventFire("focus",_iOldX,_iOldY)}}function _fnBlur(){_fnRemoveFocus(_nOldFocus),_iOldX=null,_iOldY=null,_nOldFocus=null,_fnReleaseKeys()}function _fnRemoveFocus(nTarget){$(nTarget).removeClass(_sFocusClass),$(nTarget).parent().removeClass(_sFocusClass),_fnEventFire("blur",_iOldX,_iOldY)}function _fnClick(e){for(var nTarget=this;"TD"!=nTarget.nodeName;)nTarget=nTarget.parentNode;_fnSetFocus(nTarget),_fnCaptureKeys()}function _fnKey(e){if(_that.block||!_bKeyCapture)return!0;if(e.metaKey||e.altKey||e.ctrlKey)return!0;var x,y,iTableHeight,iTableWidth=_nBody.getElementsByTagName("tr")[0].getElementsByTagName("td").length;if(_oDatatable){iTableHeight=_oDatatable.aiDisplay.length;var aDtPos=_fnFindDtCell(_nOldFocus);if(null===aDtPos)return;_iOldX=aDtPos[0],_iOldY=aDtPos[1]}else iTableHeight=_nBody.getElementsByTagName("tr").length;var iKey=9==e.keyCode&&e.shiftKey?-1:e.keyCode;switch(iKey){case 13:return e.preventDefault(),e.stopPropagation(),_fnEventFire("action",_iOldX,_iOldY),!0;case 27:if(!_fnEventFire("esc",_iOldX,_iOldY))return void _fnBlur();x=_iOldX,y=_iOldY;break;case-1:case 37:if(_iOldX>0)x=_iOldX-1,y=_iOldY;else{if(!(_iOldY>0))return!(iKey!=-1||!_bForm)&&(_bInputFocused=!0,_nInput.focus(),setTimeout(function(){_bInputFocused=!1},0),_bKeyCapture=!1,_fnBlur(),!0);x=iTableWidth-1,y=_iOldY-1}break;case 38:if(!(_iOldY>0))return!1;x=_iOldX,y=_iOldY-1;break;case 36:x=_iOldX,y=0;break;case 33:x=_iOldX,y=_iOldY-10,y<0&&(y=0);break;case 9:case 39:if(_iOldX<iTableWidth-1)x=_iOldX+1,y=_iOldY;else{if(!(_iOldY<iTableHeight-1))return!(9!=iKey||!_bForm)&&(_bInputFocused=!0,_nInput.focus(),setTimeout(function(){_bInputFocused=!1},0),_bKeyCapture=!1,_fnBlur(),!0);x=0,y=_iOldY+1}break;case 40:if(!(_iOldY<iTableHeight-1))return!1;x=_iOldX,y=_iOldY+1;break;case 35:x=_iOldX,y=iTableHeight-1;break;case 34:x=_iOldX,y=_iOldY+10,y>iTableHeight-1&&(y=iTableHeight-1);break;default:return!0}return _fnSetFocus(_fnCellFromCoords(x,y)),!1}function _fnCaptureKeys(){_bKeyCapture||(_bKeyCapture=!0)}function _fnReleaseKeys(){_bKeyCapture=!1}function _fnCellFromCoords(x,y){return _oDatatable?"undefined"!=typeof _oDatatable.aoData[_oDatatable.aiDisplay[y]]?_oDatatable.aoData[_oDatatable.aiDisplay[y]].nTr.getElementsByTagName("td")[x]:null:$("tr:eq("+y+")>td:eq("+x+")",_nBody)[0]}function _fnCoordsFromCell(n){return _oDatatable?[$("td",n.parentNode).index(n),$("tr",n.parentNode.parentNode).index(n.parentNode)+_oDatatable._iDisplayStart]:[$("td",n.parentNode).index(n),$("tr",n.parentNode.parentNode).index(n.parentNode)]}function _fnSetScrollTop(iPos){document.documentElement.scrollTop=iPos,document.body.scrollTop=iPos}function _fnSetScrollLeft(iPos){document.documentElement.scrollLeft=iPos,document.body.scrollLeft=iPos}function _fnGetPos(obj){var iLeft=0,iTop=0;if(obj.offsetParent)for(iLeft=obj.offsetLeft,iTop=obj.offsetTop,obj=obj.offsetParent;obj;)iLeft+=obj.offsetLeft,iTop+=obj.offsetTop,obj=obj.offsetParent;return[iLeft,iTop]}function _fnFindDtCell(nTarget){for(var i=0,iLen=_oDatatable.aiDisplay.length;i<iLen;i++)for(var nTr=_oDatatable.aoData[_oDatatable.aiDisplay[i]].nTr,nTds=nTr.getElementsByTagName("td"),j=0,jLen=nTds.length;j<jLen;j++)if(nTds[j]==nTarget)return[j,i];return null}function _fnInit(table,datatable,oInit,that){if(_that=that,"undefined"==typeof oInit&&(oInit={}),"undefined"==typeof oInit.focus&&(oInit.focus=[0,0]),oInit.table=table,$(oInit.table).addClass("KeyTable"),"undefined"!=typeof oInit.focusClass&&(_sFocusClass=oInit.focusClass),"undefined"!=typeof datatable&&(_oDatatable=datatable),"undefined"==typeof oInit.initScroll&&(oInit.initScroll=!0),"undefined"==typeof oInit.form&&(oInit.form=!1),_bForm=oInit.form,_nBody=oInit.table.getElementsByTagName("tbody")[0],_bForm){var nDiv=document.createElement("div");_nInput=document.createElement("input"),nDiv.style.height="1px",nDiv.style.width="0px",nDiv.style.overflow="hidden","undefined"!=typeof oInit.tabIndex&&(_nInput.tabIndex=oInit.tabIndex),nDiv.appendChild(_nInput),oInit.table.parentNode.insertBefore(nDiv,oInit.table.nextSibling),$(_nInput).focus(function(){_bInputFocused||(_bKeyCapture=!0,_bInputFocused=!1,"undefined"!=typeof oInit.focus.nodeName?_fnSetFocus(oInit.focus,oInit.initScroll):_fnSetFocus(_fnCellFromCoords(oInit.focus[0],oInit.focus[1]),oInit.initScroll),setTimeout(function(){_nInput.blur()},0))}),_bKeyCapture=!1}else"undefined"!=typeof oInit.focus.nodeName?_fnSetFocus(oInit.focus,oInit.initScroll):_fnSetFocus(_fnCellFromCoords(oInit.focus[0],oInit.focus[1]),oInit.initScroll),_fnCaptureKeys();$(document).bind("keydown",_fnKey),_oDatatable?$(_oDatatable.nTable).on("click","td",_fnClick):$(_nBody).on("click","td",_fnClick),$(document).click(function(e){for(var nTarget=e.target,bTableClick=!1;nTarget;){if(nTarget==oInit.table){bTableClick=!0;break}nTarget=nTarget.parentNode}bTableClick||_fnBlur()})}this.block=!1,this.event={remove:{}},this.fnGetCurrentPosition=function(){return[_iOldX,_iOldY]},this.fnGetCurrentData=function(){return _nOldFocus.innerHTML},this.fnGetCurrentTD=function(){return _nOldFocus},this.fnSetPosition=function(x,y){_fnSetFocus("object"==typeof x&&x.nodeName?x:_fnCellFromCoords(x,y))},this.fnBlur=function(){_fnBlur()};var _bForm,_nInput,_nBody=null,_nOldFocus=null,_iOldX=null,_iOldY=null,_that=null,_sFocusClass="focus",_bKeyCapture=!1,_oaoEvents={action:[],esc:[],focus:[],blur:[]},_oDatatable=null,_bInputFocused=!1;for(var sKey in _oaoEvents)sKey&&(this.event[sKey]=_fnEventAddTemplate(sKey),this.event.remove[sKey]=_fnEventRemoveTemplate(sKey));var table,datatable;oInit===undefined?(table=$("table.KeyTable")[0],datatable=null):$.isPlainObject(oInit)?(table=oInit.table,datatable=oInit.datatable):(datatable=new $.fn.dataTable.Api(oInit).settings()[0],table=datatable.nTable),_fnInit(table,datatable,oInit,this)},KeyTable.version="1.2.1",$.fn.dataTable.KeyTable=KeyTable,$.fn.DataTable.KeyTable=KeyTable,KeyTable};"function"==typeof define&&define.amd?define(["jquery","datatables"],factory):"object"==typeof exports?factory(require("jquery"),require("datatables")):jQuery&&!jQuery.fn.dataTable.KeyTable&&factory(jQuery,jQuery.fn.dataTable)}(window,document);