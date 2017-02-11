!function($){$.extend($.inputmask.defaults.aliases,{decimal:{mask:"~",placeholder:"",repeat:"*",greedy:!1,numericInput:!1,isNumeric:!0,digits:"*",groupSeparator:"",radixPoint:".",groupSize:3,autoGroup:!1,allowPlus:!0,allowMinus:!0,integerDigits:"*",defaultValue:"",prefix:"",suffix:"",getMaskLength:function(buffer,greedy,repeat,currentBuffer,opts){var calculatedLength=buffer.length;greedy||("*"==repeat?calculatedLength=currentBuffer.length+1:repeat>1&&(calculatedLength+=buffer.length*(repeat-1)));var escapedGroupSeparator=$.inputmask.escapeRegex.call(this,opts.groupSeparator),escapedRadixPoint=$.inputmask.escapeRegex.call(this,opts.radixPoint),currentBufferStr=currentBuffer.join(""),strippedBufferStr=currentBufferStr.replace(new RegExp(escapedGroupSeparator,"g"),"").replace(new RegExp(escapedRadixPoint),""),groupOffset=currentBufferStr.length-strippedBufferStr.length;return calculatedLength+groupOffset},postFormat:function(buffer,pos,reformatOnly,opts){if(""==opts.groupSeparator)return pos;var cbuf=buffer.slice();$.inArray(opts.radixPoint,buffer);reformatOnly||cbuf.splice(pos,0,"?");var bufVal=cbuf.join("");if(opts.autoGroup||reformatOnly&&bufVal.indexOf(opts.groupSeparator)!=-1){var escapedGroupSeparator=$.inputmask.escapeRegex.call(this,opts.groupSeparator);bufVal=bufVal.replace(new RegExp(escapedGroupSeparator,"g"),"");var radixSplit=bufVal.split(opts.radixPoint);bufVal=radixSplit[0];for(var reg=new RegExp("([-+]?[\\d?]+)([\\d?]{"+opts.groupSize+"})");reg.test(bufVal);)bufVal=bufVal.replace(reg,"$1"+opts.groupSeparator+"$2"),bufVal=bufVal.replace(opts.groupSeparator+opts.groupSeparator,opts.groupSeparator);radixSplit.length>1&&(bufVal+=opts.radixPoint+radixSplit[1])}buffer.length=bufVal.length;for(var i=0,l=bufVal.length;i<l;i++)buffer[i]=bufVal.charAt(i);var newPos=$.inArray("?",buffer);return reformatOnly||buffer.splice(newPos,1),reformatOnly?pos:newPos},regex:{number:function(opts){var escapedGroupSeparator=$.inputmask.escapeRegex.call(this,opts.groupSeparator),escapedRadixPoint=$.inputmask.escapeRegex.call(this,opts.radixPoint),digitExpression=isNaN(opts.digits)?opts.digits:"{0,"+opts.digits+"}",signedExpression=opts.allowPlus||opts.allowMinus?"["+(opts.allowPlus?"+":"")+(opts.allowMinus?"-":"")+"]?":"";return new RegExp("^"+signedExpression+"(\\d+|\\d{1,"+opts.groupSize+"}(("+escapedGroupSeparator+"\\d{"+opts.groupSize+"})?)+)("+escapedRadixPoint+"\\d"+digitExpression+")?$")}},onKeyDown:function(e,buffer,opts){var $input=$(this),input=this;if(e.keyCode==opts.keyCode.TAB){var radixPosition=$.inArray(opts.radixPoint,buffer);if(radixPosition!=-1){for(var masksets=$input.data("_inputmask").masksets,activeMasksetIndex=$input.data("_inputmask").activeMasksetIndex,i=1;i<=opts.digits&&i<opts.getMaskLength(masksets[activeMasksetIndex]._buffer,masksets[activeMasksetIndex].greedy,masksets[activeMasksetIndex].repeat,buffer,opts);i++)void 0!=buffer[radixPosition+i]&&""!=buffer[radixPosition+i]||(buffer[radixPosition+i]="0");input._valueSet(buffer.join(""))}}else if(e.keyCode==opts.keyCode.DELETE||e.keyCode==opts.keyCode.BACKSPACE)return opts.postFormat(buffer,0,!0,opts),input._valueSet(buffer.join("")),!0},definitions:{"~":{validator:function(chrs,buffer,pos,strict,opts){if(""==chrs)return!1;if(!strict&&pos<=1&&"0"===buffer[0]&&new RegExp("[\\d-]").test(chrs)&&1==buffer.join("").length)return buffer[0]="",{pos:0};var cbuf=strict?buffer.slice(0,pos):buffer.slice();cbuf.splice(pos,0,chrs);var bufferStr=cbuf.join(""),escapedGroupSeparator=$.inputmask.escapeRegex.call(this,opts.groupSeparator);bufferStr=bufferStr.replace(new RegExp(escapedGroupSeparator,"g"),"");var isValid=opts.regex.number(opts).test(bufferStr);if(!isValid&&(bufferStr+="0",isValid=opts.regex.number(opts).test(bufferStr),!isValid)){for(var lastGroupSeparator=bufferStr.lastIndexOf(opts.groupSeparator),i=bufferStr.length-lastGroupSeparator;i<=3;i++)bufferStr+="0";if(isValid=opts.regex.number(opts).test(bufferStr),!isValid&&!strict&&chrs==opts.radixPoint&&(isValid=opts.regex.number(opts).test("0"+bufferStr+"0")))return buffer[pos]="0",pos++,{pos:pos}}if(0!=isValid&&!strict&&chrs!=opts.radixPoint){var newPos=opts.postFormat(buffer,pos,!1,opts);return{pos:newPos}}return isValid},cardinality:1,prevalidator:null}},insertMode:!0,autoUnmask:!1},integer:{regex:{number:function(opts){var escapedGroupSeparator=$.inputmask.escapeRegex.call(this,opts.groupSeparator),signedExpression=opts.allowPlus||opts.allowMinus?"["+(opts.allowPlus?"+":"")+(opts.allowMinus?"-":"")+"]?":"";return new RegExp("^"+signedExpression+"(\\d+|\\d{1,"+opts.groupSize+"}(("+escapedGroupSeparator+"\\d{"+opts.groupSize+"})?)+)$")}},alias:"decimal"}})}(jQuery);