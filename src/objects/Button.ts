﻿import UIScene from '../scenes/ui-scene'
import UIElement from './UIElement'
import Color = Phaser.Display.Color

class Button extends UIElement
{
    private buttonFace: Phaser.GameObjects.NineSlice
    private buttonBody: Phaser.GameObjects.NineSlice

    public pointerHovered: (() => void) [] = []
    public pointerUnhovered: (() => void) [] = []
    public pointerDown: (() => void)[] = []
    public pointerUp: (() => void)[] = []

    constructor(scene: UIScene, x: number, y: number) {
        super(scene, x, y)

        this.buttonFace = scene.add.nineslice(0, 0, 'rounded-square', undefined, 512, 512, 64, 64, 64, 64)
        this.buttonBody = scene.add.nineslice(0, 32, 'rounded-square', undefined, 512, 512, 64, 64, 64, 64).setDepth(-1)

        this.add(this.buttonBody)
        this.add(this.buttonFace)
        
        this.setSize(this.buttonFace.width, this.buttonFace.height + 32)

        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => this.pointerHoveredHandler())
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => this.pointerUnhoveredHandler())
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => this.pointerDownHandler())
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => this.pointerUpHandler())

        this.setTint(0xffffff)
    }

    protected pointerHoveredHandler(): void {
        this.pointerHovered.forEach(event => event())
    }

    protected pointerUnhoveredHandler(): void {
        this.pointerUnhovered.forEach(event => event())
    }

    protected pointerDownHandler(): void {
        this.pointerDown.forEach(event => event())
    }

    protected pointerUpHandler(): void {
        this.pointerUp.forEach(event => event())
    }

    public setTint(tint: number): void {
        this.buttonFace.setTint(tint)
        this.buttonBody.setTint(Color.IntegerToColor(tint).darken(50).color)
    }
}

export default Button