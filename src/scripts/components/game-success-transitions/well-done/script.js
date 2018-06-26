import { TimelineMax, TweenMax } from 'gsap'

export default
{
    name: 'success-well-done',

    components:
    {

    },

    data()
    {
        return {
            clipProgress: 0
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
                        TweenMax.set(this.$refs.container, { clearProps: 'all' })
                        resolve()
                    }
                })
                let perc = 0
                this.tl.set(this.$refs.container, { opacity: 1 }, 0)
                this.tl.to(this.$refs.leftMask, 1, {
                    scaleX: 1,
                    xPercent: -105,
                    ease: Power3.easeInOut
                }, 0)
                this.tl.to(this.$refs.rightMask, 1, {
                    scaleX: 1,
                    xPercent: 105,
                    ease: Power3.easeInOut
                }, 0)
                this.tl.to([this.$refs.leftText, this.$refs.rightText], 0.5, {
                    letterSpacing: '0.6vw',
                    ease: Power2.easeOut
                }, 0.4)
                this.tl.to(this, 0.4, {
                    clipProgress: 1,
                    onUpdate: () =>
                    {
                        perc = this.clipProgress * 100
                        TweenMax.set(this.$refs.leftText, {
                            clipPath: `polygon(${100 - perc}% 0%, 100% 0%, 100% 100%, ${100 - perc}% 100%)`,
                            webkitClipPath: `polygon(${100 - perc}% 0%, 100% 0%, 100% 100%, ${100 - perc}% 100%)`
                        })
                        TweenMax.set(this.$refs.rightText, {
                            clipPath: `polygon(0% 0%, ${perc}% 0%, ${perc}% 100%, 0% 100%)`,
                            webkitClipPath: `polygon(0% 0%, ${perc}% 0%, ${perc}% 100%, 0% 100%)`
                        })
                    },
                    ease: Sine.easeOut
                }, 0.4)
                this.tl.timeScale(0.8)
            })
        }
    }
}
