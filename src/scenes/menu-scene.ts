import Key = Phaser.Input.Keyboard.Key
import ButtonElement from '../objects/ButtonElement'
import UIScene from './ui-scene'
import TextElement from '../objects/TextElement'

export class MenuScene extends UIScene
{
    private startKey: Phaser.Input.Keyboard.Key
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = []

    constructor() {
        super('MenuScene')
    }

    init(): void {
        this.startKey = this.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.S,
        ) as Key
        this.startKey.isDown = false
    }

    create(): void {
        super.create()

        const button = new ButtonElement(this, 0, 0, 200, 100)
        button.setAlign(Phaser.Display.Align.In.Center, 0, 50)
        button.setText("Play")
        button.text.setTint(0x000000)
        button.pointerUp.push(() => this.scene.start('GameScene'))

        const title = new TextElement(this, 0, 0, 'TANK')
        title.setAlign(Phaser.Display.Align.In.Center, 0, -50)

        // this.tweens.addCounter({
        //     from: 0,
        //     to: 5,
        //     duration: 2000,
        //     ease: Phaser.Math.Easing.Quartic.In,
        //     onUpdate: (tween) => {
        //         (this.plugins.get('rexkawaseblurpipelineplugin') as any).add(this.cameras.main, {
        //             blur: tween.getValue(),
        //             quality: 3,
        //             pixelWidth: 1,
        //             pixelHeight: 1,
        //             name: 'rexKawaseBlurPostFx',
        //         })
        //     },
        // })
    }

    update(): void {
        if (this.startKey.isDown)
        {
            this.scene.start('GameScene')
        }
    }
}
