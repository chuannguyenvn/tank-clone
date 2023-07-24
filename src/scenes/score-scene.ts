import UIScene from './ui-scene'
import TextElement from '../objects/TextElement'
import { PauseScene } from './pause-scene'
import { GameScene } from './game-scene'


export class ScoreScene extends UIScene
{
    public tanksDestroyed: number = 0
    public timeLeft: number

    private tanksKilledDescriptionText: TextElement
    private timeLeftDescriptionText: TextElement
    private scoreDescriptionText: TextElement
    private highScoreDescriptionText: TextElement

    private tanksKilledNumberText: TextElement
    private timeLeftNumberText: TextElement
    private scoreNumberText: TextElement
    private highScoreNumberText: TextElement

    constructor() {
        super('ScoreScene')
    }

    create(): void {
        super.create()

        this.tanksKilledDescriptionText = new TextElement(this, 0, 0, 'Tanks destroyed:')
        this.tanksKilledDescriptionText.setAlign(Phaser.Display.Align.In.Center, -400, -150)
        this.tanksKilledDescriptionText.setOrigin(0, 0.5)

        this.timeLeftDescriptionText = new TextElement(this, 0, 0, 'Time left:')
        this.timeLeftDescriptionText.setAlign(Phaser.Display.Align.In.Center, -400, -50)
        this.timeLeftDescriptionText.setOrigin(0, 0.5)

        this.scoreDescriptionText = new TextElement(this, 0, 0, 'Total score:')
        this.scoreDescriptionText.setAlign(Phaser.Display.Align.In.Center, -400, 50)
        this.scoreDescriptionText.setOrigin(0, 0.5)

        this.highScoreDescriptionText = new TextElement(this, 0, 0, 'High score:')
        this.highScoreDescriptionText.setAlign(Phaser.Display.Align.In.Center, -400, 150)
        this.highScoreDescriptionText.setOrigin(0, 0.5)

        const pauseScene = this.scene.get('PauseScene') as PauseScene
        const tanksKilled = (this.scene.get('GameScene') as GameScene).tanksKilled
        const timeLeft = Math.round(pauseScene.timeLeft)
        const score = tanksKilled * 100 + timeLeft * 10

        console.log(parseInt(pauseScene.timerText.getText()))

        if (localStorage.getItem('highscore') === null || parseInt(localStorage.getItem('highscore') as string) < score)
        {
            localStorage.setItem('highscore', score.toString())
        }

        this.tanksKilledNumberText = new TextElement(this, 0, 0, tanksKilled.toString())
        this.tanksKilledNumberText.setAlign(Phaser.Display.Align.In.Center, 400, -150)
        this.tanksKilledNumberText.setOrigin(1, 0.5)

        this.timeLeftNumberText = new TextElement(this, 0, 0, timeLeft.toString())
        this.timeLeftNumberText.setAlign(Phaser.Display.Align.In.Center, 400, -50)
        this.timeLeftNumberText.setOrigin(1, 0.5)

        this.scoreNumberText = new TextElement(this, 0, 0, score.toString())
        this.scoreNumberText.setAlign(Phaser.Display.Align.In.Center, 400, 50)
        this.scoreNumberText.setOrigin(1, 0.5)

        this.highScoreNumberText = new TextElement(this, 0, 0, localStorage.getItem('highscore') as string)
        this.highScoreNumberText.setAlign(Phaser.Display.Align.In.Center, 400, 150)
        this.highScoreNumberText.setOrigin(1, 0.5)
    }
}
