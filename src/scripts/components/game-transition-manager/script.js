import eventHub from 'Application/event-hub'
import { TweenMax, TimelineMax } from 'gsap'
import successWellDone from 'Components/game-success-transitions/well-done'
export default
{
    name: 'game-transition-manager',

    components:
    {

    },

    data()
    {
        return {
            windowW: 0,
            windowH: 0,
            viewBox: '0 0 0 0',
            circle: {
                cx: 0,
                cy: 0,
                radius: 0,
                color: '#000000'
            },
            answer: '',
            successComponent: undefined
        }
    },

    computed: {
    },

    created()
    {
        eventHub.$on('window:resize', this.onResize)
    },

    mounted()
    {
        this.viewBox = `0 0 ${window.innerWidth} ${window.innerHeight}`
        this.windowW = window.innerWidth
        this.windowH = window.innerHeight
        this.circle.cx = window.innerWidth / 2
        this.circle.cy = window.innerHeight / 2
        this.circle.radius = window.innerHeight * 1.5
        TweenMax.set(this.$refs.circle, { scale: 0 })
        this.failedAnimDelay = 0.5
    },

    destroyed()
    {
    },

    methods:
    {
        onResize(windowObj)
        {
            this.windowW = windowObj.width
            this.windowH = windowObj.height
            this.viewBox = `0 0 ${windowObj.width} ${windowObj.height}`
            this.circle.cx = windowObj.width / 2
            this.circle.cy = windowObj.height / 2
            this.circle.radius = windowObj.height * 1.5
        },
        startTransition(options, questionState)
        {
            this.circle.color = options.color
            this.answer = options.answer
            TweenMax.set(this.$refs.circle, { scale: 0 })
            if(questionState === 'success')
            {
                this.successComponent = successWellDone
                return this.$nextTick().then(() => this.playSuccessTransition())
            }
            else
            {
                return this.$nextTick().then(() => this.playFailedTransition(options.titleColor))
            }
        },
        playSuccessTransition()
        {
            this.$refs.container.classList.add('is-active')
            return new Promise((resolve) =>
            {
                TweenMax.to(this.$refs.circle, 0.45,
                    {
                        scale: 1,
                        ease: Sine.easeOut,
                        delay: 0.15,
                        onComplete: () =>
                        {
                            this.$refs.successComponent.play().then(() =>
                            {
                                this.successComponent = undefined
                                this.$refs.container.classList.remove('is-active')
                                resolve()
                            })
                        }
                    }
                )
            })
        },
        playFailedTransition(titleColor)
        {
            const answerClone = this.$refs.answerInner.cloneNode(true)
            TweenMax.set(this.$refs.answerInner, { display: 'none' })
            TweenMax.set(this.$refs.title, { color: titleColor })
            this.$refs.answer.appendChild(answerClone)
            const answerChars = new SplitText(answerClone, { type: 'chars, words' }).chars
            TweenMax.set(answerChars, { opacity: 0 })
            this.$refs.container.classList.add('is-active')
            TweenMax.set(this.$refs.popin, { opacity: 1 })
            let scale = (answerClone.getBoundingClientRect().width / window.innerHeight * 0.4).toFixed(2)
            scale = Math.max(0.2, scale)
            return new Promise((resolve) =>
            {
                const tl = new TimelineMax({
                    onComplete: () =>
                    {
                        this.$refs.container.classList.remove('is-active')
                        TweenMax.set([this.$refs.title, this.$refs.info, this.$refs.popin], { clearProps: 'all' })
                        answerClone.remove()
                        TweenMax.set(this.$refs.answerInner, { clearProps: 'all' })
                        this.$refs.popin.style.opacity = 0
                        resolve()
                    }
                })
                tl.to(this.$refs.circle, 0.4, {
                    scale: scale,
                    ease: Power3.easeOut
                }, this.failedAnimDelay + 0.15)
                tl.to(this.$refs.title, 0.3, {
                    y: 0,
                    ease: Expo.easeOut
                }, this.failedAnimDelay + 0.25)
                tl.fromTo(this.$refs.info, 0.1, {
                    opacity: 0
                }, {
                    opacity: 1,
                    repeat: 2,
                    ease: Expo.easeInOut,
                    repeatDelay: 0.05
                }, this.failedAnimDelay + 0.3)
                tl.staggerTo(answerChars, 0.2, {
                    opacity: 1,
                    ease:  Expo.easeOut
                }, 0.03, this.failedAnimDelay + 0.5)
                tl.set(this.$refs.popin, {
                    opacity: 0
                }, this.failedAnimDelay + 1.5)
                tl.to(this.$refs.circle, 0.4, {
                    scale: 1,
                    ease: Sine.easeOut
                }, this.failedAnimDelay + 1.5)
            })
        }
    }
}
