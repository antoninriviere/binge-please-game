import router from './router.js'

import store from '../store'

import eventHub from 'Application/event-hub'

import PageHome from '../components/page-home'
import PageQuiz from '../components/page-quiz'
import AppWebglCanvas from '../components/app-webgl-canvas'

import logger from 'Utils/logger'
import Config from 'Config'
import ConfigQuiz from 'Config/quiz'

export default {
    name: 'app',

    store,
    router,

    components:
    {
        PageHome,
        PageQuiz,
        AppWebglCanvas
    },

    data()
    {
        return {
            windowObj: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            isTouchDevice: Config.isTouchDevice,
            componentId: '',
            quizId: 0,
            maxQuestions: ConfigQuiz.length
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
        window.addEventListener('keydown', this.onKeyPress)

        eventHub.$on('page:disable-scroll', this.onDisableScroll)
        eventHub.$on('page:enable-scroll', this.onEnableScroll)
    },

    mounted()
    {
        this.onResize()
        this.onEnterFrame()
        this.onRouteChange(this.$route)
    },

    destroyed()
    {

    },

    methods:
    {
        onResize()
        {
            this.windowObj = { width: window.innerWidth, height: window.innerHeight }
            eventHub.$emit('window:resize', this.windowObj)
        },

        onKeyPress(e)
        {
            e.preventDefault()
            const char = e.which || e.keyCode
            let id = this.quizId
            switch(char)
            {
                case 37:
                    if(id - 1 > 0)
                    {
                        logger('left', 'royalblue')
                        id--
                    }
                    break
                case 39:
                    if(id < this.maxQuestions)
                    {
                        logger('right', 'royalblue')
                        id++
                    }
                    break
                default:
                    break
            }
            if(this.quizId !== id)
            {
                this.quizId = id
                this.$router.push(`/quiz/${this.quizId}`)
            }
        },

        onDisableScroll()
        {
            this.$body.classList.add('overflow-h')
            this.$html.classList.add('overflow-h')
        },

        onEnableScroll()
        {
            this.$body.classList.remove('overflow-h')
            this.$html.classList.remove('overflow-h')
        },

        scrollTo(value = 0)
        {
            window.scrollTo(0, value)
        },

        onRouteChange(to)
        {
            if(to.name === 'quiz')
                this.quizId = to.params.id
            this.componentId = to.meta.componentId
            eventHub.$emit('application:route-change', to.params.id)
        },

        onEnterFrame()
        {
            eventHub.$emit('application:enterframe')

            requestAnimationFrame(this.onEnterFrame)
        }
    }
}
