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
        console.log(this.audioManager)
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
