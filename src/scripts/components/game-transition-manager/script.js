import eventHub from 'Application/event-hub'
import { TweenMax } from 'gsap'
export default
{
    name: 'game-transition-manager',

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

    computed: {
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
    },

    methods:
    {
        onResize(windowObj)
        {
            this.windowW = windowObj.width
            this.windowH = windowObj.height
            this.viewBox = `0 0 ${windowObj.width} ${windowObj.height}`
            this.circle.cx = windowObj.width / 2
            this.circle.cy = windowObj.height / 2
            this.circle.radius = windowObj.height * 1.5
        },
        startTransition(options = { color: '#000000' })
        {
            this.circle.color = options.color
            TweenMax.set(this.$refs.circle, { scale: 0 })
            this.$refs.container.classList.add('is-active')
            return new Promise((resolve) =>
            {
                TweenMax.to(this.$refs.circle, 0.5,
                    {
                        scale: 1,
                        ease: Sine.easeOut,
                        delay: 0.15,
                        onComplete: () =>
                        {
                            this.$refs.container.classList.remove('is-active')
                            resolve()
                        }
                    }
                )
            })
        }
    }
}
