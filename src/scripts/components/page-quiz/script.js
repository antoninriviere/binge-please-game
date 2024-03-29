import appPage from 'Mixins/app-page'

import eventHub from 'Application/event-hub'

import Config from 'Config'
import Quiz from 'Config/quiz'

import GameInterface from 'Components/game-interface'
// import GameTutoManager from 'Components/game-tuto-manager'
import GameTransitionManager from 'Components/game-transition-manager'

import QuizDom from 'Components/quiz-dom'
import QuizEmoji from 'Components/quiz-emoji'
import QuizVideo from 'Components/quiz-video'
import QuizCustom from 'Components/quiz-custom'

import { getDebugParams } from 'Utils/Url'
import findIndex from 'lodash.findindex'

import { SET_QUIZ, SET_PROGRESS, WEBGL_ADD_GROUP, WEBGL_CLEAR_GROUP, INCREMENT_PROGRESS, SET_PLACE } from 'MutationTypes'

export default
{
    name: 'page-quiz',

    components:
    {
        QuizDom,
        QuizEmoji,
        QuizVideo,
        QuizCustom,
        GameInterface,
        // GameTutoManager,
        GameTransitionManager
    },

    data()
    {
        return {
            id: this.$route.params.id,
            totalScore: 0,
            place: 0,
            isDebug: false,
            isSkipping: false
        }
    },

    computed: {
        quizObject()
        {
            return this.$store.getters.getCurrentQuestion()
        },
        questionState()
        {
            return this.$store.getters.getQuestionState()
        }
    },

    created()
    {
        eventHub.$on('application:skip', this.onSkip)

        this.$store.commit(SET_QUIZ, Quiz)
        const debugParams = getDebugParams()
        this.isDebug = Object.keys(debugParams).length > 0
        if(this.isDebug && Config.environment === 'dev')
        {
            const debugXpId = debugParams.debug
            const debugXpIndex = findIndex(Quiz, { id: debugXpId })
            this.$root.typeManager.isTypeable = true
            this.$store.commit(SET_PROGRESS, debugXpIndex)
        }
        else
        {
            this.$store.commit(SET_PROGRESS, this.id - 1)
        }
        this.$store.watch(this.$store.getters.getTransitionProgress, this.onTransitionStart)
        this.$store.watch(this.$store.getters.getCurrentProgress, this.onProgressChange)
        this.$store.watch(this.$store.getters.getQuizStatus, this.onQuizStatusChange)
        eventHub.$on('application:route-change', this.onRouteChange)
    },

    mounted()
    {
        this.lastQuizObject = this.quizObject
        this.setBackgroundColor()
        if(this.quizObject.type === '3d')
            this.setupWebGLGroup(this.quizObject.id)

        if(this.quizObject.ambientSound)
            this.setupAmbientSound(this.quizObject.ambientSound)
    },

    destroyed()
    {
        eventHub.$off('application:skip', this.onSkip)

        if(this.ambientSound)
            this.ambientSound.destroy()
    },

    mixins: [appPage],

    methods:
    {
        setBackgroundColor()
        {
            this.$root.$body.style.backgroundColor = this.quizObject.backgroundColor
        },

        // Events
        onSkip()
        {
            if(this.isSkipping)
                return
            this.isSkipping = true
            this.$store.dispatch('skipQuestion', this.quizObject)
        },

        onRouteChange(newRoute)
        {
            if(newRoute.name === 'quiz')
            {
                this.setupNextQuestion()
                const currentId = newRoute.id - 1
                this.$store.commit(SET_PROGRESS, currentId)
            }
        },

        clearQuiz()
        {
            if(this.ambientSound)
                this.ambientSound.destroy()

            if(this.lastQuizObject.type === '3d')
                this.$store.commit(WEBGL_CLEAR_GROUP)
        },

        getScoreDatas()
        {
            this.scores = []

            this.totalScore = this.$store.getters.getScore()

            this.$root.database.ref('/scores/').orderByChild('total').once('value').then((snapshot) =>
            {
                snapshot.forEach((child) =>
                {
                    const scoreArray = { ...child.val(), ...{ yours: false } }
                    this.scores.unshift(scoreArray)
                })

                this.compareScore()

                // console.log('score datas', this.scores, 'total scpre', this.totalScore)
            })
        },

        compareScore()
        {
            for(let i = 0; i < this.scores.length; i++)
            {
                if(this.totalScore >= this.scores[i].total)
                {
                    this.place = i + 1
                    this.$store.commit(SET_PLACE, this.place)
                    this.$router.push({
                        name: 'finish',
                        params: { place: this.place }
                    })
                    return
                }
            }
            this.$router.push({
                name: 'finish',
                params: { place: this.place }
            })
        },

        setupNextQuestion()
        {
            if(this.quizObject.type === '3d')
                this.setupWebGLGroup(this.quizObject.id)

            if(this.quizObject.ambientSound)
                this.setupAmbientSound(this.quizObject.ambientSound)

            this.lastQuizObject = this.quizObject
        },

        onTransitionStart()
        {
            eventHub.$emit('application:stop-time')

            this.clearQuiz()
            this.transitionOut().then(() =>
            {
                this.isSkipping = false
                // TODO Clear for prod
                if(this.isDebug && Config.environment === 'dev')
                    return
                this.$store.commit(INCREMENT_PROGRESS)
                this.setBackgroundColor()
            })
        },

        onProgressChange(progress)
        {
            this.$router.push(`/quiz/${progress + 1}`)
        },

        onQuizStatusChange(hasFinished)
        {
            if(hasFinished)
            {
                eventHub.$emit('application:stop-time')
                eventHub.$off('application:route-change', this.onRouteChange)
                this.clearQuiz()
                this.$root.typeManager.isTypeable = false
                this.transitionOut().then(() =>
                {
                    this.getScoreDatas()
                })
            }
        },

        transitionOut()
        {
            return new Promise((resolve) =>
            {
                this.$root.typeManager.transitionOut(this.questionState)
                const options = {
                    color: this.quizObject.color,
                    titleColor: this.quizObject.titleColor ? this.quizObject.titleColor : '#F7C046',
                    answer: this.quizObject.name
                }
                this.$refs.transitionManager.startTransition(options, this.questionState).then(() =>
                {
                    this.$root.typeManager.isTypeable = true
                    resolve()
                })
            })
        },

        setupAmbientSound(soundId)
        {
            this.ambientSound = this.$root.audioManager.create({
                url: `../static/sounds/${soundId}.mp3`,
                autoplay: true,
                loop: true
            })
        },

        setupWebGLGroup(id)
        {
            this.$store.commit(WEBGL_ADD_GROUP, {
                id
            })
        }
    }
}
