import { TweenMax } from 'gsap'

export default
{
    name: 'game-progress-manager',

    components:
    {

    },

    data()
    {
        return {
            maxProgress: 10,
            progressPixelValue: 15
        }
    },

    computed: {
        progress()
        {
            return this.$root.quizId
        }
    },

    watch: {
        progress: 'onProgressChange'
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
        onProgressChange()
        {

            const value = this.progressPixelValue * (this.progress - 1)

            TweenMax.to(this.$refs.progressBar, 0.4,
                {
                    scaleX: value,
                    ease: Circ.easeOut,
                    delay: 0.25
                })

            TweenMax.to(this.$refs.progressCorner, 0.4,
                {
                    x: value,
                    ease: Circ.easeOut,
                    delay: 0.25
                })
        }
    }
}
