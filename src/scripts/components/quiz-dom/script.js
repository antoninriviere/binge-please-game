export default
{
    name: 'quiz-dom',

    components:
    {

    },

    props: {
        image: {
            type: String,
            required: false
        }
    },

    computed: {
        imageSrc: function()
        {
            return '../static/images/' + this.image
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
        console.log('mounted quiz dom')
    },

    destroyed()
    {

    },

    methods:
    {

    }
}
