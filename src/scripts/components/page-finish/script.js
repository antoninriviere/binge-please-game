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
            bannerCount: 3
        }
    },

    mixins: [appPage],

    created()
    {
        this.$root.$body.classList.add('isFinishPage')
        this.$store.commit(WEBGL_ADD_GROUP, 'finish-screen')
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
    },

    methods:
    {
        playAnim()
        {
            const kudosChars = new SplitText(this.$refs.kudosText, { type: 'chars, words' }).chars
            this.tl = new TimelineMax({
                delay: 0.7,
                onComplete: () =>
                {
                    TweenMax.delayedCall(5, this.transitionOut)
                }
            })
            this.tl.from(this.$refs.kudos, 0.5, {
                xPercent: -100,
                ease: Circ.easeOut
            }, 0)
            this.tl.to(this.$refs.kudosBg, 0.6, {
                scaleX: 0,
                transformOrigin: '100% 50%',
                ase: Expo.easeInOut
            }, 0.3)
            this.tl.staggerFromTo(kudosChars, 0.3, {
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
        },
        transitionOut()
        {
            TweenMax.to(this.$refs.transitionOut, 0.5, {
                scaleY: 1,
                transformOrigin: '50% 100%',
                ease: Expo.easeOut,
                onComplete: () =>
                {
                    // this.$router.push('/score')
                }
            })
        }
    }
}
