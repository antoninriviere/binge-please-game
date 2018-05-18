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
                pseudo: 'jean-marie',
                total: 0
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

    computed:
    {
        score()
        {
            return this.$store.getters.getScore()
        }
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
            this.scoreObject.total = this.score
        },

        onSubmitPseudo()
        {
            this.updateDatabase()
            this.$router.push('/leaderboard')
        }
    }
}
