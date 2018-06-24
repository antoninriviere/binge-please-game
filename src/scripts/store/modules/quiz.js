import {
    SET_QUIZ,
    SET_PROGRESS,
    INCREMENT_PROGRESS,
    QUIZ_HAS_FINISHED,
    SKIP_QUESTION,
    INCREMENT_SCORE,
    START_TRANSITION,
    SHOW_TYPE_ERROR,
    SAVE_PROGRESSION
} from 'MutationTypes'
import Fuzzyset from 'fuzzyset.js'

const fuzzyMinScore = 0.9

const state = {
    quiz: [],
    progression : [],
    maxQuestions: undefined,
    skippedQuestions: [],
    progress: 1,
    transition: 1,
    hasFinished: false,
    questionState: undefined,
    typeErrors: 0,
    fuzzyset: undefined
}

const getters = {
    getQuiz: (state) => () => state.quiz,
    getCurrentQuestion: (state) => () => state.quiz[state.progress],
    getCurrentProgress: (state) => () => state.progress,
    getTransitionProgress: (state) => () => state.transition,
    getQuestion: (state) => (index) => state.quiz[index],
    getQuizStatus: (state) => () => state.hasFinished,
    getSkippedQuestions: (state) => () => state.skippedQuestions,
    getQuestionState: (state) => () => state.questionState,
    getTypeErrors: (state) => () => state.typeErrors
}

const setFuzzyset = (answers) =>
{
    const fuzzyset = new Fuzzyset()
    answers.forEach((answer) =>
    {
        fuzzyset.add(answer)
    })
    return fuzzyset
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
        state.fuzzyset = setFuzzyset(state.quiz[state.progress].answers)
    },
    [INCREMENT_PROGRESS](state)
    {
        state.progress++
        state.fuzzyset = setFuzzyset(state.quiz[state.progress].answers)
    },
    [START_TRANSITION](state, questionState)
    {
        state.transition++
        state.questionState = questionState
    },
    [SKIP_QUESTION](state, quizObject)
    {
        state.skippedQuestions.push(quizObject)
        state.progression.push({
            id: quizObject.id,
            genres: quizObject.genres,
            failed: true,
            points: 0,
            time: 0
        })
    },
    [QUIZ_HAS_FINISHED](state, questionState)
    {
        state.hasFinished = true
        state.questionState = questionState
    },
    [SHOW_TYPE_ERROR](state)
    {
        state.typeErrors++
    },
    [SAVE_PROGRESSION](state, data)
    {
        state.progression.push({
            id: data.id,
            genres: data.genres,
            failed: false,
            points: data.totalPoints,
            time: data.timeToAnswer
        })
    }
}

const actions = {
    testQuizState({ state, commit }, questionState)
    {
        const id = state.progress + 1
        if(id < state.maxQuestions)
        {
            commit(START_TRANSITION, questionState)
        }
        else if(id === state.maxQuestions)
        {
            commit(QUIZ_HAS_FINISHED, questionState)
        }
        else return
    },
    submitAnswer({ state, commit, dispatch }, answerObj)
    {
        const currentQuestion = state.quiz[state.progress]
        console.log('SUBMIT ANSWER', currentQuestion)
        const fuzzyResults = state.fuzzyset.get(answerObj.answer)
        let maxScore = 0
        if(fuzzyResults)
        {
            fuzzyResults.forEach((result) =>
            {
                console.log(`Answer close at ${result[0].toFixed(2) * 100}%`)
                if(result[0] > maxScore)
                    maxScore = result[0]
            })
        }
        if(maxScore > fuzzyMinScore)
        {
            console.log('win', answerObj.time)

            // TODO better max time
            const timePoints = Math.round(answerObj.time / 15000 * 100)
            const totalPoints = 100 + timePoints
            const timeToAnswer = 15000 - answerObj.time
            commit(SAVE_PROGRESSION, { ...currentQuestion, totalPoints, timeToAnswer })
            commit(INCREMENT_SCORE, totalPoints)
            dispatch('testQuizState', 'success')
        }
        else
        {
            commit(SHOW_TYPE_ERROR)
        }
    },
    skipQuestion({ state, commit, dispatch }, quizObject)
    {
        commit(SKIP_QUESTION, quizObject)
        dispatch('testQuizState', 'failed')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
