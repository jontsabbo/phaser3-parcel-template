import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'
import ItemKeys from '../consts/ItemKeys'

export default class Preloader extends Phaser.Scene
{
    constructor()
    {
        super(SceneKeys.Preloader)
    }
    preload()
    {

        this.load.image(
            TextureKeys.Background, 'assets/sky.png')
        this.load.image(
            TextureKeys.Mountains, 'assets/mountains.png')
        this.load.image(
            TextureKeys.Plateau, 'assets/plateau.png')
        this.load.image(
            TextureKeys.Ground, 'assets/ground.png')
        this.load.image(
            TextureKeys.Plants, 'assets/plant.png')
        this.load.atlas(
            TextureKeys.Rethmans,
            'assets/characters/rethmans.png',
            'assets/characters/rethmans.json'
        )
        this.load.atlas(
            ItemKeys.Park,
            'assets/worlds/park/park.png',
            'assets/worlds/park/park.json',
        )
    }
    create()
    {
        this.scene.start(SceneKeys.Game)
        console.log('Assets Loaded')
    }
}