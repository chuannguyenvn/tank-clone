import Key = Phaser.Input.Keyboard.Key
import Button from '../objects/Button'
import UIScene from './ui-scene'

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

        const button = new Button(this, 0, 0)
        button.setAlign(Phaser.Display.Align.In.BottomRight, -50, -50)
        // button.setElementOrigins(1, 0)
        // button.setPivot(Phaser.Display.Align.In.tople)
    }

    update(): void {
        if (this.startKey.isDown)
        {
            this.scene.start('GameScene')
        }
    }
}
