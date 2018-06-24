import TheCrownSvg from './the-crown-svg'
import BreakingBadSvg from './breaking-bad-svg'
import OrphanBlack from './orphan-black'
import BlackMirror from './black-mirror'
import TheGoodPlace from './the-good-place'

export default
{
    name: 'quiz-custom',

    components:
    {
        TheCrownSvg,
        BreakingBadSvg,
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
