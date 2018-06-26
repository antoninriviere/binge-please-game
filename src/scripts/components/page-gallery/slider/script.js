import Vue from 'vue'
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

import { TweenMax, TimelineMax } from 'gsap'
import eventHub from 'Application/event-hub'

import Config from 'Config'

export default
{
    name: 'gallery-slider',

    components:
    {

    },

    props: {
        items: {
            type: Array,
            required: true
        }
    },

    data()
    {
        return {
            x: 0,
            sliderPercentage: 0,
            currentX: 0,
            VELOCITY: Config.isTouchDevice ? 100 : 50,
            IS_GRABBING: false,
            IS_CLICKABLE: true,
            BACK_DURATION: 0.9,
            SLIDE_DURATION: 0.5
        }
    },
    watch: {
        currentX: function(x)
        {
            this.sliderPercentage = (x * 100 / this.fullWidth).toFixed(2) * -1
        }
    },

    created()
    {
    },

    mounted()
    {
        TweenMax.set(this.$refs.parent, { opacity: 0 })
        this.onResize()
        eventHub.$on('window:resize', this.onResize)
        const $visibleEls = [this.$refs.items.children[0], this.$refs.items.children[1], this.$refs.items.children[2]]
        const tlIn = new TimelineMax({
            paused: true,
            delay: 0.3
        })
        tlIn.set(this.$refs.parent, { opacity: 1 })
        tlIn.staggerFrom($visibleEls, 0.75, { x: 200, scale: 0.75, opacity: 0.75, transformOrigin: '50% 50%', ease: Expo.easeOut, clearProps: 'all' }, 0.08)
        tlIn.from(this.$refs.indicator, 1, { y: 10, ease: Power2.easeOut }, 0)
        tlIn.play()
    },

    destroyed()
    {

    },

    methods:
    {
        clearTl(tl)
        {
            tl.kill()
            tl.clear()
        },
        grabCursor()
        {
            this.IS_GRABBING = true
        },
        defaultCursor()
        {
            this.IS_GRABBING = false
        },
        onItemClick(id)
        {
            this.$parent.onItemClick(id)
        },
        pad(num)
        {
            let s = String(num)
            while(s.length < 2) s = '0' + s
            return s
        },
        pan(event)
        {
            const computedX = this.x + event.deltaX
            let newX = computedX
            const dir = newX > this.x ? 1 : -1
            TweenMax.set(this.$refs.items, { x: newX })
            TweenMax.to(this.$refs.items, 0.5, { skewX: `${10 * -dir}deg`, overwrite: 'all', ease: Expo.easeOut })
            this.currentX = newX
            if(event.isFinal)
            {
                newX = computedX + event.velocityX * this.VELOCITY
                let backX = null

                if(newX > 0)
                    backX = 0
                else if(newX < -this.fullWidth)
                    backX = -this.fullWidth

                if(this.tlPan)
                    this.clearTl(this.tlPan)

                this.tlPan = new TimelineMax()
                const tweenD = backX === null ? 0.5 : 0.1
                this.tlPan.to(this.$refs.items, tweenD, {
                    x: newX
                })
                this.tlPan.to(this, tweenD, {
                    currentX: newX
                }, 0)
                let skewT = tweenD
                if(backX !== null)
                {
                    this.tlPan.to(this.$refs.items, this.BACK_DURATION, {
                        x: backX,
                        ease: Power4.easeOut
                    })
                    this.tlPan.to(this, this.BACK_DURATION, {
                        currentX: backX,
                        ease: Power4.easeOut
                    }, '-=' + this.BACK_DURATION)
                    skewT += this.BACK_DURATION
                }
                this.tlPan.to(this.$refs.items, 0.3, {
                    skewX: '0deg',
                    ease: Circ.easeOut
                }, '-=' + skewT)
                this.x = backX === null ? newX : backX
            }
        },
        slide(dir)
        {
            const computedX = dir === 'prev' ? this.x + this.itemWidth : this.x - this.itemWidth
            const validation = dir === 'prev' ? computedX <= 0 : computedX >= -this.fullWidth
            if(validation)
            {
                if(this.tlSlide)
                    this.clearTl(this.tlSlide)

                this.tlSlide = new TimelineMax()
                this.tlSlide.to(this.$refs.items, this.SLIDE_DURATION, {
                    x: computedX,
                    ease: Power4.easeOut
                })
                this.tlSlide.to(this, this.SLIDE_DURATION, {
                    currentX: computedX,
                    ease: Power4.easeOut
                }, 0)
                this.x = computedX
            }
        },
        onResize()
        {
            this.itemWidth = this.$refs.items.children[0].children[0].offsetWidth
            this.fullWidth = (this.itemWidth * this.items.length) - this.itemWidth
        }
    }
}
