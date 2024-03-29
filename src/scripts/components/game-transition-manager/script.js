import { TweenMax, TimelineMax } from 'gsap'

import uiCircleTransition from 'Components/ui-circle-transition'
import successWellDone from 'Components/game-success-transitions/well-done'
import successYouWin from 'Components/game-success-transitions/you-win'
import successBravo from 'Components/game-success-transitions/bravo'
export default
{
    name: 'game-transition-manager',

    components:
    {
        uiCircleTransition
    },

    data()
    {
        return {
            totalScore: 0,
            currentScore: 0,
            answer: '',
            successComponent: undefined,
            transitionIndex: 0
        }
    },

    computed: {

    },

    created()
    {
        this.$root.$store.watch(this.$root.$store.getters.getScore, this.onUpdateScore)

        this.transitionComponents = [successWellDone, successYouWin, successBravo]
        this.rightAnswerSound = this.$root.audioManager.create({
            url: '../static/sounds/right_answer.mp3',
            autoplay: false,
            loop: false
        })
        this.failedAnswerSound = this.$root.audioManager.create({
            url: '../static/sounds/failed_answer.mp3',
            autoplay: false,
            loop: false
        })
    },

    mounted()
    {
        this.$circle = this.$refs.circleTransition.$refs.circle
        this.failedAnimDelay = 0.5
    },

    destroyed()
    {

    },

    methods:
    {
        onUpdateScore(score)
        {
            this.currentScore = score - this.totalScore
            this.totalScore = score
        },

        startTransition(options, questionState)
        {
            this.$refs.circleTransition.setColor(options.color)
            this.$refs.circleTransition.setScale(0)
            this.answer = options.answer
            if(questionState === 'success')
            {
                this.successComponent = this.getTransitionComponent()
                // this.successComponent = successBravo
                return this.$nextTick().then(() => this.playSuccessTransition())
            }
            else
            {
                return this.$nextTick().then(() => this.playFailedTransition(options.titleColor))
            }
        },

        getTransitionComponent()
        {
            const component = this.transitionComponents[this.transitionIndex]
            this.transitionIndex++
            if(this.transitionIndex === this.transitionComponents.length)
                this.transitionIndex = 0
            return component
        },

        playSuccessTransition()
        {
            this.$refs.container.classList.add('is-active')
            this.rightAnswerSound.play()
            return new Promise((resolve) =>
            {
                this.playScoreAnimation()

                TweenMax.to(this.$circle, 0.45,
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

        playScoreAnimation()
        {
            const blinksCount = 20
            const blinkDelay = 0.01

            const tl = new TimelineMax({
                onComplete: () =>
                {
                    TweenMax.set(this.$refs.points,
                        {
                            clearProps: 'all',
                            delay: 0.5
                        })
                }
            })

            TweenMax.set(this.$refs.points, { rotation: -8 })

            tl.to(this.$refs.points, 0.3,
                {
                    scale: 1,
                    opacity: 1
                }, '0.2')

            tl.to(this.$refs.points, 0.1,
                {
                    opacity: 0
                }, '+= 0.3')

            for(let i = 0; i < blinksCount; i++)
            {
                if(i % 2 === 0)
                {
                    tl.set(this.$refs.points,
                        {
                            opacity: 1
                        }, `+= ${blinkDelay}`)
                }
                else
                {
                    tl.set(this.$refs.points,
                        {
                            opacity: 0
                        }, `+= ${blinkDelay}`)
                }
            }
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
            this.failedAnswerSound.play()
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
                tl.to(this.$circle, 0.4, {
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
                }, this.failedAnimDelay + 2.5)
                tl.to(this.$circle, 0.4, {
                    scale: 1,
                    ease: Sine.easeOut
                }, this.failedAnimDelay + 2.5)
            })
        }
    }
}
