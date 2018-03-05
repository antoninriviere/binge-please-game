import router from './router.js'

import PageHome from '../components/page-home'

import Config from 'Config'

export default {
    name: 'app',

    router,

    components:
    {
        PageHome
    },

    data()
    {
        return {
            windowObj: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            isTouchDevice: Config.isTouchDevice,
            isSmoothScroll: Config.smoothScroll.active,
            componentId: '',
            pageHeight: 0,
            scrollTop: 0,
            smoothScroll: 0
        }
    },

    watch:
    {
        $route: 'onRouteChange'
    },

    created()
    {
        this.$html = document.documentElement
        this.$body = document.body

        window.addEventListener('resize', this.onResize)
        if(!this.isTouchDevice && this.isSmoothScroll)
            window.addEventListener('scroll', this.onScroll)

        this.eventHub.$on('page:disable-scroll', this.onDisableScroll)
        this.eventHub.$on('page:enable-scroll', this.onEnableScroll)
        if(!this.isTouchDevice && this.isSmoothScroll)
            this.eventHub.$on('page:set-height', this.setPageHeight)
    },

    mounted()
    {
        this.$smoothScrollContainer = this.$el.querySelector('.js-smooth-scroll-container')

        this.onResize()
        this.onEnterFrame()
        this.onRouteChange(this.$route)
    },

    destroyed()
    {
        this.eventHub.$off('page:set-height', this.setPageHeight)
    },

    methods:
    {
        onResize()
        {
            this.windowObj = { width: window.innerWidth, height: window.innerHeight }
            this.eventHub.$emit('window:resize', this.windowObj)
        },

        onScroll()
        {
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || window.scrollY
            this.eventHub.$emit('window:scroll', this.scrollTop)
        },

        onDisableScroll()
        {
            this.$body.classList.add('overflow-h')
            this.$html.classList.add('overflow-h')

            if(this.$smoothScrollContainer)
            {
                this.$smoothScrollContainer.classList.add('overflow-h')
            }
        },

        onEnableScroll()
        {
            this.$body.classList.remove('overflow-h')
            this.$html.classList.remove('overflow-h')

            if(this.$smoothScrollContainer)
            {
                this.$smoothScrollContainer.classList.remove('u-overflow-h')
            }
        },

        scrollTo(value = 0, force = false)
        {
            if(force)
            {
                this.smoothScroll = value
                this.scrollTop = value
                window.scrollTo(0, value)
            }
            else
            {
                window.scrollTo(0, value)
            }
        },

        onRouteChange(to)
        {
            this.componentId = to.meta.componentId
        },

        onEnterFrame()
        {
            if(!this.isTouchDevice && this.isSmoothScroll) this.smoothScroll += (this.scrollTop - this.smoothScroll) * 0.1

            if(!this.isTouchDevice && this.isSmoothScroll) this.eventHub.$emit('application:enterframe', (Math.round(this.smoothScroll * 100) / 100))
            requestAnimationFrame(this.onEnterFrame)
        },

        setPageHeight(height)
        {
            this.pageHeight = height
        }
    }
}
