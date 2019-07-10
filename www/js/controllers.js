angular.module('starter.controllers', [])

.controller('MainController', function($scope, $ionicHistory, $state, Game) {

	/////////////////
	// MENU SCREEN //
	/////////////////
	$ionicHistory.nextViewOptions({
	   disableBack: true
	});

	$scope.gameLevels = Game.levels;

	$scope.startGame = function(level){
		$state.go('game',{level: level});
	}
})

.controller('GameController', function($scope, $ionicHistory, $state, $window, Game) {

	//////////////
	// THE GAME //
	//////////////
	$ionicHistory.nextViewOptions({
	   disableBack: true
	});


	$scope.showMenu = function(){

		clearInterval( count );
		$state.go('main');
	}

	$scope.newBoard = function(){

		if( $scope.cards != undefined)
			setTimeout(function(){

				for(r in $scope.cards){
					for(c in $scope.cards[r]){
						$scope.cards[r][c].show = false;
					}
				}
				$scope.$apply();

			},300)

		setTimeout(function(){

			$scope.cards     = Game.getCards();
			$scope.$apply();
		},700)

		lastCard         = undefined;
		$scope.cardStyle = $scope.getCardStyle()
		hiddenCards      = ($scope.level.boardSize * $scope.level.boardSize) / 2;

	}

	$scope.newGame = function(){
		$scope.level = Game.startLevel( $state.params.level );

		$scope.score     = 0;
		$scope.gameStop  = false;
		$scope.time      = $scope.level.time;

		var wait        = false;

		clearInterval(count);

		$scope.newBoard();

		// 更新游戏的计时
		count = setInterval(function(){

			$scope.time = Game.updateTime();

			if( $scope.time == 0 ){
				$scope.gameStop = true;
				clearInterval(count);
			}

			$scope.$apply();
		},1000)

	}

	$scope.getCardStyle = function (){
		var width  = window.innerWidth;
		var height = window.innerHeight;

		var low = Math.min(width,height)

		console.log(low,width,height);

		return {
			width:  ( ( low / $scope.level.boardSize ) - 20 ) +"px",
			height: ( ( low / $scope.level.boardSize ) - 20 ) +"px"
		}
	}

	Game.setIcons([
		'red',
		'blue',
		'yellow',
		'cyan',
		'black',
		'magenta',
		'pink',
		'purple',
		'green',
		'brown',
		'navy',
		'silver',

	]);

	$scope.newGame();

	$scope.level = Game.startLevel( $state.params.level );

	var wait        = false;
	var count;

	// setTimeout(function(){
	// 	$scope.gameStop = true;
	// 	$scope.$apply();
	// },1600)

	$scope.checkCard = function(row,col){

		// 我们必须停止player的点击
		// 在卡上，所以我们可以完成所有的行动
		if( wait )
			return;

		var card = $scope.cards[row][col];

		// 如果该卡已经可见，我们将返回，因为此卡已被检查
		if( card.show == true )
			return;

		// 向玩家显示卡
		card.show = true;

		// 我们不能检查当前卡对和未定义卡，所以我们将返回这里，并将卡保存为最后一张卡
		if( lastCard == undefined ){

			lastCard = card;
			return;
		}


		// 如果玩家没有猜到卡，我们将切换回最后一张卡和当前卡
		if( card.icon != lastCard.icon ){

			wait = true;
			setTimeout(function(){
				wait      = false;
				card.show = lastCard.show = false;
				$scope.$apply();
				lastCard = undefined;
			},500)
			return ;
		}

		// 如果当前选择的卡具有与最后选择的卡相同的图标，我们将提交改变并将lastCard重置为未定义，以便玩家可以再次开始猜测另一张卡
		lastCard            = undefined;

		// 也增加玩家的分数
		$scope.score       += $scope.level.points;

		// 减少隐藏的卡的数量，所以我们在玩家完成游戏后显示完成闪屏
		hiddenCards -- ;
		console.log( hiddenCards );
		if( hiddenCards <= 0 )
			$scope.newBoard();

	}

})
