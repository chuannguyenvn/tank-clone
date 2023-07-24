﻿import UIElement from './UIElement'
import UIScene from '../scenes/ui-scene'

class TextElement extends UIElement
{
    protected text: Phaser.GameObjects.Text

    constructor(scene: UIScene, x: number, y: number, textContent: string) {
        super(scene, x, y)

        this.text = scene.add.text(0, 0, textContent)
        this.add(this.text)
    }

    public setText(text: string): void {
        this.text.text = text
    }
}

export default TextElement