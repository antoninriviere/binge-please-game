import TheCrownSvg from './the-crown-svg'

export default
{
    name: 'quiz-custom',

    components:
    {
        TheCrownSvg
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
