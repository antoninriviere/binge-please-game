import { TweenMax } from 'gsap'

export default
{
    name: 'breaking-bad-svg',

    computed: {
    },

    data()
    {
        return {
            indexes: [1, 2, 3, 4, 5]
        }
    },

    created()
    {
        this.DELAY = 0.8
        this.DURATION = 4
        this.SCALE = 7
    },

    mounted()
    {
        this.play()
    },

    destroyed()
    {
        this.tweens.forEach((tween) =>
        {
            tween.kill()
        })
    },

    methods:
    {
        play()
        {
            const els = this.$refs.container.children
            const elsArray = Array.from(els)
            const animEls = elsArray.reverse()
            const scales = [1, 0.25, 0.08, 0.02, 0.01]
            this.tweens = []
            animEls.forEach((el, index) =>
            {
                TweenMax.set(el, { scale: scales[index] })
            })
            animEls.forEach((el, index) =>
            {
                const tween = TweenMax.fromTo(el, this.DURATION, {
                    scale: scales[index]
                }, {
                    scale: this.SCALE,
                    delay: index * this.DELAY,
                    ease: Expo.easeIn,
                    onComplete: () =>
                    {
                        this.reorderIndexes()
                        this.restartTween(el, index)
                    }
                })
                this.tweens.push(tween)
            })
        },
        restartTween(el)
        {
            const tween = TweenMax.fromTo(el, this.DURATION, {
                scale: 0
            }, {
                scale: this.SCALE,
                repeat: -1,
                ease: Expo.easeIn,
                onRepeat: this.reorderIndexes
            })
            this.tweens.push(tween)
        },
        reorderIndexes()
        {
            this.indexes.push(this.indexes.shift())
        }
    }
}
