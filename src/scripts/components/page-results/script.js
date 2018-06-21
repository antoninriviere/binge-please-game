import eventHub from 'Application/event-hub'
import appPage from 'Mixins/app-page'

import AppLogo from 'Components/app-logo'
import AppBtnShare from 'Components/app-btn-share'

import { TweenMax } from 'gsap'

import { randomInRange } from 'Utils/Numbers'

export default
{
    name: 'page-results',

    components:
    {
        AppLogo,
        AppBtnShare
    },

    data()
    {
        return {
            animatedStickers: false
        }
    },

    mixins: [appPage],

    created()
    {

    },

    mounted()
    {
        this.$stickers = this.$el.querySelectorAll('.sticker')
        this.stickersBoundingRect = []

        for(let i = 0; i < this.$stickers.length; i++)
        {
            const elem = this.$stickers[i]
            const bound = elem.getBoundingClientRect()
            this.stickersBoundingRect.push(bound)
        }

        window.addEventListener('scroll', this.onScroll)
        eventHub.$emit('page:enable-scroll')
    },

    computed:
    {

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
            for(let i = 0; i < this.$stickers.length; i++)
            {
                const elem = this.$stickers[i]
                const bound = this.stickersBoundingRect[i]
                const randomOffset = randomInRange(100, 200)

                if(i % 2 < 1)
                {
                    const distance = bound.x + bound.width - randomOffset

                    TweenMax.to(elem, 0.4, {
                        x: -distance + 'px',
                        ease: Power2.easeOut
                    })
                }
                else
                {
                    const distance = this.$root.windowObj.width - bound.x - randomOffset

                    TweenMax.to(elem, 0.4, {
                        x: distance + 'px',
                        ease: Circ.easeOut
                    })
                }
            }
        }
    }
}
