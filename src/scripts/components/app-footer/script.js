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
            soundState: 'on '
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
