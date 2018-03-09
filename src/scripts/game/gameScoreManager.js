class GameScoreManager
{

    constructor()
    {
        this.score = 0
    }

    incScore(inc)
    {
        this.score += inc
    }

    getScore()
    {
        return this.score
    }

    setScore(score)
    {
        this.score = score
    }
}

export default new GameScoreManager()
