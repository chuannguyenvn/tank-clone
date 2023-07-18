import { Bullet } from './bullet'
import { IImageConstructor } from '../interfaces/image.interface'
import Key = Phaser.Input.Keyboard.Key
import Vector2 = Phaser.Math.Vector2

export class Player extends Phaser.GameObjects.Image
{
    body: Phaser.Physics.Arcade.Body

    // variables
    private health: number
    private lastShoot: number
    private speed: number

    // children
    private barrel: Phaser.GameObjects.Image
    private lifeBar: Phaser.GameObjects.Graphics

    // game objects
    private bullets: Phaser.GameObjects.Group

    // input
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private aKey: Phaser.Input.Keyboard.Key
    private dKey: Phaser.Input.Keyboard.Key
    private wKey: Phaser.Input.Keyboard.Key
    private sKey: Phaser.Input.Keyboard.Key
    private shootingKey: Phaser.Input.Keyboard.Key

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame)

        this.initImage()
        this.scene.add.existing(this)
    }

    public getBullets(): Phaser.GameObjects.Group {
        return this.bullets
    }

    update(): void {
        if (this.active)
        {
            this.barrel.x = this.x
            this.barrel.y = this.y
            this.lifeBar.x = this.x
            this.lifeBar.y = this.y
            this.handleInput()
            this.handleShooting()
        }
        else
        {
            this.destroy()
            this.barrel.destroy()
            this.lifeBar.destroy()
        }
    }

    public updateHealth(): void {
        if (this.health > 0)
        {
            this.health -= 0.05
            this.redrawLifebar()
        }
        else
        {
            this.health = 0
            this.active = false
            this.scene.scene.start('MenuScene')
        }
    }

    private initImage() {
        // variables
        this.health = 1
        this.lastShoot = 0
        this.speed = 100

        // image
        this.setOrigin(0.5, 0.5)
        this.setDepth(0)
        this.angle = 180

        this.barrel = this.scene.add.image(this.x, this.y, 'barrelBlue')
        this.barrel.setOrigin(0.5, 1)
        this.barrel.setDepth(1)
        this.barrel.angle = 180

        this.lifeBar = this.scene.add.graphics()
        this.redrawLifebar()

        // game objects
        this.bullets = this.scene.add.group({
            /*classType: Bullet,*/
            active: true,
            maxSize: 10,
            runChildUpdate: true,
        })

        // input
        this.cursors = this.scene.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys
        this.aKey = this.scene.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.A,
        ) as Key
        this.dKey = this.scene.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.D,
        ) as Key
        this.wKey = this.scene.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.W,
        ) as Key
        this.sKey = this.scene.input.keyboard?.addKey(
            Phaser.Input.Keyboard.KeyCodes.S,
        ) as Key
        // physics
        this.scene.physics.world.enable(this)
    }

    private handleInput() {
        this.barrel.rotation =
            (this.scene.input.activePointer.positionToCamera(this.scene.cameras.main) as Vector2)
                .subtract(new Vector2(this.x, this.y))
                .angle()
            + Phaser.Math.PI2 / 4
        
        const targetDirection = Vector2.ZERO.clone()
        let arrowKeyPressed = false
        if (this.cursors.down.isDown || this.sKey.isDown)
        {
            targetDirection.add(new Vector2(0, 1))
            arrowKeyPressed = true
        }
        if (this.cursors.up.isDown || this.wKey.isDown)
        {
            targetDirection.add(new Vector2(0, -1))
            arrowKeyPressed = true
        }
        if (this.cursors.left.isDown || this.aKey.isDown)
        {
            targetDirection.add(new Vector2(-1, 0))
            arrowKeyPressed = true
        }
        if (this.cursors.right.isDown || this.dKey.isDown)
        {
            targetDirection.add(new Vector2(1, 0))
            arrowKeyPressed = true
        }
        if (!arrowKeyPressed)
        {
            this.body.setVelocity(0, 0)
            return
        }
        
        targetDirection.normalize()
        const targetRotation = Phaser.Math.Angle.Wrap(targetDirection.angle())

        this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, targetRotation, 0.1)

        this.scene.physics.velocityFromRotation(
            this.rotation,
            this.speed,
            this.body.velocity,
        )
    }

    private handleShooting(): void {
        if (this.scene.input.activePointer.leftButtonDown() && this.scene.time.now > this.lastShoot)
        {
            this.scene.cameras.main.shake(100, 0.005)
            this.scene.tweens.add({
                targets: this,
                props: { alpha: 0.8 },
                delay: 0,
                duration: 5,
                ease: 'Power1',
                easeParams: null,
                hold: 0,
                repeat: 0,
                repeatDelay: 0,
                yoyo: true,
                paused: false,
            })

            if (this.bullets.getLength() < 10)
            {
                this.bullets.add(
                    new Bullet({
                        scene: this.scene,
                        rotation: this.barrel.rotation,
                        x: this.barrel.x,
                        y: this.barrel.y,
                        texture: 'bulletBlue',
                    }),
                )

                this.lastShoot = this.scene.time.now + 800
            }
        }
    }

    private redrawLifebar(): void {
        this.lifeBar.clear()
        this.lifeBar.fillStyle(0xe66a28, 1)
        this.lifeBar.fillRect(
            -this.width / 2,
            this.height / 2,
            this.width * this.health,
            15,
        )
        this.lifeBar.lineStyle(2, 0xffffff)
        this.lifeBar.strokeRect(-this.width / 2, this.height / 2, this.width, 15)
        this.lifeBar.setDepth(1)
    }
}
