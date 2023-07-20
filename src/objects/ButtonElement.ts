import UIScene from '../scenes/ui-scene'
import UIElement from './UIElement'
import Color = Phaser.Display.Color
import Tween = Phaser.Tweens.Tween

class ButtonElement extends UIElement
{
    private buttonFace: Phaser.GameObjects.NineSlice
    private buttonBody: Phaser.GameObjects.NineSlice

    public pointerHovered: (() => void) [] = []
    public pointerUnhovered: (() => void) [] = []
    public pointerDown: (() => void)[] = []
    public pointerUp: (() => void)[] = []

    public buttonThickness = 32

    public text: Phaser.GameObjects.BitmapText

    private idleAnimation: Tween
    private hoverAnimation: Tween
    private pressingDownAnimation: Tween
    private springUpAnimation: Tween

    private initialButtonFaceY: number

    constructor(scene: UIScene, x: number, y: number, width: number, height: number) {
        super(scene, x, y)

        this.buttonFace = scene.add.nineslice(0, 0 - this.buttonThickness / 2, 'rounded-square', undefined, 512, 512, 16, 16, 16, 16)
        this.buttonBody = scene.add.nineslice(0, 0, 'rounded-square', undefined, 512, 512, 16, 16, 16, 16).setDepth(-1)

        this.add(this.buttonBody)
        this.add(this.buttonFace)

        this.buttonFace.setSize(width, height)
        this.buttonBody.setSize(width, height)
        this.setSize(this.buttonFace.width, this.buttonFace.height + this.buttonThickness)
        this.setInteractive({ useHandCursor: true })

        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => this.pointerHoveredHandler())
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => this.pointerUnhoveredHandler())
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => this.pointerDownHandler())
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => this.pointerUpHandler())

        this.setTint(0xffffff)

        this.initialButtonFaceY = this.buttonFace.y

        this.text = this.scene.add.bitmapText(0, this.buttonFace.y, 'font', "")
        this.text.setOrigin(0.5)
        this.add(this.text)

        this.pointerUnhoveredHandler()
    }

    protected pointerHoveredHandler(): void {
        this.pointerHovered.forEach(event => event())
        this.buttonFace.setTint(0xcccccc)

        this.stopAllAnimations()
        this.hoverAnimation = this.scene.tweens.add({
            targets: [this.buttonFace, this.text],
            y: this.initialButtonFaceY,
            duration: 100,
            ease: Phaser.Math.Easing.Sine.InOut,
        })
    }

    protected pointerUnhoveredHandler(): void {
        this.pointerUnhovered.forEach(event => event())
        this.buttonFace.setTint(0xffffff)

        this.stopAllAnimations()
        this.idleAnimation = this.scene.tweens.add({
            targets: [this.buttonFace, this.text],
            y: this.buttonFace.y + this.buttonThickness / 2,
            yoyo: true,
            repeat: -1,
            duration: 800,
            ease: Phaser.Math.Easing.Quintic.In,
        })
    }

    protected pointerDownHandler(): void {
        this.pointerDown.forEach(event => event())
        this.buttonFace.setTint(0x888888)
        // this.buttonFace.y += this.buttonThickness
        // if (this.text) this.text.y += this.buttonThickness

        this.stopAllAnimations()
        this.pressingDownAnimation = this.scene.tweens.add({
            targets: [this.buttonFace, this.text],
            y: this.buttonFace.y + this.buttonThickness / 2,
            duration: 100,
            ease: Phaser.Math.Easing.Expo.In,
        })
    }

    protected pointerUpHandler(): void {
        this.pointerUp.forEach(event => event())
        this.buttonFace.setTint(0xaaaaaa)
        // this.buttonFace.y -= this.buttonThickness
        // if (this.text) this.text.y -= this.buttonThickness

        this.stopAllAnimations()
        this.springUpAnimation = this.scene.tweens.add({
            targets: [this.buttonFace, this.text],
            y: this.initialButtonFaceY,
            duration: 100,
            ease: Phaser.Math.Easing.Expo.In,
        })
    }

    private stopAllAnimations(): void {
        this.idleAnimation?.stop()
        this.hoverAnimation?.stop()
        this.pressingDownAnimation?.stop()
        this.springUpAnimation?.stop()
    }

    public setTint(tint: number): void {
        this.buttonFace.setTint(tint)
        this.buttonBody.setTint(Color.IntegerToColor(tint).darken(50).color)
    }

    public setText(text: string) {
  this.text.text = text
    }
}

export default ButtonElement