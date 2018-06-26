import uiBingeLink from 'Components/ui-binge-link'

export default
{
    name: 'gallery-panel',

    components:
    {
        uiBingeLink
    },

    data()
    {
        return {
            IS_ACTIVE: false,
            IS_OPEN: false
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
        activate()
        {
            this.IS_ACTIVE = true
        },
        open()
        {
            this.IS_OPEN = true
        },
        close()
        {
            this.IS_OPEN = false
        }
    }
}
