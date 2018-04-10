import appPage from 'Mixins/app-page'

import eventHub from 'Application/event-hub'

import Quiz from 'Config/quiz'

import GameTypeManager from 'Components/game-type-manager'
import GameScoreManager from 'Components/game-score-manager'
import GameTimeManager from 'Components/game-time-manager'

import QuizDom from 'Components/quiz-dom'
import QuizEmoji from 'Components/quiz-emoji'
import QuizVideo from 'Components/quiz-video'

import { SET_QUIZ, SET_PROGRESS, WEBGL_ADD_GROUP, WEBGL_CLEAR_GROUP } from 'MutationTypes'

export default
{
    name: 'page-quiz',

    components:
    {
        QuizDom,
        QuizEmoji,
        QuizVideo,
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
        if(this.quizObject.type === '3d') this.setupWebGLGroup()
    },

    destroyed()
    {
        eventHub.$off('application:route-change', this.onRouteChange)
    },

    mixins: [appPage],

    methods:
    {
        onRouteChange(id)
        {
            const currentId = id - 1
            const nextQuizObject = this.$store.getters.getQuestion(currentId)

            if(this.quizObject.type === '3d' && nextQuizObject.type !== '3d')
            {
                // eventHub.$emit('webgl:clear-group')
                this.$store.commit(WEBGL_CLEAR_GROUP)
            }

            if(nextQuizObject.type === '3d') this.setupWebGLGroup()

            this.$store.commit(SET_PROGRESS, currentId)
        },

        setupWebGLGroup()
        {
            this.$store.commit(WEBGL_ADD_GROUP, 'mouse-move-rotate')
        }
    }
}
