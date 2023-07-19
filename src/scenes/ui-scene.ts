class UIScene extends Phaser.Scene
{
    public zone: Phaser.GameObjects.Zone

    constructor(key: string) {
        super({
            key: key,
        })
    }

    create(): void {
        this.zone = this.add.zone(this.scale.width / 2, this.scale.height / 2, this.scale.width, this.scale.height)

        this.scale.on(Phaser.Scale.Events.RESIZE, () => {
            this.zone.x = this.scale.width / 2
            this.zone.y = this.scale.height / 2
            this.zone.width = this.scale.width
            this.zone.height = this.scale.height
        })
    }
}

export default UIScene