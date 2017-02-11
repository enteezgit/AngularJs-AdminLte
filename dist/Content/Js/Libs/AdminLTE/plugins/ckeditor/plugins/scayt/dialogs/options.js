CKEDITOR.dialog.add("scaytDialog",function(c){var f=c.scayt,q='<p><img src="'+f.getLogo()+'" /></p><p>'+f.getLocal("version")+f.getVersion()+"</p><p>"+f.getLocal("text_copyrights")+"</p>",r=CKEDITOR.document,n={isChanged:function(){return null!==this.newLang&&this.currentLang!==this.newLang},currentLang:f.getLang(),newLang:null,reset:function(){this.currentLang=f.getLang(),this.newLang=null},id:"lang"},q=[{id:"options",label:f.getLocal("tab_options"),onShow:function(){},elements:[{type:"vbox",id:"scaytOptions",children:function(){var e,a=f.getApplicationConfig(),b=[],g={"ignore-all-caps-words":"label_allCaps","ignore-domain-names":"label_ignoreDomainNames","ignore-words-with-mixed-cases":"label_mixedCase","ignore-words-with-numbers":"label_mixedWithDigits"};for(e in a)a={type:"checkbox"},a.id=e,a.label=f.getLocal(g[e]),b.push(a);return b}(),onShow:function(){this.getChild();for(var a=c.scayt,b=0;b<this.getChild().length;b++)this.getChild()[b].setValue(a.getApplicationConfig()[this.getChild()[b].id])}}]},{id:"langs",label:f.getLocal("tab_languages"),elements:[{id:"leftLangColumn",type:"vbox",align:"left",widths:["100"],children:[{type:"html",id:"langBox",style:"overflow: hidden; white-space: normal;margin-bottom:15px;",html:'<div><div style="float:left;width:45%;margin-left:5px;" id="left-col-'+c.name+'"></div><div style="float:left;width:45%;margin-left:15px;" id="right-col-'+c.name+'"></div></div>',onShow:function(){var a=c.scayt.getLang();r.getById("scaytLang_"+c.name+"_"+a).$.checked=!0}},{type:"html",id:"graytLanguagesHint",html:'<div style="margin:5px auto; width:95%;white-space:normal;" id="'+c.name+'graytLanguagesHint"><span style="width:10px;height:10px;display: inline-block; background:#02b620;vertical-align:top;margin-top:2px;"></span> - This languages are supported by Grammar As You Type(GRAYT).</div>',onShow:function(){var a=r.getById(c.name+"graytLanguagesHint");c.config.grayt_autoStartup||(a.$.style.display="none")}}]}]},{id:"dictionaries",label:f.getLocal("tab_dictionaries"),elements:[{type:"vbox",id:"rightCol_col__left",children:[{type:"html",id:"dictionaryNote",html:""},{type:"text",id:"dictionaryName",label:f.getLocal("label_fieldNameDic")||"Dictionary name",onShow:function(a){var b=a.sender,g=c.scayt;setTimeout(function(){b.getContentElement("dictionaries","dictionaryNote").getElement().setText(""),null!=g.getUserDictionaryName()&&""!=g.getUserDictionaryName()&&b.getContentElement("dictionaries","dictionaryName").setValue(g.getUserDictionaryName())},0)}},{type:"hbox",id:"notExistDic",align:"left",style:"width:auto;",widths:["50%","50%"],children:[{type:"button",id:"createDic",label:f.getLocal("btn_createDic"),title:f.getLocal("btn_createDic"),onClick:function(){var a=this.getDialog(),b=p,g=c.scayt,e=a.getContentElement("dictionaries","dictionaryName").getValue();g.createUserDictionary(e,function(d){d.error||b.toggleDictionaryButtons.call(a,!0),d.dialog=a,d.command="create",d.name=e,c.fire("scaytUserDictionaryAction",d)},function(d){d.dialog=a,d.command="create",d.name=e,c.fire("scaytUserDictionaryActionError",d)})}},{type:"button",id:"restoreDic",label:f.getLocal("btn_restoreDic"),title:f.getLocal("btn_restoreDic"),onClick:function(){var a=this.getDialog(),b=c.scayt,g=p,e=a.getContentElement("dictionaries","dictionaryName").getValue();b.restoreUserDictionary(e,function(d){d.dialog=a,d.error||g.toggleDictionaryButtons.call(a,!0),d.command="restore",d.name=e,c.fire("scaytUserDictionaryAction",d)},function(d){d.dialog=a,d.command="restore",d.name=e,c.fire("scaytUserDictionaryActionError",d)})}}]},{type:"hbox",id:"existDic",align:"left",style:"width:auto;",widths:["50%","50%"],children:[{type:"button",id:"removeDic",label:f.getLocal("btn_deleteDic"),title:f.getLocal("btn_deleteDic"),onClick:function(){var a=this.getDialog(),b=c.scayt,g=p,e=a.getContentElement("dictionaries","dictionaryName"),d=e.getValue();b.removeUserDictionary(d,function(b){e.setValue(""),b.error||g.toggleDictionaryButtons.call(a,!1),b.dialog=a,b.command="remove",b.name=d,c.fire("scaytUserDictionaryAction",b)},function(b){b.dialog=a,b.command="remove",b.name=d,c.fire("scaytUserDictionaryActionError",b)})}},{type:"button",id:"renameDic",label:f.getLocal("btn_renameDic"),title:f.getLocal("btn_renameDic"),onClick:function(){var a=this.getDialog(),b=c.scayt,g=a.getContentElement("dictionaries","dictionaryName").getValue();b.renameUserDictionary(g,function(b){b.dialog=a,b.command="rename",b.name=g,c.fire("scaytUserDictionaryAction",b)},function(b){b.dialog=a,b.command="rename",b.name=g,c.fire("scaytUserDictionaryActionError",b)})}}]},{type:"html",id:"dicInfo",html:'<div id="dic_info_editor1" style="margin:5px auto; width:95%;white-space:normal;">'+f.getLocal("text_descriptionDic")+"</div>"}]}]},{id:"about",label:f.getLocal("tab_about"),elements:[{type:"html",id:"about",style:"margin: 5px 5px;",html:'<div><div id="scayt_about_">'+q+"</div></div>"}]}];c.on("scaytUserDictionaryAction",function(a){var c,b=SCAYT.prototype.UILib,g=a.data.dialog,e=g.getContentElement("dictionaries","dictionaryNote").getElement(),d=a.editor.scayt;void 0===a.data.error?(c=d.getLocal("message_success_"+a.data.command+"Dic"),c=c.replace("%s",a.data.name),e.setText(c),b.css(e.$,{color:"blue"})):(""===a.data.name?e.setText(d.getLocal("message_info_emptyDic")):(c=d.getLocal("message_error_"+a.data.command+"Dic"),c=c.replace("%s",a.data.name),e.setText(c)),b.css(e.$,{color:"red"}),null!=d.getUserDictionaryName()&&""!=d.getUserDictionaryName()?g.getContentElement("dictionaries","dictionaryName").setValue(d.getUserDictionaryName()):g.getContentElement("dictionaries","dictionaryName").setValue(""))}),c.on("scaytUserDictionaryActionError",function(a){var f,b=SCAYT.prototype.UILib,c=a.data.dialog,e=c.getContentElement("dictionaries","dictionaryNote").getElement(),d=a.editor.scayt;""===a.data.name?e.setText(d.getLocal("message_info_emptyDic")):(f=d.getLocal("message_error_"+a.data.command+"Dic"),f=f.replace("%s",a.data.name),e.setText(f)),b.css(e.$,{color:"red"}),null!=d.getUserDictionaryName()&&""!=d.getUserDictionaryName()?c.getContentElement("dictionaries","dictionaryName").setValue(d.getUserDictionaryName()):c.getContentElement("dictionaries","dictionaryName").setValue("")});var p={title:f.getLocal("text_title"),resizable:CKEDITOR.DIALOG_RESIZE_BOTH,minWidth:340,minHeight:260,onLoad:function(){if(0!=c.config.scayt_uiTabs[1]){var a=p,b=a.getLangBoxes.call(this);b.getParent().setStyle("white-space","normal"),a.renderLangList(b),this.definition.minWidth=this.getSize().width,this.resize(this.definition.minWidth,this.definition.minHeight)}},onCancel:function(){n.reset()},onHide:function(){c.unlockSelection()},onShow:function(){if(c.fire("scaytDialogShown",this),0!=c.config.scayt_uiTabs[2]){var a=c.scayt,b=this.getContentElement("dictionaries","dictionaryName"),g=this.getContentElement("dictionaries","existDic").getElement().getParent(),e=this.getContentElement("dictionaries","notExistDic").getElement().getParent();g.hide(),e.hide(),null!=a.getUserDictionaryName()&&""!=a.getUserDictionaryName()?(this.getContentElement("dictionaries","dictionaryName").setValue(a.getUserDictionaryName()),g.show()):(b.setValue(""),e.show())}},onOk:function(){var a=p,b=c.scayt;this.getContentElement("options","scaytOptions"),a=a.getChangedOption.call(this),b.commitOption({changedOptions:a})},toggleDictionaryButtons:function(a){var b=this.getContentElement("dictionaries","existDic").getElement().getParent(),c=this.getContentElement("dictionaries","notExistDic").getElement().getParent();a?(b.show(),c.hide()):(b.hide(),c.show())},getChangedOption:function(){var a={};if(1==c.config.scayt_uiTabs[0])for(var b=this.getContentElement("options","scaytOptions").getChild(),g=0;g<b.length;g++)b[g].isChanged()&&(a[b[g].id]=b[g].getValue());return n.isChanged()&&(a[n.id]=c.config.scayt_sLang=n.currentLang=n.newLang),a},buildRadioInputs:function(a,b,g){var e=new CKEDITOR.dom.element("div"),d="scaytLang_"+c.name+"_"+b,f=CKEDITOR.dom.element.createFromHtml('<input id="'+d+'" type="radio"  value="'+b+'" name="scayt_lang" />'),m=new CKEDITOR.dom.element("label"),k=c.scayt;return e.setStyles({"white-space":"normal",position:"relative","padding-bottom":"2px"}),f.on("click",function(a){n.newLang=a.sender.getValue()}),m.appendText(a),m.setAttribute("for",d),g&&c.config.grayt_autoStartup&&m.setStyles({color:"#02b620"}),e.append(f),e.append(m),b===k.getLang()&&(f.setAttribute("checked",!0),f.setAttribute("defaultChecked","defaultChecked")),e},renderLangList:function(a){var b=a.find("#left-col-"+c.name).getItem(0);a=a.find("#right-col-"+c.name).getItem(0);var h,g=f.getScaytLangList(),e=f.getGraytLangList(),d={},l=[],m=0,k=!1;for(h in g.ltr)d[h]=g.ltr[h];for(h in g.rtl)d[h]=g.rtl[h];for(h in d)l.push([h,d[h]]);for(l.sort(function(a,b){var c=0;return a[1]>b[1]?c=1:a[1]<b[1]&&(c=-1),c}),d={},k=0;k<l.length;k++)d[l[k][0]]=l[k][1];l=Math.round(l.length/2);for(h in d)m++,k=h in e.ltr||h in e.rtl,this.buildRadioInputs(d[h],h,k).appendTo(m<=l?b:a)},getLangBoxes:function(){return this.getContentElement("langs","langBox").getElement()},contents:function(a,b){var c=[],e=b.config.scayt_uiTabs;if(!e)return a;for(var d in e)1==e[d]&&c.push(a[d]);return c.push(a[a.length-1]),c}(q,c)};return p});