import appPage from 'Mixins/app-page'
// import quiz from '../../config/quiz'

export default
{
    name: 'page-quiz',

    components:
    {

    },

    data()
    {
        return {
            id: this.$route.params.id
        }
    },

    created()
    {
        this.eventHub.$on('application:route-change', this.onRouteChange)
    },

    mounted()
    {

    },

    destroyed()
    {
        this.eventHub.$off('application:route-change', this.onRouteChange)
    },

    mixins: [appPage],

    methods:
    {
        onRouteChange(id)
        {
            this.id = id
        }
    }
}
