!function(factory){"function"==typeof define&&define.amd?define(["jquery","./form","./version"],factory):factory(jQuery)}(function($){return $.ui.formResetMixin={_formResetHandler:function(){var form=$(this);setTimeout(function(){var instances=form.data("ui-form-reset-instances");$.each(instances,function(){this.refresh()})})},_bindFormResetHandler:function(){if(this.form=this.element.form(),this.form.length){var instances=this.form.data("ui-form-reset-instances")||[];instances.length||this.form.on("reset.ui-form-reset",this._formResetHandler),instances.push(this),this.form.data("ui-form-reset-instances",instances)}},_unbindFormResetHandler:function(){if(this.form.length){var instances=this.form.data("ui-form-reset-instances");instances.splice($.inArray(this,instances),1),instances.length?this.form.data("ui-form-reset-instances",instances):this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")}}}});