import appPage from 'Mixins/app-page'

export default
{
    name: 'page-leaderboard',

    components:
    {

    },

    data()
    {
        return {
            scores: []
        }
    },

    mixins: [appPage],

    created()
    {

    },

    mounted()
    {
        this.getLeaderBoardDatas()
    },

    destroyed()
    {

    },

    methods:
    {
        getLeaderBoardDatas()
        {
            this.scores = []
            this.$root.database.ref('/scores/').orderByChild('total').once('value').then((snapshot) =>
            {
                snapshot.forEach((child) =>
                {
                    this.scores.unshift(child.val())
                })
            })
            console.log(this.scores)
        }
    }
}
