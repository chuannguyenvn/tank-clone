import UIElement from './UIElement'
import UIScene from '../scenes/ui-scene'

class BitmapTextElement extends UIElement
{
    protected text: Phaser.GameObjects.BitmapText

    constructor(scene: UIScene, x: number, y: number, textContent: string) {
        super(scene, x, y)

        this.text = scene.add.bitmapText(0, 0, 'font', textContent)
        this.add(this.text)
        this.text.setOrigin(0.5)
    }

    public setText(text: string): void {
        this.text.text = text
    }
}

export default BitmapTextElement