import {
    SET_QUIZ,
    SET_PROGRESS,
    INCREMENT_PROGRESS,
    QUIZ_HAS_FINISHED,
    SKIP_QUESTION
} from 'MutationTypes'

const state = {
    quiz: [],
    maxQuestions: undefined,
    skippedQuestions: [],
    progress: 1,
    hasFinished: false
}

const getters = {
    getQuiz: (state) => () => state.quiz,
    getCurrentQuestion: (state) => () => state.quiz[state.progress],
    getCurrentProgress: (state) => () => state.progress,
    getQuestion: (state) => (index) => state.quiz[index],
    getQuizStatus: (state) => () => state.hasFinished,
    getSkippedQuestions: (state) => () => state.skippedQuestions
}

const mutations = {
    [SET_QUIZ](state,
        quiz)
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
            commit(INCREMENT_PROGRESS)
        }
        else if(id === state.maxQuestions)
        {
            commit(QUIZ_HAS_FINISHED)
        }
        else return
    },
    submitAnswer({ state, commit, dispatch }, answer)
    {
        const currentQuestion = state.quiz[state.progress]
        console.log('SUBMIT ANSWER', currentQuestion)

        for(let i = 0; i < currentQuestion.answers.length; i++)
        {
            if(answer === currentQuestion.answers[i])
            {
                console.log('WIN')
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
