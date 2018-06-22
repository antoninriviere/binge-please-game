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
        },
        muteSound: {
            type: Function,
            required: false
        },
        resumeSound: {
            type: Function,
            required: false
        }
    },

    data()
    {
        return {
            count: 5,
            isActive: true,
            isInteractive: this.$props.interactive
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
                    this.$props.muteSound()
                }
                else
                {
                    this.isActive = true
                    this.$refs.parent.classList.add('is-active')
                    this.$props.resumeSound()
                }
            }
        }
    }
}
