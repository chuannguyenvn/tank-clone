import UIScene from './ui-scene'
import ButtonElement from '../objects/ButtonElement'
import TextElement from '../objects/TextElement'
import { GameScene } from './game-scene'

export class PauseScene extends UIScene
{
    public pauseButton: ButtonElement
    private continueButton: ButtonElement
    private newButton: ButtonElement
    private muteButton: ButtonElement

    public timerText: TextElement
    public timeLeft = 60

    public isPaused = true

    constructor() {
        super('PauseScene')
    }

    create(): void {
        super.create()

        this.pauseButton = new ButtonElement(this, 0, 0, 128, 64)
        this.pauseButton.setAlign(Phaser.Display.Align.In.TopRight, -10, -10)
        this.pauseButton.setText('Pause')
        this.pauseButton.text.setTint(0x111111)
        this.pauseButton.text.setFontSize(30)
        this.pauseButton.playIdleAnimation = false
        this.pauseButton.stopAllAnimations()
        this.pauseButton.pointerUp.push(() => {
            this.scene.pause('GameScene')
            this.togglePauseMenu(true)
        })

        this.continueButton = new ButtonElement(this, 0, 0, 150, 64)
        this.continueButton.setAlign(Phaser.Display.Align.In.Center, -80, -45)
        this.continueButton.setText('Continue')
        this.continueButton.text.setTint(0x111111)
        this.continueButton.text.setFontSize(30)
        this.continueButton.playIdleAnimation = false
        this.continueButton.stopAllAnimations()
        this.continueButton.pointerUp.push(() => {
            this.scene.resume('GameScene')
            this.togglePauseMenu(false)
        })

        this.newButton = new ButtonElement(this, 0, 0, 150, 64)
        this.newButton.setAlign(Phaser.Display.Align.In.Center, 80, -45)
        this.newButton.setText('Restart')
        this.newButton.text.setTint(0x111111)
        this.newButton.text.setFontSize(30)
        this.newButton.playIdleAnimation = false
        this.newButton.stopAllAnimations()
        this.newButton.pointerUp.push(() => {
            this.scene.start('MenuScene')
            this.togglePauseMenu(false)
        })

        this.muteButton = new ButtonElement(this, 0, 0, 150, 64)
        this.muteButton.setAlign(Phaser.Display.Align.In.Center, 0, 45)
        this.muteButton.setText('Mute')
        this.muteButton.text.setTint(0x111111)
        this.muteButton.text.setFontSize(30)
        this.muteButton.playIdleAnimation = false
        this.muteButton.stopAllAnimations()

        this.togglePauseMenu(false)
        this.pauseButton.setVisible(false)

        this.timerText = new TextElement(this, 0, 0, 'Time left: 60')
        this.timerText.setAlign(Phaser.Display.Align.In.TopLeft, -10, -10)
        this.timerText.setVisible(false)

        this.isPaused = true
        this.timeLeft = 60
    }

    update(time: number, delta: number) {
        super.update(time, delta)
        if (this.isPaused) return
        this.timeLeft -= delta / 1000
        this.timerText.setText('Time left: ' + this.timeLeft.toFixed(0))

        if (this.timeLeft < 0)
        {
            this.isPaused = true;
            (this.scene.get('GameScene') as GameScene).endGame()
        }
    }

    private togglePauseMenu(isOn: boolean) {
        this.pauseButton.reset()
        this.continueButton.reset()
        this.newButton.reset()
        this.muteButton.reset()

        this.pauseButton.setVisible(!isOn)
        this.continueButton.setVisible(isOn)
        this.newButton.setVisible(isOn)
        this.muteButton.setVisible(isOn)

        this.isPaused = isOn
    }
}
