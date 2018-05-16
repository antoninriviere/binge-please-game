import appPage from 'Mixins/app-page'

export default
{
    name: 'page-score',

    components:
    {

    },

    data()
    {
        return {

        }
    },

    mixins: [appPage],

    created()
    {
        this.scoreObject = {
            pseudo: 'jean marie',
            score: {
                total: 0,
                steps: [
                    {
                        id: 'test-1',
                        score: '4.2'
                    },
                    {
                        id: 'test-2',
                        score: '7.8'
                    }
                ]
            }
        }
    },

    mounted()
    {
        this.onQuizHasFinished()
    },

    destroyed()
    {

    },

    methods:
    {
        updateDatabase()
        {
            const newScoreKey = this.$root.database.ref().child('scores').push().key
            const updates = {}
            const uri = '/scores/' + newScoreKey
            updates[uri] = this.scoreObject
            this.$root.database.ref().update(updates)
        },

        onQuizHasFinished()
        {
            console.log('on quizz has finished')
            this.$root.time.stop()
            this.scoreObject.score.total = this.$root.time.globaTime
        },

        onSubmitPseudo()
        {
            console.log('submit', this.scoreObject.score.total)
            this.updateDatabase()
        }
    }
}
