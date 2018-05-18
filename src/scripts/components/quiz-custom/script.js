import TheCrownSvg from './the-crown-svg'
import BreakingBadSvg from './breaking-bad-svg'

export default
{
    name: 'quiz-custom',

    components:
    {
        TheCrownSvg,
        BreakingBadSvg
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
