import eventHub from 'Application/event-hub'
import uiSoundIcon from 'Components/ui-sound-icon'
import uiNetflixLogo from 'Components/ui-netflix-logo'
export default
{
    name: 'app-footer',

    components:
    {
        uiSoundIcon,
        uiNetflixLogo
    },

    data()
    {
        return {
            hidden: true,
            soundState: 'on '
        }
    },

    created()
    {
        eventHub.$on('page:show-footer', this.showFooter)
        eventHub.$on('page:hide-footer', this.hideFooter)
    },

    mounted()
    {
    },

    destroyed()
    {

    },

    methods:
    {
        showFooter()
        {
            this.hidden = false
        },

        hideFooter()
        {
            this.hidden = true
        },

        muteSound()
        {
            this.soundState = 'off'
            this.$root.audioManager.muteSound()
        },
        resumeSound()
        {
            this.soundState = 'on '
            this.$root.audioManager.resumeSound()
        }
    }
}
