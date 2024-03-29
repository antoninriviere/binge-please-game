import eventHub from 'Application/event-hub'
import appPage from 'Mixins/app-page'

import AppBtnShare from 'Components/app-btn-share'
import AppLeaderboard from 'Components/app-leaderboard'

import { TweenMax } from 'gsap'

import { randomInRange } from 'Utils/Numbers'

export default
{
    name: 'page-results',

    components:
    {
        AppBtnShare,
        AppLeaderboard
    },

    data()
    {
        return {
            animatedStickers: false,
            duration: 10
        }
    },

    computed:
    {
        score()
        {
            return this.$store.getters.getScore()
        }
    },

    mixins: [appPage],

    created()
    {
        this.$root.$body.style.backgroundColor = '#5934A5'
        this.$root.typeManager.isTypeable = false
    },

    mounted()
    {
        this.animateMustBinge()

        this.$stickers = this.$el.querySelectorAll('.js-sticker')
        this.stickersBoundingRect = []

        for(let i = 0; i < this.$stickers.length; i++)
        {
            const elem = this.$stickers[i]
            const bound = elem.getBoundingClientRect()
            this.stickersBoundingRect.push(bound)
        }

        window.addEventListener('scroll', this.onScroll)
        eventHub.$emit('page:enable-scroll')
        eventHub.$emit('page:hide-footer')
        this.$el.querySelectorAll('.js-container').forEach((elem) => elem.classList.add('is-active'))
        eventHub.$emit('page:show-nav')
        this.$refs.score.classList.add('is-active')
    },

    destroyed()
    {

    },

    methods:
    {
        onScroll()
        {
            if(window.scrollY > 0 && !this.animatedStickers) this.animateStickers()
        },

        animateStickers()
        {
            this.animatedStickers = true
            window.removeEventListener('scroll', this.onScroll)

            for(let i = 0; i < this.$stickers.length; i++)
            {
                const elem = this.$stickers[i]
                const bound = this.stickersBoundingRect[i]
                const randomOffset = randomInRange(200, 300)
                const randomY = randomInRange(0, 100)
                const randomSign = Math.random() > 0.5 ? 1 : -1

                if(i % 2 < 1)
                {
                    const distance = bound.x + bound.width - randomOffset

                    TweenMax.to(elem, 0.4, {
                        x: -distance + 'px',
                        y: randomY * randomSign,
                        ease: Expo.easeOut,
                        delay: randomInRange(0, 0.2)
                    })
                }
                else
                {
                    const distance = this.$root.windowObj.width - bound.x - randomOffset

                    TweenMax.to(elem, 0.4, {
                        x: distance + 'px',
                        y: randomY * randomSign,
                        ease: Expo.easeOut,
                        delay: randomInRange(0, 0.2)
                    })
                }
            }
        },

        animateMustBinge()
        {
            console.log(this.$refs.mustBinge1)
            this.tweenToLeft(this.$refs.mustBinge1)
            this.tweenToMid(this.$refs.mustBinge2)
        },

        tweenToLeft(object)
        {
            TweenMax.to(object, this.duration, {
                x: '-100%',
                ease: Power0.easeNone,
                onComplete: () =>
                {
                    TweenMax.set(object, {
                        x: '100%'
                    })
                    this.tweenToMid(object)
                }
            })
        },

        tweenToMid(object)
        {
            TweenMax.fromTo(object, this.duration,
                {
                    x: '100%'
                },
                {
                    x: '0%',
                    ease: Power0.easeNone,
                    onComplete: () =>
                    {
                        this.tweenToLeft(object)
                    }
                })
        }
    }
}
