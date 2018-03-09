import logger from 'Utils/logger'

import eventHub from 'Application/event-hub.js'

class GameManager
{

    constructor()
    {
        this.currentQuiz = {}
        eventHub.$on('game:submit-answer', () =>
        {
            console.log('receive event from game manager')
        })
    }

    setCurrentQuiz(quiz)
    {
        this.currentQuiz = quiz
    }

    submitAnswer(answer)
    {
        console.log('submitted answer ', answer, 'accepted answers ', this.currentQuiz.answers)
        for(let i = 0; i < this.currentQuiz.answers.length; i++)
        {
            if(answer === this.currentQuiz.answers[i])
            {
                logger('WIN', 'green')
                return true
            }
        }

        logger('LOOSER', 'red')
        return false
    }
}

export default new GameManager()
