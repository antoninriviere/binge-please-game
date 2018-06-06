import TheCrownSvg from './the-crown-svg'
import BreakingBadSvg from './breaking-bad-svg'
import HouseOfCards from './house-of-cards'

export default
{
    name: 'quiz-custom',

    components:
    {
        TheCrownSvg,
        BreakingBadSvg,
        HouseOfCards
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
