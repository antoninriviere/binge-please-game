import { SET_QUIZ, SET_PROGRESS, INCREMENT_PROGRESS, INCREMENT_SCORE } from 'MutationTypes'

console.log(SET_QUIZ)

const state = {
    quiz: [],
    progress: 0
}

const getters = {
    getQuiz: (state) => () => state.quiz,
    getCurrentQuestion: (state) => () => state.quiz[state.progress],
    getQuestion: (state) => (index) => state.quiz[index]
}

const mutations = {
    [SET_QUIZ](state, quiz)
    {
        state.quiz = quiz
    },
    [SET_PROGRESS](state, progress)
    {
        state.progress = progress
    },
    [INCREMENT_PROGRESS](state)
    {
        state.progress++
    }
}

const actions = {
    submitAnswer({ state, commit }, answer)
    {
        const currentQuestion = state.quiz[state.progress]
        console.log('submit answer', currentQuestion)

        for(let i = 0; i < currentQuestion.answers.length; i++)
        {
            if(answer === currentQuestion.answers[i])
            {
                console.log('WIN')
                commit(INCREMENT_PROGRESS)
                commit(INCREMENT_SCORE)
            }
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
