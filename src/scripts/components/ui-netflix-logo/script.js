export default
{
    name: 'ui-netflix-logo',

    components:
    {

    },

    props: {
        color: {
            type: String,
            required: false
        }
    },

    data()
    {
        return {
            fillColor: this.$props.color ? `#${this.$props.color}` : '#ffffff'
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
