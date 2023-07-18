import { Player } from '../objects/player'
import { Enemy } from '../objects/enemy'
import { Obstacle } from '../objects/obstacles/obstacle'
import { Bullet } from '../objects/bullet'
import Tileset = Phaser.Tilemaps.Tileset
import TilemapLayer = Phaser.Tilemaps.TilemapLayer

export class GameScene extends Phaser.Scene
{
    private map: Phaser.Tilemaps.Tilemap
    private tileset: Phaser.Tilemaps.Tileset
    private layer: Phaser.Tilemaps.TilemapLayer

    private player: Player
    private enemies: Phaser.GameObjects.Group
    private obstacles: Phaser.GameObjects.Group

    private target: Phaser.Math.Vector2

    constructor() {
        super({
            key: 'GameScene',
        })
    }

    create(): void {
        // create tilemap from tiled JSON
        this.map = this.make.tilemap({ key: 'levelMap' })

        this.tileset = this.map.addTilesetImage('tiles') as Tileset
        this.layer = this.map.createLayer('tileLayer', this.tileset, 0, 0) as TilemapLayer
        this.layer.setCollisionByProperty({ collide: true })

        this.obstacles = this.add.group({
            /*classType: Obstacle,*/
            runChildUpdate: true,
        })

        this.enemies = this.add.group({
            /*classType: Enemy*/
        })
        this.convertObjects()

        // collider layer and obstacles
        this.physics.add.collider(this.player, this.layer)
        this.physics.add.collider(this.player, this.obstacles)

        // collider for bullets
        this.physics.add.collider(
            this.player.getBullets(),
            this.layer,
            this.bulletHitLayer as any,
            null as any,
            this,
        )

        this.physics.add.collider(
            this.player.getBullets(),
            this.obstacles,
            this.bulletHitObstacles as any,
            null as any,
            this,
        )

        this.enemies.children.each((enemy) => {
            this.physics.add.overlap(
                this.player.getBullets(),
                enemy,
                this.playerBulletHitEnemy as any,
                null as any,
                this,
            )
            this.physics.add.overlap(
                (enemy as Enemy).getBullets(),
                this.player,
                this.enemyBulletHitPlayer as any,
                null as any,
            )

            this.physics.add.collider(
                (enemy as Enemy).getBullets(),
                this.obstacles,
                this.bulletHitObstacles as any,
                null as any,
            )
            this.physics.add.collider(
                (enemy as Enemy).getBullets(),
                this.layer,
                this.bulletHitLayer as any,
                null as any,
            )

            return null
        }, this)

        this.cameras.main.startFollow(this.player)
    }

    update(): void {
        this.player.update()

        this.enemies.children.each((enemy, index) => {
            enemy.update()
            if (this.player.active && enemy.active)
            {
                const angle = Phaser.Math.Angle.Between(
                    (enemy as Enemy).body.x,
                    (enemy as Enemy).body.y,
                    this.player.body.x,
                    this.player.body.y,
                );

                (enemy as Enemy).getBarrel().angle =
                    (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG
            }
            return null
        }, this)
    }

    private convertObjects(): void {
        // find the object layer in the tilemap named 'objects'
        const objects = this.map.getObjectLayer('objects')?.objects as any[]

        objects.forEach((object) => {
            if (object.type === 'player')
            {
                this.player = new Player({
                    scene: this,
                    x: object.x,
                    y: object.y,
                    texture: 'tankBlue',
                })
            }
            else if (object.type === 'enemy')
            {
                const enemy = new Enemy({
                    scene: this,
                    x: object.x,
                    y: object.y,
                    texture: 'tankRed',
                })

                this.enemies.add(enemy)
            }
            else
            {
                const obstacle = new Obstacle({
                    scene: this,
                    x: object.x,
                    y: object.y - 40,
                    texture: object.type,
                })

                this.obstacles.add(obstacle)
            }
        })
    }

    private bulletHitLayer(bullet: Bullet): void {
        bullet.destroy()
    }

    private bulletHitObstacles(bullet: Bullet, obstacle: Obstacle): void {
        bullet.destroy()
    }

    private enemyBulletHitPlayer(bullet: Bullet, player: Player): void {
        bullet.destroy()
        player.updateHealth()
    }

    private playerBulletHitEnemy(bullet: Bullet, enemy: Enemy): void {
        bullet.destroy()
        enemy.updateHealth()
    }
}
