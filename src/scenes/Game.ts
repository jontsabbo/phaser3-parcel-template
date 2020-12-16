import Phaser from 'phaser'

import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'
import AnimationKeys from '../consts/AnimationKeys'
import ItemKeys from '../consts/ItemKeys'


/**
 * 
 * @param {Phaser.Scene} scene 
 * @param {number} totalWidth
 * @param {string} texture 
 * @param {number} scrollFactor 
 */

const createLooped = (scene, totalWidth, texture, scrollFactor) => {

    const loopCount = scene.textures.get(texture).getSourceImage().width
    const count = Math.ceil(totalWidth / loopCount) 

    let x = 0
    for (let i = 0; i < count; ++i) {
        const m = scene.add.image(x, scene.scale.height, texture)
        .setOrigin(0, 1)
        .setScrollFactor(scrollFactor)
        x +=  m.width
    }
} 

export default class Game extends Phaser.Scene 
{
    constructor()
    {
        super(SceneKeys.Game)
    }
    
    create()
    {
        const width = this.scale.width
        const height = this.scale.height
        const totalWidth = width * 3

        this.add.image(width * .5, height * .5, TextureKeys.Background)
            .setScrollFactor(0)
            .setOrigin(.5,.5)
        
        createLooped(this, totalWidth, TextureKeys.Mountains, .25)
        createLooped(this, totalWidth, TextureKeys.Plateau, .5)
        createLooped(this, totalWidth, TextureKeys.Ground, 1)
        // Create Player 
        this.player = this.createPlayer()
        // Create Items in Scene
        this.box = this.createItems()
       
        createLooped(this, totalWidth, TextureKeys.Plants, 1.25)
        this.cameras.main.setBounds(0, 0, totalWidth, height )
        this.physics.world.setBounds(
            0, 0, totalWidth, height -63   
        )
       
        this.cursors = this.input.keyboard.createCursorKeys()
        this.physics.add.collider(this.player, this.box);

        console.log(this.player)
        console.log(this.box)

    }

    createPlayer()
    {
        // Player Animation
        this.anims.create({
            key: AnimationKeys.RethmansIdle,
            frames: this.anims.generateFrameNames(AnimationKeys.RethmansIdle, {
                start: 0,
                end: 5,
                prefix: AnimationKeys.RethmansIdle + '-Idle-',
                zeroPad: 2,
                suffix: '.png'
            }),
            frameRate: 3,
            repeat: -1
        })
        // Place Player & Set Physics
        const player = this.physics.add.sprite(100, 0, TextureKeys.Rethmans)
        .play(AnimationKeys.RethmansIdle)
        const body = player.body as Phaser.Physics.Arcade.Body
        body.setCollideWorldBounds(true)
        body.bounce.set(.3)

        return player

    }
    createItems()
    {
        // Add box to scene
        const box = this.physics.add.sprite(500, 0, ItemKeys.Park, 'Mushroom.png')
        const body = box.body as Phaser.Physics.Arcade.Body
        body.setCollideWorldBounds(true)
        body.bounce.set(.1)
        body.setImmovable(true)
        
        return box
    }
    update() {
        this.cameras.main.startFollow(this.player)
       
        if (this.cursors.left.isDown)
		{
            this.player.setVelocityX(-160)
			// this.player.anims.play(AnimationKeys.RethmansIdle, true)
		}
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160)

            // this.player.anims.play(AnimationKeys.RethmansIdle, true)
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityX(0)

            this.player.anims.play(AnimationKeys.RethmansIdle)
        }

        else if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-380)
        }
    }
}