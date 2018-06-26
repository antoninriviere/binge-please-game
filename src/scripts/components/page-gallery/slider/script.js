import Vue from 'vue'
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

import { TweenMax, TimelineMax } from 'gsap'
import eventHub from 'Application/event-hub'
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
            IS_GRABBING: false,
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
        this.onResize()
        eventHub.$on('window:resize', this.onResize)
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
        pan(event)
        {
            const computedX = this.x + event.deltaX
            let newX = computedX
            TweenMax.set(this.$refs.items, { x: newX })
            this.currentX = newX
            if(event.isFinal)
            {
                newX = computedX + event.velocityX * 100
                let backX = null

                if(newX > 0)
                    backX = 0
                else if(newX < -this.fullWidth)
                    backX = -this.fullWidth

                if(this.tlPan)
                    this.clearTl(this.tlPan)

                this.tlPan = new TimelineMax()
                this.tlPan.to(this.$refs.items, backX === null ? 0.5 : 0.1, {
                    x: newX
                })
                this.tlPan.to(this, backX === null ? 0.5 : 0.1, {
                    currentX: newX
                }, 0)

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
                }
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
            this.itemWidth = this.$refs.item[0].offsetWidth
            this.fullWidth = (this.itemWidth * this.items.length) - this.itemWidth
        }
    }
}
