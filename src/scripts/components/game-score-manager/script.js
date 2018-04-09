// import eventHub from 'Application/event-hub'
// import gameScoreManager from 'Game/gameScoreManager'

import { INCREMENT_SCORE } from 'MutationTypes'

console.log(INCREMENT_SCORE)

export default
{
    name: 'game-score-manager',

    components:
    {

    },

    data()
    {
        return {
            // score: 0
        }
    },

    computed: {
        score()
        {
            return this.$store.getters.getScore()
        }
    },

    created()
    {
        // eventHub.$on('game:submit-answer', this.onNewAnswer)
    },

    mounted()
    {
        // this.score = gameScoreManager.getScore()
    },

    destroyed()
    {
        // eventHub.$off('game:submit-answer', this.onNewAnswer)
    },

    methods:
    {
        onNewAnswer(win)
        {
            if(win)
            {
                this.$store.commit(INCREMENT_SCORE)
                // this.$store.commit(SET_PROGRESS, )
                // this.score++
                // gameScoreManager.setScore(this.score)
            }
        }
    }
}
