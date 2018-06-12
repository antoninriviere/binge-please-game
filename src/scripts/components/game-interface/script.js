import GameScoreManager from 'Components/game-score-manager'
import GameTimeManager from 'Components/game-time-manager'

export default
{
    name: 'game-interface',

    components:
    {
        GameScoreManager,
        GameTimeManager
    },

    props:
    {
        debug: {
            type: Boolean
        }
    },

    data()
    {
        return {
        }
    },

    created()
    {

    },

    mounted()
    {
        if(!this.$props.debug)
            this.$refs.timeManager.startTime()
    },

    destroyed()
    {

    },

    methods:
    {
    }
}
