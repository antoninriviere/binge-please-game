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
            this.$root.database.ref('/scores/').orderByChild('totalMilliseconds').once('value').then((snapshot) =>
            {
                snapshot.forEach((child) =>
                {
                    this.scores.push(child.val())
                })
            })
            console.log(this.scores)
        }
    }
}
