import appPage from 'Mixins/app-page'

export default
{
    name: 'page-home',

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
        onPlayClick()
        {
            this.$root.audioManager.resumeContext()
            this.$router.push('/quiz/1')
            this.$root.time.start()
        }
    }
}
