import eventHub from 'Application/event-hub'
import AudioManager from 'Utils/AudioManager'

import { randomInRange, randomIntInRange } from 'Utils/Numbers'


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
        dink()
        {
            return {
                ref: '',
                x: this.$root.windowObj.width * 0.544,
                y: this.$root.windownObj.height * 0.35
            }
        }
    },

    data()
    {
        return {
            // hasAppeared: false,

            swearIndex: 0,

            swearwords: {

                messy : {
                    ref: '',
                    x: 0,
                    y: 0
                },

                kant: {
                    ref: '',
                    x: 0,
                    y: 0
                },

                holy: {
                    ref: '',
                    x: 0,
                    y: 0
                },

                dink: {
                    ref: '',
                    x: 0,
                    y: 0
                },

                bullshirt: {
                    ref: '',
                    x: 0,
                    y: 0
                },

                ashhole: {
                    ref: '',
                    x: 0,
                    y: 0
                }

            }
        }
    },

    created()
    {
        this.audioManager = new AudioManager()

        eventHub.$on('window:resize', this.onResize)
    },

    mounted()
    {
        TweenMax.to([this.$refs.bg1, this.$refs.bg2], 0.8,
            {
                opacity: 1,
                delay: 0.2
            })
        this.tweenForks()

        this.swearwords.messy.ref = this.$refs.messy
        this.swearwords.kant.ref = this.$refs.kant
        this.swearwords.holy.ref = this.$refs.holy
        this.swearwords.dink.ref = this.$refs.dink
        this.swearwords.bullshirt.ref = this.$refs.bullshirt
        this.swearwords.ashhole.ref = this.$refs.ashhole

        TweenMax.delayedCall(1.5, this.addAllBadges)

        // this.swearwords = [this.$refs.motherforker, this.$refs.messy, this.$refs.kant, this.$refs.holy, this.$refs.bullshirt, this.$refs.ashhole, this.$refs.dink]
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
            this.addBadge()
        },

        tweenForks()
        {
            this.duration = '3'
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
        },

        tweenBadge(badge, index)
        {
            console.log('tween badge', badge, index)
            const randomIndex = randomIntInRange(0, 7)
            const randomY = randomInRange(100, this.$root.windowObj.height -200)

            TweenMax.set(badge.ref, {
                opacity: 1,
                zIndex: randomIndex
            })
            TweenMax.fromTo(badge.ref, 0.1,
                {
                    scale: 3,
                    x: badge.x + 20,
                    y: randomY + 20
                },
                {
                    scale: 1,
                    x: badge.x,
                    y: randomY,
                    ease: Circ.easeOut,
                    onComplete: this.slideBadge,
                    onCompleteParams: [badge, index]
                })
        },

        slideBadge(badge, index)
        {
            const jamesBound = badge.ref.getBoundingClientRect()
            const distance = jamesBound.height + 100
            TweenMax.to(badge.ref, 3, {
                y: -distance + 'px',
                delay: '0',
                ease: Power0.easeNone,
                onComplete: () =>
                {
                    // const delay = index * randomInRange(0.3, 0.6)
                    // TweenMax.delayedCall(delay, () => this.tweenBadge(badge, index))
                    this.tweenBadge(badge, index)
                }
            })
        },

        addBadge()
        {
            switch(this.swearIndex)
            {
                case 0:
                    this.tweenBadge(this.swearwords.messy)
                    break
                case 1:
                    this.tweenBadge(this.swearwords.kant)
                    break
                case 2:
                    this.tweenBadge(this.swearwords.holy)
                    break
                case 3:
                    this.tweenBadge(this.swearwords.dink)
                    break
                case 4:
                    this.tweenBadge(this.swearwords.bullshirt)
                    break
                case 5:
                    this.tweenBadge(this.swearwords.ashhole)
                    break
                default:
                    console.log('yolo')
                    break
            }

            this.swearIndex++
        },

        addAllBadges()
        {

            Object.values(this.swearwords).forEach((value, index) => {
                console.log(value, index)
                const delay = index * randomInRange(0.3, 0.6)
                TweenMax.delayedCall(delay, () => this.tweenBadge(value, index))
            })
        }
    }
}
