import eventHub from 'Application/event-hub'
import { randomIntInRange } from 'Utils/Numbers'
import AudioManager from 'Utils/AudioManager'

import { TweenMax, Circ, Elastic, TimelineMax } from 'gsap'

export default
{
    name: 'the-crown-svg',

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
            clickId: 0
        }
    },

    created()
    {
        this.audioManager = new AudioManager()
        this.corgiSound = this.audioManager.create({
            url: '/static/sounds/corgi_noise.mp3',
            autoplay: false,
            loop: false
        })
        eventHub.$on('window:resize', this.onResize)
    },

    mounted()
    {
        // Selectors
        this.$sparkles =  Array.prototype.slice.call(this.$refs.sparkles.querySelectorAll('.sparkle'))

        // Offset corgi's width
        console.log(this.$refs.pilow.getBoundingClientRect())
        this.$refs.queen.style.transform = `translateX(${ -this.$refs.pilow.getBoundingClientRect().width / 2}px)`

        // Scalable elems
        const scalableElems = [this.$refs.crownBig, this.$refs.flag, this.$refs.pilow, this.$refs.corgi]
        for(let i = 0; i < scalableElems.length; i++)
        {
            TweenMax.set(scalableElems[i], {
                scale: 0,
                transformOrigin: '50% 50%'
            })
        }

        // Crown
        TweenMax.set(this.$refs.crownLittle, {
            scale: 1,
            transformOrigin: '50% 50%'
        })

        // Sparkles
        for(let i = 0; i < this.$sparkles.length; i++)
        {
            TweenMax.set(this.$sparkles[i], {
                scale: 0,
                transformOrigin: '50% 50%'
            })
        }

        this.sparklesTl = new TimelineMax({
            onComplete: () =>
            {
                this.animateSparkles()
            }
        })
        this.sparklesTl.pause()

        // Hand
        TweenMax.set(this.$refs.hand, { rotation: -10, transformOrigin: '50% 100%' })
        TweenMax.to(this.$refs.hand, 0.3, {
            rotation: 10,
            yoyo: true,
            repeat: -1,
            transformOrigin: '50% 100%',
            ease: Circ.easeInOut
        })
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
            this.clickId++

            switch(this.clickId)
            {
                case 1:
                    this.corgiAppear()
                    break
                case 2:
                    this.flagAppear()
                    break
                case 3:
                    this.crownAppear()
                    this.animateSparkles()
                    break
                default:
                    this.corgiSound.play()
            }
        },

        // Apparitions
        crownAppear()
        {
            TweenMax.to(this.$refs.crownLittle, 0.5, {
                scale: 0,
                ease: Elastic.easeInOut
            })
            TweenMax.to(this.$refs.crownBig, 0.5, {
                scale: 1,
                ease: Elastic.easeInOut
            }, 0.25)
            TweenMax.to(this.$refs.sparkles, 0.5, {
                scale: 1,
                ease: Elastic.easeInOut
            }, 0.4)
        },

        flagAppear()
        {
            TweenMax.to(this.$refs.flag, 0.5, {
                scale: 1,
                ease: Elastic.easeInOut
            }, 0)
        },

        corgiAppear()
        {
            TweenMax.to(this.$refs.pilow, 0.5, {
                scale: 1,
                ease: Elastic.easeInOut
            }, 0)
            TweenMax.to(this.$refs.corgi, 0.5, {
                scale: 1,
                ease: Elastic.easeInOut
            }, 0)
            this.corgiSound.play()
        },

        animateSparkles()
        {
            this.sparklesTl.clear()

            const $sparkles = Array.from(this.$sparkles)

            const sInitLength = $sparkles.length
            let sLength = sInitLength - 1

            for(let i = 0; i < sInitLength; i++)
            {
                const index = randomIntInRange(0, sLength)

                this.sparklesTl.to($sparkles[index], 0.3,
                    {
                        scale: 1,
                        transformOrigin: '50% 50%',
                        ease: Circ.easeOut
                    }, 0.15 * i
                )

                this.sparklesTl.to($sparkles[index], 0.3,
                    {
                        scale: 0,
                        transformOrigin: '50% 50%',
                        ease: Circ.easeOut
                    }, 0.45 * i
                )

                $sparkles.splice(index, 1)
                sLength--
            }

            this.sparklesTl.restart()
        }
    }
}
