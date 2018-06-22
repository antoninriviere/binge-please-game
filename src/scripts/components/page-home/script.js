import appPage from 'Mixins/app-page'
import AppLogo from 'Components/app-logo'
import uiSoundIcon from 'Components/ui-sound-icon'
import uiCircleTransition from 'Components/ui-circle-transition'
import resizePositionProportionally from 'Utils/resizePositionProportionally'
import eventHub from 'Application/event-hub'

export default
{
    name: 'page-home',

    components:
    {
        AppLogo,
        uiSoundIcon,
        uiCircleTransition
    },

    data()
    {
        return {

        }
    },

    mixins: [appPage],

    created()
    {
        let url = '/static/video/'
        const windowW = this.$root.windowObj.width * window.devicePixelRatio
        if(windowW >= 1920)
            url += 'intro_bingeplease-1920.mp4'
        else if(windowW >= 1280)
            url += 'intro_bingeplease-1280.mp4'
        else
            url += 'intro_bingeplease-1024.mp4'
        this.url = url
        eventHub.$on('window:resize', this.onResize)
    },

    mounted()
    {
        this.$circle = this.$refs.circleTransition.$refs.circle

        this.$refs.overlayInner.classList.add('is-active')
        this.$refs.video.addEventListener('ended', () =>
        {
            this.$refs.home.classList.add('is-active')
            this.$refs.intro.classList.add('is-hidden')
            setTimeout(this.transitionOut, 2000)
        })
    },

    destroyed()
    {
        eventHub.$off('window:resize', this.onResize)
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
        transitionOut()
        {
            this.$refs.circleTransition.setColor('#5934A5')
            this.$refs.home.classList.remove('is-active')
            TweenMax.to(this.$circle, 0.7,
                {
                    scale: 1,
                    ease: Sine.easeOut,
                    onComplete: () =>
                    {
                        this.$router.push('/tuto/1')
                    }
                }
            )
        },
        resizeVideo()
        {
            const{ width, height } = this.$root.windowObj
            const vars = resizePositionProportionally(width, height, 1920, 1080)
            this.$refs.video.style.width = vars.width + 'px'
            this.$refs.video.style.height = vars.height + 'px'
            this.$refs.video.style.top = vars.top + 'px'
            this.$refs.video.style.left = vars.left + 'px'
        },
        onResize()
        {
            this.resizeVideo()
        }
    }
}
