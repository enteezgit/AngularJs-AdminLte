!function(factory){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],factory):factory(jQuery)}(function($){return $.effects.define("fold","hide",function(options,done){var element=$(this),mode=options.mode,show="show"===mode,hide="hide"===mode,size=options.size||15,percent=/([0-9]+)%/.exec(size),horizFirst=!!options.horizFirst,ref=horizFirst?["right","bottom"]:["bottom","right"],duration=options.duration/2,placeholder=$.effects.createPlaceholder(element),start=element.cssClip(),animation1={clip:$.extend({},start)},animation2={clip:$.extend({},start)},distance=[start[ref[0]],start[ref[1]]],queuelen=element.queue().length;percent&&(size=parseInt(percent[1],10)/100*distance[hide?0:1]),animation1.clip[ref[0]]=size,animation2.clip[ref[0]]=size,animation2.clip[ref[1]]=0,show&&(element.cssClip(animation2.clip),placeholder&&placeholder.css($.effects.clipToBox(animation2)),animation2.clip=start),element.queue(function(next){placeholder&&placeholder.animate($.effects.clipToBox(animation1),duration,options.easing).animate($.effects.clipToBox(animation2),duration,options.easing),next()}).animate(animation1,duration,options.easing).animate(animation2,duration,options.easing).queue(done),$.effects.unshift(element,queuelen,4)})});