import appPage from 'Mixins/app-page'

import Quiz from 'Config/quiz'

import GameTypeManager from 'Components/game-type-manager'

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
        GameTypeManager
    },

    data()
    {
        return {
            id: this.$route.params.id,
            quizObject: {
                componentId: 'quiz-dom'
            }
        }
    },

    created()
    {
        this.eventHub.$on('application:route-change', this.onRouteChange)
    },

    mounted()
    {
        this.quizObject = Quiz[0]
    },

    destroyed()
    {
        this.eventHub.$off('application:route-change', this.onRouteChange)
    },

    mixins: [appPage],

    methods:
    {
        onRouteChange(id)
        {
            this.id = id
            this.quizObject = Quiz[id - 1]
            this.$root.gameManager.setCurrentQuiz(this.quizObject)
        }
    }
}
