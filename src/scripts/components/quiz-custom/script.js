import TheCrownSvg from './the-crown-svg'
import BreakingBadSvg from './breaking-bad-svg'
import HouseOfCards from './house-of-cards'
import BlackMirror from './black-mirror'

export default
{
    name: 'quiz-custom',

    components:
    {
        TheCrownSvg,
        BreakingBadSvg,
        HouseOfCards,
        BlackMirror
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
