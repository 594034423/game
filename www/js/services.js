angular.module('starter.services', [])

.service('Game', function() {

	return {
		time:  0,
		icons: [],

		levels : [
			{
				name:        "低级",
				time:        30,
				description: "低级",
				points:      20,
				boardSize:   4
			},
			{
				name:        "中级",
				time:        120,
				description: "中级",
				points:      30,
				boardSize:   5
			},
			{
				name:        "高级",
				time:        180,
				description: "高级",
				points:      45,
				boardSize:   7
			},

			{
				name:        "地狱",
				time:        250,
				description: "地狱",
				points:      60,
				boardSize:   9
			}
		],

	startLevel: function( level ){

		this.level        = this.levels[level];
		this.time         = this.level.time;

		return this.level;
	},
	setIcons: function( icons ){

		this.icons        = icons;
	},

	updateTime: function(){

		return this.time -= 1;
	},
	getCards: function(){

		var level = this.level;

		var cards = [];
		// build the matrix
		var icons = [];
		for( var i = 1; i <= (level.boardSize * level.boardSize) / 2 ; i++ ){

			var icon = Math.floor((Math.random() * this.icons.length));
			icons.push(icon);
			icons.push(icon);
		}
		for( var i = 1; i <= level.boardSize ; i++ ){

			var row = [];
			for( var j = 1; j <= level.boardSize ; j++ ){

				var icon = Math.floor(Math.random()*icons.length);

				row.push({
					icon : this.icons[ icons[icon] ],
					show : false
				})

				// delete found icon
				var index = icons.indexOf(icons[icon]);
    			icons.splice(index, 1);
			}

			cards.push( row )
		}

		return cards;

	},

	};
});
