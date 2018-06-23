import eventHub from 'Application/event-hub'

export default
{
    name: 'app-leaderboard',

    components:
    {

    },

    props: {
        score: {
            type: Number,
            required: true
        }
    },

    data()
    {
        return {
            isActive: false,
            scores: [],
            wrapperHeight: 0,
            yourScore: {
                pseudo: '',
                total: 0
            },
            yourPosition: 0
        }
    },

    created()
    {

    },

    mounted()
    {
        this.getLeaderBoardDatas()
        this.wrapperHeight = this.$root.windowObj.height - 190 + 'px'
    },

    destroyed()
    {

    },

    methods:
    {
        toggleLeaderboard()
        {
            console.log('open leaderboard')
            this.isActive = !this.isActive
            if(this.isActive) {
                // const scrollAmout = window.scrollY
                eventHub.$emit('page:disable-scroll')
                // this.$parent.$el.scrollTop = scrollAmout
                this.scrollToPosition()
            }
            else eventHub.$emit('page:enable-scroll')
        },

        getLeaderBoardDatas()
        {
            this.scores = []
            this.$root.database.ref('/scores/').orderByChild('total').once('value').then((snapshot) =>
            {
                snapshot.forEach((child) =>
                {
                    const scoreArray = { ...child.val(), ...{ yours: false } }
                    this.scores.unshift(scoreArray)
                })

                this.compareScore()
            })
        },

        compareScore()
        {
            for(let i = 0; i < this.scores.length; i++)
            {
                console.log('score', this.scores[i], 'your score', this.$props.score)
                if(this.$props.score >= this.scores[i].total)
                {
                    const yScore = {
                        yours: true,
                        total: this.$props.score
                    }
                    this.scores.splice(i, 0, yScore)
                    this.yourPosition = i
                    return
                }
                else if(i + 1 === this.scores.length)
                {
                    const yScore = {
                        yours: true,
                        total: this.$props.score
                    }
                    this.scores.splice(i + 1, 0, yScore)
                    this.yourPosition = i + 1
                    return
                }
            }
        },

        updateDatabase()
        {
            this.yourScore.total = this.$props.score
            const newScoreKey = this.$root.database.ref().child('scores').push().key
            const updates = {}
            const uri = '/scores/' + newScoreKey
            updates[uri] = this.yourScore
            this.$root.database.ref().update(updates)
        },

        onSubmitPseudo()
        {
            this.updateDatabase()
            this.scores[this.yourPosition] = {
                pseudo: this.yourScore.pseudo,
                total: this.yourScore.total,
                yours: false
            }
            this.$forceUpdate()
        },

        scrollToPosition()
        {
            const cellHeight = 70
            const scrollY = cellHeight * this.yourPosition - 3 * cellHeight
            this.$refs.wrapper.scrollTop = scrollY
        }
    }
}
