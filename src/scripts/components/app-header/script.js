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
            hidden: true,
            navVisible: false
        }
    },

    created()
    {
        eventHub.$on('page:show-header', this.showHeader)
        eventHub.$on('page:hide-header', this.hideHeader)
        eventHub.$on('page:show-nav', this.showNav)
        eventHub.$on('page:hide-nav', this.hideNav)
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
        },
        showNav()
        {
            this.navVisible = true
        },
        hideNav()
        {
            this.navVisible = false
        }
    }
}
