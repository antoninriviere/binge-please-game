import appPage from 'Mixins/app-page'

import eventHub from 'Application/event-hub'

import Quiz from 'Config/quiz'

import GameTypeManager from 'Components/game-type-manager'
import GameScoreManager from 'Components/game-score-manager'

import QuizDom from 'Components/quiz-dom'
import QuizEmoji from 'Components/quiz-emoji'
import QuizVideo from 'Components/quiz-video'

export default
{
    name: 'page-quiz',

    components:
    {
        QuizDom,
        QuizEmoji,
        QuizVideo,
        GameTypeManager,
        GameScoreManager
    },

    data()
    {
        return {
            id: this.$route.params.id,
            quizObject: {
                componentId: undefined,
                type: undefined,
                props: {
                    image: ''
                }
            }
        }
    },

    created()
    {
        eventHub.$on('application:route-change', this.onRouteChange)
    },

    mounted()
    {
        this.quizObject = Quiz[this.id - 1]
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
            this.id = id
            const nextQuizObject = Quiz[id - 1]

            this.$root.gameManager.setCurrentQuiz(nextQuizObject)

            if(this.quizObject.type === '3d' && nextQuizObject.type !== '3d') eventHub.$emit('webgl:clear-group')
            // if(this.quizObject.type === '3d') this.setupWebGLGroup()
            this.quizObject = nextQuizObject
            if(this.quizObject.type === '3d') this.setupWebGLGroup()
        },

        setupWebGLGroup()
        {
            eventHub.$emit('webgl:add-group', 'mouse-move-rotate')
        }
    }
}
