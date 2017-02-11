!function(root,factory){if("function"==typeof define&&define.amd)define(["moment","jquery","exports"],function(momentjs,$,exports){root.daterangepicker=factory(root,exports,momentjs,$)});else if("undefined"!=typeof exports){var momentjs=require("moment"),jQuery="undefined"!=typeof window?window.jQuery:void 0;if(!jQuery)try{jQuery=require("jquery"),jQuery.fn||(jQuery.fn={})}catch(err){if(!jQuery)throw new Error("jQuery dependency not found")}factory(root,exports,momentjs,jQuery)}else root.daterangepicker=factory(root,{},root.moment||moment,root.jQuery||root.Zepto||root.ender||root.$)}(this||{},function(root,daterangepicker,moment,$){var DateRangePicker=function(element,options,cb){if(this.parentEl="body",this.element=$(element),this.startDate=moment().startOf("day"),this.endDate=moment().endOf("day"),this.minDate=!1,this.maxDate=!1,this.dateLimit=!1,this.autoApply=!1,this.singleDatePicker=!1,this.showDropdowns=!1,this.showWeekNumbers=!1,this.showISOWeekNumbers=!1,this.timePicker=!1,this.timePicker24Hour=!1,this.timePickerIncrement=1,this.timePickerSeconds=!1,this.linkedCalendars=!0,this.autoUpdateInput=!0,this.alwaysShowCalendars=!1,this.ranges={},this.opens="right",this.element.hasClass("pull-right")&&(this.opens="left"),this.drops="down",this.element.hasClass("dropup")&&(this.drops="up"),this.buttonClasses="btn btn-sm",this.applyClass="btn-success",this.cancelClass="btn-default",this.locale={format:"MM/DD/YYYY",separator:" - ",applyLabel:"Apply",cancelLabel:"Cancel",weekLabel:"W",customRangeLabel:"Custom Range",daysOfWeek:moment.weekdaysMin(),monthNames:moment.monthsShort(),firstDay:moment.localeData().firstDayOfWeek()},this.callback=function(){},this.isShowing=!1,this.leftCalendar={},this.rightCalendar={},"object"==typeof options&&null!==options||(options={}),options=$.extend(this.element.data(),options),"string"==typeof options.template||options.template instanceof $||(options.template='<div class="daterangepicker dropdown-menu"><div class="calendar left"><div class="daterangepicker_input"><input class="input-mini" type="text" name="daterangepicker_start" value="" /><i class="fa fa-calendar glyphicon glyphicon-calendar"></i><div class="calendar-time"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="calendar-table"></div></div><div class="calendar right"><div class="daterangepicker_input"><input class="input-mini" type="text" name="daterangepicker_end" value="" /><i class="fa fa-calendar glyphicon glyphicon-calendar"></i><div class="calendar-time"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="calendar-table"></div></div><div class="ranges"><div class="range_inputs"><button class="applyBtn" disabled="disabled" type="button"></button> <button class="cancelBtn" type="button"></button></div></div></div>'),this.parentEl=$(options.parentEl&&$(options.parentEl).length?options.parentEl:this.parentEl),this.container=$(options.template).appendTo(this.parentEl),"object"==typeof options.locale&&("string"==typeof options.locale.format&&(this.locale.format=options.locale.format),"string"==typeof options.locale.separator&&(this.locale.separator=options.locale.separator),"object"==typeof options.locale.daysOfWeek&&(this.locale.daysOfWeek=options.locale.daysOfWeek.slice()),"object"==typeof options.locale.monthNames&&(this.locale.monthNames=options.locale.monthNames.slice()),"number"==typeof options.locale.firstDay&&(this.locale.firstDay=options.locale.firstDay),"string"==typeof options.locale.applyLabel&&(this.locale.applyLabel=options.locale.applyLabel),"string"==typeof options.locale.cancelLabel&&(this.locale.cancelLabel=options.locale.cancelLabel),"string"==typeof options.locale.weekLabel&&(this.locale.weekLabel=options.locale.weekLabel),"string"==typeof options.locale.customRangeLabel&&(this.locale.customRangeLabel=options.locale.customRangeLabel)),"string"==typeof options.startDate&&(this.startDate=moment(options.startDate,this.locale.format)),"string"==typeof options.endDate&&(this.endDate=moment(options.endDate,this.locale.format)),"string"==typeof options.minDate&&(this.minDate=moment(options.minDate,this.locale.format)),"string"==typeof options.maxDate&&(this.maxDate=moment(options.maxDate,this.locale.format)),"object"==typeof options.startDate&&(this.startDate=moment(options.startDate)),"object"==typeof options.endDate&&(this.endDate=moment(options.endDate)),"object"==typeof options.minDate&&(this.minDate=moment(options.minDate)),"object"==typeof options.maxDate&&(this.maxDate=moment(options.maxDate)),this.minDate&&this.startDate.isBefore(this.minDate)&&(this.startDate=this.minDate.clone()),this.maxDate&&this.endDate.isAfter(this.maxDate)&&(this.endDate=this.maxDate.clone()),"string"==typeof options.applyClass&&(this.applyClass=options.applyClass),"string"==typeof options.cancelClass&&(this.cancelClass=options.cancelClass),"object"==typeof options.dateLimit&&(this.dateLimit=options.dateLimit),"string"==typeof options.opens&&(this.opens=options.opens),"string"==typeof options.drops&&(this.drops=options.drops),"boolean"==typeof options.showWeekNumbers&&(this.showWeekNumbers=options.showWeekNumbers),"boolean"==typeof options.showISOWeekNumbers&&(this.showISOWeekNumbers=options.showISOWeekNumbers),"string"==typeof options.buttonClasses&&(this.buttonClasses=options.buttonClasses),"object"==typeof options.buttonClasses&&(this.buttonClasses=options.buttonClasses.join(" ")),"boolean"==typeof options.showDropdowns&&(this.showDropdowns=options.showDropdowns),"boolean"==typeof options.singleDatePicker&&(this.singleDatePicker=options.singleDatePicker,this.singleDatePicker&&(this.endDate=this.startDate.clone())),"boolean"==typeof options.timePicker&&(this.timePicker=options.timePicker),"boolean"==typeof options.timePickerSeconds&&(this.timePickerSeconds=options.timePickerSeconds),"number"==typeof options.timePickerIncrement&&(this.timePickerIncrement=options.timePickerIncrement),"boolean"==typeof options.timePicker24Hour&&(this.timePicker24Hour=options.timePicker24Hour),"boolean"==typeof options.autoApply&&(this.autoApply=options.autoApply),"boolean"==typeof options.autoUpdateInput&&(this.autoUpdateInput=options.autoUpdateInput),"boolean"==typeof options.linkedCalendars&&(this.linkedCalendars=options.linkedCalendars),"function"==typeof options.isInvalidDate&&(this.isInvalidDate=options.isInvalidDate),"boolean"==typeof options.alwaysShowCalendars&&(this.alwaysShowCalendars=options.alwaysShowCalendars),0!=this.locale.firstDay)for(var iterator=this.locale.firstDay;iterator>0;)this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()),iterator--;var start,end,range;if("undefined"==typeof options.startDate&&"undefined"==typeof options.endDate&&$(this.element).is("input[type=text]")){var val=$(this.element).val(),split=val.split(this.locale.separator);start=end=null,2==split.length?(start=moment(split[0],this.locale.format),end=moment(split[1],this.locale.format)):this.singleDatePicker&&""!==val&&(start=moment(val,this.locale.format),end=moment(val,this.locale.format)),null!==start&&null!==end&&(this.setStartDate(start),this.setEndDate(end))}if("object"==typeof options.ranges){for(range in options.ranges){start="string"==typeof options.ranges[range][0]?moment(options.ranges[range][0],this.locale.format):moment(options.ranges[range][0]),end="string"==typeof options.ranges[range][1]?moment(options.ranges[range][1],this.locale.format):moment(options.ranges[range][1]),this.minDate&&start.isBefore(this.minDate)&&(start=this.minDate.clone());var maxDate=this.maxDate;if(this.dateLimit&&start.clone().add(this.dateLimit).isAfter(maxDate)&&(maxDate=start.clone().add(this.dateLimit)),maxDate&&end.isAfter(maxDate)&&(end=maxDate.clone()),!(this.minDate&&end.isBefore(this.minDate)||maxDate&&start.isAfter(maxDate))){var elem=document.createElement("textarea");elem.innerHTML=range;var rangeHtml=elem.value;this.ranges[rangeHtml]=[start,end]}}var list="<ul>";for(range in this.ranges)list+="<li>"+range+"</li>";list+="<li>"+this.locale.customRangeLabel+"</li>",list+="</ul>",this.container.find(".ranges").prepend(list)}if("function"==typeof cb&&(this.callback=cb),this.timePicker||(this.startDate=this.startDate.startOf("day"),this.endDate=this.endDate.endOf("day"),this.container.find(".calendar-time").hide()),this.timePicker&&this.autoApply&&(this.autoApply=!1),this.autoApply&&"object"!=typeof options.ranges?this.container.find(".ranges").hide():this.autoApply&&this.container.find(".applyBtn, .cancelBtn").addClass("hide"),this.singleDatePicker&&(this.container.addClass("single"),this.container.find(".calendar.left").addClass("single"),this.container.find(".calendar.left").show(),this.container.find(".calendar.right").hide(),this.container.find(".daterangepicker_input input, .daterangepicker_input i").hide(),this.timePicker||this.container.find(".ranges").hide()),("undefined"==typeof options.ranges&&!this.singleDatePicker||this.alwaysShowCalendars)&&this.container.addClass("show-calendar"),this.container.addClass("opens"+this.opens),"undefined"!=typeof options.ranges&&"right"==this.opens){var ranges=this.container.find(".ranges"),html=ranges.clone();ranges.remove(),this.container.find(".calendar.left").parent().prepend(html)}this.container.find(".applyBtn, .cancelBtn").addClass(this.buttonClasses),this.applyClass.length&&this.container.find(".applyBtn").addClass(this.applyClass),this.cancelClass.length&&this.container.find(".cancelBtn").addClass(this.cancelClass),this.container.find(".applyBtn").html(this.locale.applyLabel),this.container.find(".cancelBtn").html(this.locale.cancelLabel),this.container.find(".calendar").on("click.daterangepicker",".prev",$.proxy(this.clickPrev,this)).on("click.daterangepicker",".next",$.proxy(this.clickNext,this)).on("click.daterangepicker","td.available",$.proxy(this.clickDate,this)).on("mouseenter.daterangepicker","td.available",$.proxy(this.hoverDate,this)).on("mouseleave.daterangepicker","td.available",$.proxy(this.updateFormInputs,this)).on("change.daterangepicker","select.yearselect",$.proxy(this.monthOrYearChanged,this)).on("change.daterangepicker","select.monthselect",$.proxy(this.monthOrYearChanged,this)).on("change.daterangepicker","select.hourselect,select.minuteselect,select.secondselect,select.ampmselect",$.proxy(this.timeChanged,this)).on("click.daterangepicker",".daterangepicker_input input",$.proxy(this.showCalendars,this)).on("change.daterangepicker",".daterangepicker_input input",$.proxy(this.formInputsChanged,this)),this.container.find(".ranges").on("click.daterangepicker","button.applyBtn",$.proxy(this.clickApply,this)).on("click.daterangepicker","button.cancelBtn",$.proxy(this.clickCancel,this)).on("click.daterangepicker","li",$.proxy(this.clickRange,this)).on("mouseenter.daterangepicker","li",$.proxy(this.hoverRange,this)).on("mouseleave.daterangepicker","li",$.proxy(this.updateFormInputs,this)),this.element.is("input")?this.element.on({"click.daterangepicker":$.proxy(this.show,this),"focus.daterangepicker":$.proxy(this.show,this),"keyup.daterangepicker":$.proxy(this.elementChanged,this),"keydown.daterangepicker":$.proxy(this.keydown,this)}):this.element.on("click.daterangepicker",$.proxy(this.toggle,this)),this.element.is("input")&&!this.singleDatePicker&&this.autoUpdateInput?(this.element.val(this.startDate.format(this.locale.format)+this.locale.separator+this.endDate.format(this.locale.format)),this.element.trigger("change")):this.element.is("input")&&this.autoUpdateInput&&(this.element.val(this.startDate.format(this.locale.format)),this.element.trigger("change"))};return DateRangePicker.prototype={constructor:DateRangePicker,setStartDate:function(startDate){"string"==typeof startDate&&(this.startDate=moment(startDate,this.locale.format)),"object"==typeof startDate&&(this.startDate=moment(startDate)),this.timePicker||(this.startDate=this.startDate.startOf("day")),this.timePicker&&this.timePickerIncrement&&this.startDate.minute(Math.round(this.startDate.minute()/this.timePickerIncrement)*this.timePickerIncrement),this.minDate&&this.startDate.isBefore(this.minDate)&&(this.startDate=this.minDate),this.maxDate&&this.startDate.isAfter(this.maxDate)&&(this.startDate=this.maxDate),this.isShowing||this.updateElement(),this.updateMonthsInView()},setEndDate:function(endDate){"string"==typeof endDate&&(this.endDate=moment(endDate,this.locale.format)),"object"==typeof endDate&&(this.endDate=moment(endDate)),this.timePicker||(this.endDate=this.endDate.endOf("day")),this.timePicker&&this.timePickerIncrement&&this.endDate.minute(Math.round(this.endDate.minute()/this.timePickerIncrement)*this.timePickerIncrement),this.endDate.isBefore(this.startDate)&&(this.endDate=this.startDate.clone()),this.maxDate&&this.endDate.isAfter(this.maxDate)&&(this.endDate=this.maxDate),this.dateLimit&&this.startDate.clone().add(this.dateLimit).isBefore(this.endDate)&&(this.endDate=this.startDate.clone().add(this.dateLimit)),this.previousRightTime=this.endDate.clone(),this.isShowing||this.updateElement(),this.updateMonthsInView()},isInvalidDate:function(){return!1},updateView:function(){this.timePicker&&(this.renderTimePicker("left"),this.renderTimePicker("right"),this.endDate?this.container.find(".right .calendar-time select").removeAttr("disabled").removeClass("disabled"):this.container.find(".right .calendar-time select").attr("disabled","disabled").addClass("disabled")),this.endDate?(this.container.find('input[name="daterangepicker_end"]').removeClass("active"),this.container.find('input[name="daterangepicker_start"]').addClass("active")):(this.container.find('input[name="daterangepicker_end"]').addClass("active"),this.container.find('input[name="daterangepicker_start"]').removeClass("active")),this.updateMonthsInView(),this.updateCalendars(),this.updateFormInputs()},updateMonthsInView:function(){if(this.endDate){if(!this.singleDatePicker&&this.leftCalendar.month&&this.rightCalendar.month&&(this.startDate.format("YYYY-MM")==this.leftCalendar.month.format("YYYY-MM")||this.startDate.format("YYYY-MM")==this.rightCalendar.month.format("YYYY-MM"))&&(this.endDate.format("YYYY-MM")==this.leftCalendar.month.format("YYYY-MM")||this.endDate.format("YYYY-MM")==this.rightCalendar.month.format("YYYY-MM")))return;this.leftCalendar.month=this.startDate.clone().date(2),this.linkedCalendars||this.endDate.month()==this.startDate.month()&&this.endDate.year()==this.startDate.year()?this.rightCalendar.month=this.startDate.clone().date(2).add(1,"month"):this.rightCalendar.month=this.endDate.clone().date(2)}else this.leftCalendar.month.format("YYYY-MM")!=this.startDate.format("YYYY-MM")&&this.rightCalendar.month.format("YYYY-MM")!=this.startDate.format("YYYY-MM")&&(this.leftCalendar.month=this.startDate.clone().date(2),this.rightCalendar.month=this.startDate.clone().date(2).add(1,"month"))},updateCalendars:function(){if(this.timePicker){var hour,minute,second;if(this.endDate){if(hour=parseInt(this.container.find(".left .hourselect").val(),10),minute=parseInt(this.container.find(".left .minuteselect").val(),10),second=this.timePickerSeconds?parseInt(this.container.find(".left .secondselect").val(),10):0,!this.timePicker24Hour){var ampm=this.container.find(".left .ampmselect").val();"PM"===ampm&&hour<12&&(hour+=12),"AM"===ampm&&12===hour&&(hour=0)}}else if(hour=parseInt(this.container.find(".right .hourselect").val(),10),minute=parseInt(this.container.find(".right .minuteselect").val(),10),second=this.timePickerSeconds?parseInt(this.container.find(".right .secondselect").val(),10):0,!this.timePicker24Hour){var ampm=this.container.find(".right .ampmselect").val();"PM"===ampm&&hour<12&&(hour+=12),"AM"===ampm&&12===hour&&(hour=0)}this.leftCalendar.month.hour(hour).minute(minute).second(second),this.rightCalendar.month.hour(hour).minute(minute).second(second)}this.renderCalendar("left"),this.renderCalendar("right"),this.container.find(".ranges li").removeClass("active"),null!=this.endDate&&this.calculateChosenLabel()},renderCalendar:function(side){var calendar="left"==side?this.leftCalendar:this.rightCalendar,month=calendar.month.month(),year=calendar.month.year(),hour=calendar.month.hour(),minute=calendar.month.minute(),second=calendar.month.second(),daysInMonth=moment([year,month]).daysInMonth(),firstDay=moment([year,month,1]),lastDay=moment([year,month,daysInMonth]),lastMonth=moment(firstDay).subtract(1,"month").month(),lastYear=moment(firstDay).subtract(1,"month").year(),daysInLastMonth=moment([lastYear,lastMonth]).daysInMonth(),dayOfWeek=firstDay.day(),calendar=[];calendar.firstDay=firstDay,calendar.lastDay=lastDay;for(var i=0;i<6;i++)calendar[i]=[];var startDay=daysInLastMonth-dayOfWeek+this.locale.firstDay+1;startDay>daysInLastMonth&&(startDay-=7),dayOfWeek==this.locale.firstDay&&(startDay=daysInLastMonth-6);for(var col,row,curDate=moment([lastYear,lastMonth,startDay,12,minute,second]),i=0,col=0,row=0;i<42;i++,col++,curDate=moment(curDate).add(24,"hour"))i>0&&col%7===0&&(col=0,row++),calendar[row][col]=curDate.clone().hour(hour).minute(minute).second(second),curDate.hour(12),this.minDate&&calendar[row][col].format("YYYY-MM-DD")==this.minDate.format("YYYY-MM-DD")&&calendar[row][col].isBefore(this.minDate)&&"left"==side&&(calendar[row][col]=this.minDate.clone()),this.maxDate&&calendar[row][col].format("YYYY-MM-DD")==this.maxDate.format("YYYY-MM-DD")&&calendar[row][col].isAfter(this.maxDate)&&"right"==side&&(calendar[row][col]=this.maxDate.clone());"left"==side?this.leftCalendar.calendar=calendar:this.rightCalendar.calendar=calendar;var minDate="left"==side?this.minDate:this.startDate,maxDate=this.maxDate,html=("left"==side?this.startDate:this.endDate,'<table class="table-condensed">');html+="<thead>",html+="<tr>",(this.showWeekNumbers||this.showISOWeekNumbers)&&(html+="<th></th>"),html+=minDate&&!minDate.isBefore(calendar.firstDay)||this.linkedCalendars&&"left"!=side?"<th></th>":'<th class="prev available"><i class="fa fa-chevron-left glyphicon glyphicon-chevron-left"></i></th>';var dateHtml=this.locale.monthNames[calendar[1][1].month()]+calendar[1][1].format(" YYYY");if(this.showDropdowns){for(var currentMonth=calendar[1][1].month(),currentYear=calendar[1][1].year(),maxYear=maxDate&&maxDate.year()||currentYear+5,minYear=minDate&&minDate.year()||currentYear-50,inMinYear=currentYear==minYear,inMaxYear=currentYear==maxYear,monthHtml='<select class="monthselect">',m=0;m<12;m++)monthHtml+=(!inMinYear||m>=minDate.month())&&(!inMaxYear||m<=maxDate.month())?"<option value='"+m+"'"+(m===currentMonth?" selected='selected'":"")+">"+this.locale.monthNames[m]+"</option>":"<option value='"+m+"'"+(m===currentMonth?" selected='selected'":"")+" disabled='disabled'>"+this.locale.monthNames[m]+"</option>";monthHtml+="</select>";for(var yearHtml='<select class="yearselect">',y=minYear;y<=maxYear;y++)yearHtml+='<option value="'+y+'"'+(y===currentYear?' selected="selected"':"")+">"+y+"</option>";yearHtml+="</select>",dateHtml=monthHtml+yearHtml}if(html+='<th colspan="5" class="month">'+dateHtml+"</th>",html+=maxDate&&!maxDate.isAfter(calendar.lastDay)||this.linkedCalendars&&"right"!=side&&!this.singleDatePicker?"<th></th>":'<th class="next available"><i class="fa fa-chevron-right glyphicon glyphicon-chevron-right"></i></th>',html+="</tr>",html+="<tr>",(this.showWeekNumbers||this.showISOWeekNumbers)&&(html+='<th class="week">'+this.locale.weekLabel+"</th>"),$.each(this.locale.daysOfWeek,function(index,dayOfWeek){html+="<th>"+dayOfWeek+"</th>"}),html+="</tr>",html+="</thead>",html+="<tbody>",null==this.endDate&&this.dateLimit){var maxLimit=this.startDate.clone().add(this.dateLimit).endOf("day");maxDate&&!maxLimit.isBefore(maxDate)||(maxDate=maxLimit)}for(var row=0;row<6;row++){html+="<tr>",this.showWeekNumbers?html+='<td class="week">'+calendar[row][0].week()+"</td>":this.showISOWeekNumbers&&(html+='<td class="week">'+calendar[row][0].isoWeek()+"</td>");for(var col=0;col<7;col++){var classes=[];calendar[row][col].isSame(new Date,"day")&&classes.push("today"),calendar[row][col].isoWeekday()>5&&classes.push("weekend"),calendar[row][col].month()!=calendar[1][1].month()&&classes.push("off"),this.minDate&&calendar[row][col].isBefore(this.minDate,"day")&&classes.push("off","disabled"),maxDate&&calendar[row][col].isAfter(maxDate,"day")&&classes.push("off","disabled"),this.isInvalidDate(calendar[row][col])&&classes.push("off","disabled"),calendar[row][col].format("YYYY-MM-DD")==this.startDate.format("YYYY-MM-DD")&&classes.push("active","start-date"),null!=this.endDate&&calendar[row][col].format("YYYY-MM-DD")==this.endDate.format("YYYY-MM-DD")&&classes.push("active","end-date"),null!=this.endDate&&calendar[row][col]>this.startDate&&calendar[row][col]<this.endDate&&classes.push("in-range");for(var cname="",disabled=!1,i=0;i<classes.length;i++)cname+=classes[i]+" ","disabled"==classes[i]&&(disabled=!0);disabled||(cname+="available"),html+='<td class="'+cname.replace(/^\s+|\s+$/g,"")+'" data-title="r'+row+"c"+col+'">'+calendar[row][col].date()+"</td>"}html+="</tr>"}html+="</tbody>",html+="</table>",this.container.find(".calendar."+side+" .calendar-table").html(html)},renderTimePicker:function(side){var html,selected,minDate,maxDate=this.maxDate;if(!this.dateLimit||this.maxDate&&!this.startDate.clone().add(this.dateLimit).isAfter(this.maxDate)||(maxDate=this.startDate.clone().add(this.dateLimit)),"left"==side)selected=this.startDate.clone(),minDate=this.minDate;else if("right"==side){selected=this.endDate?this.endDate.clone():this.previousRightTime.clone(),minDate=this.startDate;var timeSelector=this.container.find(".calendar.right .calendar-time div");if(""!=timeSelector.html()){if(selected.hour(timeSelector.find(".hourselect option:selected").val()||selected.hour()),selected.minute(timeSelector.find(".minuteselect option:selected").val()||selected.minute()),selected.second(timeSelector.find(".secondselect option:selected").val()||selected.second()),!this.timePicker24Hour){var ampm=timeSelector.find(".ampmselect option:selected").val();"PM"===ampm&&selected.hour()<12&&selected.hour(selected.hour()+12),"AM"===ampm&&12===selected.hour()&&selected.hour(0)}selected.isBefore(this.startDate)&&(selected=this.startDate.clone()),selected.isAfter(maxDate)&&(selected=maxDate.clone())}}html='<select class="hourselect">';for(var start=this.timePicker24Hour?0:1,end=this.timePicker24Hour?23:12,i=start;i<=end;i++){var i_in_24=i;this.timePicker24Hour||(i_in_24=selected.hour()>=12?12==i?12:i+12:12==i?0:i);var time=selected.clone().hour(i_in_24),disabled=!1;minDate&&time.minute(59).isBefore(minDate)&&(disabled=!0),maxDate&&time.minute(0).isAfter(maxDate)&&(disabled=!0),html+=i_in_24!=selected.hour()||disabled?disabled?'<option value="'+i+'" disabled="disabled" class="disabled">'+i+"</option>":'<option value="'+i+'">'+i+"</option>":'<option value="'+i+'" selected="selected">'+i+"</option>"}html+="</select> ",html+=': <select class="minuteselect">';for(var i=0;i<60;i+=this.timePickerIncrement){var padded=i<10?"0"+i:i,time=selected.clone().minute(i),disabled=!1;minDate&&time.second(59).isBefore(minDate)&&(disabled=!0),maxDate&&time.second(0).isAfter(maxDate)&&(disabled=!0),html+=selected.minute()!=i||disabled?disabled?'<option value="'+i+'" disabled="disabled" class="disabled">'+padded+"</option>":'<option value="'+i+'">'+padded+"</option>":'<option value="'+i+'" selected="selected">'+padded+"</option>"}if(html+="</select> ",this.timePickerSeconds){html+=': <select class="secondselect">';for(var i=0;i<60;i++){var padded=i<10?"0"+i:i,time=selected.clone().second(i),disabled=!1;minDate&&time.isBefore(minDate)&&(disabled=!0),maxDate&&time.isAfter(maxDate)&&(disabled=!0),html+=selected.second()!=i||disabled?disabled?'<option value="'+i+'" disabled="disabled" class="disabled">'+padded+"</option>":'<option value="'+i+'">'+padded+"</option>":'<option value="'+i+'" selected="selected">'+padded+"</option>"}html+="</select> "}if(!this.timePicker24Hour){html+='<select class="ampmselect">';var am_html="",pm_html="";minDate&&selected.clone().hour(12).minute(0).second(0).isBefore(minDate)&&(am_html=' disabled="disabled" class="disabled"'),maxDate&&selected.clone().hour(0).minute(0).second(0).isAfter(maxDate)&&(pm_html=' disabled="disabled" class="disabled"'),html+=selected.hour()>=12?'<option value="AM"'+am_html+'>AM</option><option value="PM" selected="selected"'+pm_html+">PM</option>":'<option value="AM" selected="selected"'+am_html+'>AM</option><option value="PM"'+pm_html+">PM</option>",html+="</select>"}this.container.find(".calendar."+side+" .calendar-time div").html(html)},updateFormInputs:function(){this.container.find("input[name=daterangepicker_start]").is(":focus")||this.container.find("input[name=daterangepicker_end]").is(":focus")||(this.container.find("input[name=daterangepicker_start]").val(this.startDate.format(this.locale.format)),this.endDate&&this.container.find("input[name=daterangepicker_end]").val(this.endDate.format(this.locale.format)),this.singleDatePicker||this.endDate&&(this.startDate.isBefore(this.endDate)||this.startDate.isSame(this.endDate))?this.container.find("button.applyBtn").removeAttr("disabled"):this.container.find("button.applyBtn").attr("disabled","disabled"))},move:function(){var containerTop,parentOffset={top:0,left:0},parentRightEdge=$(window).width();this.parentEl.is("body")||(parentOffset={top:this.parentEl.offset().top-this.parentEl.scrollTop(),left:this.parentEl.offset().left-this.parentEl.scrollLeft()},parentRightEdge=this.parentEl[0].clientWidth+this.parentEl.offset().left),containerTop="up"==this.drops?this.element.offset().top-this.container.outerHeight()-parentOffset.top:this.element.offset().top+this.element.outerHeight()-parentOffset.top,this.container["up"==this.drops?"addClass":"removeClass"]("dropup"),"left"==this.opens?(this.container.css({top:containerTop,right:parentRightEdge-this.element.offset().left-this.element.outerWidth(),left:"auto"}),this.container.offset().left<0&&this.container.css({right:"auto",left:9})):"center"==this.opens?(this.container.css({top:containerTop,left:this.element.offset().left-parentOffset.left+this.element.outerWidth()/2-this.container.outerWidth()/2,right:"auto"}),this.container.offset().left<0&&this.container.css({right:"auto",left:9})):(this.container.css({top:containerTop,left:this.element.offset().left-parentOffset.left,right:"auto"}),this.container.offset().left+this.container.outerWidth()>$(window).width()&&this.container.css({left:"auto",right:0}))},show:function(e){this.isShowing||(this._outsideClickProxy=$.proxy(function(e){this.outsideClick(e)},this),$(document).on("mousedown.daterangepicker",this._outsideClickProxy).on("touchend.daterangepicker",this._outsideClickProxy).on("click.daterangepicker","[data-toggle=dropdown]",this._outsideClickProxy).on("focusin.daterangepicker",this._outsideClickProxy),$(window).on("resize.daterangepicker",$.proxy(function(e){this.move(e)},this)),this.oldStartDate=this.startDate.clone(),this.oldEndDate=this.endDate.clone(),this.previousRightTime=this.endDate.clone(),this.updateView(),this.container.show(),this.move(),this.element.trigger("show.daterangepicker",this),this.isShowing=!0)},hide:function(e){this.isShowing&&(this.endDate||(this.startDate=this.oldStartDate.clone(),this.endDate=this.oldEndDate.clone()),this.startDate.isSame(this.oldStartDate)&&this.endDate.isSame(this.oldEndDate)||this.callback(this.startDate,this.endDate,this.chosenLabel),this.updateElement(),$(document).off(".daterangepicker"),$(window).off(".daterangepicker"),this.container.hide(),this.element.trigger("hide.daterangepicker",this),this.isShowing=!1)},toggle:function(e){this.isShowing?this.hide():this.show()},outsideClick:function(e){var target=$(e.target);"focusin"==e.type||target.closest(this.element).length||target.closest(this.container).length||target.closest(".calendar-table").length||this.hide()},showCalendars:function(){this.container.addClass("show-calendar"),this.move(),this.element.trigger("showCalendar.daterangepicker",this)},hideCalendars:function(){this.container.removeClass("show-calendar"),this.element.trigger("hideCalendar.daterangepicker",this)},hoverRange:function(e){if(!this.container.find("input[name=daterangepicker_start]").is(":focus")&&!this.container.find("input[name=daterangepicker_end]").is(":focus")){var label=e.target.innerHTML;if(label==this.locale.customRangeLabel)this.updateView();else{var dates=this.ranges[label];this.container.find("input[name=daterangepicker_start]").val(dates[0].format(this.locale.format)),this.container.find("input[name=daterangepicker_end]").val(dates[1].format(this.locale.format))}}},clickRange:function(e){var label=e.target.innerHTML;if(this.chosenLabel=label,label==this.locale.customRangeLabel)this.showCalendars();else{var dates=this.ranges[label];this.startDate=dates[0],this.endDate=dates[1],this.timePicker||(this.startDate.startOf("day"),this.endDate.endOf("day")),this.alwaysShowCalendars||this.hideCalendars(),this.clickApply()}},clickPrev:function(e){var cal=$(e.target).parents(".calendar");cal.hasClass("left")?(this.leftCalendar.month.subtract(1,"month"),this.linkedCalendars&&this.rightCalendar.month.subtract(1,"month")):this.rightCalendar.month.subtract(1,"month"),this.updateCalendars()},clickNext:function(e){var cal=$(e.target).parents(".calendar");cal.hasClass("left")?this.leftCalendar.month.add(1,"month"):(this.rightCalendar.month.add(1,"month"),this.linkedCalendars&&this.leftCalendar.month.add(1,"month")),this.updateCalendars()},hoverDate:function(e){if(!this.container.find("input[name=daterangepicker_start]").is(":focus")&&!this.container.find("input[name=daterangepicker_end]").is(":focus")&&$(e.target).hasClass("available")){var title=$(e.target).attr("data-title"),row=title.substr(1,1),col=title.substr(3,1),cal=$(e.target).parents(".calendar"),date=cal.hasClass("left")?this.leftCalendar.calendar[row][col]:this.rightCalendar.calendar[row][col];this.endDate?this.container.find("input[name=daterangepicker_start]").val(date.format(this.locale.format)):this.container.find("input[name=daterangepicker_end]").val(date.format(this.locale.format));var leftCalendar=this.leftCalendar,rightCalendar=this.rightCalendar,startDate=this.startDate;this.endDate||this.container.find(".calendar td").each(function(index,el){if(!$(el).hasClass("week")){var title=$(el).attr("data-title"),row=title.substr(1,1),col=title.substr(3,1),cal=$(el).parents(".calendar"),dt=cal.hasClass("left")?leftCalendar.calendar[row][col]:rightCalendar.calendar[row][col];dt.isAfter(startDate)&&dt.isBefore(date)?$(el).addClass("in-range"):$(el).removeClass("in-range")}})}},clickDate:function(e){if($(e.target).hasClass("available")){var title=$(e.target).attr("data-title"),row=title.substr(1,1),col=title.substr(3,1),cal=$(e.target).parents(".calendar"),date=cal.hasClass("left")?this.leftCalendar.calendar[row][col]:this.rightCalendar.calendar[row][col];if(this.endDate||date.isBefore(this.startDate,"day")){if(this.timePicker){var hour=parseInt(this.container.find(".left .hourselect").val(),10);if(!this.timePicker24Hour){var ampm=this.container.find(".left .ampmselect").val();"PM"===ampm&&hour<12&&(hour+=12),"AM"===ampm&&12===hour&&(hour=0)}var minute=parseInt(this.container.find(".left .minuteselect").val(),10),second=this.timePickerSeconds?parseInt(this.container.find(".left .secondselect").val(),10):0;date=date.clone().hour(hour).minute(minute).second(second)}this.endDate=null,this.setStartDate(date.clone())}else if(!this.endDate&&date.isBefore(this.startDate))this.setEndDate(this.startDate.clone());else{if(this.timePicker){var hour=parseInt(this.container.find(".right .hourselect").val(),10);if(!this.timePicker24Hour){var ampm=this.container.find(".right .ampmselect").val();"PM"===ampm&&hour<12&&(hour+=12),"AM"===ampm&&12===hour&&(hour=0)}var minute=parseInt(this.container.find(".right .minuteselect").val(),10),second=this.timePickerSeconds?parseInt(this.container.find(".right .secondselect").val(),10):0;date=date.clone().hour(hour).minute(minute).second(second)}this.setEndDate(date.clone()),
this.autoApply&&(this.calculateChosenLabel(),this.clickApply())}this.singleDatePicker&&(this.setEndDate(this.startDate),this.timePicker||this.clickApply()),this.updateView()}},calculateChosenLabel:function(){var customRange=!0,i=0;for(var range in this.ranges){if(this.timePicker){if(this.startDate.isSame(this.ranges[range][0])&&this.endDate.isSame(this.ranges[range][1])){customRange=!1,this.chosenLabel=this.container.find(".ranges li:eq("+i+")").addClass("active").html();break}}else if(this.startDate.format("YYYY-MM-DD")==this.ranges[range][0].format("YYYY-MM-DD")&&this.endDate.format("YYYY-MM-DD")==this.ranges[range][1].format("YYYY-MM-DD")){customRange=!1,this.chosenLabel=this.container.find(".ranges li:eq("+i+")").addClass("active").html();break}i++}customRange&&(this.chosenLabel=this.container.find(".ranges li:last").addClass("active").html(),this.showCalendars())},clickApply:function(e){this.hide(),this.element.trigger("apply.daterangepicker",this)},clickCancel:function(e){this.startDate=this.oldStartDate,this.endDate=this.oldEndDate,this.hide(),this.element.trigger("cancel.daterangepicker",this)},monthOrYearChanged:function(e){var isLeft=$(e.target).closest(".calendar").hasClass("left"),leftOrRight=isLeft?"left":"right",cal=this.container.find(".calendar."+leftOrRight),month=parseInt(cal.find(".monthselect").val(),10),year=cal.find(".yearselect").val();isLeft||(year<this.startDate.year()||year==this.startDate.year()&&month<this.startDate.month())&&(month=this.startDate.month(),year=this.startDate.year()),this.minDate&&(year<this.minDate.year()||year==this.minDate.year()&&month<this.minDate.month())&&(month=this.minDate.month(),year=this.minDate.year()),this.maxDate&&(year>this.maxDate.year()||year==this.maxDate.year()&&month>this.maxDate.month())&&(month=this.maxDate.month(),year=this.maxDate.year()),isLeft?(this.leftCalendar.month.month(month).year(year),this.linkedCalendars&&(this.rightCalendar.month=this.leftCalendar.month.clone().add(1,"month"))):(this.rightCalendar.month.month(month).year(year),this.linkedCalendars&&(this.leftCalendar.month=this.rightCalendar.month.clone().subtract(1,"month"))),this.updateCalendars()},timeChanged:function(e){var cal=$(e.target).closest(".calendar"),isLeft=cal.hasClass("left"),hour=parseInt(cal.find(".hourselect").val(),10),minute=parseInt(cal.find(".minuteselect").val(),10),second=this.timePickerSeconds?parseInt(cal.find(".secondselect").val(),10):0;if(!this.timePicker24Hour){var ampm=cal.find(".ampmselect").val();"PM"===ampm&&hour<12&&(hour+=12),"AM"===ampm&&12===hour&&(hour=0)}if(isLeft){var start=this.startDate.clone();start.hour(hour),start.minute(minute),start.second(second),this.setStartDate(start),this.singleDatePicker?this.endDate=this.startDate.clone():this.endDate&&this.endDate.format("YYYY-MM-DD")==start.format("YYYY-MM-DD")&&this.endDate.isBefore(start)&&this.setEndDate(start.clone())}else if(this.endDate){var end=this.endDate.clone();end.hour(hour),end.minute(minute),end.second(second),this.setEndDate(end)}this.updateCalendars(),this.updateFormInputs(),this.renderTimePicker("left"),this.renderTimePicker("right")},formInputsChanged:function(e){var isRight=$(e.target).closest(".calendar").hasClass("right"),start=moment(this.container.find('input[name="daterangepicker_start"]').val(),this.locale.format),end=moment(this.container.find('input[name="daterangepicker_end"]').val(),this.locale.format);start.isValid()&&end.isValid()&&(isRight&&end.isBefore(start)&&(start=end.clone()),this.setStartDate(start),this.setEndDate(end),isRight?this.container.find('input[name="daterangepicker_start"]').val(this.startDate.format(this.locale.format)):this.container.find('input[name="daterangepicker_end"]').val(this.endDate.format(this.locale.format))),this.updateCalendars(),this.timePicker&&(this.renderTimePicker("left"),this.renderTimePicker("right"))},elementChanged:function(){if(this.element.is("input")&&this.element.val().length&&!(this.element.val().length<this.locale.format.length)){var dateString=this.element.val().split(this.locale.separator),start=null,end=null;2===dateString.length&&(start=moment(dateString[0],this.locale.format),end=moment(dateString[1],this.locale.format)),(this.singleDatePicker||null===start||null===end)&&(start=moment(this.element.val(),this.locale.format),end=start),start.isValid()&&end.isValid()&&(this.setStartDate(start),this.setEndDate(end),this.updateView())}},keydown:function(e){9!==e.keyCode&&13!==e.keyCode||this.hide()},updateElement:function(){this.element.is("input")&&!this.singleDatePicker&&this.autoUpdateInput?(this.element.val(this.startDate.format(this.locale.format)+this.locale.separator+this.endDate.format(this.locale.format)),this.element.trigger("change")):this.element.is("input")&&this.autoUpdateInput&&(this.element.val(this.startDate.format(this.locale.format)),this.element.trigger("change"))},remove:function(){this.container.remove(),this.element.off(".daterangepicker"),this.element.removeData()}},$.fn.daterangepicker=function(options,callback){return this.each(function(){var el=$(this);el.data("daterangepicker")&&el.data("daterangepicker").remove(),el.data("daterangepicker",new DateRangePicker(el,options,callback))}),this},DateRangePicker});