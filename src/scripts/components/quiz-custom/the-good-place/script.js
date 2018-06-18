import eventHub from 'Application/event-hub'
import AudioManager from 'Utils/AudioManager'

import { TweenMax, Power0 } from 'gsap'

export default
{
    name: 'the-good-place',

    components:
    {

    },

    props: {

    },

    computed: {

    },

    data()
    {
        return {

        }
    },

    created()
    {
        this.audioManager = new AudioManager()

        eventHub.$on('window:resize', this.onResize)
    },

    mounted()
    {
        this.tweenForks()
    },

    destroyed()
    {
        eventHub.$off('window:resize', this.onResize)
    },

    methods:
    {
        onResize()
        {

        },
        onClick()
        {

        },

        tweenForks()
        {
            this.duration = '2'
            this.tweenToTop(this.$refs.bg1)
            this.tweenToMid(this.$refs.bg2)
        },

        tweenToTop(object)
        {
            TweenMax.to(object, this.duration, {
                y: '-100%',
                ease: Power0.easeNone,
                onComplete: () =>
                {
                    TweenMax.set(object, {
                        y: '100%'
                    })
                    this.tweenToMid(object)
                }
            })
        },

        tweenToMid(object)
        {
            TweenMax.to(object, this.duration, {
                y: '0%',
                ease: Power0.easeNone,
                onComplete: () =>
                {
                    this.tweenToTop(object)
                }
            })
        }
    }
}
