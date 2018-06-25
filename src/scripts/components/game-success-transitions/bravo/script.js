import { TimelineMax, TweenMax } from 'gsap'

export default
{
    name: 'success-bravo',

    components:
    {

    },

    data()
    {
        return {
            STAGGER_DURATION: 0.07
        }
    },

    created()
    {

    },

    mounted()
    {
        this.$els = this.$refs.wrapper.children
        TweenMax.set(this.$els, { opacity: 0, scale: 0.5, transformOrigin: '50% 50%' })
    },

    destroyed()
    {
        this.tl.kill()
        this.tl.clear()
    },

    methods:
    {
        play()
        {
            return new Promise((resolve) =>
            {
                this.tl = new TimelineMax({
                    onComplete: () =>
                    {
                        TweenMax.set(this.$els, { clearProps: 'all' })
                        TweenMax.set(this.$refs.container, { clearProps: 'all' })
                        resolve()
                    }
                })
                this.tl.set(this.$refs.container, { opacity: 1 })
                this.tl.staggerTo(this.$els, this.STAGGER_DURATION, {
                    opacity: 1,
                    scale: 1,
                    ease: Back.easeOut
                }, 0.1)
                this.tl.set(this.$els, { opacity: 0 })
                this.tl.fromTo(this.$els[0], this.STAGGER_DURATION * 1.25, {
                    opacity: 1
                }, {
                    opacity: 0,
                    repeat: 2,
                    ease: Power1.easeInOut
                }, '+=0.2')
                this.tl.set(this.$els[0], { opacity: 1 })
                this.tl.timeScale(0.8)
            })
        }
    }
}
