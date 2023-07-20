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

        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 120,
                this.sys.canvas.height / 2,
                'font',
                'PRESS S TO PLAY',
                30,
            ),
        )

        this.bitmapTexts.push(
            this.add.bitmapText(
                this.sys.canvas.width / 2 - 120,
                this.sys.canvas.height / 2 - 100,
                'font',
                'TANK',
                100,
            ),
        )

        const button = new ButtonElement(this, 0, 0)
        button.setAlign(Phaser.Display.Align.In.BottomRight, -50, -50)
        button.setSize(300, 150)
        // button.setElementOrigins(1, 0)
        // button.setPivot(Phaser.Display.Align.In.tople)

        new TextElement(this, 0, 0, 'fuck').setAlign(Phaser.Display.Align.In.Center, 0, 0)


        // (this.plugins.get('rexkawaseblurpipelineplugin') as any).add(this.cameras.main, {
        //     blur: 4,
        //     quality: 3,
        //     pixelWidth: 1,
        //     pixelHeight: 1,
        //     name: 'rexKawaseBlurPostFx',
        // })

        this.tweens.addCounter({
            from: 0,
            to: 5,
            duration: 2000,
            ease: Phaser.Math.Easing.Quartic.In,
            onUpdate: (tween) => {
                (this.plugins.get('rexkawaseblurpipelineplugin') as any).add(this.cameras.main, {
                    blur: tween.getValue(),
                    quality: 3,
                    pixelWidth: 1,
                    pixelHeight: 1,
                    name: 'rexKawaseBlurPostFx',
                })
            },
        })
    }

    update(): void {
        if (this.startKey.isDown)
        {
            this.scene.start('GameScene')
        }
    }
}
