import eventHub from 'Application/event-hub'
import { TweenMax } from 'gsap'

export default
{
    name: 'ui-circle-transition',

    components:
    {

    },

    data()
    {
        return {
            windowW: 0,
            windowH: 0,
            viewBox: '0 0 0 0',
            circle: {
                cx: 0,
                cy: 0,
                radius: 0,
                color: '#000000'
            }
        }
    },

    created()
    {
        eventHub.$on('window:resize', this.onResize)
    },

    mounted()
    {
        this.viewBox = `0 0 ${window.innerWidth} ${window.innerHeight}`
        this.windowW = window.innerWidth
        this.windowH = window.innerHeight
        this.circle.cx = window.innerWidth / 2
        this.circle.cy = window.innerHeight / 2
        this.circle.radius = window.innerHeight * 1.5
        TweenMax.set(this.$refs.circle, { scale: 0 })
    },

    destroyed()
    {
        eventHub.$off('window:resize', this.onResize)
    },

    methods:
    {
        setColor(color)
        {
            this.circle.color = color
        },
        setScale(scale)
        {
            TweenMax.set(this.$refs.circle, { scale })
        },
        onResize(windowObj)
        {
            this.windowW = windowObj.width
            this.windowH = windowObj.height
            this.viewBox = `0 0 ${windowObj.width} ${windowObj.height}`
            this.circle.cx = windowObj.width / 2
            this.circle.cy = windowObj.height / 2
            this.circle.radius = windowObj.height * 1.5
        }
    }
}
