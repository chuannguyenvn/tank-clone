import UIScene from './ui-scene'
import ButtonElement from '../objects/ButtonElement'

export class PauseScene extends UIScene
{
    private pauseButton: ButtonElement

    constructor() {
        super('PauseScene')
    }

    create(): void {
        super.create()

        this.pauseButton = new ButtonElement(this, 0, 0, 128, 64)
        this.pauseButton.setAlign(Phaser.Display.Align.In.TopRight, -10, -10)
        this.pauseButton.setText("Pause")
        this.pauseButton.text.setTint(0x111111)
        this.pauseButton.text.setFontSize(30)
        this.pauseButton.playIdleAnimation = false
        this.pauseButton.stopAllAnimations()
    }
}
