import Phaser from 'phaser'

/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {number} count 
 * @param {string} texture 
 * @param {number} scrollFactor 
 *  @param {number} scale 
 */

const createLooped = (scene, count, texture, scrollFactor, scale) => {
    let x = 0
    for (let i = 0; i < count; ++i) {
        const m = scene.add.image(x, scene.scale.height, texture)
        .setOrigin(0, 1)
        .setScale(scale)
        .setScrollFactor(scrollFactor)
        x += m.width * scale
    }
} 

export default class Game extends Phaser.Scene 
{
    constructor()
    {
        super('game')
    }
    preload()
    {
        this.load.image('sky', 'assets/sky.png')
        this.load.image('mountains', 'assets/mountains.png')
        this.load.image('plateau', 'assets/plateau.png')
        this.load.image('ground', 'assets/ground.png')
        this.load.image('plants', 'assets/plant.png')
        this.load.image('rethmans', 'assets/rethmans.png')

        this.cursors = this.input.keyboard.createCursorKeys()

    }
    create()
    {
        const width = this.scale.width
        const height = this.scale.height

        this.add.image(width * .5, height * .5, 'sky')
       .setScrollFactor(0)

        createLooped(this, 2, 'mountains', .25, .45)
        createLooped(this, 3, 'plateau', .5, .45)
        createLooped(this, 3, 'ground', 1, .5)

       this.add.image(30, height - 60, 'rethmans')
       .setOrigin(0,1)
       .setScale(.6)

       createLooped(this, 3, 'plants', 1.25, .6)

       this.cameras.main.setBounds(0, 0, width * 3, height )
    }
    update() {

        const cam = this.cameras.main
        const speed = 3;
        if (this.cursors.left.isDown)
        {
            // Move Left
            cam.scrollX -= speed
        }
        else if (this.cursors.right.isDown)
        {
            // Move Right
            cam.scrollX += speed
        }
    }
}