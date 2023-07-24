import { Bullet } from './bullet'
import { IImageConstructor } from '../interfaces/image.interface'
import { GameScene } from '../scenes/game-scene'

export class Enemy extends Phaser.GameObjects.Image
{
    body: Phaser.Physics.Arcade.Body

    // variables
    private health: number
    private lastShoot: number
    private speed: number

    // children
    private barrel: Phaser.GameObjects.Image

    // game objects
    private bullets: Phaser.GameObjects.Group

    constructor(aParams: IImageConstructor) {
        super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame)

        this.initContainer()
        this.scene.add.existing(this)
    }

    public getBarrel(): Phaser.GameObjects.Image {
        return this.barrel
    }

    public getBullets(): Phaser.GameObjects.Group {
        return this.bullets
    }

    update(): void {
        if (this.active)
        {
            this.barrel.x = this.x
            this.barrel.y = this.y

            this.handleShooting()
        }
        else
        {
            (this.scene.scene.get('GameScene') as GameScene).tankKilled()

            this.destroy()
            this.barrel.destroy()
        }
    }

    public updateHealth(): void {
        (this.scene as GameScene).hitSound.play()

        {
            this.health = 0
            this.active = false
        }
    }

    private initContainer() {
        // variables
        this.health = 1
        this.lastShoot = 0
        this.speed = 100

        // image
        this.setDepth(0)

        this.barrel = this.scene.add.image(0, 0, 'barrelRed')
        this.barrel.setOrigin(0.5, 1)
        this.barrel.setDepth(1)

        // game objects
        this.bullets = this.scene.add.group({
            /*classType: Bullet,*/
            active: true,
            maxSize: 10,
            runChildUpdate: true,
        })

        // tweens
        this.scene.tweens.add({
            targets: this,
            props: { y: this.y - 200 },
            delay: 0,
            duration: 2000,
            ease: 'Linear',
            easeParams: null,
            hold: 0,
            repeat: -1,
            repeatDelay: 0,
            yoyo: true,
        })

        // physics
        this.scene.physics.world.enable(this)
    }

    private handleShooting(): void {
        if (this.scene.time.now > this.lastShoot)
        {
            if (this.bullets.getLength() < 10)
            {
                this.bullets.add(
                    new Bullet({
                        scene: this.scene,
                        rotation: this.barrel.rotation,
                        x: this.barrel.x,
                        y: this.barrel.y,
                        texture: 'bulletRed',
                    }),
                )

                this.lastShoot = this.scene.time.now + Phaser.Math.Between(800, 1500)
            }
        }
    }
    
}
