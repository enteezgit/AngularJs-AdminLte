!function(factory){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],factory):factory(jQuery)}(function($){return $.effects.define("shake",function(options,done){var i=1,element=$(this),direction=options.direction||"left",distance=options.distance||20,times=options.times||3,anims=2*times+1,speed=Math.round(options.duration/anims),ref="up"===direction||"down"===direction?"top":"left",positiveMotion="up"===direction||"left"===direction,animation={},animation1={},animation2={},queuelen=element.queue().length;for($.effects.createPlaceholder(element),animation[ref]=(positiveMotion?"-=":"+=")+distance,animation1[ref]=(positiveMotion?"+=":"-=")+2*distance,animation2[ref]=(positiveMotion?"-=":"+=")+2*distance,element.animate(animation,speed,options.easing);i<times;i++)element.animate(animation1,speed,options.easing).animate(animation2,speed,options.easing);element.animate(animation1,speed,options.easing).animate(animation,speed/2,options.easing).queue(done),$.effects.unshift(element,queuelen,anims+1)})});