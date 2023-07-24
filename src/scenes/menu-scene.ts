import ButtonElement from '../objects/ButtonElement'
import UIScene from './ui-scene'
import TextElement from '../objects/TextElement'
import { PauseScene } from './pause-scene'

export class MenuScene extends UIScene
{
    private startKey: Phaser.Input.Keyboard.Key
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = []

    constructor() {
        super('MenuScene')
    }

    create(): void {
        super.create()
        const button = new ButtonElement(this, 0, 0, 200, 100)
        button.setAlign(Phaser.Display.Align.In.Center, 0, 50)
        button.setText('Play')
        button.text.setTint(0x000000)
        button.pointerUp.push(() => {
            this.scene.resume('GameScene');
            (this.scene.get('PauseScene') as PauseScene).pauseButton.setVisible(true)
            this.scene.stop()
        })

        const title = new TextElement(this, 0, 0, 'TANK')
        title.setAlign(Phaser.Display.Align.In.Center, 0, -50)

        this.scene.launch('GameScene')
        this.scene.pause('GameScene')

        this.scene.bringToTop()
    }
}
