import Phaser from 'phaser'

import SceneKeys from '../consts/SceneKeys'
import TextureKeys from '../consts/TextureKeys'
import AnimationKeys from '../consts/AnimationKeys'

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

        this.anims.create({
            key: AnimationKeys.Rethmans,
            frames: this.anims.generateFrameNames(AnimationKeys.Rethmans, {
                start: 0,
                end: 4,
                prefix: AnimationKeys.Rethmans + '-idle-',
                zeroPad: 2,
                suffix: '.png'
            }),
            frameRate: 3,
            repeat: -1
        })

        const width = this.scale.width
        const height = this.scale.height
        const totalWidth = width * 3

        this.add.image(width * .5, height * .5, TextureKeys.Background)
            .setScrollFactor(0)
            .setOrigin(.5,.5)
        
        createLooped(this, totalWidth, TextureKeys.Mountains, .25)
        createLooped(this, totalWidth, TextureKeys.Plateau, .5)
        createLooped(this, totalWidth, TextureKeys.Ground, 1)
        createLooped(this, totalWidth, TextureKeys.Plants, 1.25)

        this.cameras.main.setBounds(0, 0, totalWidth, height )
        
        const player = this.physics.add.sprite(
            width * 0.3,
            height * 0,
            TextureKeys.Rethmans,
            )
        .play(AnimationKeys.Rethmans)
        const body = player.body as Phaser.Physics.Arcade.Body
        body.setCollideWorldBounds(true)
        body.bounce.set(.23)

        this.physics.world.setBounds(
            0, 0,
            Number.MAX_SAFE_INTEGER, height -60   
        )
    }
    update() {
        
        this.cursors = this.input.keyboard.createCursorKeys()
        
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