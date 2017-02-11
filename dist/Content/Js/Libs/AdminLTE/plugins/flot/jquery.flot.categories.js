!function($){function processRawData(plot,series,data,datapoints){var xCategories="categories"==series.xaxis.options.mode,yCategories="categories"==series.yaxis.options.mode;if(xCategories||yCategories){var format=datapoints.format;if(!format){var s=series;if(format=[],format.push({x:!0,number:!0,required:!0}),format.push({y:!0,number:!0,required:!0}),s.bars.show||s.lines.show&&s.lines.fill){var autoscale=!!(s.bars.show&&s.bars.zero||s.lines.show&&s.lines.zero);format.push({y:!0,number:!0,required:!1,defaultValue:0,autoscale:autoscale}),s.bars.horizontal&&(delete format[format.length-1].y,format[format.length-1].x=!0)}datapoints.format=format}for(var m=0;m<format.length;++m)format[m].x&&xCategories&&(format[m].number=!1),format[m].y&&yCategories&&(format[m].number=!1)}}function getNextIndex(categories){var index=-1;for(var v in categories)categories[v]>index&&(index=categories[v]);return index+1}function categoriesTickGenerator(axis){var res=[];for(var label in axis.categories){var v=axis.categories[label];v>=axis.min&&v<=axis.max&&res.push([v,label])}return res.sort(function(a,b){return a[0]-b[0]}),res}function setupCategoriesForAxis(series,axis,datapoints){if("categories"==series[axis].options.mode){if(!series[axis].categories){var c={},o=series[axis].options.categories||{};if($.isArray(o))for(var i=0;i<o.length;++i)c[o[i]]=i;else for(var v in o)c[v]=o[v];series[axis].categories=c}series[axis].options.ticks||(series[axis].options.ticks=categoriesTickGenerator),transformPointsOnAxis(datapoints,axis,series[axis].categories)}}function transformPointsOnAxis(datapoints,axis,categories){for(var points=datapoints.points,ps=datapoints.pointsize,format=datapoints.format,formatColumn=axis.charAt(0),index=getNextIndex(categories),i=0;i<points.length;i+=ps)if(null!=points[i])for(var m=0;m<ps;++m){var val=points[i+m];null!=val&&format[m][formatColumn]&&(val in categories||(categories[val]=index,++index),points[i+m]=categories[val])}}function processDatapoints(plot,series,datapoints){setupCategoriesForAxis(series,"xaxis",datapoints),setupCategoriesForAxis(series,"yaxis",datapoints)}function init(plot){plot.hooks.processRawData.push(processRawData),plot.hooks.processDatapoints.push(processDatapoints)}var options={xaxis:{categories:null},yaxis:{categories:null}};$.plot.plugins.push({init:init,options:options,name:"categories",version:"1.0"})}(jQuery);