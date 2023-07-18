import { GameScene } from '../scenes/game-scene'

class Button extends Phaser.GameObjects.Sprite
{
    public idleSprite: string
    public hoverSprite: string
    public downSprite: string

    public pointerHovered: (() => void) [] = []
    public pointerUnhovered: (() => void) [] = []
    public pointerDown: (() => void)[] = []
    public pointerUp: (() => void)[] = []

    constructor(scene: GameScene, x: number, y: number, sprite: string) {
        super(scene, x, y, sprite)
        this.idleSprite = sprite

        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, () => this.pointerHoveredHandler())
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, () => this.pointerUnhoveredHandler())
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => this.pointerDownHandler())
        this.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => this.pointerUpHandler())
    }

    protected pointerHoveredHandler(): void {
        this.setTexture(this.hoverSprite)
        this.pointerHovered.forEach(event => event())
    }

    protected pointerUnhoveredHandler(): void {
        this.setTexture(this.idleSprite)
        this.pointerUnhovered.forEach(event => event())
    }

    protected pointerDownHandler(): void {
        this.setTexture(this.downSprite)
        this.pointerDown.forEach(event => event())
    }

    protected pointerUpHandler(): void {
        this.setTexture(this.hoverSprite)
        this.pointerUp.forEach(event => event())
    }
}

export default Button