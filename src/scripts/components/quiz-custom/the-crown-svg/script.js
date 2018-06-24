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
            clickId: 0,
            cluesCount: 4
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
        // datas
        this.firstDelay = 0.25
        this.clueDelay = 1.5

        // Selectors
        this.$sparkles =  Array.prototype.slice.call(this.$refs.sparkles.querySelectorAll('.sparkle'))

        // Offset corgi's width
        this.$refs.queen.style.transform = `translateX(${-this.$refs.pilow.getBoundingClientRect().width / 2}px)`

        // Scalable elems
        const scalableElems = [this.$refs.queenSvg, this.$refs.crownLittle, this.$refs.crownBig, this.$refs.flag, this.$refs.pilow, this.$refs.corgi]
        for(let i = 0; i < scalableElems.length; i++)
        {
            TweenMax.set(scalableElems[i], {
                scale: 0,
                transformOrigin: '50% 50%'
            })
        }

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

        // Add clues
        const incClue = (delay) =>
        {
            TweenMax.delayedCall(delay, () =>
            {
                this.addClue()
                if(this.clickId <= this.cluesCount) incClue(this.clueDelay)
            })
        }

        incClue(this.firstDelay)
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

        addClue()
        {
            this.clickId++

            switch(this.clickId)
            {
                case 1:
                    this.queenAppear()
                    break
                case 2:
                    this.corgiAppear()
                    break
                case 3:
                    this.flagAppear()
                    break
                case 4:
                    this.crownAppear()
                    this.animateSparkles()
                    break
                default:
                    this.playCorgiSound()
            }
        },

        playCorgiSound()
        {
            this.corgiSound.play()
        },

        // Apparitions
        queenAppear()
        {
            // Crown
            TweenMax.to(this.$refs.crownLittle, 0.5, {
                scale: 1,
                ease: Elastic.easeInOut,
                delay: 0.25
            })

            TweenMax.to(this.$refs.queenSvg, 0.5, {
                scale: 1,
                ease: Elastic.easeInOut
            })

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
