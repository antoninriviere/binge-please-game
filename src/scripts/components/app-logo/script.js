import lottie from 'lottie-web'
import logoAnimData from './anim.json'
import { TweenMax, Power0 } from 'gsap'

export default
{
    name: 'app-logo',

    components:
    {

    },

    props: {
        autoplay: {
            type: Boolean,
            required: false
        }
    },

    data()
    {
        return {
            progress: 0,
            currentFrame: 0,
            TWEEN_DURATION: 1
        }
    },

    created()
    {

    },

    mounted()
    {
        this.logoAnim = lottie.loadAnimation({
            container: this.$refs.container,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            animationData: logoAnimData
        })
        this.logoAnim.setSpeed(1)
        this.tween = TweenMax.to(this, this.TWEEN_DURATION, {
            currentFrame: this.logoAnim.totalFrames - 1,
            onUpdate: () =>
            {
                this.logoAnim.goToAndStop(Math.round(this.currentFrame), true)
            },
            paused: !this.$props.autoplay,
            repeat: this.$props.autoplay ? 1 : 0,
            yoyo: true,
            ease: Power0.easeNone
        })
    },

    destroyed()
    {

    },

    methods:
    {
        onMouseEnter()
        {
            if(this.$props.autoplay)
                return
            this.tween.timeScale(2).play()
        },
        onMouseLeave()
        {
            if(this.$props.autoplay)
                return
            this.tween.timeScale(2).reverse()
        }
    }
}
