import eventHub from 'Application/event-hub'

import { randomIntInRange, randomInRange } from 'Utils/Numbers'
import { TimelineMax, TweenMax } from 'gsap'

export default
{
    name: 'black-mirror',

    components:
    {

    },

    props: {

    },

    data()
    {
        return {
            isNeonOver: false,
            isRoadOver: false,
            isCoupleOver: false,
            dropCount: 150,
            canAnimateDrops: true,
            coupleHeight: 0,
            coupleWidth: 0,
            isDriveOver: false
        }
    },

    computed: {
        carStyles()
        {
            return {
                height: this.$root.windowObj.height * 0.445 + 'px',
                width: this.$root.windowObj.height * 0.445 * 1.750 + 'px'
            }
        },

        coupleStyles()
        {
            return {
                height: this.$root.windowObj.height * 0.445 + 'px',
                width: this.$root.windowObj.height * 0.445 * 0.986 + 'px'
            }
        },

        roadStyles()
        {
            return {
                height: this.$root.windowObj.height * 0.27 + 'px',
                width: this.$root.windowObj.height * 0.27 * 3.172 + 'px'
            }
        },

        neonStyles()
        {
            return {
                height: this.$root.windowObj.height * 0.27 + 'px',
                width: this.$root.windowObj.height * 0.27 * 1.382 + 'px'
            }
        }
    },

    created()
    {
        eventHub.$on('window:resize', this.onResize)
    },

    mounted()
    {
        this.$sparkles = this.$el.querySelectorAll('.black-mirror__road__sparkle')
        // Sparkles
        for(let i = 0; i < this.$sparkles.length; i++)
        {
            TweenMax.set(this.$sparkles[i], {
                scale: 0
            })
        }

        this.sparklesTl = new TimelineMax({
            onComplete: () =>
            {
                this.animateSparkles()
            }
        })
        this.sparklesTl.pause()

        // Drops
        this.coupleHeight = this.$refs.couple.clientHeight
        this.coupleWidth = this.$refs.couple.clientWidth
        this.drops = this.$refs.couple.querySelectorAll('.black-mirror__couple__drop')
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

        onOverRoad()
        {
            this.isRoadOver = true
            this.animateSparkles()
        },

        onLeaveRoad()
        {
            this.isRoadOver = false
        },

        animateSparkles()
        {
            this.sparklesTl.clear()

            if(this.isRoadOver)
            {
                const $sparkles = Array.from(this.$sparkles)

                const sInitLength = $sparkles.length
                let sLength = sInitLength - 1

                for(let i = 0; i < sInitLength; i++)
                {
                    const index = randomIntInRange(0, sLength)

                    this.sparklesTl.to($sparkles[index], 0.3,
                        {
                            scale: randomInRange(0.5, 1.5),
                            ease: Circ.easeOut
                        }, 0.15 * i
                    )

                    this.sparklesTl.to($sparkles[index], 0.3,
                        {
                            scale: 0,
                            ease: Circ.easeOut
                        }, 0.45 * i
                    )

                    $sparkles.splice(index, 1)
                    sLength--
                }

                this.sparklesTl.restart()
            }
        },

        onOverNeon()
        {
            this.isNeonOver = true
        },

        onLeaveNeon()
        {
            this.isNeonOver = false
        },

        onOverCouple()
        {
            this.isCoupleOver = true
            if(this.canAnimateDrops)
            {
                this.animateDrops()
            }
        },

        onLeaveCouple()
        {
            this.isCoupleOver = false
        },

        animateDrops()
        {
            this.dropDelay = 0.025

            this.canAnimateDrops = false

            TweenMax.delayedCall(this.dropDelay * this.drops.length, () =>
            {
                this.canAnimateDrops = true
            })

            for(let i = 0; i < this.drops.length; i++)
            {
                this.animateDrop(this.drops[i], i)
            }
        },

        animateDrop(drop, index)
        {
            console.log('animate drop')
            if(this.isCoupleOver)
            {
                TweenMax.set(drop,
                    {
                        x: `${randomInRange(0, this.coupleHeight)}px`,
                        y: '-50px',
                        scale: randomInRange(0.4, 0.6)
                    })
                TweenMax.to(drop, 0.75,
                    {
                        y: `${this.coupleHeight}px`,
                        delay: index * this.dropDelay,
                        ease: Power0.easeNone,
                        onComplete: () =>
                        {
                            if(this.isCoupleOver)
                            {
                                this.animateDrop(drop, index)
                            }
                        }
                    })
            }
        },

        onOverDrive()
        {
            this.isDriveOver = true
        },

        onLeaveDrive()
        {
            this.isDriveOver = false
        }
    }
}
