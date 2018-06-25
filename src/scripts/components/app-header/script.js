import eventHub from 'Application/event-hub'
import uiLogo from 'Components/ui-logo'

export default
{
    name: 'app-footer',

    components:
    {
        uiLogo
    },

    data()
    {
        return {
            hidden: true
        }
    },

    created()
    {
        eventHub.$on('page:show-header', this.showHeader)
        eventHub.$on('page:hide-header', this.hideHeader)
    },

    mounted()
    {
    },

    destroyed()
    {

    },

    methods:
    {
        showHeader()
        {
            this.hidden = false
        },

        hideHeader()
        {
            this.hidden = true
        }
    }
}
