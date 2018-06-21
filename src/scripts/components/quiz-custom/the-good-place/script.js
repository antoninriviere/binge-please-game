import eventHub from 'Application/event-hub'
import AudioManager from 'Utils/AudioManager'

import { randomInRange } from 'Utils/Numbers'


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
            swearIndex: 0,

            swearwords: {

                messy : {
                    ref: '',
                    from: {
                        scale: 3,
                        x: '-20px',
                        y: '20px'
                    },
                    to: {
                        scale: 1,
                        x: 0,
                        y: 0
                    }
                },

                kant: {
                    ref: '',
                    from: {
                        scale: 3,
                        x: '-20px',
                        y: '20px'
                    },
                    to: {
                        scale: 1,
                        x: 0,
                        y: 0
                    }
                },

                holy: {
                    ref: '',
                    from: {
                        scale: 3,
                        x: '-20px',
                        y: '20px'
                    },
                    to: {
                        scale: 1,
                        x: 0,
                        y: 0
                    }
                },

                dink: {
                    ref: '',
                    from: {
                        scale: 3,
                        x: '-20px',
                        y: '20px'
                    },
                    to: {
                        scale: 1,
                        x: 0,
                        y: 0
                    }
                },

                bullshirt: {
                    ref: '',
                    from: {
                        scale: 3,
                        x: '-20px',
                        y: '20px'
                    },
                    to: {
                        scale: 1,
                        x: 0,
                        y: 0
                    }
                },

                ashhole: {
                    ref: '',
                    from: {
                        scale: 3,
                        x: '-20px',
                        y: '20px'
                    },
                    to: {
                        scale: 1,
                        x: 0,
                        y: 0
                    }
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
        this.tweenForks()

        this.swearwords.messy.ref = this.$refs.messy
        this.swearwords.kant.ref = this.$refs.kant
        this.swearwords.holy.ref = this.$refs.holy
        this.swearwords.dink.ref = this.$refs.dink
        this.swearwords.bullshirt.ref = this.$refs.bullshirt
        this.swearwords.ashhole.ref = this.$refs.ashhole

        TweenMax.delayedCall(2, this.addAllBadges)

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

        tweenBadge(badge)
        {
            TweenMax.set(badge.ref, {
                opacity: 1
            })
            TweenMax.fromTo(badge.ref, 0.1,
                {
                    scale: badge.from.scale,
                    x: badge.from.x,
                    y: badge.from.y
                },
                {
                    scale: badge.to.scale,
                    x: badge.to.x,
                    y: badge.to.y,
                    ease: Circ.easeOut,
                    onComplete: this.slideBadge,
                    onCompleteParams: [badge]
                })
        },

        slideBadge(badge)
        {
            const jamesBound = badge.ref.getBoundingClientRect()
            const distance = jamesBound.top + jamesBound.height
            console.log()
            TweenMax.to(badge.ref, 3, {
                y: -distance + 'px',
                delay: '0'
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
                TweenMax.delayedCall(delay, () => this.tweenBadge(value))
            })
        }
    }
}
