export default
{
    name: 'ui-sound-icon',

    components:
    {

    },

    props: {
        interactive: {
            type: Boolean,
            required: false
        }
    },

    data()
    {
        return {
            count: 5,
            isActive: true
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
        onClick()
        {
            if(this.$props.interactive)
            {
                if(this.isActive)
                {
                    this.isActive = false
                    this.$refs.parent.classList.remove('is-active')
                    // TODO: mute sound
                }
                else
                {
                    this.isActive = true
                    this.$refs.parent.classList.add('is-active')
                    // TODO: resume sound
                }
            }
        }
    }
}
