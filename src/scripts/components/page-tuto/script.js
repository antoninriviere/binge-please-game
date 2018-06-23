import appPage from 'Mixins/app-page'
import { TimelineMax, TweenMax } from 'gsap'
import TutoPlay from 'Components/tuto-play'
import eventHub from 'Application/event-hub'

export default
{
    name: 'page-tuto',

    components:
    {
        TutoPlay
    },

    data()
    {
        return {
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
    },

    mounted()
    {
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
        }
    }
}
