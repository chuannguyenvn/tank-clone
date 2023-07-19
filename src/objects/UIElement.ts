import UIScene from '../scenes/ui-scene'

class UIElement extends Phaser.GameObjects.Container
{
    protected uiScene: UIScene

    protected align: any = Phaser.Display.Align.In.Center

    protected zone: Phaser.GameObjects.Zone

    protected offsetX = 0
    protected offsetY = 0

    constructor(scene: UIScene, x: number, y: number) {
        super(scene, x, y)
        this.uiScene = scene
        this.uiScene.add.existing(this)
        
        this.zone = this.uiScene.add.zone(this.x, this.y, this.width, this.height)
        this.add(this.zone)

        this.resize()
        scene.scale.on(Phaser.Scale.Events.RESIZE, () => this.resize())
    }

    protected resize() {
        this.align(this, this.uiScene.zone, this.offsetX, this.offsetY)
    }

    public setAlign(align: any, offsetX: number, offsetY: number): void {
        this.align = align
        this.offsetX = offsetX
        this.offsetY = offsetY
        this.resize()
    }
}

export default UIElement