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

    },

    mounted()
    {

    },

    destroyed()
    {

    },

    methods:
    {
        saveScore()
        {
            const newScoreKey = this.$root.database.ref().child('scores').push().key
            const updates = {}
            const uri = '/scores/' + newScoreKey
            const scoreObject = {
                pseudo: 'Antonain',
                score: {
                    total: 29.3,
                    steps: [
                        {
                            id: 'test-1',
                            score: 4.2
                        },
                        {
                            id: 'test-2',
                            score: 3.1
                        }
                    ]
                }
            }
            updates[uri] = scoreObject
            this.$root.database.ref().update(updates)
        }
    }
}
