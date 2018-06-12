import lottie from 'lottie-web'
import logoAnimData from './anim.json'

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
            loop: true,
            autoplay: this.autoplay,
            animationData: logoAnimData
        })
    },

    destroyed()
    {

    },

    methods:
    {
        onMouseEnter()
        {
            if(this.autoplay)
                return
            this.logoAnim.play()
        },
        onMouseLeave()
        {
            if(this.autoplay)
                return
            this.logoAnim.goToAndStop(1)
        }
    }
}
