angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives'])

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// 默认情况下隐藏附件栏（删除此项可显示表单输入键盘上方的附件栏）
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleLightContent();
		}
	});
})

.config(function($stateProvider, $urlRouterProvider) {

	// Ionic使用AngularUI路由器，它使用状态的概念在这里了解更多：https://github.com/angular-ui/ui-router
	// 设置应用程序可以进入的各种状态。每个状态的控制器都可以在controllers.js中找到
	$stateProvider

	// setup an abstract state for the mains directive
	.state('main', {
		url:         "/main",
		templateUrl: "templates/main.html",
		controller:  'MainController'
	})

	// 每个主体都有自己的导航历史堆栈：
	.state('game', {
		url:         '/game/:level',
		templateUrl: 'templates/game.html',
		controller:  'GameController'
	})

	// 如果没有上述状态匹配，使用它作为回退
	$urlRouterProvider.otherwise('/main');

});
