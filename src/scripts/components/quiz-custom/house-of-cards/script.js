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
            const scales = [1, 0.25, 0.08, 0.02, 0.01, 0]
            this.tweens = []
            animEls.forEach((el, index) =>
            {
                TweenMax.set(el, { scale: scales[index] })
            })
            animEls.forEach((el, index) =>
            {
                const tween = TweenMax.fromTo(el, 4, {
                    scale: scales[index]
                }, {
                    scale: 5.5,
                    delay: index * 0.6,
                    ease: Expo.easeIn,
                    onComplete: () =>
                    {
                        this.restartTween(el, index)
                    }
                })
                this.tweens.push(tween)
            })
        },
        restartTween(el)
        {
            const tween = TweenMax.fromTo(el, 4, {
                scale: 0
            }, {
                scale: 5.5,
                repeat: -1,
                ease: Expo.easeIn
            })
            this.tweens.push(tween)
        }
    }
}
