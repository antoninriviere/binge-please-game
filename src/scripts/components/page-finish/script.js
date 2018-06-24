import appPage from 'Mixins/app-page'
import {
    WEBGL_ADD_GROUP,
    WEBGL_CLEAR_GROUP
} from 'MutationTypes'
import { TimelineMax, TweenMax } from 'gsap'

export default
{
    name: 'page-finish',

    components:
    {

    },

    data()
    {
        return {
            bannerCount: 3,
            position: 129
        }
    },

    mixins: [appPage],

    created()
    {
        this.$root.$body.classList.add('isFinishPage')
        this.$store.commit(WEBGL_ADD_GROUP, {
            id: 'finish-screen',
            config: {
                score: this.$store.state.Game.score
            }
        })
        this.finishSound = this.$root.audioManager.create({
            url: '../static/sounds/finish_sound.mp3',
            autoplay: false,
            loop: true
        })
    },

    mounted()
    {
        this.playAnim()
    },

    destroyed()
    {
        this.$root.$body.classList.remove('isFinishPage')
        this.$store.commit(WEBGL_CLEAR_GROUP)
        this.tl.clear()
        this.finishSound.destroy()
    },

    methods:
    {
        playAnim()
        {
            const pointsChars = new SplitText(this.$refs.pointsText, { type: 'chars, words' }).chars
            this.tl = new TimelineMax({
                delay: 0.7,
                onComplete: () =>
                {
                    // TweenMax.delayedCall(5, this.transitionOut)
                }
            })
            this.tl.from(this.$refs.points, 0.5, {
                xPercent: -100,
                ease: Circ.easeOut
            }, 0)
            this.tl.to(this.$refs.pointsBg, 0.6, {
                scaleX: 0,
                transformOrigin: '100% 50%',
                ease: Expo.easeInOut
            }, 0.3)
            this.tl.staggerFromTo(pointsChars, 0.3, {
                yPercent: 100,
                opacity: 0
            }, {
                yPercent: 0,
                opacity: 1,
                ease: Expo.easeOut
            }, 0.03, 0.6)
            this.tl.from(this.$refs.congratsText, 0.5, {
                yPercent: -100,
                ease: Circ.easeOut
            }, 0.6)
            this.tl.add(() =>
            {
                this.finishSound.play()
            }, 0.6)
        },

        transitionOut()
        {
            TweenMax.to(this.$refs.transitionOut, 0.5, {
                scaleY: 1,
                transformOrigin: '50% 100%',
                ease: Expo.easeOut,
                onComplete: () =>
                {
                    this.$router.push('/results')
                }
            })
        },

        onClickFinish()
        {
            this.transitionOut()
        }
    }
}
