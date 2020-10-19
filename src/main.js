import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 450,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 500 }
			
		}
	},
	scene: [Preloader, Game]
}

export default new Phaser.Game(config)
