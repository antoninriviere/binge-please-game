import router from './router.js'

import store from '../store'

import eventHub from 'Application/event-hub'

import PageHome from '../components/page-home'
import PageTuto from '../components/page-tuto'
import PageQuiz from '../components/page-quiz'
import PageFinish from '../components/page-finish'
import PageGallery from '../components/page-gallery'
import PageLeaderboard from '../components/page-leaderboard'
import PageResults from '../components/page-results'
import AppWebglCanvas from '../components/app-webgl-canvas'
import AppHeader from '../components/app-header'
import AppFooter from '../components/app-footer'
import GameTypeManager from 'Components/game-type-manager'


import Config from 'Config'
import ConfigQuiz from 'Config/quiz'

import Mouse from 'Utils/Mouse.js'
import GameTime from './GameTime.js'
import AudioManager from 'Utils/AudioManager'
import 'Utils/SplitText'

import firebase from 'firebase/app'
import 'firebase/database'

export default {
    name: 'app',

    store,
    router,

    components:
    {
        PageHome,
        PageTuto,
        PageQuiz,
        PageFinish,
        PageGallery,
        PageLeaderboard,
        PageResults,
        AppWebglCanvas,
        AppHeader,
        AppFooter,
        GameTypeManager
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
        firebase.initializeApp(Config.firebase)
        this.database = firebase.database()

        this.time = new GameTime()
        this.mouse = new Mouse(this.windowObj.width, this.windowObj.height)
        this.audioManager = new AudioManager()

        window.addEventListener('resize', this.onResize)
        window.addEventListener('mousemove', this.onMouseMove)

        eventHub.$on('page:disable-scroll', this.onDisableScroll)
        eventHub.$on('page:enable-scroll', this.onEnableScroll)
    },

    mounted()
    {
        this.$html = document.documentElement
        this.$body = document.body

        this.onResize()
        this.onEnterFrame()
        this.onRouteChange(this.$route)
        this.onDisableScroll()
        this.typeManager = this.$refs.typeManager
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

        onMouseMove(event)
        {
            this.mouse.onMove(event)
        },

        onDisableScroll()
        {
            console.log('disable scroll', this.$body.classList)
            this.$body.classList.add('overflow-h')
            this.$html.classList.add('overflow-h')
        },

        onEnableScroll()
        {
            console.log('enable scroll', this.$body.classList)

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
            const newRoute = {
                name: to.name,
                id: to.params.id
            }
            eventHub.$emit('application:route-change', newRoute)
        },

        onEnterFrame()
        {
            eventHub.$emit('application:enterframe')
            requestAnimationFrame(this.onEnterFrame)
        }
    }
}
