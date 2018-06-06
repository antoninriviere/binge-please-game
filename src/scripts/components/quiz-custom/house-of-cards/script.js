import { TweenMax } from 'gsap'

export default
{
    name: 'breaking-bad-svg',

    computed: {
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
        this.play()
    },

    destroyed()
    {
    },

    methods:
    {
        play()
        {
            // const els = this.$refs.container.children
            // const elsArray = Array.slice.call(els, 0)
            // const animEls = elsArray.reverse()
            // console.log(animEls)
            // TweenMax.staggerTo(els, 2, {
            //     scale: 7,
            //     ease: Sine.easeOut,
            //     clearProps: 'all'
            // }, 0.5)
        }
    }
}
