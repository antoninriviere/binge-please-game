import appPage from 'Mixins/app-page'

import eventHub from 'Application/event-hub'

import Quiz from 'Config/quiz'

import GameTypeManager from 'Components/game-type-manager'
import GameScoreManager from 'Components/game-score-manager'
import GameTimeManager from 'Components/game-time-manager'

import QuizDom from 'Components/quiz-dom'
import QuizEmoji from 'Components/quiz-emoji'
import QuizVideo from 'Components/quiz-video'
import QuizCustom from 'Components/quiz-custom'

import { SET_QUIZ, SET_PROGRESS, WEBGL_ADD_GROUP, WEBGL_CLEAR_GROUP } from 'MutationTypes'

export default
{
    name: 'page-quiz',

    components:
    {
        QuizDom,
        QuizEmoji,
        QuizVideo,
        QuizCustom,
        GameTypeManager,
        GameScoreManager,
        GameTimeManager
    },

    data()
    {
        return {
            id: this.$route.params.id
        }
    },

    computed: {
        quizObject()
        {
            return this.$store.getters.getCurrentQuestion()
        }
    },

    created()
    {
        this.$store.commit(SET_QUIZ, Quiz)
        this.$store.commit(SET_PROGRESS, this.id - 1)

        eventHub.$on('application:route-change', this.onRouteChange)
    },

    mounted()
    {
        if(this.quizObject.type === '3d')
            this.setupWebGLGroup(this.quizObject.id)

        if(this.quizObject.ambientSound)
            this.setupAmbientSound(this.quizObject.ambientSound)
    },

    destroyed()
    {
        // this.ambientSound.destroy()
        eventHub.$off('application:route-change', this.onRouteChange)
    },

    mixins: [appPage],

    methods:
    {
        // Events
        onClickSkip()
        {
            eventHub.$emit('quiz:skip-question')
            const id = parseInt(this.$root.quizId) + 1

            if(id < this.$root.maxQuestions)
            {
                this.$root.quizId = id
                this.$root.$router.push(`/quiz/${this.$root.quizId}`)
            }
        },

        onRouteChange(id)
        {
            if(this.ambientSound)
                this.ambientSound.destroy()
            const currentId = id - 1
            const nextQuizObject = this.$store.getters.getQuestion(currentId)

            if(this.quizObject.type === '3d' && nextQuizObject.type !== '3d')
                this.$store.commit(WEBGL_CLEAR_GROUP)

            if(nextQuizObject.type === '3d')
                this.setupWebGLGroup(nextQuizObject.id)

            if(nextQuizObject.ambientSound)
                this.setupAmbientSound(nextQuizObject.ambientSound)

            this.$store.commit(SET_PROGRESS, currentId)
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
            this.$store.commit(WEBGL_ADD_GROUP, id)
        }
    }
}
