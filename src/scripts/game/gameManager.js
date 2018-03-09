import logger from 'Utils/logger'

class GameManager
{

    constructor()
    {
        this.currentQuiz = {}
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
