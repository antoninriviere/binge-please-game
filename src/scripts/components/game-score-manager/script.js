import gameScoreManager from 'Game/gameScoreManager'

export default
{
    name: 'game-score-manager',

    components:
    {

    },

    data()
    {
        return {
            score: 0
        }
    },

    created()
    {
        this.eventHub.$on('game:submit-answer', this.onNewAnswer)
    },

    mounted()
    {
        this.score = gameScoreManager.getScore()
    },

    destroyed()
    {
        this.eventHub.$off('game:submit-answer', this.onNewAnswer)
    },

    methods:
    {
        onNewAnswer(win)
        {
            if(win)
            {
                this.score++
                gameScoreManager.setScore(this.score)
            }
        }
    }
}
