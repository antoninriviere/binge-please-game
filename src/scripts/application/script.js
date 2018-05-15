import router from './router.js'

import store from '../store'

import eventHub from 'Application/event-hub'

import PageHome from '../components/page-home'
import PageQuiz from '../components/page-quiz'
import PageScore from '../components/page-score'
import AppWebglCanvas from '../components/app-webgl-canvas'

import Moment from 'moment'

import logger from 'Utils/logger'
import Config from 'Config'
import ConfigQuiz from 'Config/quiz'

import Mouse from 'Utils/Mouse.js'
import Time from 'Utils/Time.js'
import AudioManager from 'Utils/AudioManager'

import firebase from 'firebase/app'
import 'firebase/database'

export default {
    name: 'app',

    store,
    router,

    components:
    {
        PageHome,
        PageQuiz,
        PageScore,
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
            stepTime: 0,
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

        firebase.initializeApp(Config.firebase)
        this.database = firebase.database()

        this.time = new Time()
        this.mouse = new Mouse(this.windowObj.width, this.windowObj.height)
        this.audioManager = new AudioManager()

        window.addEventListener('resize', this.onResize)
        window.addEventListener('keydown', this.onKeyPress)
        window.addEventListener('mousemove', this.onMouseMove)

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
            this.mouse.onResize(this.windowObj.width, this.windowObj.height)
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

        onMouseMove(event)
        {
            this.mouse.onMove(event)
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
            this.time.tick()
            eventHub.$emit('application:enterframe')
            requestAnimationFrame(this.onEnterFrame)
        }
    }
}
