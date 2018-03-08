import appPage from 'Mixins/app-page'
import Quiz from 'Config/quiz'

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
        QuizVideo
    },

    data()
    {
        return {
            id: this.$route.params.id,
            quizObject: {
                componentId: undefined,
                type: undefined
            }
        }
    },

    created()
    {
        this.eventHub.$on('application:route-change', this.onRouteChange)
    },

    mounted()
    {
        this.quizObject = Quiz[this.id - 1]
        if(this.quizObject.type === '3d') this.setupWebGLGroup()
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
            const nextQuizObject = Quiz[id - 1]
            if(this.quizObject.type === '3d' && nextQuizObject.type !== '3d') this.eventHub.$emit('webgl:clear-group')
            // if(this.quizObject.type === '3d') this.setupWebGLGroup()
            this.quizObject = nextQuizObject
            if(this.quizObject.type === '3d') this.setupWebGLGroup()
        },

        setupWebGLGroup()
        {
            this.eventHub.$emit('webgl:add-group', 'mouse-move-rotate')
        }
    }
}
