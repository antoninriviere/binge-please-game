import lottie from 'lottie-web'
import logoAnimData from './anim.json'

export default
{
    name: 'tuto-play',

    components:
    {

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
            autoplay: false,
            animationData: logoAnimData
        })
    },

    destroyed()
    {

    },

    methods:
    {
        play()
        {
            this.logoAnim.play()
        }
    }
}
