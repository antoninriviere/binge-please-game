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

            scoreObject: {
                pseudo: 'michel michel',
                total: '00:00',
                totalMilliseconds: 0
            }
        }
    },

    mixins: [appPage],

    created()
    {

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
            this.$root.time.stop()
            this.scoreObject.total = this.$root.time.globalTime
            this.scoreObject.totalMilliseconds = this.$root.time.elapsed
        },

        onSubmitPseudo()
        {
            this.updateDatabase()
            this.$router.push('/leaderboard')
        }
    }
}
