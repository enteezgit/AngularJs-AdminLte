!function(factory){"function"==typeof define&&define.amd?define(["jquery","../version","../widget"],factory):factory(jQuery)}(function($){return $.widget("ui.progressbar",{version:"1.12.0",options:{classes:{"ui-progressbar":"ui-corner-all","ui-progressbar-value":"ui-corner-left","ui-progressbar-complete":"ui-corner-right"},max:100,value:0,change:null,complete:null},min:0,_create:function(){this.oldValue=this.options.value=this._constrainedValue(),this.element.attr({role:"progressbar","aria-valuemin":this.min}),this._addClass("ui-progressbar","ui-widget ui-widget-content"),this.valueDiv=$("<div>").appendTo(this.element),this._addClass(this.valueDiv,"ui-progressbar-value","ui-widget-header"),this._refreshValue()},_destroy:function(){this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"),this.valueDiv.remove()},value:function(newValue){return void 0===newValue?this.options.value:(this.options.value=this._constrainedValue(newValue),void this._refreshValue())},_constrainedValue:function(newValue){return void 0===newValue&&(newValue=this.options.value),this.indeterminate=newValue===!1,"number"!=typeof newValue&&(newValue=0),!this.indeterminate&&Math.min(this.options.max,Math.max(this.min,newValue))},_setOptions:function(options){var value=options.value;delete options.value,this._super(options),this.options.value=this._constrainedValue(value),this._refreshValue()},_setOption:function(key,value){"max"===key&&(value=Math.max(this.min,value)),this._super(key,value)},_setOptionDisabled:function(value){this._super(value),this.element.attr("aria-disabled",value),this._toggleClass(null,"ui-state-disabled",!!value)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var value=this.options.value,percentage=this._percentage();this.valueDiv.toggle(this.indeterminate||value>this.min).width(percentage.toFixed(0)+"%"),this._toggleClass(this.valueDiv,"ui-progressbar-complete",null,value===this.options.max)._toggleClass("ui-progressbar-indeterminate",null,this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=$("<div>").appendTo(this.valueDiv),this._addClass(this.overlayDiv,"ui-progressbar-overlay"))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":value}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==value&&(this.oldValue=value,this._trigger("change")),value===this.options.max&&this._trigger("complete")}})});