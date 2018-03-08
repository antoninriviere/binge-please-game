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

    computed:
    {
        getTitle: function()
        {
            return 'title'
        }
    },

    mixins: [appPage],

    methods:
    {
    }
}
