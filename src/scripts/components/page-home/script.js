import appPage from 'Mixins/app-page'
import AppLogo from 'Components/app-logo'

export default
{
    name: 'page-home',

    components:
    {
        AppLogo
    },

    data()
    {
        return {

        }
    },

    mixins: [appPage],

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
        onPlayClick()
        {
            this.$root.audioManager.resumeContext()
            this.$router.push('/quiz/1')
            this.$root.time.start()
        }
    }
}
