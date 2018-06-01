import {
    SET_QUIZ,
    SET_PROGRESS,
    INCREMENT_PROGRESS,
    QUIZ_HAS_FINISHED,
    SKIP_QUESTION,
    INCREMENT_SCORE,
    START_TRANSITION
} from 'MutationTypes'

const state = {
    quiz: [],
    maxQuestions: undefined,
    skippedQuestions: [],
    progress: 1,
    transition: 1,
    hasFinished: false
}

const getters = {
    getQuiz: (state) => () => state.quiz,
    getCurrentQuestion: (state) => () => state.quiz[state.progress],
    getCurrentProgress: (state) => () => state.progress,
    getTransitionProgress: (state) => () => state.transition,
    getQuestion: (state) => (index) => state.quiz[index],
    getQuizStatus: (state) => () => state.hasFinished,
    getSkippedQuestions: (state) => () => state.skippedQuestions
}

const mutations = {
    [SET_QUIZ](state, quiz)
    {
        state.quiz = quiz
        state.maxQuestions = quiz.length
    },
    [SET_PROGRESS](state, progress)
    {
        state.progress = progress
    },
    [INCREMENT_PROGRESS](state)
    {
        state.progress++
    },
    [START_TRANSITION](state)
    {
        state.transition++
    },
    [SKIP_QUESTION](state, questionId)
    {
        state.skippedQuestions.push(questionId)
    },
    [QUIZ_HAS_FINISHED](state)
    {
        state.hasFinished = true
    }
}

const actions = {
    testQuizState({ state, commit })
    {
        const id = state.progress + 1
        if(id < state.maxQuestions)
        {
            commit(START_TRANSITION)
        }
        else if(id === state.maxQuestions)
        {
            commit(QUIZ_HAS_FINISHED)
        }
        else return
    },
    submitAnswer({ state, commit, dispatch }, answerObj)
    {
        const currentQuestion = state.quiz[state.progress]
        console.log('SUBMIT ANSWER', currentQuestion)

        for(let i = 0; i < currentQuestion.answers.length; i++)
        {
            if(answerObj.answer === currentQuestion.answers[i])
            {
                console.log('win', answerObj.time)

                // TODO better max time
                const timePoints = Math.round(answerObj.time / 15000 * 100)
                const totalPoints = 100 + timePoints

                commit(INCREMENT_SCORE, totalPoints)
                dispatch('testQuizState')
            }
        }
    },
    skipQuestion({ state, commit, dispatch }, questionId)
    {
        commit(SKIP_QUESTION, questionId)
        dispatch('testQuizState')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
