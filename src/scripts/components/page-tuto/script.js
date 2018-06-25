import appPage from 'Mixins/app-page'
import { TimelineMax, TweenMax } from 'gsap'
import TutoPlay from 'Components/tuto-play'
import uiCircleTransition from 'Components/ui-circle-transition'
import eventHub from 'Application/event-hub'

export default
{
    name: 'page-tuto',

    components:
    {
        TutoPlay,
        uiCircleTransition
    },

    data()
    {
        return {
            countdown: '3'
        }
    },

    watch: {
        '$route'()
        {
            this.$nextTick().then(this.transitionIn)
        }
    },

    mixins: [appPage],

    created()
    {
        this.STAGGER_DURATION = 0.1
        this.CHAR_DELAY = 0.01
        this.STAGGER_DELAY = this.STAGGER_DURATION * 0.5
        this.COUNTDOWN_DURATION = 0.4
        this.COUNTDOWN_DELAY = 0.3
        eventHub.$on('game:start', this.transitionOut)
        this.tickSound = this.$root.audioManager.create({
            url: '../static/sounds/countdown_tick.mp3',
            autoplay: false,
            loop: false
        })
    },

    mounted()
    {
        this.$circle = this.$refs.circleTransition.$refs.circle
        eventHub.$emit('page:show-header')
        eventHub.$emit('page:show-footer')
        this.transitionIn()
    },

    destroyed()
    {

    },

    methods:
    {
        transitionIn()
        {
            if(this.tl)
            {
                this.tl.kill()
                this.tl.clear()
            }

            this.currentHeadline = this.$refs[`headline-${this.$route.params.id}`]
            const splitText = new SplitText(this.currentHeadline, { type: 'chars, words, lines' })
            const chars = splitText.chars

            TweenMax.set(this.currentHeadline, { opacity: 1, scale: 1 })
            TweenMax.set(chars, { opacity: 0, x: 50 })
            const groupedChars = splitText.words.map((el) =>
            {
                return chars.splice(0, el.childElementCount)
            })

            this.tl = new TimelineMax({
                onComplete: this.onTransitionComplete
            })
            let t = 0
            groupedChars.forEach((group, index) =>
            {
                t = this.STAGGER_DELAY * index
                this.tl.staggerTo(group, this.STAGGER_DURATION, {
                    x: 0,
                    ease: Sine.easeOut
                }, this.CHAR_DELAY, t)

                this.tl.staggerTo(group, this.STAGGER_DURATION * 0.75, {
                    opacity: 1,
                    ease: Sine.easeOut
                }, this.CHAR_DELAY, t)
            })
            if(this.$route.params.id === '2')
                this.tl.add(this.$refs.tutoPlay.play, 0.5  + t)
        },
        onTransitionComplete()
        {
            if(this.$route.params.id === '1')
            {
                TweenMax.to(this.currentHeadline, 0.3, {
                    opacity: 0,
                    scale: 0.9,
                    ease: Expo.easeOut,
                    delay: 2,
                    onComplete: () =>
                    {
                        this.$router.push('/tuto/2')
                    }
                })
            }
            else if(this.$route.params.id === '2')
                this.$root.typeManager.isTypeable = true
        },
        transitionOut()
        {
            this.$refs.circleTransition.setColor('#F7C046')
            TweenMax.to(this.$circle, 0.45,
                {
                    scale: 1,
                    ease: Sine.easeOut,
                    onComplete: this.startCountdown
                }
            )
        },
        startCountdown()
        {
            this.$refs.countdown.classList.add('is-active')
            this.tl = new TimelineMax({
                onComplete: () =>
                {
                    this.$router.push('/quiz/1')
                }
            })
            this.tl.from(this.$refs.countdownText, this.COUNTDOWN_DURATION, {
                scale: 0,
                ease: Expo.easeOut
            }, 0)
            this.tl.add(() =>
            {
                this.tickSound.play()
            }, this.COUNTDOWN_DURATION / 2)
            this.updateCountdown(1, '#F73E39', '2')
            this.updateCountdown(2, '#B7D3D7', '1')
            this.updateCountdown(3, '#5934A5', 'GO!')
        },
        updateCountdown(index, color, text)
        {
            const t = index * (this.COUNTDOWN_DELAY + this.COUNTDOWN_DURATION)
            this.tl.set(this.$refs.countdownText, { scale: 0 }, t)
            this.tl.add(() =>
            {
                this.$refs.circleTransition.setColor(color)
                this.countdown = text
            }, t)
            this.tl.to(this.$refs.countdownText, this.COUNTDOWN_DURATION, {
                scale: 1,
                ease: Expo.easeOut
            }, t)
            this.tl.add(() =>
            {
                this.tickSound.play()
            }, t + this.COUNTDOWN_DURATION / 2)
        }
    }
}
