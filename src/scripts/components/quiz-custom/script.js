import TheCrown from './the-crown'
import BreakingBad from './breaking-bad'
import OrphanBlack from './orphan-black'
import BlackMirror from './black-mirror'
import TheGoodPlace from './the-good-place'

export default
{
    name: 'quiz-custom',

    components:
    {
        TheCrown,
        BreakingBad,
        OrphanBlack,
        BlackMirror,
        TheGoodPlace
    },

    props: {
        name: {
            type: String,
            required: true
        }
    },

    computed: {

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
        console.log('mounted quiz custom')
    },

    destroyed()
    {

    },

    methods:
    {

    }
}
