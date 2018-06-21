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
        this.$refs.overlayInner.classList.add('is-active')
        this.$refs.video.addEventListener('ended', () =>
        {
            // only functional if "loop" is removed
            this.$refs.home.classList.add('is-active')
            this.$refs.intro.classList.add('is-hidden')
        })
    },

    destroyed()
    {

    },

    methods:
    {
        onOkClick()
        {
            this.$refs.overlayInner.classList.remove('is-active')
            this.$refs.overlay.classList.add('is-hidden')
            setTimeout(() =>
            {
                this.$refs.video.play()
            }, 200)
        },
        onPlayClick()
        {
            this.$root.audioManager.resumeContext()
            this.$router.push('/quiz/1')
            this.$root.time.start()
        }
    }
}
