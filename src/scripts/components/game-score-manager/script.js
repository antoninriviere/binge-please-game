export default
{
    name: 'game-score-manager',

    components:
    {

    },

    data()
    {
        return {
            score: 0
        }
    },

    computed: {
        progress()
        {
            return this.$root.quizId
        }
    },

    created()
    {
        this.$root.$store.watch(this.$root.$store.getters.getScore, this.onUpdateScore)
    },

    mounted()
    {
    },

    destroyed()
    {
    },

    methods:
    {
        onUpdateScore(score)
        {
            console.log('score updated', score)
            this.score = score
        }
    }
}
