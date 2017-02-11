!function(root,factory){if("function"==typeof define&&define.amd)define(["g"],function(g){return factory(g)});else if("object"==typeof exports){var g=require("./geometry");module.exports=factory(g)}else{var g=root.g;root.Vectorizer=root.V=factory(g)}}(this,function(g){var V,Vectorizer;return V=Vectorizer=function(){"use strict";var hasSvg="object"==typeof window&&!(!window.SVGAngle&&!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"));if(!hasSvg)return function(){throw new Error("SVG is required to use Vectorizer.")};var ns={xmlns:"http://www.w3.org/2000/svg",xml:"http://www.w3.org/XML/1998/namespace",xlink:"http://www.w3.org/1999/xlink"},SVGversion="1.1",V=function(el,attrs,children){if(!(this instanceof V))return V.apply(Object.create(V.prototype),arguments);if(el){if(V.isV(el)&&(el=el.node),attrs=attrs||{},V.isString(el))if("svg"===el.toLowerCase())el=V.createSvgDocument();else if("<"===el[0]){var svgDoc=V.createSvgDocument(el);if(svgDoc.childNodes.length>1){var i,len,arrayOfVels=[];for(i=0,len=svgDoc.childNodes.length;i<len;i++){var childNode=svgDoc.childNodes[i];arrayOfVels.push(new V(document.importNode(childNode,!0)))}return arrayOfVels}el=document.importNode(svgDoc.firstChild,!0)}else el=document.createElementNS(ns.xmlns,el);return this.node=el,this.node.id||(this.node.id=V.uniqueId()),this.setAttributes(attrs),children&&this.append(children),this}};V.prototype.getTransformToElement=function(toElem){return toElem.getScreenCTM().inverse().multiply(this.node.getScreenCTM())},V.prototype.transform=function(matrix){if(V.isUndefined(matrix))return this.node.parentNode?this.getTransformToElement(this.node.parentNode):this.node.getScreenCTM();var svgTransform=V.createSVGTransform(matrix);return this.node.transform.baseVal.appendItem(svgTransform),this},V.prototype.translate=function(tx,ty,opt){opt=opt||{},ty=ty||0;var transformAttr=this.attr("transform")||"",transform=V.parseTransformString(transformAttr);if(V.isUndefined(tx))return transform.translate;transformAttr=transformAttr.replace(/translate\([^\)]*\)/g,"").trim();var newTx=opt.absolute?tx:transform.translate.tx+tx,newTy=opt.absolute?ty:transform.translate.ty+ty,newTranslate="translate("+newTx+","+newTy+")";return this.attr("transform",(newTranslate+" "+transformAttr).trim()),this},V.prototype.rotate=function(angle,cx,cy,opt){opt=opt||{};var transformAttr=this.attr("transform")||"",transform=V.parseTransformString(transformAttr);if(V.isUndefined(angle))return transform.rotate;transformAttr=transformAttr.replace(/rotate\([^\)]*\)/g,"").trim(),angle%=360;var newAngle=opt.absolute?angle:transform.rotate.angle+angle,newOrigin=void 0!==cx&&void 0!==cy?","+cx+","+cy:"",newRotate="rotate("+newAngle+newOrigin+")";return this.attr("transform",(transformAttr+" "+newRotate).trim()),this},V.prototype.scale=function(sx,sy){sy=V.isUndefined(sy)?sx:sy;var transformAttr=this.attr("transform")||"",transform=V.parseTransformString(transformAttr);if(V.isUndefined(sx))return transform.scale;transformAttr=transformAttr.replace(/scale\([^\)]*\)/g,"").trim();var newScale="scale("+sx+","+sy+")";return this.attr("transform",(transformAttr+" "+newScale).trim()),this},V.prototype.bbox=function(withoutTransformations,target){if(!this.node.ownerSVGElement)return{x:0,y:0,width:0,height:0};var box;try{box=this.node.getBBox(),box={x:box.x,y:box.y,width:box.width,height:box.height}}catch(e){box={x:this.node.clientLeft,y:this.node.clientTop,width:this.node.clientWidth,height:this.node.clientHeight}}if(withoutTransformations)return box;var matrix=this.getTransformToElement(target||this.node.ownerSVGElement);return V.transformRect(box,matrix)},V.prototype.text=function(content,opt){content=V.sanitizeText(content),opt=opt||{};var tspan,lines=content.split("\n"),y=this.attr("y");y||this.attr("y","0.8em"),this.attr("display",content?null:"none"),this.attr("xml:space","preserve"),this.node.textContent="";var textNode=this.node;if(opt.textPath){var defs=this.find("defs");0===defs.length&&(defs=V("defs"),this.append(defs));var d=Object(opt.textPath)===opt.textPath?opt.textPath.d:opt.textPath;if(d){var path=V("path",{d:d});defs.append(path)}var textPath=V("textPath");!opt.textPath["xlink:href"]&&path&&textPath.attr("xlink:href","#"+path.node.id),Object(opt.textPath)===opt.textPath&&textPath.attr(opt.textPath),this.append(textPath),textNode=textPath.node}for(var offset=0,i=0;i<lines.length;i++){var line=lines[i],lineHeight=opt.lineHeight||"1em";"auto"===opt.lineHeight&&(lineHeight="1.5em");var vLine=V("tspan",{dy:0==i?"0em":lineHeight,x:this.attr("x")||0});if(vLine.addClass("v-line"),line)if(opt.annotations){for(var maxFontSize=0,lineAnnotations=V.annotateString(lines[i],V.isArray(opt.annotations)?opt.annotations:[opt.annotations],{offset:-offset,includeAnnotationIndices:opt.includeAnnotationIndices}),j=0;j<lineAnnotations.length;j++){var annotation=lineAnnotations[j];if(V.isObject(annotation)){var fontSize=parseInt(annotation.attrs["font-size"],10);fontSize&&fontSize>maxFontSize&&(maxFontSize=fontSize),tspan=V("tspan",annotation.attrs),opt.includeAnnotationIndices&&tspan.attr("annotations",annotation.annotations),annotation.attrs["class"]&&tspan.addClass(annotation.attrs["class"]),tspan.node.textContent=annotation.t}else tspan=document.createTextNode(annotation||" ");vLine.append(tspan)}"auto"===opt.lineHeight&&maxFontSize&&0!==i&&vLine.attr("dy",1.2*maxFontSize+"px")}else vLine.node.textContent=line;else vLine.addClass("v-empty-line"),vLine.node.style.opacity=0,vLine.node.textContent="-";V(textNode).append(vLine),offset+=line.length+1}return this},V.prototype.removeAttr=function(name){var qualifiedName=V.qualifyAttr(name),el=this.node;return qualifiedName.ns?el.hasAttributeNS(qualifiedName.ns,qualifiedName.local)&&el.removeAttributeNS(qualifiedName.ns,qualifiedName.local):el.hasAttribute(name)&&el.removeAttribute(name),this},V.prototype.attr=function(name,value){if(V.isUndefined(name)){for(var attributes=this.node.attributes,attrs={},i=0;i<attributes.length;i++)attrs[attributes[i].nodeName]=attributes[i].nodeValue;return attrs}if(V.isString(name)&&V.isUndefined(value))return this.node.getAttribute(name);if("object"==typeof name)for(var attrName in name)name.hasOwnProperty(attrName)&&this.setAttribute(attrName,name[attrName]);else this.setAttribute(name,value);return this},V.prototype.remove=function(){return this.node.parentNode&&this.node.parentNode.removeChild(this.node),this},V.prototype.empty=function(){for(;this.node.firstChild;)this.node.removeChild(this.node.firstChild);return this},V.prototype.setAttributes=function(attrs){for(var key in attrs)attrs.hasOwnProperty(key)&&this.setAttribute(key,attrs[key]);return this},V.prototype.append=function(els){V.isArray(els)||(els=[els]);for(var i=0,len=els.length;i<len;i++)this.node.appendChild(V.toNode(els[i]));return this},V.prototype.prepend=function(els){var child=this.node.firstChild;return child?V(child).before(els):this.append(els)},V.prototype.before=function(els){var node=this.node,parent=node.parentNode;if(parent){V.isArray(els)||(els=[els]);for(var i=0,len=els.length;i<len;i++)parent.insertBefore(V.toNode(els[i]),node)}return this},V.prototype.svg=function(){return this.node instanceof window.SVGSVGElement?this:V(this.node.ownerSVGElement)},V.prototype.defs=function(){var defs=this.svg().node.getElementsByTagName("defs");return defs&&defs.length?V(defs[0]):void 0},V.prototype.clone=function(){var clone=V(this.node.cloneNode(!0));return clone.node.id=V.uniqueId(),clone},V.prototype.findOne=function(selector){var found=this.node.querySelector(selector);return found?V(found):void 0},V.prototype.find=function(selector){var vels=[],nodes=this.node.querySelectorAll(selector);if(nodes)for(var i=0;i<nodes.length;i++)vels.push(V(nodes[i]));return vels},V.prototype.index=function(){for(var index=0,node=this.node.previousSibling;node;)1===node.nodeType&&index++,node=node.previousSibling;return index},V.prototype.findParentByClass=function(className,terminator){for(var ownerSVGElement=this.node.ownerSVGElement,node=this.node.parentNode;node&&node!==terminator&&node!==ownerSVGElement;){var vel=V(node);if(vel.hasClass(className))return vel;node=node.parentNode}return null},V.prototype.toLocalPoint=function(x,y){var svg=this.svg().node,p=svg.createSVGPoint();p.x=x,p.y=y;try{var globalPoint=p.matrixTransform(svg.getScreenCTM().inverse()),globalToLocalMatrix=this.getTransformToElement(svg).inverse()}catch(e){return p}return globalPoint.matrixTransform(globalToLocalMatrix)},V.prototype.translateCenterToPoint=function(p){var bbox=this.bbox(),center=g.rect(bbox).center();this.translate(p.x-center.x,p.y-center.y)},V.prototype.translateAndAutoOrient=function(position,reference,target){var s=this.scale();this.attr("transform",""),this.scale(s.sx,s.sy);var svg=this.svg().node,bbox=this.bbox(!1,target),translateToOrigin=svg.createSVGTransform();translateToOrigin.setTranslate(-bbox.x-bbox.width/2,-bbox.y-bbox.height/2);var rotateAroundOrigin=svg.createSVGTransform(),angle=g.point(position).changeInAngle(position.x-reference.x,position.y-reference.y,reference);rotateAroundOrigin.setRotate(angle,0,0);var translateFinal=svg.createSVGTransform(),finalPosition=g.point(position).move(reference,bbox.width/2);translateFinal.setTranslate(position.x+(position.x-finalPosition.x),position.y+(position.y-finalPosition.y));var ctm=this.getTransformToElement(target),transform=svg.createSVGTransform();transform.setMatrix(translateFinal.matrix.multiply(rotateAroundOrigin.matrix.multiply(translateToOrigin.matrix.multiply(ctm))));var decomposition=V.decomposeMatrix(transform.matrix);return this.translate(decomposition.translateX,decomposition.translateY),this.rotate(decomposition.rotation),this},V.prototype.animateAlongPath=function(attrs,path){var animateMotion=V("animateMotion",attrs),mpath=V("mpath",{"xlink:href":"#"+V(path).node.id});animateMotion.append(mpath),this.append(animateMotion);try{animateMotion.node.beginElement()}catch(e){if("fake"===document.documentElement.getAttribute("smiling")){var animation=animateMotion.node;animation.animators=[];var animationID=animation.getAttribute("id");animationID&&(id2anim[animationID]=animation);for(var targets=getTargets(animation),i=0,len=targets.length;i<len;i++){var target=targets[i],animator=new Animator(animation,target,i);animators.push(animator),animation.animators[i]=animator,animator.register()}}}},V.prototype.hasClass=function(className){return new RegExp("(\\s|^)"+className+"(\\s|$)").test(this.node.getAttribute("class"))},V.prototype.addClass=function(className){if(!this.hasClass(className)){var prevClasses=this.node.getAttribute("class")||"";this.node.setAttribute("class",(prevClasses+" "+className).trim())}return this},V.prototype.removeClass=function(className){if(this.hasClass(className)){var newClasses=this.node.getAttribute("class").replace(new RegExp("(\\s|^)"+className+"(\\s|$)","g"),"$2");this.node.setAttribute("class",newClasses)}return this},V.prototype.toggleClass=function(className,toAdd){var toRemove=V.isUndefined(toAdd)?this.hasClass(className):!toAdd;return toRemove?this.removeClass(className):this.addClass(className),this},V.prototype.sample=function(interval){interval=interval||1;for(var sample,node=this.node,length=node.getTotalLength(),samples=[],distance=0;distance<length;)sample=node.getPointAtLength(distance),samples.push({x:sample.x,y:sample.y,distance:distance}),distance+=interval;return samples},V.prototype.convertToPath=function(){var path=V("path");path.attr(this.attr());var d=this.convertToPathData();return d&&path.attr("d",d),path},V.prototype.convertToPathData=function(){var tagName=this.node.tagName.toUpperCase();switch(tagName){case"PATH":return this.attr("d");case"LINE":return V.convertLineToPathData(this.node);case"POLYGON":return V.convertPolygonToPathData(this.node);case"POLYLINE":return V.convertPolylineToPathData(this.node);case"ELLIPSE":return V.convertEllipseToPathData(this.node);case"CIRCLE":return V.convertCircleToPathData(this.node);case"RECT":return V.convertRectToPathData(this.node)}throw new Error(tagName+" cannot be converted to PATH.")},V.prototype.findIntersection=function(ref,target){var svg=this.svg().node;target=target||svg;var bbox=g.rect(this.bbox(!1,target)),center=bbox.center();if(bbox.intersectionWithLineFromCenterToPoint(ref)){var spot,tagName=this.node.localName.toUpperCase();if("RECT"===tagName){var gRect=g.rect(parseFloat(this.attr("x")||0),parseFloat(this.attr("y")||0),parseFloat(this.attr("width")),parseFloat(this.attr("height"))),rectMatrix=this.getTransformToElement(target),rectMatrixComponents=V.decomposeMatrix(rectMatrix),resetRotation=svg.createSVGTransform();resetRotation.setRotate(-rectMatrixComponents.rotation,center.x,center.y);var rect=V.transformRect(gRect,resetRotation.matrix.multiply(rectMatrix));spot=g.rect(rect).intersectionWithLineFromCenterToPoint(ref,rectMatrixComponents.rotation)}else if("PATH"===tagName||"POLYGON"===tagName||"POLYLINE"===tagName||"CIRCLE"===tagName||"ELLIPSE"===tagName){var i,sample,gp,centerDistance,refDistance,distance,pathNode="PATH"===tagName?this:this.convertToPath(),samples=pathNode.sample(),minDistance=1/0,closestSamples=[];for(i=0;i<samples.length;i++)sample=samples[i],gp=V.createSVGPoint(sample.x,sample.y),gp=gp.matrixTransform(this.getTransformToElement(target)),sample=g.point(gp),centerDistance=sample.distance(center),refDistance=1.1*sample.distance(ref),distance=centerDistance+refDistance,distance<minDistance?(minDistance=distance,closestSamples=[{sample:sample,refDistance:refDistance}]):distance<minDistance+1&&closestSamples.push({sample:sample,refDistance:refDistance});closestSamples.sort(function(a,b){return a.refDistance-b.refDistance}),closestSamples[0]&&(spot=closestSamples[0].sample)}return spot}},V.prototype.setAttribute=function(name,value){var el=this.node;if(null===value)return this.removeAttr(name),this;var qualifiedName=V.qualifyAttr(name);return qualifiedName.ns?el.setAttributeNS(qualifiedName.ns,name,value):"id"===name?el.id=value:el.setAttribute(name,value),this},V.createSvgDocument=function(content){var svg='<svg xmlns="'+ns.xmlns+'" xmlns:xlink="'+ns.xlink+'" version="'+SVGversion+'">'+(content||"")+"</svg>",xml=V.parseXML(svg,{async:!1});return xml.documentElement},V.idCounter=0,V.uniqueId=function(){var id=++V.idCounter+"";return"v-"+id},V.sanitizeText=function(text){return(text||"").replace(/ /g," ")},V.isUndefined=function(value){return"undefined"==typeof value},V.isString=function(value){return"string"==typeof value},V.isObject=function(value){return value&&"object"==typeof value},V.isArray=Array.isArray,V.parseXML=function(data,opt){opt=opt||{};var xml;try{var parser=new DOMParser;V.isUndefined(opt.async)||(parser.async=opt.async),xml=parser.parseFromString(data,"text/xml")}catch(error){xml=void 0}if(!xml||xml.getElementsByTagName("parsererror").length)throw new Error("Invalid XML: "+data);return xml},V.qualifyAttr=function(name){if(name.indexOf(":")!==-1){var combinedKey=name.split(":");return{ns:ns[combinedKey[0]],local:combinedKey[1]}}return{ns:null,local:name}},V.parseTransformString=function(transform){var translate,rotate,scale;if(transform){var separator=/[ ,]+/,translateMatch=transform.match(/translate\((.*)\)/);translateMatch&&(translate=translateMatch[1].split(separator));var rotateMatch=transform.match(/rotate\((.*)\)/);rotateMatch&&(rotate=rotateMatch[1].split(separator));var scaleMatch=transform.match(/scale\((.*)\)/);scaleMatch&&(scale=scaleMatch[1].split(separator))}var sx=scale&&scale[0]?parseFloat(scale[0]):1;return{translate:{tx:translate&&translate[0]?parseInt(translate[0],10):0,ty:translate&&translate[1]?parseInt(translate[1],10):0},rotate:{angle:rotate&&rotate[0]?parseInt(rotate[0],10):0,cx:rotate&&rotate[1]?parseInt(rotate[1],10):void 0,cy:rotate&&rotate[2]?parseInt(rotate[2],10):void 0},scale:{sx:sx,sy:scale&&scale[1]?parseFloat(scale[1]):sx}}},V.deltaTransformPoint=function(matrix,point){var dx=point.x*matrix.a+point.y*matrix.c+0,dy=point.x*matrix.b+point.y*matrix.d+0;return{x:dx,y:dy}},V.decomposeMatrix=function(matrix){var px=V.deltaTransformPoint(matrix,{x:0,y:1}),py=V.deltaTransformPoint(matrix,{x:1,y:0}),skewX=180/Math.PI*Math.atan2(px.y,px.x)-90,skewY=180/Math.PI*Math.atan2(py.y,py.x);return{translateX:matrix.e,translateY:matrix.f,scaleX:Math.sqrt(matrix.a*matrix.a+matrix.b*matrix.b),scaleY:Math.sqrt(matrix.c*matrix.c+matrix.d*matrix.d),skewX:skewX,skewY:skewY,rotation:skewX}},V.isV=function(object){return object instanceof V},V.isVElement=V.isV;var svgDocument=V("svg").node;return V.createSVGMatrix=function(matrix){var svgMatrix=svgDocument.createSVGMatrix();for(var component in matrix)svgMatrix[component]=matrix[component];return svgMatrix},V.createSVGTransform=function(matrix){return V.isUndefined(matrix)?svgDocument.createSVGTransform():(matrix instanceof SVGMatrix||(matrix=V.createSVGMatrix(matrix)),svgDocument.createSVGTransformFromMatrix(matrix))},V.createSVGPoint=function(x,y){var p=svgDocument.createSVGPoint();return p.x=x,p.y=y,p},V.transformRect=function(r,matrix){var p=svgDocument.createSVGPoint();p.x=r.x,p.y=r.y;var corner1=p.matrixTransform(matrix);p.x=r.x+r.width,p.y=r.y;var corner2=p.matrixTransform(matrix);p.x=r.x+r.width,p.y=r.y+r.height;var corner3=p.matrixTransform(matrix);p.x=r.x,p.y=r.y+r.height;var corner4=p.matrixTransform(matrix),minX=Math.min(corner1.x,corner2.x,corner3.x,corner4.x),maxX=Math.max(corner1.x,corner2.x,corner3.x,corner4.x),minY=Math.min(corner1.y,corner2.y,corner3.y,corner4.y),maxY=Math.max(corner1.y,corner2.y,corner3.y,corner4.y);return{x:minX,y:minY,width:maxX-minX,height:maxY-minY}},V.transformPoint=function(p,matrix){return V.createSVGPoint(p.x,p.y).matrixTransform(matrix)},V.styleToObject=function(styleString){for(var ret={},styles=styleString.split(";"),i=0;i<styles.length;i++){var style=styles[i],pair=style.split("=");ret[pair[0].trim()]=pair[1].trim()}return ret},V.createSlicePathData=function(innerRadius,outerRadius,startAngle,endAngle){var svgArcMax=2*Math.PI-1e-6,r0=innerRadius,r1=outerRadius,a0=startAngle,a1=endAngle,da=(a1<a0&&(da=a0,a0=a1,a1=da),a1-a0),df=da<Math.PI?"0":"1",c0=Math.cos(a0),s0=Math.sin(a0),c1=Math.cos(a1),s1=Math.sin(a1);return da>=svgArcMax?r0?"M0,"+r1+"A"+r1+","+r1+" 0 1,1 0,"+-r1+"A"+r1+","+r1+" 0 1,1 0,"+r1+"M0,"+r0+"A"+r0+","+r0+" 0 1,0 0,"+-r0+"A"+r0+","+r0+" 0 1,0 0,"+r0+"Z":"M0,"+r1+"A"+r1+","+r1+" 0 1,1 0,"+-r1+"A"+r1+","+r1+" 0 1,1 0,"+r1+"Z":r0?"M"+r1*c0+","+r1*s0+"A"+r1+","+r1+" 0 "+df+",1 "+r1*c1+","+r1*s1+"L"+r0*c1+","+r0*s1+"A"+r0+","+r0+" 0 "+df+",0 "+r0*c0+","+r0*s0+"Z":"M"+r1*c0+","+r1*s0+"A"+r1+","+r1+" 0 "+df+",1 "+r1*c1+","+r1*s1+"L0,0Z"},V.mergeAttrs=function(a,b){for(var attr in b)"class"===attr?a[attr]=a[attr]?a[attr]+" "+b[attr]:b[attr]:"style"===attr?V.isObject(a[attr])&&V.isObject(b[attr])?a[attr]=V.mergeAttrs(a[attr],b[attr]):V.isObject(a[attr])?a[attr]=V.mergeAttrs(a[attr],V.styleToObject(b[attr])):V.isObject(b[attr])?a[attr]=V.mergeAttrs(V.styleToObject(a[attr]),b[attr]):a[attr]=V.mergeAttrs(V.styleToObject(a[attr]),V.styleToObject(b[attr])):a[attr]=b[attr];return a},V.annotateString=function(t,annotations,opt){annotations=annotations||[],opt=opt||{};for(var batch,item,prev,offset=opt.offset||0,compacted=[],ret=[],i=0;i<t.length;i++){item=ret[i]=t[i];for(var j=0;j<annotations.length;j++){var annotation=annotations[j],start=annotation.start+offset,end=annotation.end+offset;i>=start&&i<end&&(V.isObject(item)?item.attrs=V.mergeAttrs(V.mergeAttrs({},item.attrs),annotation.attrs):item=ret[i]={t:t[i],attrs:annotation.attrs},opt.includeAnnotationIndices&&(item.annotations||(item.annotations=[])).push(j))}prev=ret[i-1],prev?V.isObject(item)&&V.isObject(prev)?JSON.stringify(item.attrs)===JSON.stringify(prev.attrs)?batch.t+=item.t:(compacted.push(batch),batch=item):V.isObject(item)?(compacted.push(batch),batch=item):V.isObject(prev)?(compacted.push(batch),batch=item):batch=(batch||"")+item:batch=item}return batch&&compacted.push(batch),compacted},V.findAnnotationsAtIndex=function(annotations,index){var found=[];return annotations&&annotations.forEach(function(annotation){annotation.start<index&&index<=annotation.end&&found.push(annotation)}),found},V.findAnnotationsBetweenIndexes=function(annotations,start,end){var found=[];return annotations&&annotations.forEach(function(annotation){(start>=annotation.start&&start<annotation.end||end>annotation.start&&end<=annotation.end||annotation.start>=start&&annotation.end<end)&&found.push(annotation)}),found},V.shiftAnnotations=function(annotations,index,offset){return annotations&&annotations.forEach(function(annotation){annotation.start<index&&annotation.end>=index?annotation.end+=offset:annotation.start>=index&&(annotation.start+=offset,annotation.end+=offset)}),annotations},V.convertLineToPathData=function(line){line=V(line);var d=["M",line.attr("x1"),line.attr("y1"),"L",line.attr("x2"),line.attr("y2")].join(" ");return d},V.convertPolygonToPathData=function(polygon){polygon=V(polygon);var points=V.getPointsFromSvgNode(polygon.node);return points.length>0?V.svgPointsToPath(points):null},V.convertPolylineToPathData=function(polyline){var points=V.getPointsFromSvgNode(polyline.node);return points.length>0?V.svgPointsToPath(points):null},V.svgPointsToPath=function(points){var i;for(i=0;i<points.length;i++)points[i]=points[i].x+" "+points[i].y;return"M "+points.join(" L")+" Z"},V.getPointsFromSvgNode=function(node){var i,points=[];for(i=0;i<node.points.numberOfItems;i++)points.push(node.points.getItem(i));return points},V.KAPPA=.5522847498307935,V.convertCircleToPathData=function(circle){circle=V(circle);var cx=parseFloat(circle.attr("cx"))||0,cy=parseFloat(circle.attr("cy"))||0,r=parseFloat(circle.attr("r")),cd=r*V.KAPPA,d=["M",cx,cy-r,"C",cx+cd,cy-r,cx+r,cy-cd,cx+r,cy,"C",cx+r,cy+cd,cx+cd,cy+r,cx,cy+r,"C",cx-cd,cy+r,cx-r,cy+cd,cx-r,cy,"C",cx-r,cy-cd,cx-cd,cy-r,cx,cy-r,"Z"].join(" ");return d},V.convertEllipseToPathData=function(ellipse){ellipse=V(ellipse);var cx=parseFloat(ellipse.attr("cx"))||0,cy=parseFloat(ellipse.attr("cy"))||0,rx=parseFloat(ellipse.attr("rx")),ry=parseFloat(ellipse.attr("ry"))||rx,cdx=rx*V.KAPPA,cdy=ry*V.KAPPA,d=["M",cx,cy-ry,"C",cx+cdx,cy-ry,cx+rx,cy-cdy,cx+rx,cy,"C",cx+rx,cy+cdy,cx+cdx,cy+ry,cx,cy+ry,"C",cx-cdx,cy+ry,cx-rx,cy+cdy,cx-rx,cy,"C",cx-rx,cy-cdy,cx-cdx,cy-ry,cx,cy-ry,"Z"].join(" ");return d},V.convertRectToPathData=function(rect){rect=V(rect);var d,x=parseFloat(rect.attr("x"))||0,y=parseFloat(rect.attr("y"))||0,width=parseFloat(rect.attr("width"))||0,height=parseFloat(rect.attr("height"))||0,rx=parseFloat(rect.attr("rx"))||0,ry=parseFloat(rect.attr("ry"))||0,bbox=g.rect(x,y,width,height);if(rx||ry){var r=x+width,b=y+height;d=["M",x+rx,y,"L",r-rx,y,"Q",r,y,r,y+ry,"L",r,y+height-ry,"Q",r,b,r-rx,b,"L",x+rx,b,"Q",x,b,x,b-rx,"L",x,y+ry,"Q",x,y,x+rx,y,"Z"].join(" ")}else d=["M",bbox.origin().x,bbox.origin().y,"H",bbox.corner().x,"V",bbox.corner().y,"H",bbox.origin().x,"V",bbox.origin().y,"Z"].join(" ");return d},V.rectToPath=function(r){var topRx=r.rx||r["top-rx"]||0,bottomRx=r.rx||r["bottom-rx"]||0,topRy=r.ry||r["top-ry"]||0,bottomRy=r.ry||r["bottom-ry"]||0;return["M",r.x,r.y+topRy,"v",r.height-topRy-bottomRy,"a",bottomRx,bottomRy,0,0,0,bottomRx,bottomRy,"h",r.width-2*bottomRx,"a",bottomRx,bottomRy,0,0,0,bottomRx,-bottomRy,"v",-(r.height-bottomRy-topRy),"a",topRx,topRy,0,0,0,-topRx,-topRy,"h",-(r.width-2*topRx),"a",topRx,topRy,0,0,0,-topRx,topRy].join(" ")},V.toNode=function(el){return V.isV(el)?el.node:el.nodeName&&el||el[0]},V}()});