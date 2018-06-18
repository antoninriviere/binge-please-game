import { TimelineMax, TweenMax } from 'gsap'

export default
{
    name: 'success-you-win',

    components:
    {

    },

    data()
    {
        return {
            count: 15,
            endCount: 5,
            DURATION: 0.5,
            STAGGER_DURATION: 0.08
        }
    },

    created()
    {

    },

    mounted()
    {
        TweenMax.set(this.$refs.container.children, { y: window.innerHeight })
        this.itemHeight = Math.floor(this.$refs.container.children[0].offsetHeight)
        this.$texts = document.querySelectorAll('.animation__text')
        this.middleScreenPos = window.innerHeight / 2 - this.itemHeight / 2
        this.$subChildren = []
        for(let i = 0; i < this.endCount; i++)
        {
            this.$subChildren.push(this.$refs.container.children[i])
        }
    },

    destroyed()
    {

    },

    methods:
    {
        play()
        {
            return new Promise((resolve) =>
            {
                let index = 0
                const tl = new TimelineMax({
                    onComplete: () =>
                    {
                        index = 0
                        TweenMax.set(this.$texts, { fill: '#ffffff' })
                        TweenMax.set(this.$refs.container.children, { clearProps: 'all' })
                        tl.set(this.$refs.container, { clearProps: 'all' })
                        resolve()
                    }
                })
                tl.set(this.$refs.container, { opacity: 1 }, 0)
                tl.staggerTo(this.$refs.container.children, this.DURATION, {
                    y: this.middleScreenPos,
                    ease: Sine.easeIn,
                    onComplete: () =>
                    {
                        TweenMax.set(this.$texts[index], { fill: 'none' })
                        index++
                        if(index === this.count)
                            index = 0
                    }
                }, this.STAGGER_DURATION, 0)
                tl.staggerTo(this.$refs.container.children, this.DURATION, {
                    y: -this.itemHeight * 2,
                    ease: Sine.easeOut
                }, this.STAGGER_DURATION, this.DURATION)
                tl.staggerFromTo(this.$subChildren, this.DURATION * 1.5, {
                    y: window.innerHeight + this.itemHeight * 2
                }, {
                    y: this.middleScreenPos,
                    ease: Sine.easeOut,
                    onComplete: () =>
                    {
                        TweenMax.set(this.$texts[index], { fill: '#ffffff' })
                        index++
                    }
                }, this.STAGGER_DURATION * 1.5, '-=0.5')
                tl.timeScale(0.8)
            })
        }
    }
}
