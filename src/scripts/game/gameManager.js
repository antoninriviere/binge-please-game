import logger from 'Utils/logger'

class gameManager
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
                return
            }
        }

        logger('LOOSER', 'red')
    }
}

export default gameManager
