import { INCREMENT_SCORE } from 'MutationTypes'

export default
{
    name: 'game-score-manager',

    components:
    {

    },

    data()
    {
        return {
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
    },

    mounted()
    {
    },

    destroyed()
    {
    },

    methods:
    {
    }
}
