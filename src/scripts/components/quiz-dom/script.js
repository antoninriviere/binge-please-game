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
        },
        width: {
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
            wrapperWidth: this.width ? this.width : '60vw'
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
