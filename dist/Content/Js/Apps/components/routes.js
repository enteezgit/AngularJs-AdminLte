"use strict";define(["app"],function(app){return app.config(["$stateProvider","$urlRouterProvider","$ocLazyLoadProvider","IdleProvider","AppConfig",function($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,IdleProvider,AppConfig){IdleProvider.idle(5),IdleProvider.timeout(120),$ocLazyLoadProvider.config({debug:!0,loadedModules:["app"]}),$stateProvider.state("login",{url:"/login",templateUrl:AppConfig.templatePath+"loginView.tpl.html?v="+AppConfig.cacheBustSuffix,controller:"LoginCtrl",data:{pageTitle:"DemoApp Login"}}).state("app",{url:"/app","abstract":!0,templateUrl:AppConfig.templatePath+"dashboard.tpl.html?v="+AppConfig.cacheBustSuffix,controller:"BaseCtrl"}).state("app.dashboard",{url:"/dashboard",controller:"GraphCtrl",data:{pageTitle:"DemoApp Dashboard"},resolve:{loadPlugin:function($ocLazyLoad){return $ocLazyLoad.load([])}}}).state("app.ngtable",{url:"/dashboard",controller:"BaseCtrl",data:{pageTitle:"DemoApp Dashboard"},resolve:{loadPlugin:function($ocLazyLoad){return $ocLazyLoad.load([])}}}),$urlRouterProvider.otherwise("/login")}])});