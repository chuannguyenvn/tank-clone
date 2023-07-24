import UIElement from './UIElement'
import UIScene from '../scenes/ui-scene'

class TextElement extends UIElement
{
    protected text: Phaser.GameObjects.Text

    constructor(scene: UIScene, x: number, y: number, textContent: string) {
        super(scene, x, y)

        this.text = scene.add.text(0, 0, textContent, {font:'64px open sans'})
        this.add(this.text)
    }

    public getText() : string
    {
        return this.text.text
    }
    
    public setText(text: string): void {
        this.text.text = text
    }

    public setOrigin(x: number, y: number): void {
        this.text.setOrigin(x, y)
    }
}

export default TextElement